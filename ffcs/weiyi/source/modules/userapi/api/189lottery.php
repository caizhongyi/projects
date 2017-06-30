<?php
$matchs = array();
$ret1 = preg_match("/^e邮(13[0-9]|15[0|3|6|7|8|9]|18[0-9]|147)\\d{8}$/", trim($this->message['content']), $matchs);
$ret2 = preg_match("/^e邮\+(13[0-9]|15[0|3|6|7|8|9]|18[0-9]|147)\\d{8}$/", trim($this->message['content']), $matchs);
$ret3 = preg_match("/^E邮(13[0-9]|15[0|3|6|7|8|9]|18[0-9]|147)\\d{8}$/", trim($this->message['content']), $matchs);
$ret4 = preg_match("/^E邮\+(13[0-9]|15[0|3|6|7|8|9]|18[0-9]|147)\\d{8}$/", trim($this->message['content']), $matchs);

$lottery_day = array(12,3,4,5,6,7,13,14,15,16,17,23,24,25,26,27);
$lottery_month = 12;
$nowtime = time();
$now_day=((int)date('d',$nowtime));//取得几号
$now_month=((int)date('m',$nowtime));//取得几号
if(!in_array($now_day,$lottery_day) || $now_month !=$lottery_month){
    if('r189'== strtolower($this->message['content']) || 'e邮+抽奖结果'==strtolower($this->message['content']) || 'e邮抽奖结果' == strtolower($this->message['content']) || 'e邮 抽奖结果' == strtolower($this->message['content']) ){
        if(time()<1387123200){
            return $this->respText("您好，189邮箱多方通话功能的第一期易信”邮“礼抽奖活动中奖情况需12月16日后方能查询！");
        }else{
            return $this->respText("您好，您在189邮箱多方通话功能的第一期易信”邮“礼抽奖活动中没有中奖！");
        }
    }

    //非活动期间
    return $this->respText("一、抽奖活动简介\n
11月14日-12月31日期间，成功使用189邮箱多方通话一次的用户，在规定的抽奖期间通过易信客户端向“移动互联网应用”发送“e邮+联系电话号码”即可参与抽奖，赢取千元话费！抽奖活动共举办3期，每期抽出三位幸运用户，分别送出3000元、2000元、1000元话费！
二、抽奖期间\n
第一期抽奖期间： 12月3日－12月7日\n
参加抽奖的用户： 11月14日－11月30日期间成功使用过189邮箱多方通话一次的用户。\n
第二期抽奖期间： 12月13日－12月17日\n
参加抽奖的用户：12月1日－12月10日期间成功使用过189邮箱多方通话一次的用户。\n
第三期抽奖期间： 12月23日－12月27日\n
参加抽奖的用户：12月11日－12月20日期间成功使用过189邮箱多方通话一次的用户。");
}
if($ret1 ||$ret2 ||$ret3 ||$ret4){
    $term = intval($now_day/10)+1;//第几期
    $content = preg_replace("/\s+/", "", $this->message['content']);//去掉所有的空格
    $phone = trim(trim(trim($content,'e邮'),'E邮'),'+');

    //FIXME 这边看数据情况如果有添加期数
    $sql = "SELECT * FROM ".tablename('189lottery_right')." WHERE phone like '".$phone."' and term=".$term."  limit 1";
    $right_info = pdo_fetch($sql);
    if(!$right_info){
        //活动期间，没有没有获得本期的抽奖资格提示
        return $this->respText("您没有获得本期的抽奖资格。如果要参加下一期抽奖，请看以下细则！\n
一、	抽奖活动简介\n
11月14日-12月31日期间，成功使用189邮箱多方通话一次的用户，在规定的抽奖期间通过易信客户端向“移动互联网应用”发送“e邮+联系电话号码”即可参与抽奖，赢取千元话费！抽奖活动共举办3期，每期抽出三位幸运用户，分别送出3000元、2000元、1000元话费！\n
二、	抽奖期间\n
第一期抽奖期间： 12月3日－12月7日 \n
参加抽奖的用户： 11月14日－11月30日期间成功使用过189邮箱多方通话一次的用户。\n
第二期抽奖期间： 12月13日－12月17日\n
参加抽奖的用户：12月1日－12月10日期间成功使用过189邮箱多方通话一次的用户。\n
第三期抽奖期间： 12月23日－12月27日\n
参加抽奖的用户：12月11日－12月20日期间成功使用过189邮箱多方通话一次的用户。");
    }else{
        $sql = "SELECT * FROM ".tablename('189lottery_logs')." WHERE term = '".$term."' and SrcUserName like '".$this->message['fromusername']."'";
        $item = pdo_fetch($sql);
        if($item){
            return $this->respText("您本期已参加过抽奖，我们将以第一次输入手机号作为抽奖依据。感谢您的关注！");
        }else{
            $data = array(
                'SrcUserName'=>$this->message['fromusername'],
                'Content'=>$this->message['content'],
                'CreateTimeD'=>date("Y-m-d H:i:s", $this->message['time']),
                'term'=>$term
            );
            pdo_insert('189lottery_logs',$data );
            return $this->respText('感谢您参加第三期易信“邮”礼抽奖活动，2014年1月6日后您可以向“移动互联网应用”公众号发送“r189”或发送"e邮＋抽奖结果"查询中奖情况。本期中奖者会有专人联系通知，敬请留意！ ');
        }
    }
}elseif('r189'== strtolower($this->message['content']) || 'e邮+抽奖结果'==strtolower($this->message['content']) || 'e邮抽奖结果' == strtolower($this->message['content']) || 'e邮 抽奖结果' == strtolower($this->message['content']) ){
    if(time()<1387987200){
        return $this->respText("您好，第二期易信”邮“礼抽奖活动中奖情况需12月26日后方能查询！ ");
    }elseif(time()<1388937600){
        return $this->respText("您好，第二期易信”邮“礼抽奖活动，您没有中奖！第三期易信”邮“礼抽奖活动中奖情况2014年1月6日后查询！");
    }else{
        return $this->respText("您好，第三期易信”邮“礼抽奖活动，您没有中奖！");
    }

}
else{
    return $this->respText("格式有误，请回复如：\ne邮13301234567");
}



