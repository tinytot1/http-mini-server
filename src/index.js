#!/usr/bin/env node

const koa = require("koa");
const serveStatic = require("koa-serve-static");
const app = new koa();
const root = process.cwd();
app.use(serveStatic(root));

app.listen(3000, () => {
  console.log(`serve at http://localhost:3000`);
});
