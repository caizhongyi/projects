<?php defined('IN_IA') or exit('Access Denied');?><?php if($do == 'account') { ?>

<div class="main">
    <div class="search">
                <div class="row">
                    <div class="col-xs-12 col-sm-8">
                        <div class="input-group">
                            <input type="text"  id="wKeyword"  value="<?php echo $_GPC['keyword'];?>" placeholder="公众号名称" class="form-control search-query">
                                <span class="input-group-btn">
                                    <button class="btn btn-purple btn-sm" onclick="aW.query();" type="button">
                                        搜索
                                        <i class="icon-search icon-on-right bigger-110"></i>
                                    </button>
                                </span>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    <div class="account">
        <table class="table table-bordered tb">
            <thead>
                <tr>
                    <th>公众号码</th>
                    <th>当前所属用户</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <?php if(is_array($wechats)) { foreach($wechats as $row) { ?>
                <tr>
                    <td><?php echo $row['name'];?></td>
                    <td><?php if($row['owner']) { ?><span class="label label-success">当前用户</span><?php } else { ?><?php echo $row['member']['username'];?><?php } ?></td>
                    <td><?php if($row['owner']) { ?><a href="javascript:;" onclick="aW.revo('<?php echo $row['weid'];?>');">收回管理权限</a><?php } else { ?><a href="javascript:;" onclick="aW.auth('<?php echo $row['weid'];?>');">授权此用户管理</a><?php } ?></td>
                </tr>
                <?php } } ?>
            </tbody>
        </table>
        <?php echo $pager;?>
    </div>
</div>
<?php } ?>
<?php if($do == 'module') { ?>



        <table class="table table-bordered tb">
            <thead>
                <tr>
                    <th>模块名称</th>
                    <th>模块标识</th>
                    <th>功能简述</th>
                    <th>可访问否</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <?php if(is_array($modules)) { foreach($modules as $row) { ?>
                <tr>
                    <td><?php echo $row['title'];?></td>
                    <td><?php echo $row['name'];?></td>
                    <td><?php echo $row['ability'];?></td>
                    <td><?php if($row['owner']) { ?><span class="label label-success">可访问</span><?php } ?><?php if($row['issystem']) { ?><span class="label label-success">系统模块</span><?php } ?></td>
                    <td><?php if(!$row['issystem']) { ?><?php if($row['owner']) { ?><a href="javascript:;" onclick="aM.revo('<?php echo $row['mid'];?>');">收回访问权限</a><?php } else { ?><a href="javascript:;" onclick="aM.auth('<?php echo $row['mid'];?>');">授权此用户访问</a><?php } ?><?php } ?></td>
                </tr>
                <?php } } ?>
            </tbody>
        </table>
        <?php echo $pager;?>



<?php } ?>
