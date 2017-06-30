<?php
/**
 * 刮刮卡抽奖模块
 *
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');

class ScratchModuleSite extends WeModuleSite {
	public function getProfileTiles() {

	}

	public function getHomeTiles($keyword = '') {
        global $_W;
		$urls = array();
		$list = pdo_fetchall("SELECT name, id FROM ".tablename('rule')." WHERE module = 'scratch' AND weid = ".$_W['weid'].(!empty($keyword) ? " AND name LIKE '%{$keyword}%'" : ''));
		if (!empty($list)) {
			foreach ($list as $row) {
				$urls[] = array('title'=>$row['name'], 'url'=> $this->createMobileUrl('lottery', array('id' => $row['id'])));
			}
		}
		return $urls;
	}

	public function doMobileLottery() {
        global $_GPC;
        $title = '刮刮卡抽奖';
        $fromuser = authcode(base64_decode($_GPC['from_user']), 'DECODE');
        $weid = $_GET['weid'];
        if (empty($fromuser)) {
            message('非法访问，请重新发送消息进入砸蛋页面！');
        }
        $id = intval($_GPC['id']);
        $scratch = pdo_fetch("SELECT id, maxlottery, default_tips, rule FROM ".tablename('scratch_reply')." WHERE rid = '$id' LIMIT 1");
        if (empty($scratch)) {
            message('非法访问，请重新发送消息进入刮刮卡页面！');
        }
        //用户已抽奖次数
        $total = pdo_fetchcolumn("SELECT COUNT(*) FROM ".tablename('scratch_winner')." WHERE createtime > '".strtotime(date('Y-m-d'))."' AND from_user = '$fromuser' AND (award = '中奖励积分' OR award = '未中奖励积分') AND rid = '$id' ");

        $member = fans_searchWithWeid($fromuser,$weid);
        $myaward = pdo_fetchall("SELECT award, description FROM ".tablename('scratch_winner')." WHERE from_user = '{$fromuser}' AND award <> '未中奖励积分' AND award <> '中奖励积分' AND rid = '$id' ORDER BY createtime DESC");

        $sql = "SELECT DISTINCT a.id,a.award, b.realname FROM ".tablename('scratch_winner')." AS a
				LEFT JOIN ".tablename('fans')." AS b ON a.from_user = b.from_user AND a.weid = b.weid WHERE b.mobile <> '' AND b.realname <> '' AND a.award <> '未中奖励积分' AND award <> '中奖励积分' AND a.rid = '$id' ORDER BY a.createtime DESC LIMIT 20";
        $otheraward = pdo_fetchall($sql);

        include $this->template('lottery');
	}

	public function doMobileGetAward() {
        global $_GPC, $_W;

        $fromuser = authcode(base64_decode($_GPC['from_user']), 'DECODE');
        $weid = $_GET['weid'];
        if (empty($fromuser)) {
            exit('非法参数！');
        }
        $id = intval($_GPC['id']);
        if (isset($_GPC['flag'])==false){
            $scratch = pdo_fetch("SELECT id, maxlottery, default_tips, misscredit, hitcredit, start_time, end_time FROM ".tablename('scratch_reply')." WHERE rid = '$id' LIMIT 1");
            if (empty($scratch)) {
                exit('非法参数！');
            }
            //判断时间是否过期
            if(!empty($scratch)){
                if(($scratch['start_time']<time() && $scratch['end_time']>time()) || (empty($scratch['start_time']) && empty($scratch['end_time'])) ){
                    $is_expired = false;//没过期
                }else{
                    $is_expired = true;//过期
                }
                if($is_expired){
                    $result = array('status'=>-2,'message'=>'刮刮卡活动已经结束！');
                    message($result, '', 'ajax');
                    die();
                }
            }

            $result = array('status' => -1, 'message' => '');
            $total = pdo_fetchcolumn("SELECT COUNT(*) FROM ".tablename('scratch_winner')." WHERE createtime > '".strtotime(date('Y-m-d'))."' AND from_user = '$fromuser' AND (award = '中奖励积分' OR award = '未中奖励积分') AND rid = '$id'");
            if (!empty($scratch['maxlottery']) && $total >= $scratch['maxlottery']) {
                $result['message'] = '您已经超过当日刮卡次数';
                message($result, '', 'ajax');
            }

        }elseif ($_GPC['flag']==1){

            $gifts = pdo_fetchall("SELECT id, probalilty, inkind FROM ".tablename('scratch_award')." WHERE rid = '$id' AND total > 0 ORDER BY probalilty ASC");
            //计算每个礼物的概率
            $probability = 0;
            $rate = 1;
            $award = array();
            foreach ($gifts as $name => $gift){
                if (empty($gift['probalilty'])) {
                    continue;
                }
                if ($gift['probalilty'] < 1) {
                    $temp = explode('.', $gift['probalilty']);
                    $temp = pow(10, strlen($temp[1]));
                    $rate = $temp < $rate ? $rate : $temp;
                }
                $probability = $probability + $gift['probalilty'] * $rate;
                $award[] = array('id' => $gift['id'], 'probalilty' => $probability, 'inkind' => $gift['inkind']);
            }
            $all = 100 * $rate;
            if($probability < $all){
                $award[] = array('title' => '','probalilty' => $all, 'inkind' => $gift['inkind']);
            }
            mt_srand((double) microtime()*1000000);
            $rand = mt_rand(1, $all);
            foreach ($award as $key => $gift){
                if(isset($award[$key - 1])){
                    if($rand > $award[$key -1]['probalilty'] && $rand <= $gift['probalilty']){
                        $awardid = $gift['id'];
                        $inkind = $gift['inkind'];
                        break;
                    }
                }else{
                    if($rand > 0 && $rand <= $gift['probalilty']){
                        $awardid = $gift['id'];
                        $inkind = $gift['inkind'];
                        break;
                    }
                }
            }
            $title = '';
            $result['message'] = empty($scratch['default_tips']) ? '' : $scratch['default_tips'];
            $data = array(
                'rid' => $id,
                'from_user' => $fromuser,
                'status' => (!empty($awardid) &&  $inkind == 1) ? 0 : 1,
                'createtime' => TIMESTAMP,
            );
            $credit = array(
                'rid' => $id,
                'award' => (empty($awardid) ? '未中' : '中') . '奖励积分',
                'from_user' => $fromuser,
                'status' => 1,	//积分不需要领奖，status设置为1
                'description' => (empty($awardid) ? $scratch['misscredit'] : $scratch['hitcredit']),
                'createtime' => TIMESTAMP,
            );
            if (!empty($awardid)) {
                $gift = pdo_fetch("SELECT * FROM ".tablename('scratch_award')." WHERE rid = '$id' AND id = '$awardid'");
                if ($gift['total'] > 0) {
                    $data['award'] = $gift['title'];
                    if (!empty($gift['inkind'])) {
                        $data['description'] = $gift['description'];
                        pdo_query("UPDATE ".tablename('scratch_award')." SET total = total - 1 WHERE rid = '$id' AND id = '$awardid'");
                    } else {
                        $gift['activation_code'] = iunserializer($gift['activation_code']);
                        $code = array_pop($gift['activation_code']);
                        pdo_query("UPDATE ".tablename('scratch_award')." SET total = total - 1, activation_code = '".iserializer($gift['activation_code'])."' WHERE rid = '$id' AND id = '$awardid'");
                        $data['description'] = '兑换码：' . $code . '<br /> 兑换地址：' . $gift['activation_url'];
                    }
                    $result['message'] = $data['award'];
                    $result['status'] = 0;
                } else {
                    $credit['description'] = $scratch['misscredit'];
                    $credit['award'] = '未中奖励积分';
                }
            }

                $data['aid'] = $gift['id'];
                $data['weid'] = $weid;
                if (is_array($credit)) {
                    $credit['weid'] = $weid;
                    pdo_insert('scratch_winner', $credit);
                    //更新fans表总积分
                    $user_credit = pdo_fetch("SELECT credit FROM ".tablename('fans')." WHERE from_user = '$fromuser' AND weid = '$weid'");
                    $curr_credit = (empty($awardid) ? $scratch['misscredit'] : $scratch['hitcredit']);
                    if($curr_credit > 0){
                        $user_credit['credit'] = $user_credit['credit'] + $curr_credit;	//累加本次活动积分

                        pdo_update('fans', array('credit'=>$user_credit['credit']), array('from_user' => $fromuser,'weid'=>$weid));
                    }

                }

                /*当$data['award']不为空，中奖时，才插入中奖信息*/
                if(isset($data['award']) && !empty($data['award'])){
                    pdo_insert('scratch_winner', $data);
                }
        }


        $result['myaward'] = pdo_fetchall("SELECT award, description FROM ".tablename('scratch_winner')." WHERE from_user = '{$fromuser}' AND award <> '中奖励积分' AND award <> '未中奖励积分' AND rid = '$id' AND weid = '$weid' ORDER BY createtime DESC");
        /*中奖名单*/
        $sql = "SELECT DISTINCT a.id,a.award, b.realname FROM ".tablename('scratch_winner')." AS a
				LEFT JOIN ".tablename('fans')." AS b ON a.from_user = b.from_user AND a.weid = b.weid WHERE b.mobile <> '' AND b.realname <> '' AND award <> '中奖励积分' AND award <> '未中奖励积分' AND a.rid = '$id' ORDER BY a.createtime DESC LIMIT 20";
        $result['otheraward']= pdo_fetchall($sql);
        message($result, '', 'ajax');
	}

	public function doMobileRegister() {
        global $_GPC, $_W;
        $title = '刮刮卡领奖登记个人信息';
        $weid = $_GET['weid'];
        $fromuser = authcode(base64_decode($_GPC['from_user']), 'DECODE');
        $id = intval($_GPC['id']);
        $member = fans_searchWithWeid($fromuser,$weid,array('realname', 'mobile', 'qq'));
        if (!empty($_GPC['submit'])) {
            $data = array(
                'realname' => $_GPC['realname'],
                'mobile' => $_GPC['mobile'],
                'qq' => $_GPC['qq'],
                'weid'=>$weid,
            );
            if (empty($data['realname'])) {
                die('<script>alert("请填写您的真实姓名！");location.reload();</script>');
            }
            if (empty($data['mobile'])) {
                die('<script>alert("请填写您的手机号码！");location.reload();</script>');
            }
            if (empty($member)) {
                $data['from_user'] = $fromuser;
                pdo_insert('fans', $data);
            } else {
                pdo_update('fans', $data, array('from_user' => $fromuser,'weid'=>$weid));
            }
            die('<script>alert("登记成功！");location.href = "'.$this->createMobileUrl('lottery', array('id' => intval($_GPC['id']),'from_user' => base64_encode(authcode($fromuser, 'ENCODE')))).'";</script>');

        }

        include $this->template('register');
	}

    public function doWebawardlist() {
        global $_GPC, $_W;
        checklogin();
        $id = intval($_GPC['id']);
        //$weid = intval($_GET['weid']);

        if (checksubmit('delete')) {
            if(!is_array($_GPC['select'])){
                message('请先选择要删除的记录！', '', 'error');
            }else{
                /*回调链接额外参数*/
                $param_arr = array();
                $param_arr['do'] = 'awardlist';
                $param_arr['name'] = 'scratch';
                $param_arr['id'] = $id;
                $param_arr['page'] = $_GPC['page'];
                $param_arr['isregister'] = $_GPC['isregister'];
                $param_arr['isaward'] = $_GPC['isaward'];
                $param_arr['profile'] = $_GPC['profile'];
                $param_arr['profilevalue'] = $_GPC['profilevalue'];
                $param_arr['award'] = $_GPC['award'];
                $param_arr['awardvalue'] = $_GPC['awardvalue'];
                $param_arr['start'] = $_GPC['start'];
                $param_arr['end'] = $_GPC['end'];

                pdo_delete('scratch_winner', " id  IN  ('".implode("','", $_GPC['select'])."')");
                message('删除成功！', create_url('site/module', $param_arr));
            }
        }
        if (!empty($_GPC['wid'])) {
            $wid = intval($_GPC['wid']);
            pdo_update('scratch_winner', array('status' => intval($_GPC['status'])), array('id' => $wid));

            /*回调链接额外参数*/
            $param_arr = array();
            $param_arr['do'] = 'awardlist';
            $param_arr['name'] = 'scratch';
            $param_arr['id'] = $id;
            $param_arr['page'] = $_GPC['page'];
            $param_arr['isregister'] = $_GPC['isregister'];
            $param_arr['isaward'] = $_GPC['isaward'];
            $param_arr['profile'] = $_GPC['profile'];
            $param_arr['profilevalue'] = $_GPC['profilevalue'];
            $param_arr['award'] = $_GPC['award'];
            $param_arr['awardvalue'] = $_GPC['awardvalue'];
            $param_arr['start'] = $_GPC['start'];
            $param_arr['end'] = $_GPC['end'];

            message('标识领奖成功！', create_url('site/module', $param_arr));
        }
        $pindex = max(1, intval($_GPC['page']));
        $psize = 50;
        $where = '';
        $starttime = !empty($_GPC['start']) ? strtotime($_GPC['start']) : TIMESTAMP;
        $endtime = !empty($_GPC['end']) ? strtotime($_GPC['end']) : TIMESTAMP;
        if (!empty($starttime) && $starttime == $endtime) {
            $endtime = $endtime + 86400 - 1;
        }
        $condition = array(
            'isregister' => array(
                '',
                " AND b.realname <> ''",
                " AND b.realname = ''",
            ),
            'isaward' => array(
                '',
                " AND a.award <> '未中奖励积分'",
                " AND a.award = '未中奖励积分'",
            ),
            'qq' => " AND b.qq ='{$_GPC['profilevalue']}'",
            'mobile' => " AND b.mobile ='{$_GPC['profilevalue']}'",
            'realname' => " AND b.realname ='{$_GPC['profilevalue']}'",
            'title' => " AND a.award = '{$_GPC['awardvalue']}'",
            'description' => " AND a.description = '{$_GPC['awardvalue']}'",
            'starttime' => " AND a.createtime >= '$starttime'",
            'endtime' => " AND a.createtime <= '$endtime'",
        );
        if (!isset($_GPC['isregister'])) {
            $_GPC['isregister'] = 1;
        }
        $where .= $condition['isregister'][$_GPC['isregister']];
        if (!isset($_GPC['isaward'])) {
            $_GPC['isaward'] = 1;
        }
        $where .= $condition['isaward'][$_GPC['isaward']];
        if (!empty($_GPC['profile'])) {
            $where .= $condition[$_GPC['profile']];
        }
        if (!empty($_GPC['award'])) {
            $where .= $condition[$_GPC['award']];
        }
        if (!empty($starttime)) {
            $where .= $condition['starttime'];
        }
        if (!empty($endtime)) {
            $where .= $condition['endtime'];
        }
        $sql = "SELECT DISTINCT a.id, a.award, a.description, a.status, a.createtime, b.realname, b.mobile, b.qq FROM ".tablename('scratch_winner')." AS a
				LEFT JOIN ".tablename('fans')." AS b ON a.from_user = b.from_user AND a.weid = b.weid WHERE a.rid = '$id' $where ORDER BY a.createtime DESC, a.status ASC LIMIT ".($pindex - 1) * $psize.",{$psize}";
        $list = pdo_fetchall($sql);

        if (!empty($list)) {
            $total = pdo_fetchcolumn("SELECT COUNT(DISTINCT a.id) FROM ".tablename('scratch_winner')." AS a
				LEFT JOIN ".tablename('fans')." AS b ON a.from_user = b.from_user AND a.weid = b.weid WHERE a.rid = '$id' $where");
            $pager = pagination($total, $pindex, $psize);
        }

        include $this->template('awardlist');
    }

}