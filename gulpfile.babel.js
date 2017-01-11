/**
 * Generator-dstyle v0.1.1
 * @ahther 디스타일(마봉아빠 , dstyle0210@gmail.com)
 * @url : https://dstyle0210.github.io/generator-dstyle/
 * @blog : http://dstyleitsme.tistory.com
 */
/* 개발노트
 - less나 scss 폴더가 없다라면, 테스크도 실행시키지 않도록 한다.
 - html include 을 설정한다 http://recoveryman.tistory.com/286
 - dist폴더 생성하면서, 리소스들 통합해서 전달.
 -
 */
'use strict';

/* gulp Task API
 > gulp generator // workspace 기본생성(generator:html5 와 동일)
 > gulp generator:5 // workspace 기본생성 (HTML5 파일로 생성)
 > gulp generator:xt // workspace 기본생성 (XHTML 1.1 파일로 생성)
 > gulp // less , SASS(scss) watch 시작.
 */

import fs from "fs";
import gulp from "gulp";
import path from "path";
import gutil from "gulp-util";
import mkdirp from "mkdirp";
import request from "request";
import less from "gulp-less";
import sass from "gulp-sass";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import insert from "gulp-insert";
import folders from "gulp-folders";
import replace from "gulp-replace";
import csso from "gulp-csso";
import csscomb from "gulp-csscomb";
import run from "run-sequence";

const templates = "https://dstyle0210.github.io/generator-dstyle/templates";
const src = {
    root:"./src",
    css:"./src/css",
    lib:"./src/js/lib"
};
const resources = { // resources
    root:"./src/resources",
    css:"./src/resources/css",
    less:"./src/resources/less",
    scss:"./src/resources/scss",
    app:"./src/resources/js/app"
};


/* TASK */
gulp.task("default",() => {
    let buildTask = [];
    let watchTask = [];
    if(fs.existsSync(resources.less)){
        buildTask.push("less:build");
        watchTask.push("less");
    };
    if(fs.existsSync(resources.scss)){
        buildTask.push("scss:build");
        watchTask.push("scss");
    };

    run(buildTask,() =>{
        gutil.log("CSS PreParsher Compile Success.");
        run("css:build",() =>{
            run(watchTask,() =>{
                run("css");
                gutil.log("Work Space Ready.");
            });
        });
    });
});
// TASK : LESS
gulp.task("less",() => run("less:build","less:watch") );
gulp.task("less:build",() => {
    return pipeLineLess( gulp.src( resourcesSrc(resources.less , "less") ) , resources.css);
});
gulp.task("less:watch",() => { // LESS 컴파일 watch
    return gulp.watch( resourcesSrc(resources.less , "less") ).on("change",(file) => {
        return pipeLineLess( gulp.src(file.path,{"base":resources.less}) , resources.css );
        gutil.log(getTimeStamp() + " [less:watch] "+(path.parse(file.path).base)+" changed");
    });
});
// TASK : SASS(scss)
gulp.task("scss",() => run("scss:build","scss:watch") );
gulp.task("scss:build",() => {
    return pipeLineScss( gulp.src( resourcesSrc(resources.scss , "scss") ) , resources.css);
});
gulp.task("scss:watch",() => { // SASS(scss) 컴파일 watch
    return gulp.watch( resourcesSrc(resources.scss , "scss") ).on("change",(file) => {
        return pipeLineScss( gulp.src(file.path,{"base":resources.scss}) , resources.css );
        gutil.log(getTimeStamp() + " [scss:watch] "+(path.parse(file.path).base)+" changed");
    });
});
// TASK : CSS
gulp.task("css",() => run("css:build","css:watch") );
gulp.task("css:build",folders(resources.css,(folder) =>{
    let base = resources.css;
    let dest = src.css;
    return gulp.src(resources.css+"/"+folder+"/*.css")
        .pipe(concat(folder+".css"))
        .pipe(replace('@charset "UTF-8";',''))
        .pipe(insert.prepend('@charset "UTF-8";\n'))
        .pipe(replace('/*!','\n/*!'))
        .pipe(replace(/[\n]{3}/g,"\n"))
        .pipe(gulp.dest(base))
        .pipe(gulp.dest(dest));
}));
gulp.task("css:watch",() => {
    let ext = "css";
    return gulp.watch([resources.css+"/**/*."+ext,"!"+resources.css+"/*."+ext]).on("change",(file) => {
        let folder = getFolder(file);
        if( pipeLineConcatCSS( gulp.src(resources.css+"/"+folder+"/*."+ext) , folder+'.'+ext , resources.css, src.css) ){
            gutil.log(getTimeStamp() + " [css] "+folder+".css concated");
        }else{
            gutil.log(getTimeStamp() + " [css] "+folder+".css concat failed");
        };
    });
});
// TASK : GENERATOR
gulp.task("generator",["generator:5"]);
gulp.task("generator:5",["mkdir"],() => {
    request({
        url:templates+"/html5.html"
    },(err,res,html) => {
        fs.writeFile(src.root+"/template.html", html, 'utf8', (err)=>{
            if(err) gutil.log(err);
        });
        gutil.log("Make HTML Template End.");
    });
    // 리소스 다운로드 시작.
    run("download");
});
gulp.task("generator:xt",["mkdir"],() => {
    request({
        url:templates+"/xhtml.html"
    },(err,res,html) => {
        fs.writeFile(src.root+"/template.html", html, 'utf8', (err)=>{
            if(err) gutil.log(err);
        });
        gutil.log("Make HTML Template End.");
    });
    // 리소스 다운로드 시작.
    run("download");
});

