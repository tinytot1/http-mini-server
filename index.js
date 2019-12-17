#!/usr/bin/env node

const gulp = require("gulp");
const watch = require("gulp-watch");
const connect = require("gulp-connect");
const portfinder = require("portfinder");
const meow = require("meow");
const root = process.cwd();

const { flags } = meow(
  `
  Usage
    $ http-mini-server

  Options
    --port, server start port`,
  {
    flags: {
      port: {
        type: "string",
        default: "8080"
      }
    }
  }
);

portfinder.getPortPromise({ port: flags.port }).then(port => {
  connect.server({
    root,
    port,
    livereload: true
  });
  watch(root, file => {
    console.log(`change: ${file.history}`);
    gulp.src(root).pipe(connect.reload());
  });
});
