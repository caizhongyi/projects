<?php defined('IN_PHPCMS') or exit('No permission resources.'); ?><?php include template("content","header"); ?>
<style type="text/css" >
.photo_prev a{cursor:url(<?php echo IMG_PATH;?>v9/prev.cur), auto;}
.photo_next a{cursor:url(<?php echo IMG_PATH;?>v9/next.cur), auto;}

</style>
<div class="main photo-channel">
	<div class="crumbs"><a href="<?php echo siteurl($siteid);?>">首页</a><span> > <?php echo catpos($catid);?></div>
    <div id="Article">
        	<h1><?php echo $title;?><br />
			<span><?php echo $inputtime;?>&nbsp;&nbsp;&nbsp;来源：<?php echo $copyfrom;?>&nbsp;&nbsp;&nbsp;评论：<a href="#comment_iframe" id="comment">0</a></span></h1>
<div class="tool">
		<a name="pic"></a>
        <a class="up" href="javascript:;" title="上一张" onclick="showpic('pre')"><span>上一张</span></a><a class="next" href="javascript:;" onclick="showpic('next')" title="下一张"><span>下一张</span></a><span class="stat" id="picnum"></span>
        <div class="Article-Tool"><span id='favorite'><a href="javascript:;" onclick="add_favorite('<?php echo $title;?>');" class="t6">收藏</a></span>&nbsp;&nbsp;分享到：
		<img src="http://v.t.qq.com/share/images/s/weiboicon16.png" style="padding-bottom:3px;" onclick="postToWb();" class="cu" title="分享到腾讯微博"/><script type="text/javascript">
	function postToWb(){
		var _t = encodeURI(document.title);
		var _url = encodeURIComponent(document.location);
		var _appkey = encodeURI("cba3558104094dbaa4148d8caa436a0b");
		var _pic = encodeURI('<?php echo $thumb;?>');
		var _site = '';
		var _u = 'http://v.t.qq.com/share/share.php?url='+_url+'&appkey='+_appkey+'&site='+_site+'&pic='+_pic+'&title='+_t;
		window.open( _u,'', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
	}
</script>
          <script type="text/javascript">document.write('<a href="http://v.t.sina.com.cn/share/share.php?url='+encodeURIComponent(location.href)+'&appkey=3172366919&title='+encodeURIComponent('<?php echo new_addslashes($title);?>')+'" title="分享到新浪微博" class="t1" target="_blank">&nbsp;</a>');</script>
		  <script type="text/javascript">document.write('<a href="http://www.douban.com/recommend/?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent('<?php echo new_addslashes($title);?>')+'" title="分享到豆瓣" class="t2" target="_blank">&nbsp;</a>');</script>
		  <script type="text/javascript">document.write('<a href="http://share.renren.com/share/buttonshare.do?link='+encodeURIComponent(location.href)+'&title='+encodeURIComponent('<?php echo new_addslashes($title);?>')+'" title="分享到人人" class="t3" target="_blank">&nbsp;</a>');</script>
		  <script type="text/javascript">document.write('<a href="http://www.kaixin001.com/repaste/share.php?rtitle='+encodeURIComponent('<?php echo new_addslashes($title);?>')+'&rurl='+encodeURIComponent(location.href)+'&rcontent=" title="分享到开心网" class="t4" target="_blank">&nbsp;</a>');</script>
		  <script type="text/javascript">document.write('<a href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent(location.href)+'" title="分享到QQ空间" class="t5" target="_blank">&nbsp;</a>');</script></div>
</div>
    <div class="big-pic" style="height:650px;">
		<div id="big-pic"></div>
    	<div class="photo_prev"><a id="photoPrev" title="&lt;上一页" class="btn_pphoto" target="_self" hidefocus="true" href="javascript:;" onclick="showpic('pre');"></a></div>
        <div class="photo_next"><a id="photoNext" title="下一页&gt;"class="btn_nphoto" target="_self" hidefocus="true" href="javascript:;" onclick="showpic('next')"></a></div>
        <a href="javascript:;" class="max" onclick="showpic('big');">查看原图</a>
        
        <div id="endSelect" style="display: none;">
			<div id="endSelClose" onclick="$('#endSelect').hide();"></div>
			<div class="bg"></div>
			<div class="E_Cont">
				<p>您已经浏览完所有图片</p>
				<p><a id="rePlayBut" href="javascript:void(0)" onclick="showpic('next', 1);"></a><a id="nextPicsBut" href="<?php echo $next_page['url'];?>"></a></p>	
			</div>
		</div>
        
    </div>

    <div class="list-pic">
        <div class="pre picbig">
        	<div class="img-wrap"><a href="<?php echo $previous_page['url'];?>"><img src="<?php echo thumb($previous_page[thumb], 100, 137, 0);?>" title="<?php echo $previous_page['title'];?>"></a></div><a href="<?php echo $previous_page['url'];?>">&lt;上一组</a>
        </div>
        <a href="javascript:;" onclick="showpic('pre')" class="pre-bnt"><span></span></a>
		<div class="cont" style="position:relative">
			<ul class="cont picbig" id="pictureurls"  style="position:absolute">
			<?php $n=1; if(is_array($pictureurls)) foreach($pictureurls AS $pic_k => $r) { ?>
			 <li><div class="img-wrap"><a href="javascript:;" hidefocus="true"><img src="<?php echo thumb($r[url], 100, 137, 0);?>" alt="<?php echo $r['alt'];?>" rel="<?php echo $r['url'];?>"/></a></div></li>
			<?php $n++;}unset($n); ?>
			</ul>
		</div>
        <a href="javascript:;" onclick="showpic('next')" class="next-bnt"><span></span></a>
        <div class="next picbig">
        	<div class="img-wrap"><a href="<?php echo $next_page['url'];?>" title="<?php echo $next_page['title'];?>"><img src="<?php echo thumb($next_page[thumb], 100, 137, 0);?>"></a></div><a href="<?php echo $next_page['url'];?>">下一组&gt;</a>
        </div>
    </div>
            <div class="text" id="picinfo"></div>
	<div class="content">
		<?php echo $content;?>
	</div>
  </div>
  <div class="bk10"></div>
	<div class="relevance">
	<h5>相关图集</h5>
		<?php if(defined('IN_ADMIN')  && !defined('HTML')) {echo "<div class=\"admin_piao\" pc_action=\"content\" data=\"op=content&tag_md5=a960f68065b7481770d34df4b3630904&action=relation&relation=%24relation&id=%24id&catid=%24catid&num=6&keywords=%24rs%5Bkeywords%5D\"><a href=\"javascript:void(0)\" class=\"admin_piao_edit\">编辑</a>";}$content_tag = pc_base::load_app_class("content_tag", "content");if (method_exists($content_tag, 'relation')) {$data = $content_tag->relation(array('relation'=>$relation,'id'=>$id,'catid'=>$catid,'keywords'=>$rs[keywords],'limit'=>'6',));}?>
			<ul class="photo-list">
				<?php $n=1;if(is_array($data)) foreach($data AS $r) { ?>
				<li><div class="img-wrap"><a href="<?php echo $r['url'];?>"><img src="<?php echo thumb($r[thumb]);?>" width="100" height="86"/></a></div><a href="<?php echo $r['url'];?>"><?php echo $r['title'];?></a></li>
				<?php $n++;}unset($n); ?>
			</ul>
		<?php if(defined('IN_ADMIN') && !defined('HTML')) {echo '</div>';}?>
	</div>
  <div class="bk10"></div>
  <?php if($allow_comment && module_exists('comment')) { ?>
  <iframe src="<?php echo APP_PATH;?>index.php?m=comment&c=index&a=init&commentid=<?php echo id_encode("content_$catid",$id,$siteid);?>&iframe=1" width="100%" height="100%" id="comment_iframe" frameborder="0" scrolling="no"></iframe>
  <?php } ?>
</div>
<div id="load_pic" style="display:none;" rel="<?php echo IMG_PATH;?>msg_img/loading_d.gif">
</div>
<script language="JavaScript">
<!--
	function add_favorite(title) {
		$.getJSON('<?php echo APP_PATH;?>api.php?op=add_favorite&title='+encodeURIComponent(title)+'&url='+encodeURIComponent(location.href)+'&'+Math.random()+'&callback=?', function(data){
			if(data.status==1)	{
				$("#favorite").html('收藏成功');
			} else {
				alert('请登录');
			}
		});
	}
//-->
</script>
<script type="text/javascript" src="<?php echo JS_PATH;?>show_picture.js"></script>
<script type="text/javascript" src="<?php echo APP_PATH;?>api.php?op=count&id=<?php echo $id;?>&modelid=<?php echo $modelid;?>"></script>
<?php include template("content","footer"); ?>