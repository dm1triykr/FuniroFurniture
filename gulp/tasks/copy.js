var gulp = require( 'gulp' );
var config = require( '../config' );
var imgIcons = config.src.img + 'icons/*.*';
var imgSvg = config.src.img + 'svg/*.*';
var newer = require( 'gulp-newer' );

// copy static files
gulp.task( 'copy', (done) => {

	// copy all files from /src/img directory
	gulp.src( [ config.src.img + '**/*.*', '!' + imgIcons, '!' + imgSvg ] )
		.pipe( newer( config.dest.img ) )
		.pipe( gulp.dest( config.dest.img ) );

	// copy all files from /src/fonts directory
	gulp.src( config.src.root + 'fonts/*.*' )
		.pipe( newer( config.dest.css + 'fonts/' ) )
		.pipe( gulp.dest( config.dest.css + 'fonts/' ) );

	// copy all roots files except *.html
	gulp.src( config.src.root + '*.{!(html), *}' )
		.pipe( gulp.dest( config.dest.root ) );

	// copy all files from /src/video directory
	gulp.src( config.src.root + 'video/*.*' )
		.pipe( newer( config.dest.root + 'video/' ) )
		.pipe( gulp.dest( config.dest.root + 'video/' ) );
	done()
});


// watch statics and copy when changed
gulp.task( 'copy:watch', () => {
	gulp.watch(
		[config.src.img + '*', config.src.root + 'fonts/*'],
		gulp.series('copy' ,
		(done) => {
			done()
		})
	)
})
