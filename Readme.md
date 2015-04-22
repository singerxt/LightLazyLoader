# Light Lazy Loader

Very simple lazy loading for images - just include file with script ! ;-)

[DEMO](http://singerxt.github.io/LightLazyLoader/)

## Usage

```
<span data-src={{image-url}} class="your-class lazy-image"></span>
```
When span is in "view" script will replace ```span``` to

```
<img src={{image-url}} class="your-class lazy-image-processed"/>
```
