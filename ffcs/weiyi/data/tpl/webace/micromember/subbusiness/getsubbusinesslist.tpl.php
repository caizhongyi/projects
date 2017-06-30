<?php defined('IN_IA') or exit('Access Denied');?><?php $_W['breadcrumb'] = array(array('title'=>'微会员'),array('title'=>'管理分店'))?>
<?php include template('common/header', TEMPLATE_INCLUDEPATH);?>
<div class="page-header">
    <h1>
        <i class="icon-cog"></i> 管理分店
    </h1>
</div>
<ul class="nav nav-tabs">
    <li ><a href="<?php echo create_url('micromember/setsubbusiness',array('type'=>'edit'))?>">添加分店</a></li>
    <li class="active"><a href="<?php echo create_url('micromember/setsubbusiness',array('type'=>'list'))?>">管理分店</a></li>
</ul>
<div class="main">
    <div class="rule">
        <?php if(is_array($subbusiness_setting)) { foreach($subbusiness_setting as $row) { ?>
        <table class="tb table table-bordered">
            <tr class="control-group">
                <td class="rule-content">
                    <h4>
                        <span class="pull-right"><a onclick="return confirm('删除该分店，确认吗？');return false;" href="<?php echo create_url('micromember/setsubbusiness', array('id' => $row['id'], 'type' => 'delete'))?>">删除</a><a href="<?php echo create_url('micromember/setsubbusiness', array('id' => $row['id'],'type'=>'edit'))?>">编辑</a></span>
                        <?php echo $row['name'];?>
                    </h4>
                </td>
            </tr>
        </table>
        <?php } } ?>
    </div>
    <?php echo $pager;?>
</div>
<script type="text/javascript">
    <!--
    var category = <?php echo json_encode($children)?>;

    //-->
</script>
<?php include template('common/footer', TEMPLATE_INCLUDEPATH);?>
