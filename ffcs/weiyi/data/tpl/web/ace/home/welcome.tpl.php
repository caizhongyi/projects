<?php defined('IN_IA') or exit('Access Denied');?>
<div class="main">
	<div>
    <div class="container-fluid">
		<?php  if($do == 'global') { ?>
		<table class="table table-striped table-bordered table-hover">
			<thead  >
				<tr>
					<th style="width:10%;">名称</th>
					<th style="width:10%;">类型</th>
					<th style="width:10%;">粉丝</th>
					<th style="width:10%;">规则</th>
					<th style="width:10%;">请求数</th>
					<th style="width:30%;">功能</th>
					<th >操作</th>
				</tr>
			</thead>
			<?php  if(is_array($wechats)) { foreach($wechats as $item) { ?>
			<tr>
				<td><?php  echo $item['name'];?></td>
                <td><?php  if($item['type'] ==1) { ?>
                    <?php  if(!empty($item['key']) && !empty($item['secret'])) { ?>
                    <span class="label label-info"></span>微信服务号
                    <?php  } else { ?>
                    <span class="label label-success">微信订阅号</span>
                    <?php  } ?>
                    <?php  } else { ?>
                    <span class="label label-warning">易信帐号</span>
                    <?php  } ?>
                </td>
                <td>
					<p>总粉丝：<?php  echo $item['fans']['total'];?><p>
					<p>当日增加：<?php  echo $item['fans']['todayjoin'];?><p>
					<p>当日流失：<?php  echo $item['fans']['todayquit'];?><p>
				</td>
				<td>
					<p>基本文字：<?php  echo $item['rule']['basic'];?><p>
					<p>图文混合：<?php  echo $item['rule']['news'];?><p>
					<p>基本语音：<?php  echo $item['rule']['music'];?><p>
					<p>其它：<?php  echo $item['rule']['other'];?><p>
				</td>
				<td>
					<p>总请求：<?php  echo $item['response']['total'];?><p>
					<p>当月请求：<?php  echo $item['response']['month'];?><p>
					<p>当日请求：<?php  echo $item['response']['today'];?><p>
				</td>
				<td class="funcmenus" weid="<?php  echo $item['weid'];?>">
					<p><a href="<?php  echo create_url('rule')?>">规则管理</a>&nbsp;|&nbsp;<a href="<?php  echo create_url('setting/category')?>">分类管理</a>&nbsp;|&nbsp;<a href="<?php  echo create_url('member/module')?>">模块管理</a></p>
					<p><a href="<?php  echo create_url('rule/post')?>">添加规则</a>&nbsp;|&nbsp;<a href="<?php  echo create_url('menu')?>">自定义菜单设置</a>&nbsp;|&nbsp;<a href="<?php  echo create_url('rule/system')?>">系统回复设置</a></p>
					<p><a href="<?php  echo create_url('site/style')?>">风格管理</a>&nbsp;|&nbsp;<a href="<?php  echo create_url('site/nav')?>">导航管理</a></p>
				</td>
				<td>
					<p><a href="<?php  echo create_url('account/post', array('id' => $item['weid']))?>">编辑</a>&nbsp;|&nbsp;<a href="<?php  echo create_url('account/switch', array('id' => $item['weid']))?>">切换</a></p>
				</td>
			</tr>
			<?php  } } ?>
		</table>
		<script type="text/javascript">
		<!--
			$('.funcmenus').each(function(){
				var weid = $(this).attr('weid');
				$(this).find('a').each(function(){
					$(this).click(function(){
						var url = $(this).attr('href');
						ajaxopen('account.php?act=switch&id='+weid, function(s){
							location.href = url;
							$('#current-account', window.parent.document).html(s);
							return false;
						});
						return false;
					});
				});
			});
		//-->
		</script>
		<?php  } else { ?>
        <div class="alert alert-warning">
            <button data-dismiss="alert" class="close" type="button">×</button>
            <?php  if(empty($wechats)) { ?>
            <h4> 您还未绑定公众号，请做如下操作：</h4>
            <p><i class="icon-remove"></i> 1、绑定公众号 ! <a href="account.php?act=post&action=guide">绑定</a></p>
            <p><i class="icon-remove"></i> 2、添加规则 !</p>
            <?php  } else if(empty($rule_nums)) { ?>
            <h4>您的公众号还未添加规则，请做如下操作：</h4>
            <p class="text-success"><i class="icon-ok"></i> 1、绑定公众帐号 !</p>
            <p><i class="icon-remove"></i> 2、添加规则  <a href="rule.php?act=post&action=guide">添加</a></p>
            <?php  } else { ?>
            <h4> 您已成功绑定公众号</h4>
            <p class="text-success"><i class="icon-ok"></i> 1、绑定公众帐号 !</p>
            <p class="text-success"><i class="icon-ok"></i> 2、添加规则  <a href="rule.php?act=post&action=guide">添加</a></p>
            <?php  } ?>
        </div>
            <?php  if(!empty($wechats)) { ?>
                <table class="table">
                <tr><th colspan="2" class="alert alert-info">公众号情况</th></tr>
                <tr>
                    <th style="width:250px;">公众号</th>
                    <td><?php  echo $_W['account']['name'];?></td>
                </tr>
                <tr>
                    <th style="width:250px;">统计</th>
                    <td>
                        <p><span style="width:100px;display:inline-block;">总粉丝：</span><?php  echo $current_wechats['fans']['total'];?></p>
                        <p><span style="width:100px;display:inline-block;">当日增加粉丝：</span><?php  echo $current_wechats['fans']['todayjoin'];?></p>
                        <p><span style="width:100px;display:inline-block;">当日请求消息：</span>$current_wechats['response']['today']}</p>
                    </td>
                </tr>
                <tr>
                    <th>接入平台</th>
                    <td>
                        <p><span style="width:80px;display:inline-block;">接口地址：</span><?php  echo $_W['siteroot'];?>api.php?hash=<?php  echo $_W['account']['hash'];?></p>
                        <p><span style="width:80px;display:inline-block;">Token：</span><?php  echo $_W['account']['token'];?></p>
                    </td>
                </tr>
                <?php  if(!empty($_W['account']['key']) && !empty($_W['account']['secret'])) { ?>
                <tr>
                    <th>授权相关</th>
                    <td>
                        <p><span style="width:80px;display:inline-block;">AppId：</span><?php  echo $_W['account']['key'];?></p>
                        <p><span style="width:80px;display:inline-block;">Secret：</span><?php  echo $_W['account']['secret'];?></p>
                    </td>
                </tr>
                <?php  } ?>
                <tr>
                    <th>二维码及头像</th>
                    <td>
                        <img class="img-polaroid" style="float:left;margin-right:10px" src="<?php  echo $_W['attachurl'];?>/qrcode_<?php  echo $_W['weid'];?>.jpg?weid=<?php  echo $_W['account']['weid'];?>" width="150" onerror="$(this).remove();" />
                        <img class="img-polaroid" style="float:left;margin-right:10px" src="<?php  echo $_W['attachurl'];?>/headimg_<?php  echo $_W['weid'];?>.jpg?weid=<?php  echo $_W['account']['weid'];?>" width="85" onerror="$(this).remove();" />
                    </td>
                </tr>
                <tr>
                    <th>欢迎信息：</th>
                    <td>
                        <div>
                            <?php  if($wechat['welcomerid']) { ?>
                            <table class="tb table table-bordered">
                                <tr class="control-group">
                                    <td class="rule-content">
                                        <h4>
                                            <span class="pull-right"><a onclick="return confirm('取消设置的系统回复，确认吗？');return false;" href="<?php  echo create_url('rule/system/cancel', array('type' => 'welcome'))?>">取消</a><a href="<?php  echo create_url('rule/post', array('id' => $wechat[welcome][rule]['id']))?>">编辑</a></span>
                                            <?php  echo $wechat['welcome']['rule']['name'];?> <small>（<?php  echo $_W['modules'][$wechat[welcome][rule][module]]['title'];?>）</small>
                                        </h4>
                                    </td>
                                </tr>
                                <tr class="control-group">
                                    <td class="rule-kw">
                                        <div>
                                            <?php  if(is_array($wechat['welcome']['keyword'])) { foreach($wechat['welcome']['keyword'] as $kw) { ?>
                                            <span><?php  echo $kw['content'];?></span>
                                            <?php  } } ?>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <?php  } else { ?>
                                <?php  echo $_W['account']['welcome'];?>
                            <?php  } ?>
                            <?php  if(empty($wechat['welcomerid']) && empty($_W['account']['welcome'])) { ?>
                                未定义 <a href="<?php  echo create_url('rule/system');?>">去设定</a>
                            <?php  } ?>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>默认回复：</th>
                    <td>
                        <div>
                            <?php  if($wechat['defaultrid']) { ?>
                            <table class="tb table table-bordered">
                                <tr class="control-group">
                                    <td class="rule-content">
                                        <h4>
                                            <span class="pull-right"><a onclick="return confirm('取消设置的系统回复，确认吗？');return false;" href="<?php  echo create_url('rule/system/cancel', array('type' => 'default'))?>">取消</a><a href="<?php  echo create_url('rule/post', array('id' => $wechat[default][rule]['id']))?>">编辑</a></span>
                                            <?php  echo $wechat['default']['rule']['name'];?> <small>（<?php  echo $_W['modules'][$wechat[default][rule][module]]['title'];?>）</small>
                                        </h4>
                                    </td>
                                </tr>
                                <tr class="control-group">
                                    <td class="rule-kw">
                                        <div>
                                            <?php  if(is_array($wechat['default']['keyword'])) { foreach($wechat['default']['keyword'] as $kw) { ?>
                                            <span><?php  echo $kw['content'];?></span>
                                            <?php  } } ?>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <?php  } else { ?>
                                <?php  echo $_W['account']['default'];?>
                            <?php  } ?>
                            <?php  if(empty($wechat['defaultrid']) && empty($_W['account']['default'])) { ?>
                                未定义 <a href="<?php  echo create_url('rule/system');?>">去设定</a>
                            <?php  } ?>
                        </div>
                    </td>
                </tr>

            </table>
            <?php  } ?>
        <?php  } ?>
	</div>
</div>

