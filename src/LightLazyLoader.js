(function() {
  /**
   * Light Lazy Images constructor
   * @constructor
   */

  function LightLazyImages() {
    this.lazyElems = document.querySelectorAll('span.lazy-image');
    this.checkElements();
    if(typeof window.MutationObserver !== 'function') {
      this.oldBrowsersWorkAround();
    } else {
      this.bindEvents();
    }
  }

  /**
   * Check if any lazy element is
   * in view of browser window
   * @returns {undefined}
   *
   */

  LightLazyImages.prototype.checkElements = function () {
    for (var i = 0, len = this.lazyElems.length; i < len; i++) {
      if(this.isInView(this.lazyElems[i])) {
        this.createImage(this.lazyElems[i]);
      }
    }
  };


  /**
   * Replace lazy element to image.
   * @param el
   * @returns {undefined}
   */

  LightLazyImages.prototype.createImage = function (el) {
    var img = document.createElement('img'),
        cssClass = el.className.replace('lazy-image', ' lazy-image-processed ');
    el.className += ' lazy-image-processing';
    img.className += cssClass;
    img.setAttribute('src', el.dataset.src);
    img.onload = function () {
      try {
        el.parentNode.replaceChild(img,el);
        img.className = img.className.replace('lazy-image-processing', '');
      } catch (err) {
        //
      }
    };
  };

  /**
   * Only modern browsers support Mutation Observer.
   * For old browsers we using setInterval workaround.
   */

  LightLazyImages.prototype.oldBrowsersWorkAround = function () {
    var that = this;
    setInterval(function () {
      that.lazyElems = document.querySelectorAll('span.lazy-image:not(.lazy-image-processing)');
      that.checkElements();
    },500);
  };

  /**
   * On scroll and On resize LightLazyImages
   * check if any new lazy element is visible
   * @returns {undefined}
   */

  LightLazyImages.prototype.bindEvents = function () {
    var that = this,
      obsConfig = { attributes: false, childList: true, characterData: false, subtree: true },
      obs = new MutationObserver(function () {
        that.lazyElems = document.querySelectorAll('span.lazy-image:not(.lazy-image-processing)');
      }),
      DOMelements = document.querySelectorAll('*');
    window.onscroll =  this.checkElements.bind(this);
    window.onresize = this.checkElements.bind(this);

    for(var i = 0, len = DOMelements.length; i < len; i++) {
      DOMelements[i].addEventListener('transitionend', this.checkElements.bind(this));
      DOMelements[i].addEventListener('transitionstart', this.checkElements.bind(this));
      DOMelements[i].addEventListener('animationstart', this.checkElements.bind(this));
      DOMelements[i].addEventListener('animationend', this.checkElements.bind(this));
      DOMelements[i].addEventListener('scroll', this.checkElements.bind(this));
    }

    /*
     * Update array when DOM is changed for example
     * after ajax call
     */

    obs.observe(document.body, obsConfig);
  };

  /**
   * Check if lazy elelemnt is in view
   * @param el
   * @returns {boolean}
   */

  LightLazyImages.prototype.isInView = function (el) {
    if(el === undefined) return false;
    var coords = el.getBoundingClientRect(),
      inViewHeight = ((coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || document.documentElement.clientHeight)),
      inViewWidth  = (coords.left <= (window.innerWidth || document.documentElement.clientWidth));

    return inViewHeight && inViewWidth;
  };

  window.onload = function () {
    var LLIistance = new LightLazyImages();
    window.LLIistance = LLIistance;
  };
})();
