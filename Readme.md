# Light Lazy Loader

LightLazyLoader is a lightweight lazy loading image script (less than 1.7KB).
It lets you lazy load and multi-serve your images so you can save bandwidth and server requests.
[DEMO](http://singerxt.github.io/LightLazyLoader/)


## Why this one is cool ?

1. No dependencies - *You just need to include script with LLI nothing more.*
2. Detecting CSS3 transition/transforms and Attributes change - *Your old Lazy Image Plugin won't work with your great new slider or you need write extra callbacks to get it work? No worries LLI will handle that - no callbacks.*
3. Dynamic elements support - *You adding new images via AJAX ? No worries. LLI looking for mutations in your DOM.*
4. CSS3 icon - *No extra requests for gif with placeholder image.*
5. Is simple - *look to source ;-)*
6. In case when you need load images from custom event. Run ```window.LLIistance.checkElements();```


## How to use it ?

What you need to do:

1. Include LightLazyLoader.js in your index document.
2. Replace all *<img>* tags to *<span class="lazy-load"></span>*.
Example

```html
<img src="http://your.url.to/image.jpg" class="your class" />

replace to

<span data-src="http://your.url.to/image.jpg" class="your class lazy-load"></span>
```

3. If you want you can write fancy styles.
4. Refresh your website and enjoy your lazy images.

## License

MIT
