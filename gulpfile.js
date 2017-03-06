var gulp = require('gulp');
var webserver = require('gulp-webserver');
var url = require('url');
var fs = require('fs');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var webpack = require('gulp-webpack');
var named = require('vinyl-named');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var watch = require('gulp-watch');
var sequence = require('gulp-watch-sequence');
var minifyHTML = require('gulp-minify-html');


// mock数据操作
gulp.task('webserver',function(){
	gulp.src('www')
	.pipe(webserver({
		livereload: true,
		open:true,


		middleware:function(req,res,next){
			var urlObj = url.parse(req.url,true),
			method = req.method;

			switch(urlObj.pathname){
				case '/api/skill.php':
				 res.setHeader('Content-Type','application/json');
				 fs.readFile('mock/skill.json','utf-8',function(err,data){
				 	res.end(data);
				 });
				return;

				case '/api/project.php':
				 res.setHeader('Content-Type','application/json');
				 fs.readFile('mock/project.json','utf-8',function(err,data){
				 	res.end(data);
				 });
				return;


				case '/api/work.php':
				 res.setHeader('Content-Type','application/json');
				 fs.readFile('mock/work.json','utf-8',function(err,data){
				 	res.end(data);
				 });
				return;

				case '/api/me.php':
				 res.setHeader('Content-Type','application/json');
				 fs.readFile('mock/me.json','utf-8',function(err,data){
				 	res.end(data);
				 });
				return;
				default:
				;
			}
			next();
		}

	}))
});

gulp.task('copy-index',function(){
	return gulp.src('./src/index.html').pipe(gulp.dest('./www'));
});

gulp.task('copy-images',function(){
	return gulp.src('./src/images/**').pipe(gulp.dest('./www/images'));
});

gulp.task('copy-resources',function(){
	return gulp.src('./src/resources/**').pipe(gulp.dest('./www/resources'));
});

gulp.task('sass',function(){
	return gulp.src('./src/css/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('./www/css'));
});

// js的入口文件
var jsFiles = ['src/js/index.js'];
gulp.task('packjs',function(){
	return gulp.src(jsFiles).pipe(named()).pipe(webpack()).pipe(uglify()).pipe(gulp.dest('./www/js'));
});

// 版本控制
var cssDistFiles = ['./www/css/index.css'];
var jsDistFiles = ['./www/js/index.js'];

// css ver控制,manifest生成一个映射文件
gulp.task('verCss',function(){
	return gulp.src(cssDistFiles)
	.pipe(rev())
	.pipe(gulp.dest('./www/css'))
	.pipe(rev.manifest())
	.pipe(gulp.dest('www/ver/css'));
});

// css ver控制,mainfest生成一个映射文件
gulp.task('verJs',function(){
	return gulp.src(jsDistFiles)
	.pipe(rev()) //先生成版本
	.pipe(gulp.dest('./www/js'))
	.pipe(rev.manifest()) //再生成映射文件
	.pipe(gulp.dest('www/ver/js'));
});

//版本字符串的替换工作
gulp.task('html',function(){
	return gulp.src(['./www/ver/**/*.json','./www/*.html'])
	.pipe(revCollector({ replaceReved:true }))
	.pipe(gulp.dest('./www/'))
});

//设置监控
gulp.task('watch',function(){
	gulp.watch('./src/index.html',['copy-index']);
	/*gulp.watch('./src/resources/**',['copy-resources']);*/
	/*gulp.watch('./src/images/**',['copy-images']);*/
 	
 	watch('./src/images/**/*',function(){
 		gulp.start('copy-images');
 	});

 	watch('./src/resources/**',function(){
 		gulp.start('copy-resources');
 	});
	

	var queue = sequence(300);

	watch('./src/js/**/*.js',{
		name:"JS",
		emitOnGlob:false
	},queue.getHandler('packjs','verJs','html'))


	watch('./src/css/**/*.scss', {
	    name      : 'CSS',
	    emitOnGlob: false
	  }, queue.getHandler('sass', 'verCss', 'html'));


});

gulp.task('default',['webserver','watch']);