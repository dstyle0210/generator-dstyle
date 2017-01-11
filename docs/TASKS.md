## generator TASK API docs

빠른이동:
  [generator](#generator) |
  [less](#less) |
  [scss](#scss) |
  [css](#css)

### default
generator가 가진 Task 중 "[less](#less) , [scss](#scss) , [css](#css)" 을 실행됩니다.
 
```
> gulp
```

### generator
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


### less
less 파일들을 컴파일 하고, 감지하기 시작합니다.

### scss
scss 파일들을 컴파일 하고, 감지하기 시작합니다.

### css
각 폴더내의 css 파일들을 폴더이름으로 병합 하고, 변화를 감지합니다.