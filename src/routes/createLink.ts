import { FastifyInstance } from "fastify";
import db from "../db";
import { nanoid } from "nanoid";

export default async function createLinkRoute(app: FastifyInstance) {
  app.post("/create", async (req, reply) => {
    const body = req.body as { zoom_url: string };

    if (!body?.zoom_url) {
      return reply.code(400).send({ error: "zoom_url é obrigatório." });
    }

    const id = nanoid(8);

    const host = req.headers.host || 'localhost:3000';
    const protocol = req.headers['x-forwarded-proto'] || 'http';

    const newLink = {
      id,
      zoom_url: body.zoom_url,
      redirect_url: `${protocol}://${host}/r/${id}`,
      created_at: new Date().toISOString()
    };

    const links = db.get("links");
    links.push(newLink);
    db.set("links", links);
    
    return reply.send({
      data: newLink
    });
  });
}
