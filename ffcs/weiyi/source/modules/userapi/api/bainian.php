<?php
/**
 * Created by JetBrains PhpStorm.
 * User: hongmingjie
 * Date: 14-1-8
 * Time: 下午4:30
 *拜年赢好礼活动
 */
global $_W;
$root = str_replace('api.php','',"http://".$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF']);
$matchs = array();
$ret1 = preg_match("/^(13[0-9]|15[0|3|6|7|8|9]|18[0-9]|147)\\d{8}$/", $this->message['content'], $matchs);
if($ret1){
    $phone = trim($this->message['content']);
    //本周的抽奖人员
    $sql = "SELECT * FROM ims_bainian_awards WHERE `phone` = ".$phone;
    $results = pdo_fetch($sql);
    if(!empty($results)){
        $awards = array('4'=>"鼓励奖",
                '1'=>"一等奖",
                '2'=>"二等奖",
                '3'=>"三等奖"
        );
        return $this->respText("恭喜您在本次新春拜年赢好礼活动中获得".$awards[$results['type']]."奖励");
    }else{
        return $this->respText("本次新春拜年赢好礼活动您未中奖，请您继续关注，我们将有更多精彩活动内容奉献给您！");
    }
}elseif(strtolower(trim($this->message['content']))=="d"){
    $logs =  pdo_fetch("SELECT * FROM ".tablename('bainian_logs')." WHERE openid = '".$this->message['from']."' and weid=".$_W['weid']." limit 1" );
    if(empty($logs)){
        return $this->respText('您还未报名参加本次活动，请点击活动链接报名参加。');
    }else{
        $results =  pdo_fetch("SELECT * FROM ".tablename('bainian_results')." WHERE phone = '".$logs['phone']."' order by id desc limit 1 ");
        if(!empty($results)){
            if(!empty($results['credits'])){
                return $this->respText('您当前积分为'.$results['credits'].'分，排名为'.$results['rank'].'名，请继续努力。（积分数据在每周二更新）');
            }else{
                return $this->respText('您当前积分为0分，暂无排名，请继续努力。（积分数据在每周二更新）');
            }
        }else{
            $msg = '尚无您的排名信息，报名后5个工作日才可以查询个人积分以及排名!（积分从23日开始统计）';
            return $this->respText($msg);
        }
    }
}else{
    $row = array();
    $response['FromUserName'] = $this->message['to'];
    $response['ToUserName'] = $this->message['from'];
    $response['MsgType'] = 'news';
    $response['ArticleCount'] = 1;
    $response['Articles'] = array();
    $response['Articles'][] = array(
        'Title' =>  '拜年赢好礼，用易信新春祝福免费送！',
        'Description' => '用易信发送免费互动消息(图文、贺卡、视频等)、免费短信、电话留言给好友拜年。系统将记录累计积分进行排名抽大奖。',
        'PicUrl' =>$root . 'source/modules/userapi/template/bainian_img/banner1.jpg',
        'Url' =>  $root.$this->createMobileUrl('bainian',array('do' => 'bainian', 'name' => 'userapi','weid'=>$_W['weid'],'from_user' => base64_encode(authcode($this->message['from'], 'ENCODE')))),
        'TagName' => 'item',
    );
    return $response;
}



