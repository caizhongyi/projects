seajs.config({
  // 别名配置
  alias: {
    'jquery': 'sea_modules/jquery/1.9.1/jquery.min.js',
    'bs': 'sea_modules/bootstrap/js/bootstrap.min.js',
    'bootbox': 'sea_modules/bootbox/bootbox.min.js',
    'icheck': 'sea_modules/iCheck/icheck.min.js',
    'form': 'sea_modules/mbs/form.js',
    'app': 'sea_modules/mbs/app.js',
    'angular': 'sea_modules/angular-ui-router/lib/angular-1.3.0/angular.js',
    'angular-animate': 'sea_modules/angular-ui-router/lib/angular-1.3.0/angular-animate.js',
    'angular-messages': 'sea_modules/angular-messages/angular-messages.min.js',
    'angular-ui-router': 'sea_modules/angular-ui-router/release/angular-ui-router.min.js',
    'oclazyload': 'sea_modules/oclazyload/dist/ocLazyLoad.min.js',
    'angular-cookies': 'sea_modules/angular-cookies/angular-cookies.min.js',
    'jquery-md5': 'sea_modules/jquery-md5/dist/index.js',
    'es5': 'sea_modules/es5/dist/index.js',
    'jquery-ui': 'sea_modules/jQueryUI/jquery-ui-1.10.3.min.js',
    'datepicker': 'sea_modules/datepicker/datepicker.js'
  },
  // 路径配置
  paths: {
    'modules': 'sea_modules'
  },
  // Sea.js 的基础路径
  //base: 'http://style.273.cn/',
  base: './',
  // 文件编码
  charset: 'utf-8'
});