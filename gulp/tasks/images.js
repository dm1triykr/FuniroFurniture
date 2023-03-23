var gulp 		= require('gulp');
var config 		= require('../config');
var size 		= require('gulp-size');
var mode 		= require('gulp-mode')();
var imagemin 	= require('gulp-imagemin');

const imageminOptions = {
	mozjpeg: {
		quality: 75,
		progressive: true,
	},
	optipng: {
		optimizationLevel: 5,
	},
	svgo: {
		plugins: [
			{ removeViewBox: false },
			{ cleanupIDs: false },
			{ removeComments: true },
			{ removeEmptyContainers: false },
		],
	},
};

gulp.task('images', (done) => {
	gulp.src(config.src.img+'*.*')
	.pipe(
		mode.production(
			imagemin([
				imagemin.mozjpeg(imageminOptions.mozjpeg),
				imagemin.optipng(imageminOptions.optipng),
				imagemin.svgo(imageminOptions.svgo),
			]),
		),
	)
	.pipe(size({ showFiles: true }))
	.pipe(gulp.dest(config.dest.img));

	done()
})
