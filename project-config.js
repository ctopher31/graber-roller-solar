// Project Config for Task Runner
module.exports = {
  paths: {
    sass: {
      bundleSass: {
        source: './src/scss/styles.scss',
        watch: ['./src/scss/styles.scss', './src/scss/**/*.scss'],
        dest: 'www/assets/css',
        filename: 'styles',
      },
    },
    js: {
      bundleJs: {
        source: './src/js/app.js',
        watch: ['./src/js/app.js', './src/js/modules/**/*.js'],
        dest: 'www/assets/js',
        filename: 'app',
        tests: ['./tests/test.spec.js'],
      },
      tests: ['./tests/test.spec.js'],
    },
    nunjucks: {
      source: './src/views',
      templates: './src/templates',
      watch: ['./src/views/**/*.+(html|njk)', './src/templates/**/*.+(html|njk)'],
      dest: 'www',
    },
  },
};
