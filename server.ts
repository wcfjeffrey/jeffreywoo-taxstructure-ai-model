import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("structures.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS structures (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    data TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Routes
  app.get("/api/structures", (req, res) => {
    const rows = db.prepare("SELECT id, name, updated_at FROM structures ORDER BY updated_at DESC").all();
    res.json(rows);
  });

  app.get("/api/structures/:id", (req, res) => {
    const row = db.prepare("SELECT * FROM structures WHERE id = ?").get(req.params.id);
    if (row) {
      res.json(row);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });

  app.post("/api/structures", (req, res) => {
    const { id, name, data } = req.body;
    const stmt = db.prepare("INSERT OR REPLACE INTO structures (id, name, data, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)");
    stmt.run(id, name, JSON.stringify(data));
    res.json({ success: true });
  });

  app.delete("/api/structures/:id", (req, res) => {
    db.prepare("DELETE FROM structures WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
