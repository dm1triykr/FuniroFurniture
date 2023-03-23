var gulp = require( 'gulp' );
var del = require( 'del' );


// clean build directory
gulp.task( 'clean', async function(done) {
	const cleanBuild = await del('build');
	console.log('Files and directories that would be deleted:\n', cleanBuild.join('\n'));
	done()
});
