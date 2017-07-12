<?php defined('IN_PHPCMS') or exit('No permission resources.'); ?><?php include template("content","header_min"); ?>
<style type="text/css">
.header,.main,.footer{width:940px;margin:0 auto; overflow:auto}
</style>
<div class="main">
	<div class="col-left navlist">
		<div class="box memu">
			<h6 class="title-2 f14 text-c">频道列表</h6>
			<div class="content blue">
			<?php if(defined('IN_ADMIN')  && !defined('HTML')) {echo "<div class=\"admin_piao\" pc_action=\"content\" data=\"op=content&tag_md5=4b4d3655946f3cadaa50be4424f4fa54&action=category&catid=0&siteid=%24this-%3Esiteid&order=listorder+ASC\"><a href=\"javascript:void(0)\" class=\"admin_piao_edit\">编辑</a>";}$content_tag = pc_base::load_app_class("content_tag", "content");if (method_exists($content_tag, 'category')) {$data = $content_tag->category(array('catid'=>'0','siteid'=>$this->siteid,'order'=>'listorder ASC','limit'=>'20',));}?>
			<?php $n=1;if(is_array($data)) foreach($data AS $r) { ?>
				<div class="color on"><?php echo $r['catname'];?></div>
				<ul style="display:block">
					<?php $n=1;if(is_array(subcat($r[catid],0,0,$this->siteid))) foreach(subcat($r[catid],0,0,$this->siteid) AS $v) { ?>
					<li><a href="?m=content&c=rss&catid=<?php echo $v['catid'];?>&siteid=<?php echo SITEID;?>"><?php echo $v['catname'];?></a> <a href="<?php echo APP_PATH;?>index.php?m=content&c=rss&rssid=<?php echo $v['catid'];?>"><img src="<?php echo IMG_PATH;?>icon/rss.gif"></a></li>
					<?php $n++;}unset($n); ?>
				</ul>
			<?php $n++;}unset($n); ?>	
			<?php if(defined('IN_ADMIN') && !defined('HTML')) {echo '</div>';}?>	

			</div>
		</div>
	</div>
	<div class="col-right rsslist">
	<?php $n=1; if(is_array($subcats)) foreach($subcats AS $n => $r) { ?>
		<?php $i++?>
		<div class="box" <?php if($i%2!=0) { ?>style="margin-right:10px"<?php } ?>>
			<h5 class="title-1" ><span class="xml"><a rel="<?php echo APP_PATH;?><?php echo urlencode('index.php?m=content&c=rss&rssid=');?><?php echo $r['catid'];?>" href="<?php echo APP_PATH;?>index.php?m=content&c=rss&rssid=<?php echo $r['catid'];?>" class="xmlbut" target="_blank"">xml</a>
			<div class="rss cu" onclick="RssTab('rss_<?php echo $n;?>')" id="rss_<?php echo $n;?>"><dl><dt>订阅到</dt></dl></div>
			</span><?php echo $r['catname'];?></h5>
			<ul class="content list f14 lh24">
			<?php if(defined('IN_ADMIN')  && !defined('HTML')) {echo "<div class=\"admin_piao\" pc_action=\"content\" data=\"op=content&tag_md5=d9a5a0d61f080dbce4b2774d783edd34&action=lists&catid=%24r%5Bcatid%5D&num=5&order=id+DESC&return=info\"><a href=\"javascript:void(0)\" class=\"admin_piao_edit\">编辑</a>";}$content_tag = pc_base::load_app_class("content_tag", "content");if (method_exists($content_tag, 'lists')) {$info = $content_tag->lists(array('catid'=>$r[catid],'order'=>'id DESC','limit'=>'5',));}?>
				<?php $n=1;if(is_array($info)) foreach($info AS $v) { ?>
					<li>·<a href="<?php if(strpos($v[url],'http')===false) { ?><?php echo $siteurl;?><?php } ?><?php echo $v['url'];?>"><?php echo str_cut($v[title],'40');?></a></li>
				<?php $n++;}unset($n); ?>
			<?php if(defined('IN_ADMIN') && !defined('HTML')) {echo '</div>';}?>	
			</ul>
		</div>
		<?php if($i%2==0) { ?><div class="bk10"></div><?php } ?>
	<?php $n++;}unset($n); ?>					
	</div>
	<div class="clear"></div>
</div>
<script type="text/javascript">

$(function() {
var memu = $('.navlist .memu .content div');
memu.toggle(
  function () {
	$(this).addClass('on');
    $(this).next().show();
  },
  function () {
	$(this).removeClass('on');
    $(this).next().hide();
  }
);	
});
var ppwin='<dl><dt>订阅到</dt><dd><a href="http://reader.youdao.com/b.do?keyfrom=163&url={feedurl}" title="有道" target="_blank"><img src="http://img1.cache.netease.com/cnews/css09/rss100121/icon_subshot02_youdao.gif" width="50" height="14" alt="有道" /></a></dd><dd><a href="http://fusion.google.com/add?feedurl={feedurl}" title="google" target="_blank"><img src="http://img1.cache.netease.com/cnews/css09/rss100121/icon_subshot02_google.gif" width="50" height="14" alt="google" /></a></dd><dd><a href="http://add.my.yahoo.com/rss?url={feedurl}" title="yahoo" target="_blank"><img src="http://img1.cache.netease.com/cnews/css09/rss100121/icon_subshot02_yahoo.gif" width="50" height="14" alt="yahoo" /></a></dd><dd><a href="http://www.xianguo.com/subscribe.php?url={feedurl}" title="鲜果" target="_blank"><img src="http://img1.cache.netease.com/cnews/css09/rss100121/icon_subshot02_xianguo.gif" width="50" height="14" alt="鲜果" /></a></dd><dd><a href="http://www.zhuaxia.com/add_channel.php?url={feedurl}" title="抓虾" target="_blank"><img src="http://img1.cache.netease.com/cnews/css09/rss100121/icon_subshot02_zhuaxia.gif" width="50" height="14" alt="抓虾" /></a></dd><dd><a href="http://mail.qq.com/cgi-bin/feed?u={feedurl}" title="qq" target="_blank"><img src="http://img1.cache.netease.com/cnews/css09/rss100121/icon_subshot02_qq.gif" width="50" height="14" alt="qq" /></a></dd><dd><a href="http://my.msn.com/addtomymsn.armx?id=rss&ut={feedurl}" title="msn" target="_blank"><img src="http://img1.cache.netease.com/cnews/css09/rss100121/msn.jpg" width="44" height="14" alt="msn" /></a></dd></dl>';
function RssTab(id){
	var RssObj=$('span.xml .rss[id='+id+']');
	var RssObjdl=$('span.xml .rss dl');
	for(var i=0,len=RssObj.length;i<len;i++){
		var rp_ppwin=ppwin.replace(/{feedurl}/g,RssObj.siblings().attr('href'));
		RssObjdl.replaceWith(rp_ppwin);
		RssObj.hover(
		  function () {
			$(this).addClass("cur");
		  },
		  function () {
			$(this).removeClass("cur");
		  }
		);
	}

}

</script>
<?php include template("content","footer"); ?>