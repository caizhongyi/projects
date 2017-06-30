<?php defined('IN_IA') or exit('Access Denied');?><?php $_W['breadcrumb'] = array(array('title'=>'微会员'),array('title'=>'积分设置'))?>
<?php include template('common/header', TEMPLATE_INCLUDEPATH);?>
<div class="page-header">
    <h1>
        <i class="icon-cog"></i> 积分设置
    </h1>
</div>
<ul class="nav nav-tabs">
    <li class="active"><a href="<?php echo create_url('micromember/pointset',array('type'=>'pointset'))?>">积分设置</a></li>
    <li ><a href="<?php echo create_url('micromember/pointset',array('type'=>'pointlevel'))?>">等级设置</a></li>
</ul>

<div class="main">
    <form action="" method="post" class="form-horizontal form" style="margin-top: 20px;">
        <input name="type" type="hidden" value="pointset"/>
        <input name="id" type="hidden" value="<?php echo $pointsetInfo['id'];?>"/>
        <input name="weid" type="hidden" value="<?php echo $pointsetInfo['weid'];?>"/>
        <table id="form"
               class="tb reply-news-edit">
            <tr>
                <th>会员卡使用说明</th>
                <td><textarea style="height: 80px;" class="span7" cols="70" id="userdesc"
                              name="userdesc"><?php echo $pointsetInfo['userdesc'];?></textarea></td>
            </tr>
            <tr>
                <th>积分规则说明</th>
                <td><textarea style="height: 80px;" class="span7" cols="70" id="pointdesc"
                              name="pointdesc"><?php echo $pointsetInfo['pointdesc'];?></textarea></td>
            </tr>
            <script type="text/javascript">
                kindeditor($('#userdesc'));
                kindeditor($('#pointdesc'));
            </script>
            <tr>
                <th>每天签到奖励</th>
                <td><input type="text" id="" class="span7" placeholder=""
                           name="point1" value="<?php echo $pointsetInfo['point1'];?>"></td>
            </tr>
            <tr>
                <th>连续6天签到奖励</th>
                <td><input type="text" id="" class="span7" placeholder=""
                           name="point6" value="<?php echo $pointsetInfo['point6'];?>"></td>
            </tr>
            <tr>
                <th>消费1元奖励</th>
                <td><input type="text" id="" class="span7" placeholder=""
                           name="point" value="<?php echo $pointsetInfo['point'];?>"></td>
            </tr>
            <tr>
                <th></th>
                <td>
                    <input name="submit" type="submit" value="提交" class="btn btn-sm btn-primary" />
                    <input type="hidden" name="token" value="<?php echo $_W['token'];?>" />
                </td>
            </tr>
        </table>
    </form>
</div>

<?php include template('common/footer', TEMPLATE_INCLUDEPATH);?>
