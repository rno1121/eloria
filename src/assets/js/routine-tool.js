/*
  Eloria — Skin Routine Tool
  src/assets/js/routine-tool.js
  أداة تفاعلية تبني روتين عناية مخصّص حسب نوع البشرة والمشكلة والوقت.
*/
(function () {
  'use strict';

  function initRoutineTool(root) {
    if (!root || root.__routineReady) return;
    root.__routineReady = true;

    var steps = Array.prototype.slice.call(root.querySelectorAll('.routine-step'));
    var result = root.querySelector('[data-routine-result]');
    var progress = root.querySelectorAll('[data-routine-progress] span');
    var backBtn = root.querySelector('[data-routine-back]');
    var restartBtn = root.querySelector('[data-routine-restart]');

    var i18nEl = root.querySelector('[data-routine-i18n]');
    var i18n = {};
    try { i18n = JSON.parse(i18nEl.textContent); } catch (e) { i18n = {}; }

    var answers = {};
    var current = 0;

    function showStep(index) {
      current = index;
      steps.forEach(function (s, i) { s.hidden = i !== index; });
      result.hidden = true;
      backBtn.hidden = index === 0;
      progress.forEach(function (p, i) { p.classList.toggle('active', i <= index); });
      syncSelected();
    }

    function syncSelected() {
      var step = steps[current];
      if (!step) return;
      var key = step.querySelector('[data-key]');
      if (!key) return;
      var k = key.getAttribute('data-key');
      step.querySelectorAll('.routine-opt').forEach(function (b) {
        b.classList.toggle('is-selected', answers[k] === b.getAttribute('data-value'));
      });
    }

    function buildPlan() {
      var p = i18n.plan || {};
      var plan = [p.cleanse, p.mix, p.apply];

      if (answers.concern === 'knees') plan.push(p.knees);
      if (answers.time === 'am' || answers.time === 'both') plan.push(p.spf);
      if (answers.time === 'pm' || answers.time === 'both') plan.push(p.night);

      // عدد القطرات حسب حساسية البشرة
      var drops = (i18n.drops || {}).default;
      if (answers.skin === 'sensitive') drops = (i18n.drops || {}).sensitive;
      else if (answers.concern === 'spots' || answers.concern === 'knees') drops = (i18n.drops || {}).strong;

      var planEl = root.querySelector('[data-result-plan]');
      planEl.innerHTML = '';
      plan.filter(Boolean).forEach(function (text) {
        var li = document.createElement('li');
        li.textContent = text;
        planEl.appendChild(li);
      });

      root.querySelector('[data-result-title]').textContent = i18n.title || '';
      root.querySelector('[data-result-drops]').textContent = drops || '';
    }

    function showResult() {
      steps.forEach(function (s) { s.hidden = true; });
      buildPlan();
      result.hidden = false;
      backBtn.hidden = false;
      progress.forEach(function (p) { p.classList.add('active'); });
    }

    // اختيار إجابة
    root.querySelectorAll('.routine-opt').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.getAttribute('data-key');
        answers[key] = btn.getAttribute('data-value');
        syncSelected();
        // تقدّم تلقائي بعد لحظة قصيرة
        window.setTimeout(function () {
          if (current < steps.length - 1) showStep(current + 1);
          else showResult();
        }, 260);
      });
    });

    backBtn.addEventListener('click', function () {
      if (!result.hidden) { showStep(steps.length - 1); return; }
      if (current > 0) showStep(current - 1);
    });

    if (restartBtn) {
      restartBtn.addEventListener('click', function () {
        answers = {};
        root.querySelectorAll('.routine-opt').forEach(function (b) { b.classList.remove('is-selected'); });
        showStep(0);
      });
    }

    showStep(0);
  }

  function boot() {
    document.querySelectorAll('[data-routine-tool]').forEach(initRoutineTool);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
