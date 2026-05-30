/*
  Eloria — App scripts
  src/assets/js/app.js
  تفاعلات عامة: قائمة الجوال.
*/
(function () {
  'use strict';
  function boot() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var nav = document.querySelector('[data-mobile-nav]');
    var overlay = document.querySelector('[data-nav-overlay]');
    function close() {
      nav.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-open');
      if (toggle) { toggle.classList.remove('is-active'); toggle.setAttribute('aria-expanded', 'false'); }
      document.body.style.overflow = '';
    }
    function open() {
      nav.classList.add('is-open');
      if (overlay) overlay.classList.add('is-open');
      if (toggle) { toggle.classList.add('is-active'); toggle.setAttribute('aria-expanded', 'true'); }
      document.body.style.overflow = 'hidden';
    }
    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        nav.classList.contains('is-open') ? close() : open();
      });
      if (overlay) overlay.addEventListener('click', close);
      nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
    }

    // أكورديون المكوّنات (جوال)
    document.querySelectorAll('[data-ing-toggle]').forEach(function (b) {
      b.addEventListener('click', function () {
        var sec = b.closest('.ingredients');
        if (!sec) return;
        var open = sec.classList.toggle('is-open');
        b.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });

    // نقاط الكاروسيل — تتحدّث مع سحب المستخدم (بدون حركة تلقائية)
    function carouselDots(track, dotsWrap) {
      if (!track || !dotsWrap) return;
      var cards = track.children, n = cards.length;
      if (n < 2) return;
      var rtl = getComputedStyle(track).direction === 'rtl';
      function curStep() { return Math.abs(cards[1].offsetLeft - cards[0].offsetLeft) || cards[0].offsetWidth; }
      var dots = [];
      for (var i = 0; i < n; i++) (function (i) {
        var d = document.createElement('button');
        d.setAttribute('aria-label', 'item ' + (i + 1));
        if (i === 0) d.className = 'is-active';
        d.addEventListener('click', function () { track.scrollTo({ left: (rtl ? -1 : 1) * i * curStep(), behavior: 'smooth' }); });
        dotsWrap.appendChild(d); dots.push(d);
      })(i);
      track.addEventListener('scroll', function () {
        var i = Math.round(Math.abs(track.scrollLeft) / curStep());
        dots.forEach(function (d, k) { d.classList.toggle('is-active', k === i); });
      });
    }
    document.querySelectorAll('[data-benefits]').forEach(function (root) {
      carouselDots(root.querySelector('[data-benefits-track]'), root.parentElement.querySelector('[data-benefits-dots]'));
    });
    carouselDots(document.querySelector('.steps'), document.querySelector('[data-steps-dots]'));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
