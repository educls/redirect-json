import { FastifyInstance } from "fastify";
import db from "../db";
import * as geoip from "geoip-lite";

export default async function GetRoute(app: FastifyInstance) {
  app.get("/get/:id", async (req, reply) => {
    const { id } = req.params as { id: string };

    const logs = db.get("logs");
    const log = logs.find((l: any) => l.link_id === id);

    if (!log) {
      return reply.code(404).send({ error: "Log não encontrado." });
    }

    return reply.send({
      data: log
    });
  });
}
