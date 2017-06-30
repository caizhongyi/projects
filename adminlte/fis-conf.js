// 只需要编译 html 文件，以及其用到的资源。
fis.set('project.files', ['*.html','app/**', 'map.json']);

fis.match('*.js', {
    isMod: true
  //  useHash: true
});

fis.match('/js/*.{js,css,png}', {
    useHash: true
});
fis.match('/pkg/*.{js,css,png}', {
    useHash: true
})

/*
fis.match('/js/app.min.js', {
    isMod: true
})
*/

fis.hook('module', {
    mode: 'cmd',
    // 记得设置这个。
    forwardDeclaration: true,
    baseUrl: './',
    paths: {
    }
});

//modules下面都是模块化资源
fis.match(/^\/app\/(.*)\.(js)$/i,{
    isMod: true
})

fis.match('::packager', {
    postpackager: fis.plugin('loader')
});

fis.match('/js/**.js', {
    isMod: false
})

fis.match('/sea_modules/**.js', {
    isMod: false
})
fis.match('/app/utils/**.js', {
    isMod: false
})
fis.match('/app/app.js', {
    isMod: false
})



// 注意： fis 中的 sea.js 方案，不支持部分打包。
// 所以不要去配置 packTo 了，运行时会报错的。
fis
    .media('prod')
    .match('*.js', {
        // 通过 uglify 压缩 js
        // 记得先安装：
        // npm install [-g] fis-optimizer-uglify-js
        optimizer: fis.plugin('uglify-js')
    })
    .match('::packager', {
        postpackager: fis.plugin('loader', {
            resourceType : 'cmd',
            allInOne: {
                includeAsyncs: true,
                ignore: [
                    '/js/sea.js',
                    '/js/sea_config.js',
                    '/js/html5shiv.js',
                    '/js/respond.min.js'
                ]
            }
        })
    })
