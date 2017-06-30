<?php
/**
 * Created by JetBrains PhpStorm.
 * User: zcn
 * Date: 14-1-8
 * Time: 上午9:58
 * 考试管理模块
 */

defined('IN_IA') or exit('Access Denied');

class ExamModuleSite extends WeModuleSite {

    public function doMobileList() {
        global $_GPC, $_W;
        $from_user = authcode(base64_decode($_GPC['from_user']), 'DECODE');
        $rid = $_GPC['id'];
        $weid =  $_GPC['weid'];

        $answer = array();
        $score_val = array();
        $record_set = array();
        $score = 0;

        //考试信息
        $reply_info = pdo_fetch("SELECT * FROM " . tablename('exam_reply') . " WHERE `rid`=:rid LIMIT 1", array(':rid' => $rid));
        //将每题的标准答案和标准分值保存在数组中
        $answer_val = pdo_fetchall("SELECT * FROM " . tablename('exam_option') . " WHERE `rid`=:rid", array(':rid' => $rid));
        foreach ($answer_val as $_answer_key=>$_answer_val){
            $answer[$_answer_val['id']] =str_replace(' ','',$_answer_val['answer']);
            $score_val[$_answer_val['id']] = $_answer_val['score'];
        }

        //获取试题选项
        $radio_option = pdo_fetchall("SELECT * FROM " . tablename('exam_option') . " WHERE `type`=1 and `rid`=:rid", array(':rid' => $rid));
        $radio_check = pdo_fetchall("SELECT * FROM " . tablename('exam_option') . " WHERE `type`=2 and `rid`=:rid", array(':rid' => $rid));

        if ($_GPC['action'] == 'exam'){
            $comment_id = 1;
            //保存页面提交回来的单选题的值
            $radio_val = array();
            if (!empty($_GPC['radio_btn'])){
                foreach ($_GPC['radio_btn'] as $radio_key=> $_radio_val){
                    //$radio_val[$radio_key] = $_radio_val;
                    $temp_score = 0;
                    if ($answer[$radio_key]==$_radio_val){
                        $score += $score_val[$radio_key];
                        $temp_score = $score_val[$radio_key];
                    }
                    $record_set[] = array('key'=>$radio_key, 'answer_va1'=>$answer[$radio_key], 'answer'=>$_radio_val, 'score_val' => $temp_score);
                }
            }

            //保存页面提交回来的复选框的值
            $check_val = array();
            if (!empty($_GPC['check_btn'])){
                foreach ($_GPC['check_btn'] as $_check_key=> $_check_val){
                    $str = '';
                    $temp_score = 0;
                    foreach ($_check_val as $key=>$val){
                        $str .= $val;
                    }
                    //$check_val[$_check_key] = $str;
                    if ($answer[$_check_key]==$str){
                        $score += $score_val[$_check_key];
                        $temp_score = $score_val[$radio_key];
                    }
                    $record_set[] = array('key'=>$_check_key, 'answer_va1'=>$answer[$_check_key], 'answer'=>$str, 'score_val' => $temp_score);
                }
            }

            //新增当前用户的考试信息
            $insert = array(
                'rid' => $rid,
                'from_user' => $from_user,
                'exam_time' => TIMESTAMP,
                'end_exam_time' => (TIMESTAMP + $reply_info['exam_time']*60),
                'option' => serialize($record_set),
                'score' => $score,
                'comment_id' => $comment_id
            );

            //更新当前用户的考试信息
            $record_val =  pdo_fetchall("SELECT * FROM " . tablename('exam_logs') . " WHERE `rid`=:rid and `from_user`=:from_user", array(':rid' => $rid, ':from_user' => $from_user));
            if (count($record_val)==0){
                pdo_insert('exam_logs', $insert);
            }else{
                $update = array(
                    'option' => serialize($record_set),
                    'score' => $score,
                    'comment_id' => $comment_id
                );
                pdo_update('exam_logs', $update, array('id' => $record_val[0]['id']));
            }
            $url = $_W['siteroot'].$this->createMobileUrl('list', array( 'name' => 'exam', 'id' => $rid, 'from_user' => $_GPC['from_user']));
            header("location:$url");//答题完毕提交数据并刷新页面

        }else{
            //从考试历史表中查找该用户是否已经参加过考试
            $exam_val = pdo_fetchall("SELECT * FROM " . tablename('exam_logs') . " WHERE `rid`=:rid and `from_user`=:from_user", array(':rid' => $rid, ':from_user' => $from_user));
            if (count($exam_val)==0){
                //判断考试信息是否过期
                if(!empty($reply_info)&&$reply_info['start_time']<time()&&$reply_info['end_time']>time()){
                    $is_expired = false;//过期
                }else{
                    $is_expired = true;//没过期
                }

                if($reply_info['start_time']>time()){
                    $is_not_indate = true;//答题活动还没开始
                }
                if($is_expired){
                    $is_not_indate = false;//答题活动已经结束
                }
                include $this->template('index');
            }else{
                if ($exam_val[0]['comment_id']==0){
                    $_option_val = array();
                    foreach ($exam_val as $exam_key=>$_exam_val){
                        $record_set = unserialize($_exam_val['option']) ;
                        foreach ($record_set as $_record_key=>$_record_set){
                            $_option_val[$_record_set['key']] = $_record_set['answer'];
                        }
                    }
                    include $this->template('index');
                }else{
                    //将选择的答案和每题的得分分别放入一个一维数组中
                    $option_val = array();
                    $option_score = array();
                    foreach ($exam_val as $exam_key=>$_exam_val){
                        $record_set = unserialize($_exam_val['option']) ;
                        foreach ($record_set as $_record_key=>$_record_set){
                            $option_val[$_record_set['key']] = $_record_set['answer'];
                            $option_score[$_record_set['key']] = $_record_set['score_val'];
                        }
                    }

                    include $this->template('result');
                }

            }
        }

    }

