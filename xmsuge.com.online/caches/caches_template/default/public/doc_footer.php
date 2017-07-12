<?php defined('IN_PHPCMS') or exit('No permission resources.'); ?><!--foot-->
<script type="text/javascript" src="<?php echo APP_PATH;?>statics/suge/js/jquery.plus.min.js"></script>
<script type="text/javascript" src="<?php echo APP_PATH;?>statics/suge/js/class.tab.js"></script>
<script type="text/javascript">
    $(function(){
        $('body').loader();
    })
</script>
<?php $n=1;if(is_array($footer_js)) foreach($footer_js AS $fjs) { ?>
<script src="<?php echo APP_PATH;?>statics/suge/js/<?php echo $fjs;?>.js?v=suge" ></script>
<?php $n++;}unset($n); ?>
<?php if($cur_menu == 'team'||$cur_menu == 'question'||$cur_menu == 'about') { ?>
<script type="text/javascript">
    $('#subpage-162').jScrollPane({showArrows: true})
</script>
<?php } ?>
</body>
</html>