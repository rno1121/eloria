/**
 * Eloria — Routine Tool (أداة جدول العناية)
 * 3-step quiz → personalized skincare routine
 */

(function () {
  'use strict';

  // ── Routine Data ─────────────────────────────────────────────────
  // Indexed by [skin_type][concern][time]
  const ROUTINES = {
    oily: {
      dark_spots: {
        morning: [
          { time: 'صباحاً', name: 'غسول لطيف', desc: 'اغسلي وجهك بغسول لطيف خالٍ من الزيوت' },
          { time: 'صباحاً', name: 'Eloria Serum', desc: 'ضعي 3-4 قطرات على البشرة الرطبة، ركزي على مناطق التصبغ' },
          { time: 'صباحاً', name: 'مرطب خفيف', desc: 'مرطب جيل أو لوشن خفيف مناسب للبشرة الدهنية' },
          { time: 'صباحاً', name: 'واقي الشمس SPF 50+', desc: 'ضروري لحماية نتائج النياسيناميد وفيتامين C' },
        ],
        night: [
          { time: 'مساءً', name: 'غسول مزدوج', desc: 'زيت لإزالة المكياج ثم غسول مائي' },
          { time: 'مساءً', name: 'تونر مُوازن', desc: 'تونر بدون كحول لإعادة توازن البشرة الدهنية' },
          { time: 'مساءً', name: 'Eloria Serum', desc: '5-6 قطرات — الليل هو الوقت المثالي لعمل النياسيناميد' },
          { time: 'مساءً', name: 'مرطب ليلي', desc: 'طبقة رقيقة من كريم ليلي بدون زيوت ثقيلة' },
        ],
        both: [
          { time: 'صباحاً', name: 'غسول + Eloria Serum', desc: 'قطرتان مع مرطب خفيف وواقي شمس' },
          { time: 'مساءً', name: 'تنظيف + Eloria Serum', desc: '4 قطرات على البشرة النظيفة قبل المرطب الليلي' },
          { time: 'أسبوعياً', name: 'تقشير لطيف', desc: 'مرة إلى مرتين أسبوعياً لتعزيز نفاذية السيروم' },
        ],
        flexible: [
          { time: 'أي وقت', name: 'Eloria Serum', desc: '4 قطرات على البشرة النظيفة يومياً' },
          { time: 'نصيحة', name: 'الثبات هو السر', desc: 'استخدمي السيروم كل يوم للحصول على النتائج خلال 14 يوماً' },
        ],
      },
      dullness: {
        morning: [
          { time: 'صباحاً', name: 'غسول منعش', desc: 'غسول بالسيليلك أسيد لفتح المسام' },
          { time: 'صباحاً', name: 'Eloria Serum', desc: 'فيتامين C يعمل أفضل صباحاً لمحاربة التقتيم' },
          { time: 'صباحاً', name: 'واقي الشمس', desc: 'SPF 50+ لا تتنازلي عنه!' },
        ],
        night: [
          { time: 'مساءً', name: 'غسول + Eloria Serum', desc: '5 قطرات مساءً للإشراق الفائق' },
          { time: 'مساءً', name: 'ماسك الطين', desc: 'مرة أسبوعياً للتعمق في التنظيف' },
        ],
        both: [
          { time: 'صباحاً + مساءً', name: 'Eloria Serum', desc: 'مرتين يومياً للبشرة الدهنية الباهتة' },
          { time: 'أسبوعياً', name: 'تقشير + ماسك', desc: 'للحصول على البريق المثالي' },
        ],
        flexible: [
          { time: 'يومياً', name: 'Eloria Serum', desc: '3-4 قطرات كل يوم للإشراق التدريجي' },
        ],
      },
      dryness: {
        morning: [
          { time: 'صباحاً', name: 'Eloria Serum', desc: 'الهيالورونيك أسيد والألوفيرا يمنحان الترطيب' },
          { time: 'صباحاً', name: 'مرطب خفيف', desc: 'حتى البشرة الدهنية تحتاج ترطيباً' },
        ],
        night: [
          { time: 'مساءً', name: 'Eloria Serum', desc: 'جرعة مضاعفة من الهيالورونيك مساءً' },
          { time: 'مساءً', name: 'زيت أرغان', desc: 'قطرة واحدة فقط فوق السيروم' },
        ],
        both: [
          { time: 'صباحاً + مساءً', name: 'Eloria Serum', desc: 'الترطيب المستمر هو الحل الأمثل' },
        ],
        flexible: [
          { time: 'يومياً', name: 'Eloria Serum', desc: 'ركزي على مناطق الجفاف عند الوضع' },
        ],
      },
      uneven: {
        morning: [
          { time: 'صباحاً', name: 'Eloria Serum', desc: 'النياسيناميد يوحد لون البشرة الدهنية بفعالية عالية' },
          { time: 'صباحاً', name: 'واقي الشمس SPF 50+', desc: 'لمنع تفاقم اللون غير المتساوي' },
        ],
        night: [
          { time: 'مساءً', name: 'تونر AHA/BHA', desc: 'مرة أسبوعياً لتسريع النتائج' },
          { time: 'مساءً', name: 'Eloria Serum', desc: '5 قطرات على البشرة النظيفة' },
        ],
        both: [
          { time: 'صباحاً + مساءً', name: 'Eloria Serum', desc: 'الاستخدام المزدوج يضاعف النتائج' },
        ],
        flexible: [
          { time: 'يومياً', name: 'Eloria Serum', desc: 'دومي بالاتساق، النتائج تأتي في الأسبوع الثاني' },
        ],
      },
    },

    dry: {
      dark_spots: {
        morning: [
          { time: 'صباحاً', name: 'غسول مرطب كريمي', desc: 'لا تستخدمي غسول رغوي كثيف' },
          { time: 'صباحاً', name: 'Eloria Serum', desc: '4-5 قطرات على البشرة الرطبة قليلاً — يزيد الامتصاص' },
          { time: 'صباحاً', name: 'مرطب غني', desc: 'كريم مرطب دسم بالسيراميد' },
          { time: 'صباحاً', name: 'واقي الشمس', desc: 'SPF 50+ ضروري' },
        ],
        night: [
          { time: 'مساءً', name: 'زيت تنظيف', desc: 'أفضل طريقة لتنظيف البشرة الجافة' },
          { time: 'مساءً', name: 'Eloria Serum', desc: '6 قطرات — البشرة الجافة تحتاج كمية أكبر' },
          { time: 'مساءً', name: 'كريم ليلي مكثف', desc: 'اختاري كريماً بالشيا باتر أو السيراميد' },
        ],
        both: [
          { time: 'صباحاً + مساءً', name: 'Eloria Serum', desc: 'للبشرة الجافة، الاستخدام المزدوج هو الأمثل' },
          { time: 'أسبوعياً', name: 'ماسك مرطب', desc: 'ماسك بالهيالورونيك لتعزيز النتائج' },
        ],
        flexible: [
          { time: 'يومياً', name: 'Eloria Serum', desc: 'استخدمي على بشرة رطبة قليلاً لأفضل امتصاص' },
        ],
      },
      dullness: {
        morning: [
          { time: 'صباحاً', name: 'Eloria Serum + مرطب', desc: 'الهيالورونيك + فيتامين C = إشراق فوري' },
          { time: 'صباحاً', name: 'واقي الشمس', desc: 'لا تتخلي عن الحماية' },
        ],
        night: [
          { time: 'مساءً', name: 'Eloria Serum مضاعف', desc: '6 قطرات + كريم ليلي مرطب' },
          { time: 'أسبوعياً', name: 'تقشير إنزيمي', desc: 'أكثر لطفاً من AHA للبشرة الجافة' },
        ],
        both: [
          { time: 'صباحاً + مساءً', name: 'Eloria Serum', desc: 'الاستخدام المزدوج للحصول على البريق الدائم' },
        ],
        flexible: [
          { time: 'يومياً', name: 'Eloria Serum', desc: '5 قطرات يومياً على بشرة رطبة' },
        ],
      },
      dryness: {
        morning: [
          { time: 'صباحاً', name: 'Eloria Serum', desc: 'الهيالورونيك أسيد يمسك الرطوبة لساعات' },
          { time: 'صباحاً', name: 'مرطب بالسيراميد', desc: 'أغلقي الرطوبة بطبقة كريم دسمة' },
        ],
        night: [
          { time: 'مساءً', name: 'Eloria Serum', desc: '6 قطرات + كريم ليلي + زيت نضارة' },
          { time: 'أسبوعياً', name: 'ماسك النوم', desc: 'ماسك مرطب overnight للترطيب العميق' },
        ],
        both: [
          { time: 'صباحاً + مساءً', name: 'Eloria Serum', desc: 'المفتاح: ضعيه على بشرة رطبة دائماً' },
        ],
        flexible: [
          { time: 'يومياً', name: 'Eloria Serum', desc: 'الترطيب المستمر = بشرة ممتلئة ومضيئة' },
        ],
      },
      uneven: {
        morning: [
          { time: 'صباحاً', name: 'Eloria Serum', desc: 'وحدي اللون مع الترطيب في خطوة واحدة' },
          { time: 'صباحاً', name: 'مرطب + SPF', desc: 'لا تهملي الحماية' },
        ],
        night: [
          { time: 'مساءً', name: 'Eloria Serum مكثف', desc: '7 قطرات على المناطق غير المتساوية' },
        ],
        both: [
          { time: 'صباحاً + مساءً', name: 'Eloria Serum', desc: 'الاستمرارية هي المفتاح' },
        ],
        flexible: [
          { time: 'يومياً', name: 'Eloria Serum', desc: 'الثبات خلال 14 يوم يصنع الفرق' },
        ],
      },
    },

    combination: {
      dark_spots: {
        morning: [
          { time: 'صباحاً', name: 'غسول متوازن', desc: 'غسول يناسب البشرة المختلطة' },
          { time: 'صباحاً', name: 'Eloria Serum', desc: '4 قطرات — ركزي على الخدين والرقبة' },
          { time: 'صباحاً', name: 'مرطب متوازن', desc: 'خفيف في منطقة T ودسم على الخدين' },
          { time: 'صباحاً', name: 'واقي الشمس SPF 50+', desc: 'لا تتخلي عنه أبداً' },
        ],
        night: [
          { time: 'مساءً', name: 'Eloria Serum', desc: '5 قطرات على المناطق المتصبغة' },
          { time: 'مساءً', name: 'كريم مناطق', desc: 'كريم خفيف على منطقة T وغني على الخدين' },
        ],
        both: [
          { time: 'صباحاً + مساءً', name: 'Eloria Serum', desc: 'للبشرة المختلطة، المزدوج هو الأمثل' },
        ],
        flexible: [
          { time: 'يومياً', name: 'Eloria Serum', desc: 'يناسب طبيعة بشرتك المختلطة تماماً' },
        ],
      },
      dullness: {
        morning: [
          { time: 'صباحاً', name: 'Eloria Serum', desc: 'فيتامين C + نياسيناميد = إشراق موحد' },
          { time: 'صباحاً', name: 'SPF ضروري', desc: 'واقي شمس خفيف مناسب للبشرة المختلطة' },
        ],
        night: [
          { time: 'مساءً', name: 'Eloria Serum', desc: '5 قطرات قبل النوم' },
        ],
        both: [
          { time: 'صباحاً + مساءً', name: 'Eloria Serum', desc: 'مرتين يومياً للنتائج الأسرع' },
        ],
        flexible: [
          { time: 'يومياً', name: 'Eloria Serum', desc: 'وجهي منتظمة والنتائج ستظهر' },
        ],
      },
      dryness: {
        morning: [
          { time: 'صباحاً', name: 'Eloria Serum', desc: 'الهيالورونيك للمناطق الجافة، الألوفيرا للمناطق الدهنية' },
          { time: 'صباحاً', name: 'مرطب مناطق', desc: 'كريم مرطب على الخدين فقط' },
        ],
        night: [
          { time: 'مساءً', name: 'Eloria Serum', desc: '5 قطرات على البشرة النظيفة' },
        ],
        both: [
          { time: 'صباحاً + مساءً', name: 'Eloria Serum', desc: 'يوازن بشرتك المختلطة' },
        ],
        flexible: [
          { time: 'يومياً', name: 'Eloria Serum', desc: 'مناسب جداً للبشرة المختلطة' },
        ],
      },
      uneven: {
        morning: [
          { time: 'صباحاً', name: 'Eloria Serum', desc: '4 قطرات للتوحيد والإشراق' },
          { time: 'صباحاً', name: 'واقي الشمس', desc: 'الخطوة الأكثر أهمية في روتينك' },
        ],
        night: [
          { time: 'مساءً', name: 'Eloria Serum', desc: '5 قطرات مع مساج دائري' },
        ],
        both: [
          { time: 'صباحاً + مساءً', name: 'Eloria Serum', desc: 'للحصول على بشرة موحدة وناعمة' },
        ],
        flexible: [
          { time: 'يومياً', name: 'Eloria Serum', desc: '14 يوم من الثبات = فرق واضح' },
        ],
      },
    },

    sensitive: {
      dark_spots: {
        morning: [
          { time: 'صباحاً', name: 'غسول هادئ', desc: 'بدون عطور أو كحول' },
          { time: 'صباحاً', name: 'Eloria Serum', desc: 'ابدئي بـ 2 قطرة فقط حتى تتعود بشرتك' },
          { time: 'صباحاً', name: 'مرطب مهدئ', desc: 'بالألوفيرا أو البانتينول' },
          { time: 'صباحاً', name: 'واقي شمس معدني', desc: 'الزنك أوكسايد أفضل للبشرة الحساسة' },
        ],
        night: [
          { time: 'مساءً', name: 'Eloria Serum', desc: '3 قطرات مساءً — ابدئي ببطء' },
          { time: 'مساءً', name: 'كريم بالسيراميد', desc: 'يعزز الحاجز الجلدي ويقلل الحساسية' },
        ],
        both: [
          { time: 'صباحاً', name: 'Eloria Serum خفيف', desc: 'قطرتان + مرطب مهدئ + SPF' },
          { time: 'مساءً', name: 'Eloria Serum', desc: '3 قطرات + كريم مرمم' },
          { time: 'نصيحة', name: 'Patch Test أولاً', desc: 'اختبري السيروم على منطقة صغيرة قبل الاستخدام الكامل' },
        ],
        flexible: [
          { time: 'يومياً', name: 'Eloria Serum بتدرج', desc: 'ابدئي بمرة كل يومين ثم يومياً' },
          { time: 'نصيحة', name: 'الألوفيرا صديقتك', desc: 'ضعي جل ألوفيرا طبيعي فوق السيروم إذا شعرت بأي تهيج' },
        ],
      },
      dullness: {
        morning: [
          { time: 'صباحاً', name: 'Eloria Serum', desc: 'فيتامين C لطيف وفعّال للبشرة الحساسة' },
          { time: 'صباحاً', name: 'SPF معدني', desc: 'الحماية بدون تهيج' },
        ],
        night: [
          { time: 'مساءً', name: 'Eloria Serum', desc: '3 قطرات مع مساج هادئ' },
          { time: 'مساءً', name: 'كريم مهدئ', desc: 'ببراعم الكاميل أو الكاليندولا' },
        ],
        both: [
          { time: 'صباحاً + مساءً', name: 'Eloria Serum', desc: 'ابدئي بتدرج لتجنب التهيج' },
        ],
        flexible: [
          { time: 'يومياً', name: 'Eloria Serum', desc: 'الألوفيرا والهيالورونيك يهدئان ويشرقان في آنٍ واحد' },
        ],
      },
      dryness: {
        morning: [
          { time: 'صباحاً', name: 'Eloria Serum', desc: 'الهيالورونيك وألوفيرا — مثالي للبشرة الحساسة الجافة' },
          { time: 'صباحاً', name: 'كريم سيراميد', desc: 'يرمم الحاجز ويحبس الرطوبة' },
        ],
        night: [
          { time: 'مساءً', name: 'Eloria Serum', desc: '4 قطرات مساءً للترطيب العميق' },
          { time: 'مساءً', name: 'زيت ورد', desc: 'قطرة واحدة فوق السيروم للبشرة الحساسة الجافة' },
        ],
        both: [
          { time: 'صباحاً + مساءً', name: 'Eloria Serum', desc: 'روتين مرطب ومهدئ متكامل' },
        ],
        flexible: [
          { time: 'يومياً', name: 'Eloria Serum', desc: 'آمن وفعّال، لا حساسية مع المكونات الطبيعية' },
        ],
      },
      uneven: {
        morning: [
          { time: 'صباحاً', name: 'Eloria Serum', desc: 'نياسيناميد لطيف على البشرة الحساسة' },
          { time: 'صباحاً', name: 'SPF 50+ معدني', desc: 'ضروري لتوحيد اللون وحماية البشرة' },
        ],
        night: [
          { time: 'مساءً', name: 'Eloria Serum', desc: 'ابدئي بـ 3 قطرات وزيدي تدريجياً' },
          { time: 'مساءً', name: 'كريم مهدئ + مرمم', desc: 'للحفاظ على الحاجز الجلدي' },
        ],
        both: [
          { time: 'صباحاً + مساءً', name: 'Eloria Serum', desc: 'للبشرة الحساسة، الانتظام يحقق أفضل النتائج' },
          { time: 'نصيحة', name: 'تجنبي المواد المهيجة', desc: 'لا AHA أو BHA مع Eloria في نفس الروتين' },
        ],
        flexible: [
          { time: 'يومياً', name: 'Eloria Serum', desc: 'خُصص خصيصاً ليكون لطيفاً وفعالاً في آنٍ واحد' },
        ],
      },
    },
  };

  // Default fallback
  const DEFAULT_ROUTINE = [
    { time: 'صباحاً + مساءً', name: 'Eloria Serum', desc: '3-5 قطرات على البشرة النظيفة' },
    { time: 'صباحاً', name: 'واقي الشمس SPF 50+', desc: 'ضروري لحماية نتائج التفتيح' },
    { time: 'نصيحة', name: 'الثبات = النتائج', desc: 'الاستخدام اليومي لـ 14 يوم يصنع الفرق الكبير' },
  ];

  // ── State ─────────────────────────────────────────────────────────
  const answers = { skin: null, concern: null, time: null };
  let currentStep = 1;

  // ── DOM ───────────────────────────────────────────────────────────
  const tool = document.getElementById('routineTool');
  if (!tool) return;

  const questions     = tool.querySelectorAll('.routine-question');
  const resultEl      = tool.querySelector('.routine-result');
  const routineOutput = document.getElementById('routineOutput');
  const progressSteps = tool.querySelectorAll('.progress-step');

  // ── Helpers ───────────────────────────────────────────────────────
  function showQuestion(n) {
    questions.forEach(q => {
      const isActive = Number(q.dataset.question) === n;
      q.classList.toggle('active', isActive);
    });
    // result panel
    if (resultEl) resultEl.classList.remove('active');

    // Update progress bar
    progressSteps.forEach((step, i) => {
      const stepNum = i + 1;
      step.classList.toggle('active', stepNum === n);
      step.classList.toggle('done', stepNum < n);
    });

    // Update ARIA
    const progressBar = tool.querySelector('.routine-progress');
    if (progressBar) progressBar.setAttribute('aria-valuenow', n);
  }

  function showResult() {
    questions.forEach(q => q.classList.remove('active'));
    if (resultEl) {
      resultEl.classList.add('active');
      // Scroll into view
      setTimeout(() => resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    }

    // Mark all steps done
    progressSteps.forEach(step => step.classList.add('done'));

    // Get routine
    const routineData = getRoutine();
    renderRoutine(routineData);
  }

  function getRoutine() {
    const { skin, concern, time } = answers;
    try {
      return ROUTINES[skin][concern][time] || DEFAULT_ROUTINE;
    } catch (e) {
      return DEFAULT_ROUTINE;
    }
  }

  function renderRoutine(steps) {
    if (!routineOutput) return;
    routineOutput.innerHTML = steps.map(step => `
      <div class="routine-step">
        <span class="step-time">${step.time}</span>
        <div>
          <p class="step-name">${step.name}</p>
          <p class="step-desc">${step.desc}</p>
        </div>
      </div>
    `).join('');
  }

  function handleOptionClick(btn, questionNum) {
    // Deselect siblings
    const siblings = btn.closest('.question-options').querySelectorAll('.option-btn');
    siblings.forEach(s => s.classList.remove('selected'));
    btn.classList.add('selected');

    // Store answer
    const value = btn.dataset.value;
    if (questionNum === 1) answers.skin    = value;
    if (questionNum === 2) answers.concern = value;
    if (questionNum === 3) answers.time    = value;

    // Delay for UX polish then advance
    setTimeout(() => {
      if (questionNum < 3) {
        currentStep = questionNum + 1;
        showQuestion(currentStep);
      } else {
        showResult();
      }
    }, 350);
  }

  // ── Event Listeners ────────────────────────────────────────────
  questions.forEach(q => {
    const questionNum = Number(q.dataset.question);
    q.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => handleOptionClick(btn, questionNum));
    });
  });

  // Restart button
  const restartBtn = tool.querySelector('.routine-restart');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      answers.skin = null;
      answers.concern = null;
      answers.time = null;
      currentStep = 1;

      // Reset selected states
      tool.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));

      showQuestion(1);
      progressSteps.forEach(step => {
        step.classList.remove('done');
        step.classList.toggle('active', Number(step.dataset.step) === 1);
      });
    });
  }

  // Init
  showQuestion(1);
})();
