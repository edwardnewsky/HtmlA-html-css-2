var gulp = require("gulp");
var less = require("gulp-less");
// пропускает ошибки
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer")
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");

gulp.task("images", function () {
	return gulp.src("source/img/**/*.{png,jpg,svg}")
	.pipe(imagemin([
		imagemin.optipng({optimizationLevel: 3}),
		imagemin.jpegtran({progressice: true}),
		imagemin.svgo()
	]))
	.pipe(gulp.dest("source/img"));
});

gulp.task("style", function () {
	gulp.src("source/less/style.less")
	.pipe(plumber())
	.pipe(less())
	.pipe(postcss([
		autoprefixer()
	]))
	.pipe(gulp.dest("source/css"))
	.pipe(minify())
	.pipe(rename("style.min.css"))
	.pipe(gulp.dest("source/css"));
	.pipe(server.stream());
});

gulp.task("serve", ["style"], function () {
	server.init({
		server: "source/"
	});
	gulp.watch("source/less/**/*.less", ["style"]);
	gulp.watch("source/*.html")
		.on("change", server.reload);
});