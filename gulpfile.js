var gulp = require("gulp");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

gulp.task("style", function() {
  gulp.src("less/style.less")
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("css"))
    .pipe(server.stream());
});

gulp.task("serve", function() {
  server.init({
    server: ".",
    notify: false,
    open: true,
    cors: true,
    ui: false
  })

  gulp.watch("less/**/*.less", gulp.series('style'))
  gulp.watch("*.html").on("change", server.reload)

})