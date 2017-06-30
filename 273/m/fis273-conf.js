// 命名空间
fis.config.set('project', 'm');

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
        '/widget/autocomplete/js/autocomplete.js',
        '/widget/swipe/js/swipe.js',
        'widget/lazyload/js/lazyload.js',
        '/widget/map/js/overlay.js',
        '/widget/log/js/*.js'
    ],
    'pkg/components.js': [
        '/components/class/*.js',
        '/components/cookie/cookie.js',
        '/components/storage/storage.js',
        '/components/mobiscroll/js/mobiscroll.custom-2.16.1.min.js',
        '/components/mobiscroll/index.js',
        '/components/iscroll/build/iscroll.js'
    ],
    'pkg/mod_zepto.js': [
        '/mod.js',
        '/components/zepto/*.js'
    ],
    'pkg/car-filter.js': [
        '/widget/carfilter/js/carfilter.js',
        '/widget/carfilter/temp.tpl'
    ],
    'pkg/location.js': [
        '/widget/location/location.js',
        '/widget/location/data.js',
        '/widget/location/city.tpl'
    ],
    'pkg/car-type.js': [
        '/widget/cartype/js/cartype.js',
        '/widget/cartype/cartype.tpl'
    ],
    'pkg/car-base.js': [
        '/app/car/base.js',
        '/app/car/matchBox.js',
        '/app/car/common/footer.js',
        '/app/car/toast.js',
        '/app/car/common/common.js',
        'app/car/brand.js',
        'app/car/tpl/brand.tpl',
        '/app/car/lib/underscore/underscore.js'
    ]
});

