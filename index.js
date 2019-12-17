#!/usr/bin/env node

const gulp = require("gulp");
const watch = require("gulp-watch");
const connect = require("gulp-connect");
const portfinder = require("portfinder");
const root = process.cwd();

const program = require("commander");

program
  .version(`http-mini-server ${require("./package").version}`)
  .option("-p, --port <number>", "service port", parseInt, 8080);

program.on("--help", function() {});

program.parse(process.argv);

portfinder.getPortPromise({ port: program.port }).then(port => {
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
