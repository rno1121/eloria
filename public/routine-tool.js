/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/js/routine-tool.js":
/*!***************************************!*\
  !*** ./src/assets/js/routine-tool.js ***!
  \***************************************/
/***/ (() => {

eval("{/*\n  Eloria — Skin Routine Tool\n  src/assets/js/routine-tool.js\n  أداة تفاعلية تبني روتين عناية مخصّص حسب نوع البشرة والمشكلة والوقت.\n*/\n(function () {\n  'use strict';\n\n  function initRoutineTool(root) {\n    if (!root || root.__routineReady) return;\n    root.__routineReady = true;\n    var steps = Array.prototype.slice.call(root.querySelectorAll('.routine-step'));\n    var result = root.querySelector('[data-routine-result]');\n    var progress = root.querySelectorAll('[data-routine-progress] span');\n    var backBtn = root.querySelector('[data-routine-back]');\n    var restartBtn = root.querySelector('[data-routine-restart]');\n    var i18nEl = root.querySelector('[data-routine-i18n]');\n    var i18n = {};\n    try {\n      i18n = JSON.parse(i18nEl.textContent);\n    } catch (e) {\n      i18n = {};\n    }\n    var answers = {};\n    var current = 0;\n    function showStep(index) {\n      current = index;\n      steps.forEach(function (s, i) {\n        s.hidden = i !== index;\n      });\n      result.hidden = true;\n      backBtn.hidden = index === 0;\n      progress.forEach(function (p, i) {\n        p.classList.toggle('active', i <= index);\n      });\n      syncSelected();\n    }\n    function syncSelected() {\n      var step = steps[current];\n      if (!step) return;\n      var key = step.querySelector('[data-key]');\n      if (!key) return;\n      var k = key.getAttribute('data-key');\n      step.querySelectorAll('.routine-opt').forEach(function (b) {\n        b.classList.toggle('is-selected', answers[k] === b.getAttribute('data-value'));\n      });\n    }\n    function buildPlan() {\n      var p = i18n.plan || {};\n      var plan = [p.cleanse, p.mix, p.apply];\n      if (answers.concern === 'knees') plan.push(p.knees);\n      if (answers.time === 'am' || answers.time === 'both') plan.push(p.spf);\n      if (answers.time === 'pm' || answers.time === 'both') plan.push(p.night);\n\n      // عدد القطرات حسب حساسية البشرة\n      var drops = (i18n.drops || {})[\"default\"];\n      if (answers.skin === 'sensitive') drops = (i18n.drops || {}).sensitive;else if (answers.concern === 'spots' || answers.concern === 'knees') drops = (i18n.drops || {}).strong;\n      var planEl = root.querySelector('[data-result-plan]');\n      planEl.innerHTML = '';\n      plan.filter(Boolean).forEach(function (text) {\n        var li = document.createElement('li');\n        li.textContent = text;\n        planEl.appendChild(li);\n      });\n      root.querySelector('[data-result-title]').textContent = i18n.title || '';\n      root.querySelector('[data-result-drops]').textContent = drops || '';\n    }\n    function showResult() {\n      steps.forEach(function (s) {\n        s.hidden = true;\n      });\n      buildPlan();\n      result.hidden = false;\n      backBtn.hidden = false;\n      progress.forEach(function (p) {\n        p.classList.add('active');\n      });\n    }\n\n    // اختيار إجابة\n    root.querySelectorAll('.routine-opt').forEach(function (btn) {\n      btn.addEventListener('click', function () {\n        var key = btn.getAttribute('data-key');\n        answers[key] = btn.getAttribute('data-value');\n        syncSelected();\n        // تقدّم تلقائي بعد لحظة قصيرة\n        window.setTimeout(function () {\n          if (current < steps.length - 1) showStep(current + 1);else showResult();\n        }, 260);\n      });\n    });\n    backBtn.addEventListener('click', function () {\n      if (!result.hidden) {\n        showStep(steps.length - 1);\n        return;\n      }\n      if (current > 0) showStep(current - 1);\n    });\n    if (restartBtn) {\n      restartBtn.addEventListener('click', function () {\n        answers = {};\n        root.querySelectorAll('.routine-opt').forEach(function (b) {\n          b.classList.remove('is-selected');\n        });\n        showStep(0);\n      });\n    }\n    showStep(0);\n  }\n  function boot() {\n    document.querySelectorAll('[data-routine-tool]').forEach(initRoutineTool);\n  }\n  if (document.readyState === 'loading') {\n    document.addEventListener('DOMContentLoaded', boot);\n  } else {\n    boot();\n  }\n})();\n\n//# sourceURL=webpack://theme-raed/./src/assets/js/routine-tool.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/assets/js/routine-tool.js"]();
/******/ 	
/******/ })()
;