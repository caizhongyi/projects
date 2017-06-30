<?php
/**
 * 刮刮卡抽奖模块
 *
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');

class ScratchModule extends WeModule {
	public $name = 'ScratchModule';
	public $title = '刮刮卡';
	public $ability = '';
	public $tablename = 'scratch_reply';

	public function fieldsFormDisplay($rid = 0) {
		global $_W;
		if (!empty($rid)) {
			$reply = pdo_fetch("SELECT * FROM ".tablename($this->tablename)." WHERE rid = :rid ORDER BY `id` DESC", array(':rid' => $rid));
			$award = pdo_fetchall("SELECT * FROM ".tablename('scratch_award')." WHERE rid = :rid ORDER BY `id` ASC", array(':rid' => $rid));
			if (!empty($award)) {
				foreach ($award as &$pointer) {
					if (!empty($pointer['activation_code'])) {
                        $pointer_arr =  iunserializer($pointer['activation_code']);
                        if(is_array($pointer_arr)){
                            $pointer['activation_code'] = implode("\n", $pointer_arr);
                        }else{
                            $pointer['activation_code'] = $pointer_arr;
                        }
					}
				}
			}
		} else {
			$reply = array(
				'maxlottery' => 1,
			);
		}
		if (empty($reply['start_time'])) {
			$reply['start_time'] = date('Y-m-d', time()); //默认当前时间
		} else {
			$reply['start_time'] = date('Y-m-d H:i:s', $reply['start_time']);
		}
		if (empty($reply['end_time'])) {
			$reply['end_time'] = date('Y-m-d', time() + 3600 * 24 * 7); //默认一周后
		} else {
			$reply['end_time'] = date('Y-m-d H:i:s', $reply['end_time']);
		}
		include $this->template('form');
	}

	public function fieldsFormValidate($rid = 0) {
		return true;
	}

	public function fieldsFormSubmit($rid = 0) {
		global $_GPC, $_W;
		$id = intval($_GPC['reply_id']);
		$insert = array(
			'rid' => $rid,
			'picture' => $_GPC['picture'],
			'description' => $_GPC['description'],
			'maxlottery' => intval($_GPC['maxlottery']),
			'rule' => htmlspecialchars_decode($_GPC['rule']),
			'default_tips' => $_GPC['default_tips'],
			'hitcredit' => intval($_GPC['hitcredit']),
			'misscredit' => intval($_GPC['misscredit']),
			'start_time' => strtotime($_GPC['start']),
			'end_time' => strtotime($_GPC['end'])
		);
		if (empty($id)) {
			pdo_insert($this->tablename, $insert);
		} else {
			if (!empty($_GPC['picture'])) {
				file_delete($_GPC['picture-old']);
			} else {
				unset($insert['picture']);
			}
			pdo_update($this->tablename, $insert, array('id' => $id));
		}
		if (!empty($_GPC['award-title'])) {
			foreach ($_GPC['award-title'] as $index => $title) {
				if (empty($title)) {
					continue;
				}
				$update = array(
					'title' => $title,
					'description' => $_GPC['award-description'][$index],
					'probalilty' => $_GPC['award-probalilty'][$index],
					'total' => $_GPC['award-total'][$index],
                    'level' => intval($_GPC['award-level'][$index]),
					'activation_code' => '',
					'activation_url' => '',
				);
				if (empty($update['inkind']) && !empty($_GPC['award-activation-code'][$index])) {
					$activationcode = explode("\n", $_GPC['award-activation-code'][$index]);
					$update['activation_code'] = iserializer($activationcode);
					$update['total'] = count($activationcode);
					$update['activation_url'] = $_GPC['award-activation-url'][$index];
				}
				pdo_update('scratch_award', $update, array('id' => $index));
			}
		}
		//处理添加
		if (!empty($_GPC['award-title-new'])) {
			foreach ($_GPC['award-title-new'] as $index => $title) {
				if (empty($title)) {
					continue;
				}
				$insert = array(
					'rid' => $rid,
					'title' => $title,
					'description' => $_GPC['award-description-new'][$index],
					'probalilty' => $_GPC['award-probalilty-new'][$index],
					'inkind' => intval($_GPC['award-inkind-new'][$index]),
					'total' => intval($_GPC['award-total-new'][$index]),
                    'level' => intval($_GPC['award-level-new'][$index]),
					'activation_code' => '',
					'activation_url' => '',
				);

				if (empty($insert['inkind'])) {
					$activationcode = explode("\n", $_GPC['award-activation-code-new'][$index]);
					$insert['activation_code'] = iserializer($activationcode);
					$insert['total'] = count($activationcode);
					$insert['activation_url'] = $_GPC['award-activation-url-new'][$index];
				}
				pdo_insert('scratch_award', $insert);
			}
		}
	}

	public function ruleDeleted($rid = 0) {
		global $_W;
		$replies = pdo_fetchall("SELECT id,picture FROM ".tablename($this->tablename)." WHERE rid = '$rid'");
		$deleteid = array();

		if (!empty($replies)) {
			foreach ($replies as $index => $row) {
                file_delete($row['picture']);
				$deleteid[] = $row['id'];
			}
		}
		pdo_delete($this->tablename, "id IN ('".implode("','", $deleteid)."')");
		return true;
	}

	public function doFormDisplay() {
		global $_W, $_GPC;
		$result = array('error' => 0, 'message' => '', 'content' => '');
		$result['content']['id'] = $GLOBALS['id'] = 'add-row-news-'.$_W['timestamp'];
		$result['content']['html'] = $this->template('item', TEMPLATE_FETCH);
		exit(json_encode($result));
	}



	public function doDelete() {
		global $_W,$_GPC;
		$id = intval($_GPC['id']);
		$sql = "SELECT id FROM " . tablename('scratch_award') . " WHERE `id`=:id";
		$row = pdo_fetch($sql, array(':id'=>$id));
		if (empty($row)) {
			message('抱歉，奖品不存在或是已经被删除！', '', 'error');
		}
		if (pdo_delete('scratch_award', array('id' => $id))) {
			message('删除奖品成功', '', 'success');
		}
	}

}