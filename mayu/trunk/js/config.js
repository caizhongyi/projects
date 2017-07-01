// Set configuration
seajs.version = '1.0.0/';

if( location.href.indexOf('?dev') != -1){
    seajs.root =  'src/';
}
else{
    seajs.root =  'dist/' + seajs.version;
}
seajs.spm_modules = "node_modules/" ;
seajs.config({
    base: "./../public/js/",
    // 设置路径，方便跨目录调用
    paths: {
        // 'jquery': 'https://a.alipayobjects.com/jquery'
    },
    alias: {
        "jquery": seajs.spm_modules + "jquery/1.10.1/jquery.js",
        "migrate": seajs.spm_modules + "jquery/1.10.1/migrate.js",
        //"jquery": seajs.spm_modules + "jquery/2.1.1/jquery.js",
        //"migrate": seajs.spm_modules + "jquery/2.1.1/migrate.js",
        "easing": seajs.spm_modules + "jquery-easing/1.3.0/jquery-easing.js",
        "jquery-lazyload": seajs.spm_modules + "jquery-lazyload/dist/jquery-lazyload.js",
        "combo": seajs.spm_modules + "combo/1.0.0/combo.js",
        "json": seajs.spm_modules + "json/dist/json.js",
        "bootstrap": seajs.spm_modules + "bootstrap/2.0.2/js/bootstrap.js",
        "seajs-combo": seajs.spm_modules + "seajs-combo/1.0.1/dist/seajs-combo.js",
        "seajs-preload": seajs.spm_modules + "seajs-preload/1.0.0/dist/seajs-preload.jss",
        "seajs-css": seajs.spm_modules + "seajs-css/1.0.2/dist/seajs-css.js",
        "seajs-flush": seajs.spm_modules + "seajs-flush/1.0.1/dist/seajs-flush.js",
        "transitionEnd": seajs.spm_modules + "transitionEnd/1.0.0/transitionEnd.js"
    },
    //comboSyntax: ['?', '&']  // styleCombine
    // 预加载项
    preload: [
        this.jQuery ? "" : "jquery",
        //Function.prototype.bind ? '' : 'es5-safe',
        this.JSON ? '' : 'json'
    ],
    //plugins: ['text', 'shim'],
    //map: [[/^(.*\.(?:css|js))(.*)$/i, '$1?v=1.0.0']],  //map,批量更新时间戳
    debug: true,
    // 文件编码
    charset: 'utf-8'
    // 调试模式
});

// For development
/*if (location.href.indexOf("?dev") > 0) {
 seajs.use("../static/hello/src/main");
 }*/
// For production
/*else {
 seajs.use("examples/hello/1.0.0/main");
 }*/


