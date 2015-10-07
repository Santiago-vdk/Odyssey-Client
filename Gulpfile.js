var NwBuilder = require('nw-builder');
var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('nw', function () {

var nw = new NwBuilder({
    files: './*', 
	version: '0.12.3',
    platforms: ['win32'] //Change or add here the desired SO.
});

//Log stuff you want

nw.on('log',  console.log);

// Build returns a promise
nw.build().then(function () {
   console.log('all done!');
}).catch(function (error) {
    console.error(error);
});
	
	
});

gulp.task('default', ['nw']);