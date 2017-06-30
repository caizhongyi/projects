<?php
/**
 * 投票系统
 *
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');

class VoteModule extends WeModule
{
    public $name = 'Vote';
    public $title = '投票';
    public $ability = '';
    public $tablename = 'vote_reply';

    public function fieldsFormDisplay($rid = 0)
    {
        global $_W;
        if (!empty($rid)) {
            $reply = pdo_fetch("SELECT * FROM " . tablename($this->tablename) . " WHERE rid = :rid ORDER BY `id` DESC", array(':rid' => $rid));
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

    public function fieldsFormValidate($rid = 0)
    {

        return true;
    }
    public function fieldsFormSubmit($rid = 0)
    {
        global $_GPC, $_W;

        $id = intval($_GPC['reply_id']);
        $insert = array(
            'rid' => $rid,
            'title' => $_GPC['title'],
            'description' => $_GPC['description'],
            'thumb' => $_GPC['picture'],
            'vote_title' => $_GPC['vote_title'],
            'vote_type' => $_GPC['vote_type'],
        );
        $insert['start_time'] = strtotime($_GPC['start']);
        $insert['end_time'] = strtotime($_GPC['end']);
        $insert['interval'] = $_GPC['interval'];
        $insert['maxitem'] = $_GPC['maxitem'];
        //处理图片
        if (!empty($_GPC['picture'])) {
            file_delete($_GPC['picture-old']);
        } else {
            unset($insert['thumb']);
        }
        if (empty($id)) {
            $id = pdo_insert($this->tablename, $insert);
        } else {
            pdo_update($this->tablename, $insert, array('id' => $id));
        }
        return true;
    }
    public function ruleDeleted($rid = 0)
    {
        global $_W;
        $replies = pdo_fetchall("SELECT id,rid FROM " . tablename($this->tablename) . " WHERE rid = '$rid'");
        $deleteid = array();
        if (!empty($replies)) {
            foreach ($replies as $index => $row) {
                $deleteid[] = $row['id'];
            }
        }
        pdo_delete($this->tablename, "id IN ('" . implode("','", $deleteid) . "')");
        return true;
    }

    public function doresult()
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

    public function dooption()
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
            message('数据提交成功！', create_url('index/module', array('do' => 'option', 'name' => 'vote', 'id' => $rid)), 'success');
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

    public function doDelete()
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

    public function dolist()
     {
         global $_GPC, $_W;
         $from_user = authcode(base64_decode($_GPC['from_user']), 'DECODE');
         //判断用户是否存在
         $rid = $_GPC['id'];
         //获取粉丝投票信息
         $fans_info = pdo_fetch("SELECT * FROM " . tablename('vote_fans') . "where rid=" . $rid." and from_user ='".$from_user."'" );
         //获取投票信息
         $reply_info = pdo_fetch("SELECT * FROM " . tablename('vote_reply') . " WHERE `rid`=:rid LIMIT 1", array(':rid' => $rid));

         if( $_GPC['action']=='vote'){
             sleep(1);//防止连续点击照成的多投票

             if(empty($from_user)){
                 echo json_encode(array('errno'=>-7,'error'=>'用户不存在'));die();
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
             if($is_expired){
                 echo json_encode(array('errno'=>-1,'error'=>'投票活动已经结束！'));
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
             $vote_counts = count($vote_logs_infos);
             //获取投票选项
             $vote_option_infos = pdo_fetchall("SELECT * FROM ".tablename('vote_option')." WHERE rid=" . $rid );

             //TODO 判断是否可以投票
             $can_vote = $this->can_vote($fans_info,$reply_info['interval']);
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
             if($is_text){
                 //文本模版
                 include $this->template('text');
             }else{
                 //图文模版
                 include $this->template('image');
             }
         }
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