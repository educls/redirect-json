import { FastifyInstance } from "fastify";
import db from "../db";
import * as geoip from "geoip-lite";

export default async function redirectRoute(app: FastifyInstance) {
  app.get("/r/:id", async (req, reply) => {
    const { id } = req.params as { id: string };

    const links = db.get("links");
    const link = links.find((l: any) => l.id === id);

    if (!link) {
      return reply.code(404).send({ error: "Link não encontrado." });
    }

    // Captura IP real do Cloudflare
    const realIP = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.ip;
    
    const clientIP = Array.isArray(realIP) ? realIP[0] : realIP;
    
    const geo = geoip.lookup(clientIP);
    
    const log = {
      id: crypto.randomUUID(),
      link_id: id,
      ip: clientIP,
      userAgent: req.headers["user-agent"] || "unknown",
      acceptLanguage: req.headers["accept-language"] || null,
      referer: req.headers["referer"] || null,
      acceptEncoding: req.headers["accept-encoding"] || null,
      connection: req.headers["connection"] || null,
      cfRay: req.headers["cf-ray"] || null, // ID único do Cloudflare
      cfCountry: req.headers["cf-ipcountry"] || null, // País pelo Cloudflare
      country: geo?.country || null,
      region: geo?.region || null,
      city: geo?.city || null,
      timezone: geo?.timezone || null,
      timestamp: new Date().toISOString()
    };

    const logs = db.get("logs");
    logs.push(log);
    db.set("logs", logs);

    return reply.redirect(link.zoom_url);
  });
}
