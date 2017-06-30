<?php defined('IN_IA') or exit('Access Denied');?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>微易—微信，易信公众账号服务平台</title>

    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- basic styles -->

    <link href="./resource/ace/assets/css/bootstrap.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="./resource/ace/assets/css/font-awesome.min.css" />

    <!--[if IE 7]>
    <link rel="stylesheet" href="./resource/ace/assets/css/font-awesome-ie7.min.css" />
    <![endif]-->

    <!-- page specific plugin styles -->

    <!-- fonts -->

    <link rel="stylesheet" href="./resource/ace/assets/css/ace-fonts.css" />

    <!-- ace styles -->

    <link rel="stylesheet" href="./resource/ace/assets/css/ace.min.css" />
    <link rel="stylesheet" href="./resource/ace/assets/css/ace-rtl.min.css" />
    <link rel="stylesheet" href="./resource/ace/assets/css/ace-skins.min.css" />

    <!--[if lte IE 8]>
    <link rel="stylesheet" href="./resource/ace/assets/css/ace-ie.min.css" />
    <![endif]-->
	
	 <link rel="stylesheet" href="./resource/ace/assets/css/common.css" />
    <!-- inline styles related to this page -->

    <!-- ace settings handler -->

    <script src="./resource/ace/assets/js/ace-extra.min.js"></script>

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->

    <!--[if lt IE 9]>
    <script src="./resource/ace/assets/js/html5shiv.js"></script>
    <script src="./resource/ace/assets/js/respond.min.js"></script>
    <![endif]-->

    <!--[if !IE]> -->

    <script type="text/javascript">
        window.jQuery || document.write("<script src='./resource/ace/assets/js/jquery-2.0.3.min.js'>"+"<"+"/script>");
    </script>

    <!-- <![endif]-->

    <!--[if IE]>
    <script type="text/javascript">
        window.jQuery || document.write("<script src='./resource/ace/assets/js/jquery-1.10.2.min.js'>"+"<"+"/script>");
    </script>
    <![endif]-->
    
    <script type="text/javascript" src="./resource/script/common.js?v=<?php echo TIMESTAMP;?>"></script>
	<script type="text/javascript" src="./resource/script/emotions.js"></script>
    <script type="text/javascript">
	cookie.prefix = '<?php echo $_W['config']['cookie']['pre'];?>';
	</script>
</head>

<body class="navbar-fixed">
<div class="navbar navbar-default navbar-fixed-top" id="navbar">
<script type="text/javascript">
    try{ace.settings.check('navbar' , 'fixed')}catch(e){}
</script>

<div class="navbar-container" id="navbar-container">
<div class="navbar-header pull-left">
    <a href="./index.php?act=frame" class="navbar-brand">
        <small>
            <i class="icon-leaf"></i>
            微易公众账号管理平台
        </small>
        <!--<img src="./resource/image/index/logo.png" alt=""/>-->
    </a><!-- /.brand -->
</div><!-- /.navbar-header -->

<div class="navbar-header pull-right" role="navigation">
<ul class="nav ace-nav">
<li class="grey">
    <a href="<?php echo create_url('index/help')?>">
        <i class="icon-tasks"></i>
        帮助</a>
</li>

<li class="purple">
        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
            <i class="icon-user"></i>
            <?php if($_W['account']) { ?><?php echo $_W['account']['name'];?><?php } else { ?>请切换公众号<?php } ?><i class="icon-angle-down "></i>
        </a>

        <ul class="pull-right dropdown-navbar navbar-pink dropdown-menu dropdown-caret" style="height: 300px;overflow-y:scroll;">
            <li class="dropdown-header">
                <i class="icon-exchange"></i>
             	   切换公众号
            </li>
            <?php if(is_array($_W['wechats'])) { foreach($_W['wechats'] as $account) { ?>
            <li>
                <a href="<?php echo create_url('account/switch', array('id' => $account['weid']))?>">
                    <i class="btn btn-xs btn-primary icon-user"></i>
                    <?php echo $account['name'];?>
                </a>
            </li>
            <?php } } ?>
            <li></li>
        </ul>
    </li>

<li class="light-blue">
    <a data-toggle="dropdown" href="#" class="dropdown-toggle">
            <span class="user-info">
                <small>欢迎,</small>
                <?php echo $_W['username'];?>
            </span>
        <i class="icon-caret-down"></i>
    </a>

    <ul class="user-menu pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
       <!-- <li ><a href="javascript:;"><i class="icon-user"></i><?php echo $_W['username'];?></a></li>-->
        <li ><a href="<?php echo create_url('member/logout')?>"><i class="icon-off"></i>退出</a></li>
    </ul>
</li>
</ul><!-- /.ace-nav -->
</div><!-- /.navbar-header -->
</div><!-- /.container -->
</div>
<div class="main-container" id="main-container">
<script type="text/javascript">
    try{ace.settings.check('main-container' , 'fixed')}catch(e){}
</script>

<div class="main-container-inner">
<a class="menu-toggler" id="menu-toggler" href="#">
    <span class="menu-text"></span>
</a>

<div class="sidebar" id="sidebar">
<script type="text/javascript">
    try{ace.settings.check('sidebar' , 'fixed')}catch(e){}
</script>

