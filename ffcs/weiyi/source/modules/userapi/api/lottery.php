<?php
$matchs = array();
$ret1 = preg_match("/^(13[0-9]|15[0|3|6|7|8|9]|18[0-9]|147)\\d{8}$/", $this->message['content'], $matchs);
$ret2 = preg_match("/^抽奖(13[0-9]|15[0|3|6|7|8|9]|18[0-9]|147)\\d{8}$/", $this->message['content'], $matchs);


if($ret2){
    return $this->respText("您参加关注赢iPhone5s活动已经结束，感谢您的参与。");
    $content = preg_replace("/\s+/", "", $this->message['content']);//去掉所有的空格
    $phone = trim(trim(trim($content,''),'抽奖'),'+');
    $sql = "SELECT * FROM ims_lottery_logs WHERE YEARWEEK(date_format(CreateTimeD,'%Y-%m-%d')) = YEARWEEK(now()) and SrcUserName like '".$this->message['fromusername']."'";
    $item = pdo_fetch($sql);
    if($item){
        return $this->respText("您本周已参加过抽奖，我们将以第一次输入手机号作为抽奖依据。感谢您的关注！");
    }else{
        $data = array(
            'SrcUserName'=>$this->message['fromusername'],
            'Content'=>$this->message['content'],
            'CreateTimeD'=>date("Y-m-d H:i:s", $this->message['time'])
        );
        pdo_insert('lottery_logs',$data );
        return $this->respText("感谢您的参与，相关中奖信息一周后将在公众账号中公布，请及时关注！");
    }
    
}
elseif($ret1){
    $phone = trim($this->message['content'],'抽奖');
    //本周的抽奖人员
    $sql1 = "SELECT * FROM ims_lottery_logs WHERE YEARWEEK(date_format(CreateTimeD,'%Y-%m-%d')) = YEARWEEK(now()) and SrcUserName  like '".$this->message['fromusername']."'";
    $item1 = pdo_fetch($sql1);
    //上周的抽奖人员
    $sql2 = "SELECT * FROM ims_lottery_logs WHERE YEARWEEK(date_format(CreateTimeD,'%Y-%m-%d')) = (YEARWEEK(now()) -1) and SrcUserName like '".$this->message['fromusername']."'";
    $item2 = pdo_fetch($sql2);
    //中奖信息
    $sql = "SELECT * FROM ims_lottery_results WHERE  phone like '".$phone."'";
    $results = pdo_fetch($sql);
    //return $this->respText($sql1.var_export($item1,1).$sql2.var_export($item2,1).$sql.var_export($results,1));
    if(!$results){
         return $this->respText("您参加关注赢iPhone5s活动已经结束，你未中奖。感谢您的参与。");
        if(!empty($item2)){
            // 上周有参与过抽奖
            return $this->respText("上周参与抽奖结果：亲暂未中奖，别灰心。活动持续开展中，还有IPhone5s、加油卡等大奖等您来拿！");
            //	content="本周中奖信息暂未公布";
        }else{
            // 本周有没有参与过抽奖
            if(!empty($item1)){// 本周参加抽奖，下周才能查询结果。
                return $this->respText("感谢您的参与，相关中奖信息待一周后在公众账号中查询，请及时关注！");
            }else{
                //默认回复
                //return $this->respText("您本周还未参与，相关中奖信息待一周后在公众账号中查询，请及时关注！");
            }
        }
    }else{
        return $this->respText("恭喜您中".$results['result']."，请您继续关注，我们将有更多精彩活动内容奉献给您！");
    }

}else{
	 return $this->respText("您参加关注赢iPhone5s活动已经结束，感谢您的参与。");
}



