<?php defined('IN_PHPCMS') or exit('No permission resources.'); ?><?php $load_css = array('photo','team','bigphoto');?>
<?php include template("public","header"); ?>


<!--中间图-->
<div id="main">
    <div id="productCats" class="flexslider">
        <?php if(defined('IN_ADMIN')  && !defined('HTML')) {echo "<div class=\"admin_piao\" pc_action=\"content\" data=\"op=content&tag_md5=e7b76c745e1eea295d8b89fbab73faac&action=lists&catid=%24catid&num=6&order=listorder+ASC%2Cid+DESC\"><a href=\"javascript:void(0)\" class=\"admin_piao_edit\">编辑</a>";}$content_tag = pc_base::load_app_class("content_tag", "content");if (method_exists($content_tag, 'lists')) {$data = $content_tag->lists(array('catid'=>$catid,'order'=>'listorder ASC,id DESC','limit'=>'6',));}?>
        <h2><span><?php echo $data[$id]['title'];?></span></h2>
        <?php if(defined('IN_ADMIN') && !defined('HTML')) {echo '</div>';}?>
        <div class="semitransp">
            <?php //$page = isset($_GET['page'])&&!empty($page) ? intval($page):1;?>
            <?php if($page>1) { ?>
            <?php $url = buildurl('lists','index','content',array('catid'=>$catid)).'&page='.$page?>
            <?php } else { ?>
            <?php $url = buildurl('lists','index','content',array('catid'=>$catid))?>
            <?php } ?>
			
			<?php if($noreturn !=1) { ?>
            <a id="back-portfolio" href="<?php echo $url;?>">返回上一页</a>
			<?php } ?>

            <div id="gallery-slider" class="flexslider" data-loader="Class-tabs" data-options="auto:true,initCallback:sliderInit,effect:'fade'">
                <div class="tab-clip" data-role="clip" >
                    <ul class="tab-panel" data-role="panel">
                        <?php $n=1; if(is_array($pictureurls)) foreach($pictureurls AS $pic_k => $r) { ?>
                        <li><img src="<?php echo $r['url'];?>"/></li>
                        <?php $n++;}unset($n); ?>
                    </ul>
                </div>

                <ul class="flex-direction-nav">
                    <li><a href="javascript:;" class="flex-prev" data-role="prev">Previous</a></li>
                    <li><a href="javascript:;" class="flex-next" data-role="next">Next</a></li>
                </ul>
                <div class="carousel" data-role="carousel">
						<?php $n=1; if(is_array($pictureurls)) foreach($pictureurls AS $pic_k => $r) { ?><a href="javascript:;"><img src="<?php echo $r['url'];?>"/></a><?php $n++;}unset($n); ?>
				</div>
				<div class="flex-pauseplay"><a class="flex-pause">Pause slideshow</a></div>
            </div>
            <div class="numbers-info">- <span class="current-photo-num">1</span> of <span class="photo-total">14</span> -</div>
            <script type="text/javascript">
                $(function(){
                    $('.photo-total').html($('#gallery-slider .tab-panel li').length);
                })
                function sliderInit(){
                    var that = this;
                    this.on('onchange',function(e , args ){
                        $('.current-photo-num').html(args.current + 1);
                    })
                    $('.flex-pause').click(function(){
                        if(!$(this).hasClass('stop')){
                            $(this).html('Start slideshow').addClass('stop')
                            that.stop();
                        }
                        else{
                            $(this).html('Pause slideshow').removeClass('stop')
                            that.auto();
                        }
                    })
                }
            </script>
        </div>
    </div>
</div>
<!--中间图-->



<?php include template("public","footer"); ?>