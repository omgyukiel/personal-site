import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, extname, join, normalize, relative } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const publicRoot = join(projectRoot, "dist");
const portFlagIndex = process.argv.indexOf("--port");
const port = portFlagIndex >= 0 ? Number(process.argv[portFlagIndex + 1]) : 8000;
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
};

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("--port must be a valid TCP port");
}

function publicPath(url) {
  const pathname = decodeURIComponent(new URL(url, "http://localhost").pathname);
  const candidate = normalize(join(publicRoot, pathname));
  const pathFromRoot = relative(publicRoot, candidate);

  if (pathFromRoot.startsWith("..") || pathFromRoot.includes(":\\")) return null;
  return candidate;
}

const server = createServer(async (request, response) => {
  try {
    let path = publicPath(request.url ?? "/");
    if (!path) throw new Error("invalid path");

    const details = await stat(path);
    if (details.isDirectory()) path = join(path, "index.html");

    const fileDetails = await stat(path);
    if (!fileDetails.isFile()) throw new Error("not a file");

    response.writeHead(200, {
      "Content-Type": contentTypes[extname(path)] ?? "application/octet-stream",
    });
    createReadStream(path).pipe(response);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found\n");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Serving dist/ at http://127.0.0.1:${port}`);
});
