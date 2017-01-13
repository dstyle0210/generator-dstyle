## generator TASK API docs

빠른이동:
  [Generator](#generator) |
  [LESS](#less) |
  [SASS(scss)](#scss) |
  [CSS](#css)

* 리소스폴더 : generator로 생성시 "src/resources"을 지칭합니다.

### default
generator가 가진 Task 중 "[less](#less) , [scss](#scss) , [css](#css)" 을 실행됩니다.
 
```
> gulp
```

### Generator
```
> gulp generator
```
기본폴더구조를 생성하고, 샘플링된 소스를 다운로드 및 gulp에 필요한 파일을 다운받습니다. , generator:5 와 동일한 기능입니다.

```
> gulp generator:5
```
HTML5을 기반으로 하여 template.html 파일을 생성합니다. 기초 템플릿은 [HTML5 템플릿](https://github.com/dstyle0210/generator-dstyle/blob/gh-pages/templates/html5.html) 을 상속받습니다.

```
> gulp generator:xt
```
XHTML을 기반으로 하여 template.html 파일을 생성합니다. 기초 템플릿은 [XHTML 템플릿](https://github.com/dstyle0210/generator-dstyle/blob/gh-pages/templates/xhtml.html) 을 상속받습니다.


### LESS
```
> gulp less
```
리소스 폴더 에서 less 폴더 내 less 파일들을 컴파일 하고(less:build), 감지하기(less:watch) 시작합니다.

```
> gulp less:watch
```
리소스 폴더 내의 less 파일의 변화를 추적하여 컴파일 합니다.

```
> gulp less:build
```
리소스 폴더 내의 모든 less 파일을 컴파일 합니다.



### SASS(scss)
```
> gulp scss
```
리소스 폴더 에서 scss 폴더 내 scss 파일들을 컴파일 하고(scss:build), 감지하기(scss:watch) 시작합니다.

```
> gulp scss:watch
```
리소스 폴더 내의 scss 파일의 변화를 추적하여 컴파일 합니다.

```
> gulp scss:build
```
리소스 폴더 내의 모든 scss 파일을 컴파일 합니다.



### CSS
```
> gulp css
```
리소스 폴더 의 css 폴더 안의 각 폴더 내 css 파일들을 폴더이름으로 병합(css:concat) 하고, 변화(css:watch)를 감지합니다.

```
> gulp css:watch
```
리소스 폴더의 css 파일의 변화를 추적하여 변경된 폴더 내의 css을 병합합니다.

```
> gulp css:concat
```
리소스 폴더의 css 폴더 안의 각 폴더 내 css들을 병합하여 폴더명.css 파일로 저장합니다.
```
> gulp css:dist
```
리소스 폴더의 css 들을 병합하고(css:concat) dist 폴더로 복사합니다.
```
> gulp css:dist:min
```
"css:dist"와 동일하지만, minify해서 저장합니다.