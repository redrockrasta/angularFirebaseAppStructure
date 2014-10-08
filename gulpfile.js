var gulp = require('gulp');

var g = require('gulp-load-plugins')();

g.run = require('run-sequence');

var p = require('./package.json').options;

var	sys = require('sys');
var exec = require('child_process').exec;

//handle assets

gulp.task('css', function () {
	var c = "expanded";
	if (g.util.env.optimize)
		c = "compressed";

    return gulp.src(p.css.src)
        .pipe(g.rubySass(
        		{
        			style: c
        			,cacheLocation: p.css.cacheLocation
        			,precision: 10
        			,loadPath: p.css.loadPath
        		}
        		)
        )
		.on('error',g.util.log)
        .pipe(g.autoprefixer())
        .pipe(g.size())
        .pipe(gulp.dest(p.dest+'css'))
        ;
});

gulp.task('template', function () {
    var c = false;
    if (g.util.env.optimize)
        c = true;

    return gulp.src(p.template.src)
        .pipe(g.size())
        .pipe(gulp.dest(p.dest+'template'))
        ;
})

gulp.task('map', function () {
    var c = false;
    if (g.util.env.optimize)
        c = true;

    return gulp.src(p.mapfiles.src)
        .pipe(g.size())
        .pipe(g.flatten())
        .pipe(gulp.dest(p.dest+'js'))
        ;
})

gulp.task('js', function () {
	var c = false;
	if (g.util.env.optimize)
		c = true;

	return gulp.src(p.js.src)
		.pipe(g.include())
		.on('error',g.util.log)
		.pipe(g.if(c,g.uglify()))
	    .pipe(g.size())
		.pipe(gulp.dest(p.dest+'js'))
		;
})

gulp.task('fonts', function () {
    return gulp.src(p.fonts.src)
    	.pipe(g.flatten())
	    .pipe(g.size())
        .pipe(gulp.dest(p.dest+'fonts'));
});

gulp.task('images', function () {
	var c = false;
	if (g.util.env.optimize)
			c = true;

    return gulp.src(p.images.src)
    .pipe(g.flatten())
    .pipe(g.if(c,g.imagemin()))
    .pipe(g.size())
    .pipe(gulp.dest(p.dest+'img'));
});

//utilities

gulp.task('clear-manifest',function() {
	return gulp.src(p.manifest+'/rev-manifest.json')
	.pipe(g.clean());
})

gulp.task('clean',['clear-manifest'], function () {
    return gulp.src(p.dest, {read: false})
        .pipe(g.clean());
});

//add revision to filenames

gulp.task('rev1', function () {

	var c = "";

	if (g.util.env.cdn)
	{
		if (g.util.env.cdn.length)
			c = g.util.env.cdn;
		else
			c = p.cdn;
	}

	return gulp.src(p.dest+"**/*",{base:'public'})
	.pipe(g.rename(function (path) {
    	//path.dirname = p.app+'/'+path.dirname;
  	}))
	.pipe(g.rev())
	.pipe(g.revReplace())
	.pipe(gulp.dest(p.tmp))
	.pipe(g.rev.manifest({remap:c}))
	.pipe(gulp.dest(p.manifest))
});

gulp.task('rev2',['rev1'], function () {
    return gulp.src(p.dest, {read: false})
        .pipe(g.clean());
});

gulp.task('rev3',['rev2'], function () {
	return gulp.src(p.tmp+"/**")
	.pipe(gulp.dest('public'))
	;
});

gulp.task('rev',['rev3'], function () {
	return gulp.src(p.tmp)
	.pipe(g.clean());
});

// deploy to s3

gulp.task('publish', function () {
	var aws = require('./aws.json');
	var publisher = g.awspublish.create(aws);
	var headers = p.expire;

	return gulp.src([p.dest+'**/*','!'+p.dest+'**.js','!'+p.dest+'**/*.css'])
	.pipe(g.size())
	.pipe(g.rename(function (path) {
    	path.dirname = p.bucketfolder+'/'+path.dirname;
  	}))
  	.pipe(publisher.publish(headers))
	.on('error', function(l,e) {
	    console.log(l.message);
	})
	.pipe(publisher.sync(p.bucketfolder))
  	.pipe(g.awspublish.reporter())

  	;

});

// batch tasks

gulp.task('deploy',function(){
	g.run("clean","css",'template',"js","images","fonts","rev","publish");
});

gulp.task("build-rev",function(){
	g.run("clean","css",'template',"js",'map',"images","fonts","rev");
});

gulp.task('build',function(){
	g.run('clean','css','template','js','map','images','fonts');
});

gulp.task('watch',function(){

	gulp.watch(p.css.src,['css']);
    gulp.watch(p.js.src,['template']);
	gulp.watch(p.js.src,['js']);
	gulp.watch(p.images.src,['images']);
	gulp.watch(p.fonts.src,['fonts']);

	return true;

})

// watch tasks

gulp.task('devmode',function(){

	console.log("\nWatching for file changes\n");
	g.livereload.listen();

	g.run("clean","css","js","images","fonts");

	gulp.watch(p.css.src,['css']);
    gulp.watch(p.js.src,['template']);
	gulp.watch(p.js.src,['js']);
	gulp.watch(p.images.src,['images']);
	gulp.watch(p.fonts.src,['fonts']);

	gulp.watch(p.dest+'/css/**/*').on('change',g.livereload.changed);
	gulp.watch('app/views/**/*').on('change',g.livereload.changed);

});

