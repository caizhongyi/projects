<?php
/**
 * Created by JetBrains PhpStorm.
 * User: hongmingjie
 * Date: 14-1-8
 * Time: 上午9:58
 * 投票模块
 */

defined('IN_IA') or exit('Access Denied');

class VoteModuleSite extends WeModuleSite {

    public function doMobileList() {
    global $_GPC, $_W;
    $from_user = authcode(base64_decode($_GPC['from_user']), 'DECODE');
    //判断用户是否存在
    $rid = $_GPC['id'];
    $weid =  $_GPC['weid'];
    //获取粉丝投票信息
    $fans_info = pdo_fetch("SELECT * FROM " . tablename('vote_fans') . "where rid=" . $rid." and from_user ='".$from_user."'" );
    //获取投票信息
    $reply_info = pdo_fetch("SELECT * FROM " . tablename('vote_reply') . " WHERE `rid`=:rid LIMIT 1", array(':rid' => $rid));

    if( $_GPC['action']=='vote'){
        sleep(1);//防止连续点击照成的多投票
        //查看是否为电信用户
        $user_info = pdo_fetch("SELECT * FROM " . tablename('fans') . "where weid=" . $weid." and from_user ='".$from_user."'" );
        $dianxin_info = pdo_fetch("SELECT * FROM " . tablename('dianxin_phone') . " WHERE `phone`=:phone LIMIT 1", array(':phone' => $user_info['mobile']));
        if(empty($dianxin_info) && $rid == 314){
            //电信梦投票需要电信员工
            echo json_encode(array('errno'=>-1,'error'=>'非电信员工，不允许投票！!'));
            die();
        }
        if(empty($from_user)){
            echo json_encode(array('errno'=>-1,'error'=>'非法用户，不允许投票！!'));
            die();
        }
        // 判断是否有投票的权限，服务器判断
        $can_vote = $this->can_vote($fans_info,$reply_info['interval']);
        if(!$can_vote){
            echo json_encode(array('errno'=>-1,'error'=>'您已投过票了！'));
            die();
        }
        //判断投票时间是否过期
        if(!empty($reply_info)&&$reply_info['start_time']<time()&&$reply_info['end_time']>time()){
            $is_expired = false;//过期
        }else{
            $is_expired = true;//没过期
        }
	    $is_not_indate = false;
        if($reply_info['start_time']>time()){
            $is_not_indate = true;//活动还未开始
            echo json_encode(array('errno'=>-1,'error'=>'投票活动还未开始！'));
            die();
        }
        if($is_expired){
            echo json_encode(array('errno'=>-1,'error'=>'投票活动已经结束！'));
            die();
        }
        $select_type = in_array($reply_info['vote_type'],array(0,2))? 'radio' :'checkbox';
        $option_arr = explode(',',$_GPC['option']);
        if(empty($option_arr)){
            echo json_encode(array('errno'=>-7,'error'=>"请选择选项！".$reply_info['maxitem']."票！"));
            die();
        }
        if($reply_info['maxitem']>0 && count($option_arr)>$reply_info['maxitem'] && $select_type=='checkbox'){
            echo json_encode(array('errno'=>-6,'error'=>"最多只允许投".$reply_info['maxitem']."票！"));
            die();
        }

        $fans_info_data = array(
            'from_user'=>$from_user,
            'rid'=>$rid,
            'option'=>$_GPC['option'],
            'vote_time'=>time(),
        );
        //更新粉丝投票表
        if($fans_info==false){
            $fans_info_data['vote_num']=1;
            if(!pdo_insert('vote_fans',$fans_info_data)){
                echo json_encode(array('errno'=>-2,'error'=>'您已投过票了！'));
                die();
            }
            //插入的粉丝投票id
            $vfid = pdo_insertid();
        }else{
            $fans_info_data['vote_num']= $fans_info['vote_num']+1;
            if(!pdo_update('vote_fans',$fans_info_data,array('id'=>$fans_info['id']))){
                echo json_encode(array('errno'=>-3,'error'=>'您已投过票了！'));
                die();
            }
            $vfid = $fans_info['id'];
        }
        //更新粉丝投票选项表
        $res = pdo_query("update ".tablename('vote_option')." set vote_num =vote_num+1 where rid =".$rid." and id in(".$_GPC['option'].")");
        if($res==false){
            echo json_encode(array('errno'=>-4,'error'=>'您已投过票了！'));
            die();
        }
        $logs_info_data = array(
            'rid'=>$rid,
            'vfid'=>$vfid,
            'from_user'=>$from_user,
            'option'=>$_GPC['option'],
            'vote_time'=>time(),
        );
        //记录日志
        if(!pdo_insert('vote_logs',$logs_info_data)){
            echo json_encode(array('errno'=>-5,'error'=>'您已投过票了！'));
            die();
        }
        echo json_encode(array('errno'=>200));
    }else{
        //总投票记录信息
        $vote_logs_infos = pdo_fetchall("SELECT * FROM ".tablename('vote_logs')." WHERE rid=" . $rid );
        //个人总投票记录信息
        $user_vote_logs_infos = pdo_fetchall("SELECT * FROM ".tablename('vote_logs')." WHERE rid=" . $rid . " and from_user='" . $from_user . "'");
        //总投票数
        if($rid == 314){
            $vote_counts = count($vote_logs_infos)+130;
        }else{
            $vote_counts = count($vote_logs_infos);
        }
        //获取投票选项
        $vote_option_infos = pdo_fetchall("SELECT * FROM ".tablename('vote_option')." WHERE rid=" . $rid );
        $vote_option_result_infos = pdo_fetchall("SELECT * FROM ".tablename('vote_option')." WHERE rid=" . $rid .' order by vote_num desc');

        //TODO 判断是否可以投票
        $can_vote = $this->can_vote($fans_info,$reply_info['interval']);
        //判断投票时间是否过期
        if(!empty($reply_info)&&$reply_info['start_time']<time()&&$reply_info['end_time']>time()){
            $is_expired = false;//过期
        }else{
            $is_expired = true;//没过期
        }
        $is_not_indate = false;
        if($reply_info['start_time']>time()){
            $is_not_indate = true;//活动还未开始
        }
        // 判断单选还是多选
        $select_type = in_array($reply_info['vote_type'],array(0,2))? 'radio' :'checkbox';
        // 判断图文还是文本
        $is_text =  in_array($reply_info['vote_type'],array(0,1))? true :false;
        $vote_url=$this->createMobileUrl('list',  array('action'=>'vote','name' => 'vote', 'id'=>$rid, 'from_user' => $_GPC['from_user']));
        $result_url=$this->createMobileUrl('list',  array('action'=>'result','name' => 'vote', 'id'=>$rid, 'from_user' => $_GPC['from_user']));
        if($is_text){
            //文本模版
            include $this->template('text');
        }else{
            //图文模版
            include $this->template('image');
        }
    }
}
    public function doMobile_mobile_blind() {
        global $_GPC,$_W;
        $from_user = authcode(base64_decode($_GPC['from_user']), 'DECODE');
        $user_info = pdo_fetch("SELECT * FROM ".tablename('fans')." WHERE from_user = '".$from_user."' and weid=".$_GET['weid']." limit 1" );
        $mobile = $user_info['mobile'];
        $rid = $_GPC['id'];
        if(!empty($mobile)){
            $dianxin_info = pdo_fetch("SELECT * FROM " . tablename('dianxin_phone') . " WHERE `phone`=:phone LIMIT 1", array(':phone' => $mobile));
            if(!empty($dianxin_info) && $rid == 314){
                $url = $_W['siteroot'].$this->createMobileUrl('list', array( 'name' => 'vote', 'id' => $rid, 'from_user' => $_GPC['from_user']));
                header("location:$url");//如果手机已经帮定，并且为电信oa号码。直接跳转页面。
            }
            if($rid != 314){
                $url = $_W['siteroot'].$this->createMobileUrl('list', array( 'name' => 'vote', 'id' => $rid, 'from_user' => $_GPC['from_user']));
                header("location:$url");//如果手机已经帮定。直接跳转页面。
            }
        }
        $loclurl = $this->createMobileUrl('_mobile_blind', array('name' => 'vote','id'=>$rid, 'do' => '_mobile_blind','weid'=>$_GET['weid'], 'from_user' => $_GPC['from_user']));
        if($_GPC['action']=='edit'){
            $user_info_data = array(
                'nickname' => $_GPC['nickname'],
                'realname' => $_GPC['realname'],
                'mobile' => $_GPC['mobile'],
                'qq' => $_GPC['qq'],
                'gender' => $_GPC['gender'],
                'age' => $_GPC['age'],
                'from_user'=>$from_user,
                'weid'=>$_GET['weid'],
                'avatar'=>' '
            );
            if ($user_info==false) {
                $user_info_data['createtime']=time();
                if(pdo_insert('fans', $user_info_data)){
                    $dianxin_info = pdo_fetch("SELECT * FROM " . tablename('dianxin_phone') . " WHERE `phone`=:phone LIMIT 1", array(':phone' => $_GPC['mobile']));
                    if(empty($dianxin_info)&&$rid == 314){
                        echo json_encode(array('errno'=>-1,'error'=>'对不起，只有福建电信员工才可进行投票（手机号以OA通信录中登记的手机号为准）。'));
                    }else{
                        $url = $_W['siteroot'].$this->createMobileUrl('list', array( 'name' => 'vote', 'id' => $rid, 'from_user' => $_GPC['from_user']));
                        echo json_encode(array('errno'=>200,'url'=>$url));
                    }
                }else{
                    echo json_encode(array('errno'=>-1,'error'=>'添加错误'));
                }
            } else {
                if(pdo_update('fans', $user_info_data, array('from_user' => $from_user,'weid'=>$_GET['weid']))!==false){
                    $dianxin_info = pdo_fetch("SELECT * FROM " . tablename('dianxin_phone') . " WHERE `phone`=:phone LIMIT 1", array(':phone' => $_GPC['mobile']));
                    if(empty($dianxin_info)&&$rid == 314){
                        echo json_encode(array('errno'=>-1,'error'=>'对不起，只有福建电信员工才可进行投票（手机号以OA通信录中登记的手机号为准）。'));
                    }else{
                        $url = $_W['siteroot'].$this->createMobileUrl('list', array( 'name' => 'vote', 'id' => $rid, 'from_user' => $_GPC['from_user']));
                        echo json_encode(array('errno'=>200,'url'=>$url));
                    }
                }else{
                    echo json_encode(array('errno'=>-2));
                }
            }
            die();//ajax请求入口直接关闭
        }
        include $this->template('blind_mobile');
        exit;
    }

