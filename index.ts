import { createRequestHandler as createRemixRequestHandler } from "@remix-run/server-runtime";
const build = require("./build");

const port = 3000;
console.log(`server running on port ${port}`);

Bun.serve({
  port,
  async fetch(req) {
    const handleRequest = createRemixRequestHandler(build, "production");
    return await handleRequest(req);
  },
});
