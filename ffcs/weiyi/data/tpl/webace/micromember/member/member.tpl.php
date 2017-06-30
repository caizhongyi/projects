<?php defined('IN_IA') or exit('Access Denied');?><?php $_W['breadcrumb'] = array(array('title'=>'微会员'),array('title'=>'会员管理'))?>
<?php include template('common/header', TEMPLATE_INCLUDEPATH);?>
<div class="page-header">
    <h1>
        <i class="icon-cog"></i> 会员管理
    </h1>
</div>
<div class="main">
    <!--<div class="search">-->
    <div>
        <form action="" method="post">
            <input type="hidden" name="type" value="list" />
            <table class="table table-striped table-bordered table-hover">
                <tbody>
                <tr>
                    <th>会员名称</th>
                    <td>
                        <input class="span6" name="realname" type="text" value="<?php echo $queryRealname;?>">
                    </td>
                </tr>
                <tr>
                    <th>手机号码</th>
                    <td>
                        <input class="span6" name="mobile" type="text" value="<?php echo $queryMobile;?>">
                    </td>
                </tr>
                <tr>
                    <th>会员编号</th>
                    <td>
                        <input class="span6" name="number"  type="text" value="<?php echo $queryNumber;?>">
                    </td>
                </tr>
                <tr class="search-submit">
                    <td colspan="2"><button class="btn btn-sm btn-primary"><i class="icon-search icon-large"></i> 搜索</button></td>
                </tr>
                </tbody>
            </table>
        </form>
    </div>

    <div class="rule">

        <table class="table table-striped table-bordered table-hover">
            <thead>
                <tr>
                    <th>会员编号</th>
                    <th>姓名</th>
                    <th>手机号码</th>
                    <th>操作</th>
                </tr>
            </thead>
            <?php if(is_array($member)) { foreach($member as $row) { ?>
            <tr>
                <td><?php echo $row['number'];?></td>
                <td><?php echo $row['realname'];?></td>
                <td><?php echo $row['mobile'];?></td>
                <td>
                    <span><a href="<?php echo create_url('micromember/member', array('from_user' => $row['from_user'],'type'=>'detail'))?>">详细</a></span>
                </td>
                <td><?php echo $row['number'];?></td>
            </tr>
            <?php } } ?>
        </table>

    </div>
    <?php echo $pager;?>
</div>

<?php include template('common/footer', TEMPLATE_INCLUDEPATH);?>
