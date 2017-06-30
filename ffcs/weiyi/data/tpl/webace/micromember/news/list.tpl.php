<?php defined('IN_IA') or exit('Access Denied');?><?php $_W['breadcrumb'] = array(array('title'=>'微会员'),array('title'=>'管理会员通知'))?>
<?php include template('common/header', TEMPLATE_INCLUDEPATH);?>
<div class="page-header">
    <h1>
        <i class="icon-cog"></i> 会员通知
    </h1>
</div>

<ul class="nav nav-tabs">
    <li ><a href="<?php echo create_url('micromember/notify',array('type'=>'add'))?>">添加会员通知</a></li>
    <li class="active"><a href="<?php echo create_url('micromember/notify',array('type'=>'list'))?>">管理会员通知</a></li>
</ul>
<div class="main">
    <div class="search tab-panel">
        <form action="" method="post">
            <input type="hidden" name="type" value="list" />
            <table class="table table-bordered tb">
                <tbody>
                <tr>
                    <th>通知标题</th>
                    <td>
                        <input class="span6" name="title" type="text" value="<?php echo $queryTitle;?>">
                    </td>
                </tr>
                <tr>
                    <th>通知内容</th>
                    <td>
                        <input class="span6" name="content" type="text" value="<?php echo $queryContent;?>">
                    </td>
                </tr>
                <tr >
                    <td colspan="2">
                        <br>
                        <button class=" btn btn-sm btn-primary"><i class="icon-search icon-large"></i> 搜索</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
    </div>

    <div class="rule">
        <?php if(is_array($newsList)) { foreach($newsList as $row) { ?>
        <table class="tb table table-bordered">
            <tr class="control-group">
                <td class="rule-content">
                    <h4>
                        <span class="pull-right"><a onclick="return confirm('删除该会员通知，确认吗？');return false;" href="<?php echo create_url('micromember/notify', array('id' => $row['id'], 'type' => 'delete'))?>">删除</a></span>
                        <?php echo $row['title'];?>
                    </h4>
                </td>
            </tr>
            <tr class="control-group">
                <td class="rule-kw">
                    <div style="max-height: 80px; overflow: hidden;">
                        <?php echo $row['content'];?>
                    </div>
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
