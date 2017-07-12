<?php defined('IN_PHPCMS') or exit('No permission resources.'); ?><?php $load_css = array('photo','bigphoto');?>
<?php include template("public","header"); ?>

<!--页头-->
<div id="main">
    <div id="productCats" class="flexslider">

        <?php if(defined('IN_ADMIN')  && !defined('HTML')) {echo "<div class=\"admin_piao\" pc_action=\"content\" data=\"op=content&tag_md5=d57a603dbe15c86be43388f7bd20e37f&action=lists&catid=%24catid&num=6&order=listorder+ASC%2Cid+DESC&page=%24page\"><a href=\"javascript:void(0)\" class=\"admin_piao_edit\">编辑</a>";}$content_tag = pc_base::load_app_class("content_tag", "content");if (method_exists($content_tag, 'lists')) {$pagesize = 6;$page = intval($page) ? intval($page) : 1;if($page<=0){$page=1;}$offset = ($page - 1) * $pagesize;$content_total = $content_tag->count(array('catid'=>$catid,'order'=>'listorder ASC,id DESC','limit'=>$offset.",".$pagesize,'action'=>'lists',));$pages = pages($content_total, $page, $pagesize, $urlrule);$data = $content_tag->lists(array('catid'=>$catid,'order'=>'listorder ASC,id DESC','limit'=>$offset.",".$pagesize,'action'=>'lists',));}?>
        <h2><span><?php echo $catname;?></span></h2>
        <div class="semitransp">
		<?php if($cur_menu == 'baby') { ?>
		<a id="back-portfolio" href="<?php echo buildurl('lists','index','content',array('catid'=>13));?>">返回上一页</a>
		<?php } ?>
            <div id="galthumbs">
                <?php $n=1;if(is_array($data)) foreach($data AS $r) { ?>
                <?php if($n%2==0 && $n!=0) { ?>
                <a class="galthumb  left"  href="<?php echo buildurl('show','index','content',array('catid'=>$catid,'id'=>$r['id'],'page'=>$page));?>">
                    <div class="figure"><img width="257" height="172" alt="ja1"
                                             class="attachment-gallery-feat wp-post-image"
                                             src="<?php echo $r['thumb'];?>"></div>
                    <h3><?php echo $r['title'];?></h3></a>
                <div class="cf"></div>
                <?php } else { ?>
                <a class="galthumb  left"   href="<?php echo buildurl('show','index','content',array('catid'=>$catid,'id'=>$r['id'],'page'=>$page));?>">
                    <div class="figure"><img width="257" height="172" alt="ja1"
                                             class="attachment-gallery-feat wp-post-image"
                                             src="<?php echo $r['thumb'];?>"></div>
                    <h3><?php echo $r['title'];?></h3></a>
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
<!--中部-->



<?php include template("public","footer"); ?>