<?php
/**
 * 图文回复处理类
 * 
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');

class NewsModuleProcessor extends WeModuleProcessor {
	public function respond() {
		global $_W;
		$rid = $this->rule;
		$sql = "SELECT id FROM " . tablename('news_reply') . " WHERE `rid`=:rid AND parentid = 0 ORDER BY RAND()";
		$main = pdo_fetch($sql, array(
			':rid' => $rid
		));
		if (empty($main['id'])) {
			return array();
		}
		$sql = "SELECT * FROM " . tablename('news_reply') . " WHERE id = :id OR parentid = :parentid ORDER BY parentid ASC, id ASC LIMIT 20";
		$commends = pdo_fetchall($sql, array(
			':id' => $main['id'], 
			':parentid' => $main['id']
		));
		$news = array();
		foreach ( $commends as $c ) {
			$row = array();
			$row['title'] = $c['title'];
			$row['description'] = $c['description'];
			! empty($c['thumb']) && $row['picurl'] = $_W['attachurl'] . trim($c['thumb'], '/');
			//图文源链接bug修复by hongmingjie 13/11/06
			if (! empty($c['url']) && empty($c['islocation'])) {
                if(preg_match('/mobile.php?/',$c['url'])){
                    $row['url'] = $c['url'].'&from_user='.base64_encode(authcode($this->message['from'], 'ENCODE')).'&weid='.$_W['account']['weid'];
                }else{
                    $row['url'] = $c['url'];
                }
			} else {
                $row['url'] = $this->createMobileUrl('detail', array( 'name' => 'news', 'id' => $c['id'],'from_user'=>base64_encode(authcode($this->message['from'], 'ENCODE')),'weid'=>$_W['account']['weid']));
            }
			$news[] = $row;
		}
		return $this->respNews($news);
	}
}