    public function doMobileUpdate(){
        global $_GPC, $_W;
        $from_user = authcode(base64_decode($_GPC['from_user']), 'DECODE');
        $rid = $_GPC['id'];
        $weid =  $_GPC['weid'];

        $answer = array();
        $score_val = array();
        $record_set = array();
        $score = 0;

        //考试信息
        $reply_info = pdo_fetch("SELECT * FROM " . tablename('exam_reply') . " WHERE `rid`=:rid LIMIT 1", array(':rid' => $rid));
        //将每题的标准答案和标准分值保存在数组中
        $answer_val = pdo_fetchall("SELECT * FROM " . tablename('exam_option') . " WHERE `rid`=:rid", array(':rid' => $rid));
        foreach ($answer_val as $_answer_key=>$_answer_val){
            $answer[$_answer_val['id']] =str_replace(' ','',$_answer_val['answer']);
            $score_val[$_answer_val['id']] = $_answer_val['score'];
        }

        //获取试题选项
        $radio_option = pdo_fetchall("SELECT * FROM " . tablename('exam_option') . " WHERE `type`=1 and `rid`=:rid", array(':rid' => $rid));
        $radio_check = pdo_fetchall("SELECT * FROM " . tablename('exam_option') . " WHERE `type`=2 and `rid`=:rid", array(':rid' => $rid));

        if ($_GPC['action'] == 'exam'){
            //保存页面提交回来的单选题的值
            $radio_val = array();
            if (!empty($_GPC['radio_btn'])){
                foreach ($_GPC['radio_btn'] as $radio_key=> $_radio_val){
                    //$radio_val[$radio_key] = $_radio_val;
                    $temp_score = 0;
                    if ($answer[$radio_key]==$_radio_val){
                        $score += $score_val[$radio_key];
                        $temp_score = $score_val[$radio_key];
                    }
                    $record_set[] = array('key'=>$radio_key, 'answer_va1'=>$answer[$radio_key], 'answer'=>$_radio_val, 'score_val' => $temp_score);
                }
            }

            //保存页面提交回来的复选框的值
            $check_val = array();
            if (!empty($_GPC['check_btn'])){
                foreach ($_GPC['check_btn'] as $_check_key=> $_check_val){
                    $str = '';
                    $temp_score = 0;
                    foreach ($_check_val as $key=>$val){
                        $str .= $val;
                    }
                    //$check_val[$_check_key] = $str;
                    if ($answer[$_check_key]==$str){
                        $score += $score_val[$_check_key];
                        $temp_score = $score_val[$radio_key];
                    }
                    $record_set[] = array('key'=>$_check_key, 'answer_va1'=>$answer[$_check_key], 'answer'=>$str, 'score_val' => $temp_score);
                }
            }

            //新增当前用户的考试信息
            $insert = array(
                'rid' => $rid,
                'from_user' => $from_user,
                'exam_time' => TIMESTAMP,
                'end_exam_time' => (TIMESTAMP + $reply_info['exam_time']*60),
                'option' => serialize($record_set),
                'score' => $score
            );

            //更新当前用户的考试信息
            $record_val =  pdo_fetchall("SELECT * FROM " . tablename('exam_logs') . " WHERE `rid`=:rid and `from_user`=:from_user", array(':rid' => $rid, ':from_user' => $from_user));
            if (count($record_val)==0){
                pdo_insert('exam_logs', $insert);
            }else{
                $update = array(
                    'option' => serialize($record_set),
                    'score' => $score
                );
                pdo_update('exam_logs', $update, array('id' => $record_val[0]['id']));
            }
        }
    }

