/*
  Eloria — Product page gallery
  src/assets/js/product.js
  معرض قابل للسحب (swipe) + نقاط مؤشّر + مصغّرات تنقل للصورة.
*/
(function () {
  'use strict';
  function init(root) {
    var track = root.querySelector('[data-gallery-track]');
    if (!track) return;
    var slides = track.children;
    var n = slides.length;
    if (n <= 1) return;
    var thumbs = Array.prototype.slice.call(root.querySelectorAll('.gallery-thumb'));
    var dotsWrap = root.querySelector('[data-gallery-dots]');
    var rtl = getComputedStyle(track).direction === 'rtl';
    var dots = [];

    if (dotsWrap) {
      for (var i = 0; i < n; i++) {
        (function (i) {
          var d = document.createElement('button');
          d.setAttribute('aria-label', 'image ' + (i + 1));
          if (i === 0) d.className = 'is-active';
          d.addEventListener('click', function () { go(i); });
          dotsWrap.appendChild(d);
          dots.push(d);
        })(i);
      }
    }

    function go(i) {
      track.scrollTo({ left: (rtl ? -1 : 1) * i * track.clientWidth, behavior: 'smooth' });
    }
    function setActive(i) {
      thumbs.forEach(function (t, k) { t.classList.toggle('is-active', k === i); });
      dots.forEach(function (d, k) { d.classList.toggle('is-active', k === i); });
    }
    thumbs.forEach(function (t) {
      t.addEventListener('click', function () { go(+t.getAttribute('data-index')); });
    });
    var raf;
    track.addEventListener('scroll', function () {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        var idx = Math.round(Math.abs(track.scrollLeft) / track.clientWidth);
        if (idx < 0) idx = 0; if (idx > n - 1) idx = n - 1;
        setActive(idx);
      });
    });
  }
  function boot() {
    document.querySelectorAll('[data-gallery]').forEach(init);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