// TASK : 그외
gulp.task("mkdir",() => {
    fs.mkdir(src.root,()=> {
        mkdirp(resources.css);
        mkdirp(resources.less+"/_lib");
        mkdirp(resources.less+"/sample");
        mkdirp(resources.scss+"/_lib");
        mkdirp(resources.scss+"/sample");
        mkdirp(resources.app);
    });
    gutil.log("Create Resources Folder.");
});

let downloadPromise = []; // 리소스 다운로드에 사용되는 Promise Array
gulp.task("download",() => {
    gutil.log("리소스 다운로드 시작.");
    downloadPromise.push( download("zen.json","./") );
    downloadPromise.push( download("reset.css",resources.css) );
    downloadPromise.push( download("val.less",resources.less+"/_lib") );
    downloadPromise.push( download("mixin.less",resources.less+"/_lib") );
    downloadPromise.push( download("sample-less.less",resources.less+"/sample") );
    downloadPromise.push( download("val.scss",resources.scss+"/_lib") );
    downloadPromise.push( download("mixin.scss",resources.scss+"/_lib") );
    downloadPromise.push( download("sample-scss.scss",resources.scss+"/sample") );
    Promise.all(downloadPromise).then((values) => {
        gutil.log("리소스 다운로드 완료.");

        gulp.src("./node_modules/jquery/dist/jquery.js").pipe(gulp.dest(src.lib)); // jquery 최신 복사
        gulp.src("./node_modules/jquery-migrate/dist/jquery-migrate.js").pipe(gulp.dest(src.lib)); // jquery 최신 호환성 migrate 복사
        gutil.log("JS라이브러리(jquery) 복사 완료.");

        setTimeout(() => {
            run("less:build","scss:build","css:build",() => {
                gutil.log("LESS , SCSS , CSS 컴파일 완료.");
            });
        },1000);
    });
});

/*! Util Function */
function download(file,path){ // 리소스 다운로드
    return new Promise( (resolve, reject) => {
        request({
            url:templates+"/"+file
        },(err,res,data) => {
            fs.writeFile(path+"/"+file , data, 'utf8', (err)=>{
                if(err) gutil.log(err);
                gutil.log( file+" 다운로드 완료.");
                resolve(data);
            });
        });

    });
};
function pipeLineLess(gulpFile , dest){
    return gulpFile.pipe(less())
        .pipe(csscomb("./zen.json"))
        .pipe(csso())
        .pipe(replace(/}/g,'}\n'))
        .pipe(replace('/*!','\n/*!'))
        .pipe(replace('{.','{\n\t.'))
        .pipe(replace('@charset "UTF-8";',''))
        .pipe(insert.prepend('@charset "UTF-8";\n'))
        .pipe(gulp.dest(dest));
};
function pipeLineScss(gulpFile , dest){
    return gulpFile.pipe(sass())
        .pipe(csscomb("./zen.json"))
        .pipe(csso())
        .pipe(replace(/}/g,'}\n'))
        .pipe(replace('/*!','\n/*!'))
        .pipe(replace('{.','{\n\t.'))
        .pipe(replace('@charset "UTF-8";',''))
        .pipe(insert.prepend('@charset "UTF-8";\n'))
        .pipe(gulp.dest(dest));
};

let concatStream = false; // CSS파일 병합시, 중복실행에 따른 Stream 오류 방지용 스위치
function pipeLineConcatCSS(gulpFiles,folderName , base , dest){
    if(!concatStream){
        concatStream = true;
        return gulpFiles.pipe(concat(folderName))
            .pipe(replace('@charset "UTF-8";',''))
            .pipe(insert.prepend('@charset "UTF-8";\n'))
            .pipe(replace('/*!','\n/*!'))
            .pipe(replace(/[\n]{3}/g,"\n"))
            .pipe(gulp.dest(base))
            .pipe(gulp.dest(dest)).on("end",function(){
                concatStream = false;
            });
    }else{
        return false;
    };
};
function resourcesSrc(base,ext){
    return [base+"/**/*."+ext,"!"+base+"/_lib/*."+ext];
};
function getFolder(file){
    return path.parse( path.parse(file.path).dir ).base;
};
function getTimeStamp() {
    const now = new Date();
    return "["+(now.getHours() + ':' +((now.getMinutes() < 10)? ("0" + now.getMinutes()): (now.getMinutes())) + ':' +((now.getSeconds() < 10)? ("0" + now.getSeconds()): (now.getSeconds())))+"]";
};