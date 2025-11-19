import JSONdb from "simple-json-db";

const db = new JSONdb("db.json");

// garante que as coleções existam
if (!db.has("links")) db.set("links", []);
if (!db.has("logs")) db.set("logs", []);

export default db;
