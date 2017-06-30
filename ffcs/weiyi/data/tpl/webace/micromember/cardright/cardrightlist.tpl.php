<?php defined('IN_IA') or exit('Access Denied');?><?php $_W['breadcrumb'] = array(array('title'=>'微会员'),array('title'=>'特权管理'))?>
<?php include template('common/header', TEMPLATE_INCLUDEPATH);?>
<div class="page-header">
    <h1>
        <i class="icon-cog"></i> 特权管理
    </h1>
</div>
<ul class="nav nav-tabs">
    <li ><a href="<?php echo create_url('micromember/cardright',array('type'=>'edit'))?>">添加特权</a></li>
    <li class="active"><a href="<?php echo create_url('micromember/cardright',array('type'=>'list'))?>">管理特权</a></li>
</ul>
<div class="main">
    <div class="rule">
        <?php if(is_array($cardright_setting)) { foreach($cardright_setting as $row) { ?>
        <table class="tb table table-bordered">
            <tr class="control-group">
                <td class="rule-content">
                    <h4>
                        <span class="pull-right"><a onclick="return confirm('删除该分店，确认吗？');return false;" href="<?php echo create_url('micromember/cardright', array('id' => $row['id'], 'type' => 'delete'))?>">删除</a><a href="<?php echo create_url('micromember/cardright', array('id' => $row['id'],'type'=>'edit'))?>">编辑</a></span>
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
