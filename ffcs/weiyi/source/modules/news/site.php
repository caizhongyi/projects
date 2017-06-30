<?php
/**
 * 图文模块详细页面
 * @author WeEngine Team
 */
defined('IN_IA') or exit('Access Denied');

class NewsModuleSite extends WeModuleSite {

	public function doMobileDetail() {
        global $_W, $_GPC;
        $id = intval($_GPC['id']);
        $weid = intval($_GPC['weid']);
        $from_user = authcode(base64_decode($_GPC['from_user']), 'DECODE');
        $wechats_info = pdo_fetch("SELECT * FROM " . tablename('wechats') . "where weid=" . $weid );
        $we_name = isset($wechats_info)&&!empty($wechats_info['name'])?$wechats_info['name']:'';
        $sql = "SELECT * FROM " . tablename('news_reply') . " WHERE `id`=:id";
        $row = pdo_fetch($sql, array(':id'=>$id));
        $sql = "SELECT * FROM " . tablename('rule') . " WHERE `id`=:id";
        $rule = pdo_fetch($sql, array(':id'=>$row['rid']));
        if (!empty($row['url'])) {
            //图文源链接bug修复by hongmingjie 13/11/06
            if(empty($row['islocation'])){
                header("Location: ".$row['url']);
            }
        }
        $row = istripslashes($row);
        $row['thumb'] = $_W['attachurl'] . trim($row['thumb'], '/');
	    $title = $row['title'];
        include $this->template('detail');
	}
}