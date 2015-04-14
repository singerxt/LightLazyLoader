# Light Lazy Loader

Very simple lazy loading for images.

## Usage

```
<span data-src={{image-url}} class="your-class lazy-image"></span>
```
When span is in "view" script will replace ```span``` to

```
<img src={{image-url}} class="your-class lazy-image-processed"/>
```
