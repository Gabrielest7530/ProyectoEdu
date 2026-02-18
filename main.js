import { app, BrowserWindow } from "electron";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
const PORT = 3000;

const distPath = path.join(__dirname, "dist");

// Servir archivos estáticos
server.use(express.static(distPath));

// 👇 Middleware SPA (ESTO ARREGLA TODO)
server.use((req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
  });

  win.loadURL(`http://localhost:${PORT}`);
}

app.whenReady().then(createWindow);
