<?php defined('IN_PHPCMS') or exit('No permission resources.'); ?><div class="main_img" data-loader="Class-tabs" data-options="auto:true,interval:3500">
    <div class="tab-clip" data-role="clip">
        <ul class="tab-panel" data-role="panel">
            <?php if(defined('IN_ADMIN')  && !defined('HTML')) {echo "<div class=\"admin_piao\" pc_action=\"poster\" data=\"op=poster&tag_md5=75c1a7145443ef3b83d80433e447e452&action=get_poster_data&spaceid=11&limit=4&return=result\"><a href=\"javascript:void(0)\" class=\"admin_piao_edit\">修改</a>";}$poster_tag = pc_base::load_app_class("poster_tag", "poster");if (method_exists($poster_tag, 'get_poster_data')) {$result = $poster_tag->get_poster_data(array('spaceid'=>'11','limit'=>'20',));}?>
            <?php $n=1;if(is_array($result)) foreach($result AS $rs) { ?>
            <?php $ad = string2array($rs['setting']);?>
            <li><a href="<?php echo $ad['1']['linkurl'];?>"  title="<?php echo $rs['name'];?>"><img src="<?php echo $ad['1']['imageurl'];?>" /></span></a></li>
            <?php $spicids[] = $rs['small_pic'];?>
            <?php $n++;}unset($n); ?>
            <?php if(defined('IN_ADMIN') && !defined('HTML')) {echo '</div>';}?>
        </ul>
    </div>
    <style type="text/css">
        .main_img{ position: relative;}
        .tab-nav { position: absolute;right: 35px; bottom:35px;z-index: 1;}
        .tab-nav a{ display: inline-block; margin: 0 5px; width: 10px; height: 10px; line-height: 10px; border-radius: 5px; background: #ddd;}
        .tab-nav .selected{ background: #DD3B3E;}
    </style>
    <div class="tab-nav" data-role="nav">

    </div>
    <script type="text/javascript">
        for(var i = 0 ; i < $('.tab-panel').children().length ; i++){
            $('.tab-nav').append('<a href="javascript;"></a>');
        }
    </script>
</div>