    public function doWeboption ()
    {
        global $_GPC, $_W;
        $rid = $_GPC['id'];
        if ($_GPC['submit']) {
            if (!empty($_GPC['news-title'])) {
                foreach ($_GPC['news-title'] as $groupid => $items) {
                    if (empty($items)) {
                        continue;
                    }
                    foreach ($items as $itemid => $row) {
                        if (empty($row)) {
                            continue;
                        }
                        $update = array(
                            'title' => $_GPC['news-title'][$groupid][$itemid],
                            'description' => $_GPC['news-description'][$groupid][$itemid],
                            'thumb' => $_GPC['news-picture-old'][$groupid][$itemid],
                            'content' => $_GPC['news-content'][$groupid][$itemid],
                        );
                        if (!empty($_GPC['news-picture'][$groupid][$itemid])) {
                            $update['thumb'] = $_GPC['news-picture'][$groupid][$itemid];
                            file_delete($_GPC['news-picture-old'][$groupid][$itemid]);
                        }
                        pdo_update('vote_option', $update, array('id' => $itemid));
                    }
                }
            }
            //处理添加
            if (!empty($_GPC['news-title-new'])) {
                foreach ($_GPC['news-title-new'] as $itemid => $titles) {
                    if (!empty($titles)) {
                        foreach ($titles as $index => $title) {
                            if (empty($title)) {
                                continue;
                            }
                            $insert = array(
                                'rid' => $rid,
                                'title' => $title,
                                'description' => $_GPC['news-description-new'][$itemid][$index],
                                'thumb' => $_GPC['news-picture-new'][$itemid][$index],
                                'content' => $_GPC['news-content-new'][$itemid][$index],
                            );
                            // print_r($insert);
                            pdo_insert('vote_option', $insert);
                            if (empty($parentid)) {
                                $parentid = pdo_insertid();
                            }
                        }
                    }
                }
            }
            message('数据提交成功！', create_url('site/module', array('do' => 'option', 'name' => 'vote', 'id' => $rid)), 'success');
        }

        $result = pdo_fetchall("SELECT * FROM " . tablename('vote_option') . " WHERE rid = :rid ORDER by `id` ASC", array(':rid' => $rid));

        $reply = array();
        if (!empty($result)) {
            foreach ($result as $index => $row) {
                $reply[$row['id']] = $row;
            }
        }
        include $this->template('display');
    }

