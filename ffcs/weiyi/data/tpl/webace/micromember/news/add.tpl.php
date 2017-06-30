<?php defined('IN_IA') or exit('Access Denied');?><?php $_W['breadcrumb'] = array(array('title'=>'微会员'),array('title'=>'管理会员通知'),array('title'=>'会员通知设置'))?>
<?php include template('common/header', TEMPLATE_INCLUDEPATH);?>
<div class="page-header">
    <h1>
        <i class="icon-cog"></i> 会员通知设置
    </h1>
</div>
<ul class="nav nav-tabs">
    <li class="active"><a href="<?php echo create_url('micromember/notify',array('type'=>'add'))?>">添加会员通知</a></li>
    <li ><a href="<?php echo create_url('micromember/notify',array('type'=>'list'))?>">管理会员通知</a></li>
</ul>
<div class="main tab-panel">
    <form action="" method="post" class="form-horizontal form" style="margin-top: 20px;">
        <input name="type" type="hidden" value="post"/>
        <table id="form"  class="tb reply-news-edit">
            <tr>
                <th>通知标题</th>
                <td><input type="text" id="" class="span7" placeholder=""
                           name="title" value=""></td>
            </tr>

            <tr>
                <th>通知内容</th>
                <td><textarea style="height: 80px;" class="span7" cols="70" id="content"
                              name="content"></textarea>
                </td>
                <script type="text/javascript">
                    kindeditor($('#content'));
                </script>
            </tr>

            <tr>
                <th>通知对象</th>
                <td>
                    <select name="level" id="level">
                        <option value="0" >所有人</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th></th>
                <td>
                    <input name="submit" type="submit" value="提交" class="btn btn-sm btn-primary " />
                    <input type="hidden" name="token" value="<?php echo $_W['token'];?>" />
                </td>
            </tr>
        </table>
    </form>
</div>

<?php include template('common/footer', TEMPLATE_INCLUDEPATH);?>