    public function doMobileKnowledge()
    {
        global $_GPC, $_W;
        $from_user = authcode(base64_decode($_GPC['from_user']), 'DECODE');
        $rid = $_GPC['id'];
        $weid =  $_W['weid'];

        $category = pdo_fetchall("SELECT * FROM ".tablename('exam_knowledge_cat')." WHERE weid = :weid", array(':weid'=>$weid));
        $category_val = array();
        foreach ($category as $key => $val){
            $category_val[$val['id']] = $val['category'];
        }

        $knowledge = pdo_fetchall("SELECT * FROM ".tablename('exam_knowledge')." WHERE weid = :weid", array(':weid'=>$weid));
        $default_cat = pdo_fetchall("SELECT * FROM ".tablename('exam_knowledge')." WHERE weid = :weid and cat_id=0", array(':weid'=>$weid));
        include $this->template('group');
    }

    public function doMobileShow()
    {
        global $_GPC, $_W;
        if (!empty($_GPC['id'])){
            $id = $_GPC['id'];
            $knowledge = pdo_fetchall("SELECT * FROM ".tablename('exam_knowledge'). " WHERE id=$id");
            include $this->template('show');
        }
    }

    public function doMobileLogin()
    {
        global $_GPC, $_W;
        $from_user = authcode(base64_decode($_GPC['from_user']), 'DECODE');
        if (!empty($_GPC['id'])){
            $id = $_GPC['id'];
            //权限验证
            $exam  = pdo_fetchall("SELECT * FROM ".tablename('exam_reply'). " WHERE rid=$id");
            include $this->template('login');
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
         $type = empty($_GPC['type'])?1:$_GPC['type'];

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
                         $temp = explode("<p>", htmlspecialchars_decode($_GPC['news-content'][$groupid][$itemid]));
                         $update = array(
                             'title' => $_GPC['news-title'][$groupid][$itemid],
                             'content' => implode("",$temp),
                             'answer' => $_GPC['news-answer'][$groupid][$itemid],
                             'score' => $_GPC['news-score'][$groupid][$itemid]
                         );
                         //echo var_dump($update);
                         pdo_update('exam_option', $update, array('id' => $itemid, 'type'=> $type));
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
                             $temp = explode("<p>", htmlspecialchars_decode($_GPC['news-content-new'][$itemid][$index]));
                             $insert = array(
                                 'rid' => $rid,
                                 'title' => $title,
                                 'content' => implode("",$temp),
                                 'answer' => $_GPC['news-answer-new'][$itemid][$index],
                                 'type' => $type,
                                 'score' => $_GPC['news-score-new'][$itemid][$index]
                             );
                             // print_r($insert);
                             pdo_insert('exam_option', $insert);
                             if (empty($parentid)) {
                                 $parentid = pdo_insertid();
                             }
                         }
                     }
                 }
             }
             message('数据提交成功！', create_url('site/module', array('do' => 'option', 'name' => 'exam', 'id' => $rid)), 'success');
         }

         $result = pdo_fetchall("SELECT * FROM " . tablename('exam_option') . " WHERE rid = :rid and type = :type ORDER by `id` ASC ", array(':rid' => $rid, ':type' => $type));

         $reply = array();
         if (!empty($result)) {
             foreach ($result as $index => $row) {
                 $reply[$row['id']] = $row;
             }
         }
         include $this->template('display');
     }

    public function doWebResult()
    {
        global $_W, $_GPC;
        $foo = !empty($_GPC['foo']) ? $_GPC['foo'] : 'display';
        if ($foo == 'display') {
            $pindex = max(1, intval($_GPC['page']));
            $psize = 20;
            $condition = '';
            $params = array();

            if (!empty($_GPC['cate_1'])) {
                $condition .= " and title='{$_GPC['cate_1']}'";
            }
            if (!empty($_GPC['keyword'])) {
                $condition .= " and from_user LIKE :keyword";
                $params[':keyword'] = "%{$_GPC['keyword']}%";
            }

            $exam_vam = pdo_fetchall("SELECT DISTINCT(title) from".tablename('exam_reply'));
            $paper_title = array();
            foreach ($exam_vam as $key => $val){
                $paper_title[$key] = $val['title'];
            }
            $list = pdo_fetchall("select a.id, title, from_user, a.exam_time, score, end_exam_time from".tablename('exam_logs'). "a INNER join". tablename('exam_reply'). "b on a.rid=b.rid"." WHERE 1=1 $condition ORDER BY id DESC LIMIT ".($pindex - 1) * $psize.','.$psize, $params);
            $total = pdo_fetchcolumn("select count(*) from".tablename('exam_logs'). "a INNER join". tablename('exam_reply'). "b on a.rid=b.rid"." WHERE 1=1". $condition, $params);
            $pager = pagination($total, $pindex, $psize);
        }
        include $this->template('result');
    }

    public function doWebCategory()
    {
        global $_W, $_GPC;
        $foo = !empty($_GPC['foo']) ? $_GPC['foo'] : 'display';
        $rid = $_GPC['id'];
        $weid =  $_W['weid'];
        if ($foo=='display'){
            $pindex = max(1, intval($_GPC['page']));
            $psize = 20;
            $condition = '';
            $params = array();

            $list = pdo_fetchall("select * from".tablename('exam_knowledge_cat')." WHERE weid=$weid ORDER BY id DESC LIMIT ".($pindex - 1) * $psize.','.$psize);
            $total = pdo_fetchcolumn("select count(*) from".tablename('exam_knowledge_cat')." WHERE weid=$weid");
            $pager = pagination($total, $pindex, $psize);
        }elseif ($foo=='post'){
            $id = intval($_GPC['op_id']);
            if (!empty($id)) {
                $list = pdo_fetch("SELECT * FROM ".tablename('exam_knowledge_cat')." WHERE id = :id" , array(':id' => $id));
            }

            if (checksubmit('sd_submit')) {
                if (empty($_GPC['category'])) {
                    message('分类名称不能为空，请输入标题！');
                }

                if (empty($id)) {
                    $data = array(
                        'weid' => $weid,
                        'rid' => $rid,
                        'category' => $_GPC['category'],
                        'describe' => $_GPC['describe']
                    );
                    //echo var_dump($data);
                    pdo_insert('exam_knowledge_cat', $data);
                    message('添加知识点分类成功！',create_url('site/module', array('do' => 'category', 'name'=>'exam', 'id'=>$rid)), 'success');
                } else {
                    $data = array(
                        'category' => $_GPC['category'],
                        'describe' => $_GPC['describe']
                    );
                    pdo_update('exam_knowledge_cat', $data, array('id' => $id));
                    message('更新知识点分类成功！',create_url('site/module', array('do' => 'category', 'name'=>'exam', 'id'=>$id)), 'success');
                }

            }
        }elseif ($foo=='delete'){
            $id = intval($_GPC['op_id']);
            $row = pdo_fetch("SELECT id FROM ".tablename('exam_knowledge_cat')." WHERE id = :id", array(':id' => $id));
            if (empty($row)) {
                message('抱歉，该知识点分类不存在或者已经删除！');
            }
            pdo_delete('exam_knowledge_cat', array('id' => $id));
            message('删除成功！', referer(), 'success');
        }
        include $this->template('category');
    }
}