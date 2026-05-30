/*
  Eloria — Webpack config
  يبني الأصول من src/assets إلى مجلد الإخراج.
  ملاحظة: Salla CLI يوفّر إعداداً افتراضياً عبر @salla.sa/twilight؛
  هذا الملف لتخصيص نقاط الدخول إن لزم.
*/
const path = require('path');

module.exports = {
  entry: {
    app: [
      './src/assets/styles/app.scss',
      './src/assets/js/app.js',
      './src/assets/js/routine-tool.js'
    ]
  },
  resolve: {
    alias: {
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@styles': path.resolve(__dirname, 'src/assets/styles'),
      '@js': path.resolve(__dirname, 'src/assets/js')
    }
  }
};
