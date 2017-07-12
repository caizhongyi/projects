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

                <div id="content" >
                    <?php if($catid == $cat_parentid) { ?>
                    <?php $catid = $first_cat['catid'];?>
                    <?php } ?>
                    <?php if(defined('IN_ADMIN')  && !defined('HTML')) {echo "<div class=\"admin_piao\" pc_action=\"content\" data=\"op=content&tag_md5=ce1f7770db6b07d2df65c583554d96fa&action=lists&catid=%24catid&num=10&order=listorder+asc%2Cposids+desc%2Cid+desc&page=%24page\"><a href=\"javascript:void(0)\" class=\"admin_piao_edit\">编辑</a>";}$content_tag = pc_base::load_app_class("content_tag", "content");if (method_exists($content_tag, 'lists')) {$pagesize = 10;$page = intval($page) ? intval($page) : 1;if($page<=0){$page=1;}$offset = ($page - 1) * $pagesize;$content_total = $content_tag->count(array('catid'=>$catid,'order'=>'listorder asc,posids desc,id desc','limit'=>$offset.",".$pagesize,'action'=>'lists',));$pages = pages($content_total, $page, $pagesize, $urlrule);$data = $content_tag->lists(array('catid'=>$catid,'order'=>'listorder asc,posids desc,id desc','limit'=>$offset.",".$pagesize,'action'=>'lists',));}?>
                    <ul class='newlist'>
                        <?php $n=1;if(is_array($data)) foreach($data AS $r) { ?>

                        <li>
                            <a href="<?php echo $r['url'];?>"><?php echo str_cut($r[title],120);?></a>
                            <span class="date"><?php echo date('Y-m-d H:m:i',$r['updatetime']);?></span>
                        </li>
                        <?php $n++;}unset($n); ?>
                    </ul>
                    <div id="page" class="text-c"><?php echo $pages;?></div>
                    <?php if(defined('IN_ADMIN') && !defined('HTML')) {echo '</div>';}?>
                </div>
            </div>

        </div>

    </div>
</div>



<?php include template("public","footer"); ?>