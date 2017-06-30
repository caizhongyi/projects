// 命名空间
fis.config.set('project', 'pc');

// 模板加版本号
fis.media('online').match('*.tpl', {
    useHash: true
});


// 打包配置
fis.config.set('pack', {
    'pkg/widget.js': [
        '/widget/luck/luck.js',
        '/widget/plugin/plugin.js',
        '/widget/uri/js/uri.js',
        '/widget/tabs/js/tabs.js',
        '/widget/autocomplete/js/autocomplete.js',
        '/widget/slider/js/slide.js',
        '/widget/log/js/*.js'
    ],
    'pkg/components.js': [
        '/components/class/*.js',
        '/components/cookie/cookie.js',
        '/components/storage/storage.js'
    ],
    'pkg/mod_jquery.js': [
        '/mod.js',
        '/components/jquery/*.js'
    ],
    'pkg/map.js': [
        '/widget/map/js/*.js'
    ],
    'pkg/car-base.js': [
        '/app/car/base.js',
        '/app/car/side-menu.js',
        '/app/car/feedback.tpl',
        '/app/car/success.tpl'
    ],
    'pkg/index-v4.js': [
        '/app/car/index-v4.js',
        '/app/car/car.tpl'
    ],
    'pkg/list-v4.js': [
        '/app/car/list-v4.js',
        '/app/car/list-more-brand.js',
        '/app/car/list-search-save.js',
        '/app/car/save-search.tpl'
    ]
});


