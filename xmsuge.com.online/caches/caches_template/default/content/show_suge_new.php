<?php defined('IN_PHPCMS') or exit('No permission resources.'); ?><?php $cur_menu = 'new';?>
<?php $load_css = array('photo','team','new');?>
<?php $footer_js =  array('jquery.jscrollpanel/jquery.mousewheel','jquery.jscrollpanel/jquery.jscrollpane.min')?>
<?php include template("public","header"); ?>
<?php $cat_parentid = 32;?>

<div id="main">
    <div id="productCats" class="flexslider">
        <h2><span>苏 格 点 滴</span></h2>

        <div class="subpages-holder semitransp">

            <div class="subpages-holder semitransp">
                <?php if(defined('IN_ADMIN')  && !defined('HTML')) {echo "<div class=\"admin_piao\" pc_action=\"content\" data=\"op=content&tag_md5=4764ee7f63a2e66c753b5211f1d0ad31&action=category&catid=32&num=4&siteid=%24siteid&order=listorder+ASC\"><a href=\"javascript:void(0)\" class=\"admin_piao_edit\">编辑</a>";}$content_tag = pc_base::load_app_class("content_tag", "content");if (method_exists($content_tag, 'category')) {$data = $content_tag->category(array('catid'=>'32','siteid'=>$siteid,'order'=>'listorder ASC','limit'=>'4',));}?>
                <ul class="submenu">
                    <?php $category = $data;?>
                    <?php $n=1;if(is_array($data)) foreach($data AS $r) { ?>
                    <?php if($n%3 ==1) { ?>
                    <?php if($n==1) { ?>
                    <?php $first_cat = $r?>
                    <?php } ?>
                    <li><a data-id="162" class="subpage-switch <?php if($r['parentid']==$catid|| $r['catid']==$catid) { ?> active <?php } ?>"
                           href="<?php echo buildurl('lists','index','content',array('catid'=>$r['catid']));?>"><?php echo $r['catname'];?></a></li>
                    <?php } else { ?>
                    <li><a data-id="164" class="subpage-switch <?php if($r['pareantid']==$catid|| $r['catid']==$catid) { ?> active <?php } ?> "
                           href="<?php echo buildurl('lists','index','content',array('catid'=>$r['catid']));?>"><?php echo $r['catname'];?></a></li>
                    <?php } ?>
                    <?php $n++;}unset($n); ?>
                </ul>
                <?php if(defined('IN_ADMIN') && !defined('HTML')) {echo '</div>';}?>

                <div id="content"> 
					<div class="article">
					<!--<h1 style="text-align:center;"><?php echo $title;?></h1> -->
					<?php echo $content;?>
					</div>
                </div>
            </div>

        </div>

    </div>
</div>



<?php include template("public","footer"); ?>