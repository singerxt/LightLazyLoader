/**
 * Light Lazy Images constructor
 * @constructor
 */

function LightLazyImages() {
  this.lazyElems = Array.prototype.slice.call(document.querySelectorAll('span.lazy-image'));
  this.prepareData();
  this.bindEvents();
}

/**
 * Check if any lazy element is
 * in view of browser window
 * @returns {undefined}
 */

LightLazyImages.prototype.checkElements = function () {
  var isVisible;
  for (var i = 0, len = this.lazyElems.length; i < len; i++) {
    isVisible = this.isInView(this.lazyElems[i]);
    if(isVisible) {
      this.createImage(this.lazyElems[i]);
    } else {
      break;
    }
    //remove don't needed elems from array
    this.lazyElems = this.lazyElems.filter(this.convertedFilter);
  }
};

/**
 * Filter - helps remove processed
 * lazy elements from array
 * @param el
 * @returns {boolean}
 */

LightLazyImages.prototype.convertedFilter = function (el) {
  return !el.converted;
};

/**
 * Sort all elements by "top" position
 * so we can break loop in checkElements()
 * @returns {undefined}
 */

LightLazyImages.prototype.prepareData = function () {
  var sortByPositionTop = function (a,b) {
    var aCoords = a.getBoundingClientRect(),
      bCoords = b.getBoundingClientRect();
    if(aCoords.top < bCoords.top) {return -1;}
    if(aCoords.top > bCoords.top) {return 1}
    return 0;
  };

  this.lazyElems = this.lazyElems.sort(sortByPositionTop);
  this.checkElements();
};

/**
 * Replace lazy element to image.
 * @param el
 * @returns {undefined}
 */

LightLazyImages.prototype.createImage = function (el) {
  var img = document.createElement('img'),
    cssClass = el.className.replace('lazy-image', ' lazy-image-processed ');
  img.className += cssClass;
  img.setAttribute('src', el.dataset.src);
  img.onload = function () {
    try {
      el.parentNode.replaceChild(img,el);
    } catch (err) {
      //To do
    }
  };
  el.converted = true;
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
      that.lazyElems = Array.prototype.slice.call(document.querySelectorAll('span.lazy-image'));
      that.prepareData();
    });
  window.onscroll =  this.checkElements.bind(this);
  window.onresize = this.checkElements.bind(this);
  window.onload = this.checkElements.bind(this);

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

new LightLazyImages();
