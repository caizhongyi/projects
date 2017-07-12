<?php defined('IN_PHPCMS') or exit('No permission resources.'); ?><?php $cur_menu = 'index';?>
<?php include template("public","header"); ?>

<!--页头-->
<div id="main">
    <?php include template("poster","suge_banner"); ?>
    <!--中间大图-->
    <div class="shopinfo">
        <div id="cats-breadcr">
           <!-- <div class="img1"><img src="<?php echo APP_PATH;?>statics/suge/img/qq.png"/></div>
            <div class="text1"><a class="" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=239180013&site=qq&menu=yes">QQ在线咨询</a></div>
            <div class="img1"><img src="<?php echo APP_PATH;?>statics/suge/img/sina.png"/></div>
            <div class="text1"><a class="" href="http://e.weibo.com/xmsuge">关注苏格动态</a></div>
            <div class="img1"><img src="<?php echo APP_PATH;?>statics/suge/img/tel.png"/></div>
            <div class="text1"><span>0592-5663466</span>-->
            </div>
        </div>
    </div>

    <div class="webo">

        <div class="l_list_q">
            <div id="l_add">
                <div class="leftadd"><a href="http://wpa.qq.com/msgrd?v=3&uin=239180013&site=qq&menu=yes"><img src="<?php echo APP_PATH;?>statics/suge/img/add.png" /></a></div>
                <div class="rightadd"></div></div>

            <div id="l_newslist">
                <div class="yyhq"></div>
                <div class="news"><div class="h1">12苏格点滴-带你走进温馨的苏格世界</div>
                    <?php if(defined('IN_ADMIN')  && !defined('HTML')) {echo "<div class=\"admin_piao\" pc_action=\"content\" data=\"op=content&tag_md5=c9cc503a38e955687c54cf917852a027&action=category&catid=32&num=4&siteid=%24siteid&order=listorder++asc\"><a href=\"javascript:void(0)\" class=\"admin_piao_edit\">修改</a>";}$content_tag = pc_base::load_app_class("content_tag", "content");if (method_exists($content_tag, 'category')) {$data = $content_tag->category(array('catid'=>'32','siteid'=>$siteid,'order'=>'listorder  asc','limit'=>'4',));}?>
                    <!--<?php if(defined('IN_ADMIN')  && !defined('HTML')) {echo "<div class=\"admin_piao\" pc_action=\"content\" data=\"op=content&tag_md5=fce60bcf817fada4b7090f7d16700ff3&action=lists&catid=34&num=10&order=listorder+asc%2Cposids+desc%2Cid+desc&page=%24page\"><a href=\"javascript:void(0)\" class=\"admin_piao_edit\">修改</a>";}$content_tag = pc_base::load_app_class("content_tag", "content");if (method_exists($content_tag, 'lists')) {$pagesize = 10;$page = intval($page) ? intval($page) : 1;if($page<=0){$page=1;}$offset = ($page - 1) * $pagesize;$content_total = $content_tag->count(array('catid'=>'34','order'=>'listorder asc,posids desc,id desc','limit'=>$offset.",".$pagesize,'action'=>'lists',));$pages = pages($content_total, $page, $pagesize, $urlrule);$data = $content_tag->lists(array('catid'=>'34','order'=>'listorder asc,posids desc,id desc','limit'=>$offset.",".$pagesize,'action'=>'lists',));}?>-->
                    <dl>
                        <?php $n=1;if(is_array($data)) foreach($data AS $r) { ?>
                        <dd style="float: left;width: 305px;">
                            <span class="gying">
                                <a  href="<?php echo $r['url'];?>"><?php echo str_cut($r[title],64);?></a>
                            </span><span>
                            <a style="color:#939393;" href="<?php echo $r['url'];?>"><?php echo date('m-d',$r['updatetime']);?></a>
                            </span>
                        </dd>
                        <?php $n++;}unset($n); ?>
                    </dl>
                    <?php if(defined('IN_ADMIN') && !defined('HTML')) {echo '</div>';}?>

                </div>
            </div>
        </div>

        <div class="r_webo">
            <iframe width="300px" height="400px" class="share_self"  frameborder="0" scrolling="no" src="http://widget.weibo.com/weiboshow/index.php?language=&width=0&height=400&fansRow=1&ptype=1&speed=300&skin=3&isTitle=1&noborder=1&isWeibo=1&isFans=1&uid=3206559395&verifier=98aacb97&dpc=1"></iframe></div>
    </div>
    <!--新闻列表-->
    <!--QQ-->
    <?php include template("poster","suge_beautiful_moments"); ?>

    <!--下部图片-->
</div>
<!--中部-->

<?php include template("public","footer"); ?>