<?php
/**
 * 库文件模块处理程序
 *
 * @author ffcsteam
 * @url 
 */
defined('IN_IA') or exit('Access Denied');

class BusinessofficeModuleProcessor extends WeModuleProcessor {
	public function respond() {
		$content = $this->message['content'];
		//这里定义此模块进行消息处理时的具体过程, 请查看微翼文档来编写你的代码
	}
}