<?php require('asset.php');$asset = new Asset;?>
<!DOCTYPE html>
<html>
    <head>
    <!--务必先设置map.json，加载css-->
    <?php $asset->setMap('pc')
                      ->load('html/css/basic.css')
                      ->load('html/css/index2.css')
                      ->load('widget/map/css/tip.css')
                      ->load('widget/autocomplete/css/autocomplete.css')
                      ->render('css');
    ?>
    </head>
    <body>
        <p>加载器使用</p>
        <!--使用data-plugin插件方式调用js-->
        <?php $asset->load('widget/plugin/plugin.js');?>
        <?php $asset->load('app/car/index.js');?>
        <div data-plugin="app/car/index.js#deptMap"></div>

        <!--js统一加载-->
        <?php $asset->render('framework')->render('js');?>

        <!--执行js-->
        <script type="text/javascript" charset="utf-8">
            require('widget/plugin/plugin.js').init();
        </script>
    </body>
</html>
