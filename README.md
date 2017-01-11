## Generator Dstyle (generator-dstyle)

프로젝트를 진행할때 기본으로 셋팅하는 폴더을 생성하고, 업무진행에 필요한 LESS , SCSS(SASS) , javascript (ES2015) 을 기본 컴파일 합니다.
Gulp 베이스로 실행됩니다.

### 필요프로그램
- nodejs

### Install (npm)
```sh
> npm install
> gulp generator
```

### Task (Gulp)

[TASKS 참조](https://github.com/dstyle0210/generator-dstyle/blob/gh-pages/docs/TASKS.md)

Task Name | Task Deps | Comment
------------ | -------------| -------------
default | less , scss , css | 생성된 구조에서 CSS 및 Javascript의 변화를 추적하여 컴파일합니다.
generator | generator:5 | 기본폴더구조를 생성하고, 샘플링된 소스를 다운로드 및 gulp에 필요한 파일을 다운받습니다. , generator:5 와 동일합니다.
generator:5 | mkdirs | HTML5 을 기반으로 기본폴더 구조를 생성합니다.
generator:xt | mkdirs | XHTML 1.0 을 기반으로 기본폴더 구조를 생성합니다.
less | less:build , less:watch | less 파일들을 컴파일 하고, 감지하기 시작합니다.
less:watch | - | less 파일의 변화를 추적하여 컴파일 합니다.
less:build | - | less 파일들을 컴파일합니다.
scss | scss:build , scss:watch | scss 파일들을 컴파일 하고, 감지하기 시작합니다.
scss:watch | - | scss 파일의 변화를 추적하여 컴파일 합니다.
scss:build | - | scss 파일들을 컴파일 합니다.
css | css:build , css:watch | 각 폴더내의 css 파일들을 폴더이름으로 병합 하고, 변화를 감지합니다.
css:watch | - | css 파일의 변화를 추적하여 변경된 폴더내의 css을 병합합니다.
css:concat | - | css 파일들을 각 폴더 이름으로 병합 합니다.
css:dist | css:build | src내의 css 파일들을 각 폴더 이름으로 병합후에, dist폴더로 복사합니다.

### 참고사항(Base Site)
본 제너레이터는 dstyle이 만든 몇가지 사이트에서 기반소스를 다운받도록 설계되어 있습니다.

- [gulp-setting](http://dstyle0210.github.io/gulp-setting/) : less , scss , css 컴파일 Task 
- [jquery.myExtend](http://dstyle0210.github.io/jquery-myExtend/) : jquery 메소드 addOn 파일.
- [resetcss-dstyle](http://dstyle0210.github.io/resetcss-dstyle/) : reset.css 파일 다운로드

### 릴리즈노트
[릴리즈노트](https://github.com/dstyle0210/generator-dstyle/blob/gh-pages/docs/RELEASE.md)

### Support or Contact
본 파일이나. 오류사항이 있다면, [저에게](mailto:dstyle0210@gmail.com) 메일 보내주세요.
