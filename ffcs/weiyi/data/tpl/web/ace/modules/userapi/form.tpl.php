<?php defined('IN_IA') or exit('Access Denied');?><input type="hidden" name="reply_id" value="<?php echo $row['id'];?>" />
<div class="alert alert-block alert-new">
	<a class="close" data-dismiss="alert">×</a>
	<h4 class="alert-heading">添加第三方接口</h4>
	<table>
		<tr>
			<th>接口类型：</th>
			<td>
				<label for="radio_1" class="radio inline"><input type="radio" name="type" id="radio_1" onclick="$('#remote').show();$('#location').hide();$('#req-type').show();$('input[name=\'req_type\']').each(function(){if($(this).val()=='xml'){$(this).attr('checked','checked');}});" value="1" <?php if(!$admin || strexists($row['apiurl'], 'http://')) { ?>checked="checked"<?php } ?> /> 远程地址</label>
				<?php if($admin) { ?><label for="radio_0" class="radio inline"><input type="radio" name="type" id="radio_0" onclick="$('#remote').hide();$('#location').show();$('#req-type').hide();$('#resp-type').hide();" value="0" <?php if(!strexists($row['apiurl'], 'http://')) { ?> checked="checked"<?php } ?> /> 本地文件</label><?php } ?>
			</td>
		</tr>
		<tbody id="remote"  <?php if(!strexists($row['apiurl'], 'http://') || !$admin) { ?> style="display:none;"<?php } ?>>
			<tr>
				<th>远程地址：</th>
				<td>
					<input type="text" id="" class="span7" placeholder="" name="apiurl" value="<?php echo $row['apiurl'];?>">
					<div class="help-block" style="margin-top:10px;">
					<ol style="margin-top:10px;">
						<li>使用远程地址接口，你可以兼容其他的微信公众平台管理工具。</li>
						<li>你应该填写其他平台提供给你保存至公众平台的URL和Token</li>
						<li>添加此模块的规则后，只针对于单个规则定义有效，如果需要全部路由给接口处理，则修改该模块的优先级顺序。</li>
						<li>如果你不知道如何使用该功能，请向平台管理员申请技术支持。</li>
					</ol>
					</div>
				</td>
			</tr>
			<tr>
				<th style="color:red">Token</th>
				<td>
					<input type="text" name="wetoken" class="span6" value="<?php echo $row['token'];?>" /> <a href="javascript:;" onclick="tokenGen();">生成新的</a>
					<div class="help-block">与目标平台接入设置值一致，必须为英文或者数字，长度为3到32个字符.</div>
				</td>
			</tr>
		</tbody>
		<?php if($admin) { ?>
		<tbody id="location" <?php if(strexists($row['apiurl'], 'http://') || !$admin) { ?> style="display:none;"<?php } ?>>
			<tr>
				<th>文件列表：</th>
				<td>
					<select name="apilocal"><option value="0">请选择本地文件</option><?php if(is_array($apis)) { foreach($apis as $file) { ?><option <?php if($row['apilocal'] == $file) { ?> selected="selected"<?php } ?> value="<?php echo $file;?>"><?php echo $file;?></option><?php } } ?></select>
					<div class="help-block" style="margin-top:10px;">
						<ol style="margin-top:10px;">
							<li>使用本地文件扩展你可以快速的扩展微擎功能。</li>
							<li>添加此模块的规则后，只针对于单个规则定义有效，如果需要全部路由给接口处理，则修改该模块的优先级顺序。</li>
							<li>本地文件存放在模块文件夹内（/source/modules/userapi/api）下。</li>
							<li>具体请<a href="http://www.we7.cc/docs/#api" target="_blank">查看“自定义接口回复”文档</a></li>
						</ol>
					</div>
				</td>
			</tr>
		</tbody>
		<?php } ?>
		<!-- 添加请求类型 2013.12.20 -->
		<tbody id="req-type" >
		<tr>
			<th>请求格式：</th>
			<td>
				<label for="reqtype_1" class="radio inline"><input type="radio" name="req_type" id="reqtype_1" value="xml" onclick="$('#resp-type').fadeOut();$('#resptype_1').attr('checked','checked');" <?php if(empty($row['req_type']) || ($row['req_type']=='xml')) { ?>checked<?php } ?>/>标准微信xml</label>
				<label for="reqtype_0" class="radio inline"><input type="radio" name="req_type" id="reqtype_0" value="txt" onclick="$('#resp-type').fadeIn();$('#resptype_0').attr('checked','checked');" <?php if($row['req_type']=='txt') { ?>checked<?php } ?>/> 文本格式</label>
				<br/><p>文本格式：我们会post参数到本接口，以 Content=用户消息&fromUsername=用户加密id&toUsername=你的公众号原始 的方式</p>
			</td>
		</tr>
		</tbody>
		<tbody id="resp-type" <?php if(empty($row['req_type']) || ($row['req_type']=='xml')) { ?>style="display:none;"<?php } ?>>
			<tr>
				<th>响应格式：</th>
				<td>
					<label for="resptype_1" class="radio inline"><input type="radio" name="resp_type" id="resptype_1" value="xml" <?php if(empty($row['resp_type']) || ($row['resp_type']=='xml')) { ?>checked<?php } ?>/>标准微信xml</label>
					<label for="resptype_0" class="radio inline"><input type="radio" name="resp_type" id="resptype_0" value="txt" <?php if($row['resp_type']=='txt') { ?>checked<?php } ?>/> 文本格式</label>
				</td>
			</tr>
		</tbody>
		
		<tr>
			<th>默认回复：</th>
			<td>
				<input type="text" id="" class="span7" placeholder="" name="default-text" value="<?php echo $row['default_text'];?>">
				<div class="help-block">当接口无回复时，则返回用户此处设置的文字信息，优先级高于“默认回复URL”</div>
			</td>
		</tr>
		<tr>
			<th>缓存时间：</th>
			<td><input type="text" id="" class="span7" placeholder="" name="cachetime" value="<?php echo $row['cachetime'];?>">
				<div class="help-block">接口返回数据将缓存在微擎系统中的时限，默认为0不缓存。</div></td>
		</tr>
	</table>
</div>
