<?php defined('IN_PHPCMS') or exit('No permission resources.'); ?><?php $cur_menu = 'question';?>
<?php $load_css = array('photo','team');?>
<?php $footer_js =  array('jquery.jscrollpanel/jquery.mousewheel','jquery.jscrollpanel/jquery.jscrollpane.min')?>
<?php include template("public","header"); ?>


<div id="main">
    <div id="productCats" class="flexslider">
        <h2><span>常 见 问 题</span></h2>

        <div class="subpages-holder semitransp">
            <ul class="submenu">
                <li><a data-id="162" class="subpage-switch "
                       href="<?php echo buildurl('lists','index','content',array('catid'=>18));?>">孕妈问题解答</a></li>
                <li><a data-id="164" class="subpage-switch  "
                       href="<?php echo buildurl('lists','index','content',array('catid'=>19));?>">宝宝问题解答</a></li>
                <li><a data-id="164" class="subpage-switch active"
                       href="<?php echo buildurl('lists','index','content',array('catid'=>20));?>">预约流程</a></li>
            </ul>


            <div id="content">
                <div class="subpage-content visible jspScrollable" id="subpage-162" tabindex="0">
                    <div class="story">
                        <?php echo $content;?>
                        <div class="cf"></div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>



<?php include template("public","footer"); ?>