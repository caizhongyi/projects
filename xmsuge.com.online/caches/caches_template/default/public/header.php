<?php defined('IN_PHPCMS') or exit('No permission resources.'); ?><?php include template("public","doc_header"); ?>
<body>
<div id="header-main">
    <div class="wrapper">
        <h1>
            <a href=""></a>
        </h1>
        <div id="nav-main">
            <ul id="">
                <?php if($cur_menu == 'index') { ?>
                <li class=""><a class="current" href="<?php echo buildurl();?>">首页</a></li>
                <?php } else { ?>
                <li class=""><a class="" href="<?php echo buildurl();?> ">首页</a></li>
                <?php } ?>
                <?php if($cur_menu == 'mother') { ?>
                <li class="b1"><a class="current"  href="<?php echo buildurl('lists','index','content',array('catid'=>12));?>">美丽孕妈</a></li>
                <?php } else { ?>
                <li class="b1"><a href="<?php echo buildurl('lists','index','content',array('catid'=>12));?>">美丽孕妈</a></li>
                <?php } ?>
                <?php if($cur_menu == 'baby') { ?>
                <li class="b1"><a class="current" href="<?php echo buildurl('lists','index','content',array('catid'=>13));?>">天使宝宝</a></li>
                <?php } else { ?>
                <li class="b1"><a href="<?php echo buildurl('lists','index','content',array('catid'=>13));?>">天使宝宝</a></li>
                <?php } ?>
                <?php if($cur_menu == 'new') { ?>
                <li class="b1"><a class="current" href="<?php echo buildurl('lists','index','content',array('catid'=>32));?>">苏格点滴</a></li>
                <?php } else { ?>
                <li class="b1"><a href="<?php echo buildurl('lists','index','content',array('catid'=>32));?>">苏格点滴</a></li>
                <?php } ?>
                <?php if($cur_menu == 'team') { ?>
                <!--<li class="b1"><a class="current" href="<?php echo buildurl('lists','index','content',array('catid'=>15));?>">团队介绍</a></li>-->
                <?php } else { ?>
                <!--<li class="b1"><a class="" href="<?php echo buildurl('lists','index','content',array('catid'=>15));?>">团队介绍</a></li>-->
                <?php } ?>
                <?php if($cur_menu == 'question') { ?>
                <li class="b1"><a class="current" href="<?php echo buildurl('lists','index','content',array('catid'=>18));?>">拍摄须知</a></li>
                <?php } else { ?>
                <li class="b1"><a class="" href="<?php echo buildurl('lists','index','content',array('catid'=>18));?>">拍摄须知</a></li>
                <?php } ?>
                <?php if($cur_menu == 'about') { ?>
                <li class="b1"><a class="current" href="<?php echo buildurl('lists','index','content',array('catid'=>21));?>">关于苏格</a></li>
                <?php } else { ?>
                <li class="b1"><a class="" href="<?php echo buildurl('lists','index','content',array('catid'=>21));?>">关于苏格</a></li>
                <?php } ?>
            </ul>
            <div class="cf"></div>
        </div>
        <div class="cf"></div>
    </div>
</div>