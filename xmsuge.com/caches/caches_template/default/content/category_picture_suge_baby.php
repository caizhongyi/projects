<?php defined('IN_PHPCMS') or exit('No permission resources.'); ?><?php $cur_menu = 'baby';?>
<?php $load_css = array('photo');?>
<?php include template("public","header"); ?>

<!--页头-->
<div id="main">
    <div id="productCats" class="flexslider">
        <h2><span>天 使 宝 宝</span></h2>


        <?php if(defined('IN_ADMIN')  && !defined('HTML')) {echo "<div class=\"admin_piao\" pc_action=\"content\" data=\"op=content&tag_md5=ad4b214120ebdcb4403a928c310f5f28&action=category&catid=13&num=4&siteid=%24siteid&order=listorder+ASC\"><a href=\"javascript:void(0)\" class=\"admin_piao_edit\">编辑</a>";}$content_tag = pc_base::load_app_class("content_tag", "content");if (method_exists($content_tag, 'category')) {$data = $content_tag->category(array('catid'=>'13','siteid'=>$siteid,'order'=>'listorder ASC','limit'=>'4',));}?>
        <div class="semitransp">
            <div id="galthumbs">
                <?php $n=1;if(is_array($data)) foreach($data AS $r) { ?>
                <?php if($n%2==0 && $n!=0) { ?>
                <a class="galthumb  left"  href="<?php echo buildurl('lists','index','content',array('catid'=>$r['catid']));?>">
                    <div class="figure"><img width="257" height="172" alt="ja1"
                                             class="attachment-gallery-feat wp-post-image"
                                             src="<?php echo $r['image'];?>"></div>
                    <h3><?php echo $r['catname'];?></h3></a>
                <div class="cf"></div>
                <?php } else { ?>
                <a class="galthumb  left"   href="<?php echo buildurl('lists','index','content',array('catid'=>$r['catid']));?>">
                    <div class="figure"><img width="257" height="172" alt="ja1"
                                             class="attachment-gallery-feat wp-post-image"
                                             src="<?php echo $r['image'];?>"></div>
                    <h3><?php echo $r['catname'];?></h3></a>
                <?php } ?>
                <?php $n++;}unset($n); ?>
            </div>
        </div>
    </div>
    <!--中间图-->
    <div id="page" class=""><?php echo $pages;?></div>
    <?php if(defined('IN_ADMIN') && !defined('HTML')) {echo '</div>';}?>
    <!--页码-->
</div>


<?php include template("public","footer"); ?>