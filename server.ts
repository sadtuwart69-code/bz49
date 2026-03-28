import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import feishuHandler from "./api/notify-feishu";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Debug endpoint to check environment variables
  app.get("/api/debug-env", (req, res) => {
    console.log("[Dev Server] Debug ENV request received");
    const vars = [
      'FEISHU_APP_ID',
      'FEISHU_APP_SECRET',
      'FEISHU_BASE_ID',
      'FEISHU_TABLE_ORACLE',
      'FEISHU_TABLE_BAZI',
      'FEISHU_TABLE_MARRIAGE',
      'FEISHU_TABLE_PLANNING',
      'FEISHU_WEBHOOK_URL'
    ];
    const status = vars.reduce((acc, v) => {
      const val = process.env[v];
      acc[v] = val ? `✅ (${val.substring(0, 4)}...)` : '❌';
      return acc;
    }, {} as Record<string, string>);
    res.json(status);
  });

  // Proxy API requests to the Vercel handler
  app.post("/api/notify-feishu", async (req, res) => {
    console.log("[Dev Server] Received API request:", req.body.type);
    try {
      // Mock Vercel req/res
      const vercelReq = {
        method: 'POST',
        body: req.body,
      } as any;
      
      const vercelRes = {
        status: (code: number) => ({
          json: (data: any) => res.status(code).json(data)
        }),
        json: (data: any) => res.json(data)
      } as any;

      await feishuHandler(vercelReq, vercelRes);
    } catch (error) {
      console.error("[Dev Server] API Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Dev Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
