<?php require('/asset.php');$asset = new Asset;?>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <!--务必先设置map.json，加载css-->
    <?php $asset->setMap('pc')
                      ->load('widget/autocomplete/css/autocomplete.css')
                      ->render('css');
    ?>
    </head>


    <body>
       <form action="" >
            <input id="demo" class="demo" type="text" value=""  placeholder="请输入邮箱" >
            <button class="submit" >button</button>
        </form>
        <form action="" >
            <input id="search" class="demo" type="text" value=""  placeholder="search" >
            <button class="submit" >button</button>
        </form>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <input id="demo1" class="demo" type="text" value=""  placeholder="请输入邮箱" data-source="data.json">
        <input id="demo2"  type="text" value=""  placeholder="请输入邮箱" >
        <p>加载器使用</p>
        <!--使用data-plugin插件方式调用js-->
        <?php $asset->load('widget/autocomplete/js/autocomplete.js');?>

        <!--js统一加载-->
        <?php $asset->render('framework')->render('js');?>

        <!--执行js-->
        <script type="text/javascript" charset="utf-8">
        var AutoComplete = require('widget/autocomplete/js/autocomplete');
        var $ = require('jquery');
    var data = [
        "@qq.com",
        "@sina.com",
        "@163.com",
        "@sohu.com",
        "@173.com",
        "@273.com"
    ]
    var auto = new AutoComplete( '.demo' , {
        source : data ,
        type : 'mail'
    });

   new AutoComplete( '#demo2' , {
        source : [
            "test1",
            "test6",
            "test5",
            "test4",
            "test3"
        ] ,
        format : function( row ){
            return "<li><a href='###'>"+ row +"</a></li>"
        },
        type : 'default'
    });

    new AutoComplete( '#search' , {
        source : "data.json" ,
        format : function( row ){
            return "<li style='overflow: hidden'><span style='float: right'>"+ row.count +"条</span><a href='###'>"+ row.name +"</a></li>"
        },
        valueFormat : function( $item ){
            return $item.find('a').text();
        },
        cache : false,
        type : 'default'
    });


    $('form').keydown(function(e){
        if (e.keyCode == 13 && !auto.isActive() ) {
            console.log('submit')
        }
    })
        </script>
    </body>
</html>
