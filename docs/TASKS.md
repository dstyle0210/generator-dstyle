## generator API docs

Jump to:
  [generator](#gulpsrcglobs-options) |
  [less](#gulpdestpath-options) |
  [scss](#gulptaskname--deps--fn) |
  [css](#gulpwatchglob--opts-tasks-or-gulpwatchglob--opts-cb)

### generator
기본폴더구조를 생성하고, 샘플링된 소스를 다운로드 및 gulp에 필요한 파일을 다운받습니다.

```
> gulp generator
```
#### generator:5
HTML5을 기반으로 하여 template.html 파일을 생성합니다. 기초구조는 [HTML5 템플릿](https://github.com/dstyle0210/generator-dstyle/blob/gh-pages/templates/html5.html) 을 상속받습니다.

#### generator:xt
XHTML을 기반으로 하여 template.html 파일을 생성합니다. 기초구조는 [XHTML 템플릿](https://github.com/dstyle0210/generator-dstyle/blob/gh-pages/templates/xhtml.html) 을 상속받습니다.


### less
less 파일들을 컴파일 하고, 감지하기 시작합니다.

### scss
scss 파일들을 컴파일 하고, 감지하기 시작합니다.

### css
각 폴더내의 css 파일들을 폴더이름으로 병합 하고, 변화를 감지합니다.