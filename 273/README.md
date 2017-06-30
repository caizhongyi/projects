安装构建工具
============

**node版本使用4.0以下的**

```javascript
cnpm install -g fis273
```

或

```javascript
npm install -g fis273
```

查看版本（最新版本为1.2.2）

```javascript
fis273 -v
```

目录规范
=======

**文件名一律英文！**
------------------

**双下划线__开头的JS文件编译时不会被加上define头**
------------------

html
----
html模板存放目录，包括其依赖的样式以及图片资源

app
----
内部应用模块存放目录

components
----------
业务无关组件，如jQuery、zepto等基础库

widget
----------
业务相关组件

pkg
---
打包文件

mod.js
------
模块加载器，为增强兼容性，加入了json2.js以及es5.js

map.json
------
资源映射关系表

fis273-conf.js
--------------
配置文件

常用命令
========
编译，$ENV为环境参数，可选值为：local|test|sim|online|debug，编译后的文件会分发到/fis/$ENV

```javascript
fis273 release $ENV
```

本地环境编译，默认输出到/fis/local（PHP开发人员需配置asset.273.com.cn指向该路径）

```javascript
fis273 release local
```

调试模式编译，默认输出到/fis/debug（JS开发人员专用）

```javascript
fis273 release debug -w
```

启动内置服务器进行预览，dist_path为对应的编译输出路径

```javascript
fis273 server start --root dist_path
```

打包配置
========
编辑fis273-conf.js，例：

```javascript
fis.config.set('pack', {
    'pkg/a_b.js': [
        'static/a.js',
        'static/b.js'
    ],
    'pkg/x_y.js': [
        'mod/x.js',
        'mod/y.js'
    ]
});
```

JS中如何使用
===========
```javascript
var Mod = {};

// 直接使用components基础库
var $ = require('jquery');

// 使用业务相关组件，请统一使用项目绝对路径，即asset/pc或asset/m以下的路径
var AutoComplete = require('/widget/autocomplete/js/autocomplete.js');

$('#suggest').on('click', function() {
    console.log('hello world');
});

module.exports = Mod;
```

JS中如何使用变量进行异步加载
=========================
```javascript
/**
 * 在头部注释中列出所有可能需要加载的js
 * @require.async ./a.js
 * @require.async ./b.js
 */

 var module = '绝对路径' + module + '.js';
 require.async(module, function(M) {});
```

PHP中如何使用
============
```html
<!DOCTYPE html>
<html>
    <head>
    <!--务必先设置map.json，加载css-->
    <?php $_staLoader_->setMap('pc')
                      ->load('html/css/basic.css')
                      ->load('html/css/index2.css')
                      ->load('widget/map/css/tip.css')
                      ->load('widget/autocomplete/css/autocomplete.css')
                      ->render('css');
    ?>
    </head>
    <body>
        <!--使用data-plugin插件方式调用js-->
        <?php $_staLoader_->load('widget/plugin/plugin.js');?>
        <?php $_staLoader_->load('app/car/index.js');?>
        <div data-plugin="app/car/index.js#deptMap"></div>

        <!--js统一加载-->
        <?php $_staLoader_->render('framework')->render('js');?>

        <!--执行js-->
        <script type="text/javascript" charset="utf-8">
            require('widget/plugin/plugin.js').init();
        </script>
    </body>
</html>
```

测试环境
=======
172.16.1.41       asset.273.com.cn


模拟环境
=======
58.83.223.234     asset.273.com.cn
