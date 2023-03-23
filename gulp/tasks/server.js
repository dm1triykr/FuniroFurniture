var gulp 		= require( 'gulp' );
var config 		= require( '../config' );
var browserSync = require( 'browser-sync' ).create();

gulp.task('server', (done) => {
	browserSync.init({
		server: {
			baseDir: config.dest.root
		},
		files: [
			config.dest.html + '*.html',
			config.dest.css + '*.css',
			config.dest.js + '*.js'
		],
		port: 8080,
		notify: false,
		ghostMode: false,
		online: false,
		open: true
	});
	done()
});
