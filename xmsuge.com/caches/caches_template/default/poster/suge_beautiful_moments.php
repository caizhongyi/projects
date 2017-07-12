<?php defined('IN_PHPCMS') or exit('No permission resources.'); ?><div class="flexslider" id="productCats">
    <h2><span>最 新 作 品</span></h2>
    <div class="flex-viewport" style="overflow: hidden; position: relative; height:500px;">
        <ul class="slides clearfix" style="width: 600%; margin-left: 0px;clear:both;">
            <?php if(defined('IN_ADMIN')  && !defined('HTML')) {echo "<div class=\"admin_piao\" pc_action=\"content\" data=\"op=content&tag_md5=1c3339b60bafa4425c4fcdb73e3a1526&action=lists&catid=12&num=9&order=listorder+ASC%2Cid+DESC&page=%24page\"><a href=\"javascript:void(0)\" class=\"admin_piao_edit\">编辑</a>";}$content_tag = pc_base::load_app_class("content_tag", "content");if (method_exists($content_tag, 'lists')) {$pagesize = 9;$page = intval($page) ? intval($page) : 1;if($page<=0){$page=1;}$offset = ($page - 1) * $pagesize;$content_total = $content_tag->count(array('catid'=>'12','order'=>'listorder ASC,id DESC','limit'=>$offset.",".$pagesize,'action'=>'lists',));$pages = pages($content_total, $page, $pagesize, $urlrule);$data = $content_tag->lists(array('catid'=>'12','order'=>'listorder ASC,id DESC','limit'=>$offset.",".$pagesize,'action'=>'lists',));}?>
            <?php $n=1;if(is_array($data)) foreach($data AS $r) { ?>
            <li class="frame-1" >
                <a href="<?php echo buildurl('show','index','content',array('catid'=>12,'id'=>$r['id'],'page'=>$page));?>">
                    <img width="265" height="175" class="alignnone size-large wp-image-1013" alt="<?php echo $r['title'];?>"
                         src="<?php echo $r['thumb'];?>">  <br>
                    <span><?php echo $r['title'];?> <!--<i>works</i>--> </span></a>
            </li>
            <?php $n++;}unset($n); ?>
            <?php if(defined('IN_ADMIN') && !defined('HTML')) {echo '</div>';}?>
        </ul>

        <ul class="slides clearfix" style="width: 600%; margin-left: 0px; clear:both;">
            <?php if(defined('IN_ADMIN')  && !defined('HTML')) {echo "<div class=\"admin_piao\" pc_action=\"get\" data=\"op=get&tag_md5=27c1cd22e7f71b1e98a7ad795dc5a5b9&sql=select+%2A+from+picture+where+catid+IN+%2825%2C26%2C27%2C28%29+order+by+listorder+ASC%2Cid+DESC&num=9&page=%24page\"><a href=\"javascript:void(0)\" class=\"admin_piao_edit\">编辑</a>";}pc_base::load_sys_class("get_model", "model", 0);$get_db = new get_model();$pagesize = 9;$page = intval($page) ? intval($page) : 1;if($page<=0){$page=1;}$offset = ($page - 1) * $pagesize;$r = $get_db->sql_query("SELECT COUNT(*) as count FROM  picture where catid IN (25,26,27,28) order by listorder ASC,id DESC");$s = $get_db->fetch_next();$pages=pages($s['count'], $page, $pagesize, $urlrule);$r = $get_db->sql_query("select * from picture where catid IN (25,26,27,28) order by listorder ASC,id DESC LIMIT $offset,$pagesize");while(($s = $get_db->fetch_next()) != false) {$a[] = $s;}$data = $a;unset($a);?>
                <?php $n=1;if(is_array($data)) foreach($data AS $r) { ?>
                <li class="frame-1" >
                    <a href="<?php echo buildurl('show','index','content',array('catid'=>25,'id'=>$r['id'],'page'=>$page));?>">
                        <img width="265" height="175" class="alignnone size-large wp-image-1013" alt="<?php echo $r['title'];?>"
                             src="<?php echo $r['thumb'];?>">  <br>
                        <span><?php echo $r['title'];?> <!--<i>works</i>--> </span></a>
                </li>
                <?php $n++;}unset($n); ?>
            <?php if(defined('IN_ADMIN') && !defined('HTML')) {echo '</div>';}?>
        </ul>

    </div>
    <div class="flex-nav" >
        <a href="javascript:;" class="selected">1</a><a href="javascript:;">2</a><a href="javascript:;">3</a>
    </div>
    <style type="text/css">
        .flex-nav{ margin: 30px auto; text-align: center;}
        .flex-nav a{ margin: 0 10px; background: #fff; display: inline-block; width: 10px; height: 10px; border-radius: 5px; border: 1px solid #ddd; font-size: 0;}
        .flex-nav .selected{ background: #FF00A1;}
    </style>
    <script type="text/javascript">
        $(function(){
            var index = 0 ;
            function tab(index){
                var $ul =  $('.flex-viewport ul');
                $('.flex-nav a').removeClass('selected').eq(index).addClass('selected');
                $ul.each(function(i){
                    $ul.eq(i).children().hide().slice(index * 3 , (index + 1) * 3).stop(true,true).fadeIn(2000);
                })
            }
            $('.flex-nav').on('click','a',function(){
                index = $(this).index();
                tab(index);
            })
            setInterval(function(){
                index ++ ;
                if(index >= 3) index = 0;
                tab(index);
            },6000);
        })

    </script>
</div>