    public function doWebresult ()
    {
        global $_GPC, $_W;
        $rid = $_GPC['id'];
        //获取投票信息
        $reply_info = pdo_fetch("SELECT * FROM " . tablename('vote_reply') . " WHERE `rid`=:rid LIMIT 1", array(':rid' => $rid));
        //总投票记录信息
        $vote_logs_infos = pdo_fetchall("SELECT * FROM ".tablename('vote_logs')." WHERE rid=" . $rid );
        //个人总投票记录信息
        $user_vote_logs_infos = pdo_fetchall("SELECT * FROM ".tablename('vote_logs')." WHERE rid=" . $rid );
        //总投票数
        $vote_counts = count($vote_logs_infos);
        //获取投票选项
        $vote_option_infos = pdo_fetchall("SELECT * FROM ".tablename('vote_option')." WHERE rid=" . $rid );
        //判断投票时间是否过期
        if(!empty($reply_info)&&$reply_info['start_time']<time()&&$reply_info['end_time']>time()){
            $is_expired = false;//过期
        }else{
            $is_expired = true;//没过期
        }
        // 判断单选还是多选
        $select_type = in_array($reply_info['vote_type'],array(0,2))? 'radio' :'checkbox';
        // 判断图文还是文本
        $is_text =  in_array($reply_info['vote_type'],array(0,1))? true :false;
        $vote_url=create_url('index/module', array('do' => 'list','action'=>'vote','name' => 'vote', 'id'=>$rid, 'from_user' => $_GPC['from_user']));

        include $this->template('result');
    }
    public function doWebdelete ()
    {
        global $_W, $_GPC;
        $id = $_GPC['id'];
        $sql = "SELECT id,  rid, thumb FROM " . tablename('vote_option') . " WHERE `id`=:id";
        $row = pdo_fetch($sql, array(':id' => $id));
        if (empty($row)) {
            message('抱歉，回复不存在或是已经被删除！', '', 'error');
        }
        if (pdo_delete('vote_option', array('id' => $id))) {
            file_delete($row['thumb']);
        }
        message('删除回复成功', '', 'success');
    }

    /*
     * 判断是否可以投票
     * $data 投票信息
     */
    function can_vote($data,$interval){
        if(empty($data)){
            return true;//没有投票记录
        }elseif($interval==0){
            return false;//一个粉丝允许投一次
        }else{
            $res = (time() - $data['vote_time'])/(24*3600)> $interval ? true	: false;
            return $res;
        }
    }
}