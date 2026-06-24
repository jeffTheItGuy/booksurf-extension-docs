const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8080;
const ROOT_DIR = path.join(__dirname);

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".md": "text/markdown",
  ".txt": "text/plain",
};

const server = http.createServer((req, res) => {
  let urlPath = req.url === "/" ? "index.html" : req.url;

  // Strip query strings
  urlPath = urlPath.split("?")[0];

  const filePath = path.join(ROOT_DIR, urlPath);

  // Prevent directory traversal attacks
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("403 Forbidden");
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Try serving index.html for directory paths (SPA / GitHub Pages style)
      const indexPath = path.join(filePath, "index.html");
      fs.readFile(indexPath, (err2, data) => {
        if (err2) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("404 Not Found");
          return;
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 Internal Server Error");
        return;
      }
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    });
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`📄 Docs server running at http://localhost:${PORT}`);
});