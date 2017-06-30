<?php require('/asset.php');$asset = new Asset;?>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <!--务必先设置map.json，加载css-->
    <?php $asset->setMap('pc')
        ->load('widget/dropdown-group/css/dropdown-group.css')
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
<?php $asset->load('widget/dropdown/js/dropdown.js');?>
<?php $asset->load('widget/dropdown-group/js/dropdown-group.js');?>

<!--js统一加载-->
<?php $asset->render('framework')->render('js');?>

<!--执行js-->
<script type="text/javascript" charset="utf-8">
    var group = new DropdownGroup('.dropdown-group',{
        source : [ 'http://api.cherenmai.com/cache/location/getprovincelist','http://api.cherenmai.com/cache/location/getcitylistbyprovinceid','http://api.cherenmai.com/cache/location/getdestrictlistbycityid'],
        format : function( row ){
            return '<li><a href="###" data-value="'+ row.id +'">'+ row.name +'</a></li>';
        }
    });

    group.items[0].on('change',function(e , args ){
        console.log(args)
    })
</script>
</body>
</html>
