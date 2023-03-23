var gulp = require( 'gulp' );

gulp.task( 'watch', gulp.parallel(
    'html:watch',
    'iconfont:watch',
    'sprite:watch',
    'copy:watch',
    'styles:watch',
    'js:watch',
));

gulp.task( 'default',
    gulp.series(
    	'html',
		'iconfont',
		'sprite',
		'copy',
		'styles',
		'js',
        gulp.series('server', 'watch')
    )
);

gulp.task( 'build',
    gulp.series('clean', gulp.parallel(
		'html',
		'iconfont',
		'sprite',
		'copy',
		'styles',
		'js',
		'images',
	))
);