<div class="sidebar-shortcuts" id="sidebar-shortcuts">
    <div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
        <a href="<?php echo create_url('index/module',array('do'=>'display','name'=>'fans'))?>" class="btn btn-success">
            <i class="icon-signal"></i>
        </a>
        <a href="<?php echo create_url('setting/profile')?>" class="btn btn-info">
            <i class="icon-pencil"></i>
        </a>
        <a href="<?php echo create_url('account/display',array('type'=>1))?>" class="btn btn-warning">
            <i class="icon-group"></i>
        </a>

        <a href="<?php echo create_url('account/post',array('id'=>'current'))?>" class="btn btn-danger">
            <i class="icon-cogs"></i>
        </a>
    </div>

    <div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
        <span class="btn btn-success"></span>

        <span class="btn btn-info"></span>

        <span class="btn btn-warning"></span>

        <span class="btn btn-danger"></span>
    </div>
</div><!-- #sidebar-shortcuts -->

<ul class="nav nav-list">
    <?php $menuorder = explode(',',$_GPC['menuorder']);?>
    <?php $i=0;?>
    <?php if(is_array($_W['menus'])) { foreach($_W['menus'] as $menu) { ?>
    <?php $i++;?>
    <?php if(is_array($menu['title'])) { ?>
    <li menuorder="<?php echo $i;?>" <?php if($menuorder['0']==$i) { ?>class="active"<?php } ?>>
    <a href="<?php echo $menu['title']['1'];?>" class="dropdown-toggle" >
        <i class="icon-desktop"></i>
        <span    class="menu-text">  <?php echo $menu['title']['0'];?> </span>
    </a>
    </li>
    <?php } else { ?>
    <li menuorder="<?php echo $i;?>" <?php if($menuorder['0']==$i) { ?>class="active open"<?php } ?>>
    <a href="#" class="dropdown-toggle" >
        <i class="icon-desktop"></i>
        <span    class="menu-text"> <?php echo $menu['title'];?></span>
        <b class="arrow icon-angle-down"></b>
    </a>
    <?php if(!empty($menu['items'])) { ?>
    <ul class="submenu">
        <?php $j=0;?>
        <?php if(is_array($menu['items'])) { foreach($menu['items'] as $item) { ?>
        <?php $j++;?>
        <li menuorder="<?php echo $j;?>" <?php if($menuorder['1']==$j) { ?>class="active"<?php } ?>>
        <a href="<?php echo $item['1'];?>" >
            <i class="icon-double-angle-right"></i>
            <?php echo $item['0'];?>
        </a>
        <!--  <?php if(!empty($item['childItems'])) { ?>
          <ul class="submenu">
              <li>
                  <a href="<?php echo $item['childItems']['1'];?>" >
                      <i class="icon-double-angle-right"></i>
                      <?php echo $item['childItems']['0'];?>
                  </a>
              </li>
          </ul>
          <?php } ?>-->
        </li>
        <?php } } ?>
    </ul>
    <?php } else { ?>
    <ul class="submenu">
        <?php if(is_array($menu['items'])) { foreach($menu['items'] as $item) { ?>
        <li>
            <span>抱歉，暂无菜单 -_-!!!</span>
        </li>
        <?php } } ?>
    </ul>
    <?php } ?>
    </li>
    <?php } ?>
    <?php } } ?>
    <script type="text/javascript">
       $(function(){
           $('.nav-list').on('click','a', function(e){
               function getNodeIndex(  menuorder ){
                   var $li = $(this).parent();
                   var order = $li.attr('menuorder'),
                        $node = $li.parent().parent();
                   menuorder =  order + ',' + menuorder;
                   if($node[0].tagName == 'LI'){
                       return getNodeIndex.call($node.children('a') , menuorder);
                   }
                   else{
                       return  menuorder ;
                   }
               }
               $.cookie(cookie.prefix+'menuorder', getNodeIndex.call( this, '') , { expires : 0 });
           })
       })
    </script>
</ul><!-- /.nav-list -->

<div class="sidebar-collapse" id="sidebar-collapse">
    <i class="icon-double-angle-left" data-icon1="icon-double-angle-left" data-icon2="icon-double-angle-right"></i>
</div>

<script type="text/javascript">
    try{ace.settings.check('sidebar' , 'collapsed'); }catch(e){}
</script>
</div>

    <div class="main-content">
        <div class="breadcrumbs" id="breadcrumbs">
            <script type="text/javascript">
                try{ace.settings.check('breadcrumbs' , 'fixed')}catch(e){}
            </script>

            <ul class="breadcrumb">
                <li>
                    <i class="icon-home home-icon"></i>
                    <a href="<?php echo create_url('index/frame')?>">首页</a>
                </li>
				<?php if(isset($_W['breadcrumb'])) { ?>
				<?php if(is_array($_W['breadcrumb'])) { foreach($_W['breadcrumb'] as $key => $item) { ?>
                	<?php if($key == (count($breadcrumb)-1)||empty($item['url'])) { ?>
                	 <li class="active"><?php echo $item['title'];?></li>
                	 <?php } else { ?>
	                <li>
        	            <a href="<?php echo $item['url'];?>"><?php echo $item['title'];?></a>
    	            </li>
                    <?php } ?>
                <?php } } ?>
                <?php } ?>
            </ul>
            <!-- .breadcrumb -->
        </div>

        <div class="page-content">
            <div class="row">
                <div class="col-xs-12">
                    <!-- PAGE CONTENT BEGINS -->