<?php
//达人赛正赛介绍13/12/31
/*
$matchs = array();
$ret1 = preg_match("/^达人赛(13[0-9]|15[0|3|6|7|8|9]|18[0-9]|147)\\d{8}$/", $this->message['content'], $matchs);
$ret2 = preg_match("/^达人赛\+(13[0-9]|15[0|3|6|7|8|9]|18[0-9]|147)\\d{8}$/", $this->message['content'], $matchs);

if($ret1 || $ret2){
    $content = preg_replace("/\s+/", "", $this->message['content']);//去掉所有的空格
    $phone = trim(trim($content,'达人赛'),'+');
    $sql = "SELECT * FROM ims_daren_results WHERE phone like '".$phone."'";
    if(pdo_fetch($sql)){
        return $this->respText("尊敬的用户，您已报名参加本次易信达人赛，无需再次报名。");
    }
    $sql = "SELECT * FROM ims_daren_logs WHERE SrcUserName like '".$this->message['fromusername']."'";
    $item = pdo_fetch($sql);
    if($item){
        return $this->respText("尊敬的用户，您已报名参加本次易信达人赛，无需再次报名。");
    }else{
        $data = array(
            'SrcUserName'=>$this->message['fromusername'],
            'Content'=>$this->message['content'],
            'CreateTimeD'=>date("Y-m-d H:i:s", $this->message['time'])
        );
        pdo_insert('daren_logs',$data );
        return $this->respText("报名成功，请在一周后回复“r”查询您的排名，我们将根据大赛规则从您安装注册易信之日起的积分进行统计。达人大奖等你哦！");
    }
}elseif($this->message['content']=="r" || $this->message['content']=="R"){
    //延迟3秒后，由易信回复
    sleep(5);
}else{
    return $this->respText("格式有误，请回复如：\n达人赛13301234567");
}
*/
//达人赛中奖信息查询
$matchs = array();
$ret1 = preg_match("/^(13[0-9]|15[0|3|6|7|8|9]|18[0-9]|147)\\d{8}$/", $this->message['content'], $matchs);
if($ret1){
    $phone = trim($this->message['content']);
    //本周的抽奖人员
    $sql = "SELECT * FROM ims_daren_awards WHERE `phone` = ".$phone;
    $results = pdo_fetch($sql);
    if(!empty($results)){
        return $this->respText("恭喜您获得".$results['awards'].'，奖励'.$results['results']);
    }else{
        return $this->respText("本次达人赛活动您未中奖，请您继续关注，我们将有更多精彩活动内容奉献给您！");
    }
}
