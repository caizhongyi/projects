<?php
/**
 * Created by JetBrains PhpStorm.
 * User: hongmingjie
 * Date: 13-11-28
 * Time: 下午5:18
 * 易信发送点对点信息
使用方法  require './yixin.php';
$arr = array(
'appid' => '5aae3701ae4841bbb3efd0f753b631ba',
'appsecret' => '3d3c8b78341e47d98071c18b909a8deb'
);
$w = new Yixin($arr);
$a = $w->send('2959b8d0b02fc465','测试点对点');
 */
class Yixin {
    private $appid = "";  //公共平台提供的AppId
    private $appsecret = ""; //公共平台提供的appsecret
    public  $access_token = ""; //公共平台提供的access_token
    private $url;//请求的网址
    private $host = 'api.yixin.im';//主机
    private $origin = 'https://api.yixin.im';

    public function __construct($options){
        $this->appid= isset($options['appid'])?$options['appid']:'';
        $this->appsecret = isset($options['appsecret'])?$options['appsecret']:'';
        $this->access_token = isset($options['access_token'])?$options['access_token']:'';
    }
    /**
     * 获得access_token
     */
    public function get_access_token() {
        if (empty($this->appid)) return;
        if (empty($this->appsecret)) return;
        $url="https://".$this->host."/cgi-bin/token?grant_type=client_credential&appid=".$this->appid."&secret=".$this->appsecret;
        $json=file_get_contents($url);
        $result=json_decode($json,true);
        $this->access_token =$result['access_token'];
        return $this->access_token;
    }

    /*
     * 获取关注用户列表
     * nextopenid 第一个拉取的openid不填默认从头开始拉取
     */
    public function get_user($nextopenid=""){
        if (empty($this->access_token)) $this->get_access_token();
        $url ="https://".$this->host."/cgi-bin/user/get?access_token=".$this->access_token.'&nextopenid='.$nextopenid;
        $json=file_get_contents($url);
        $result=json_decode($json,true);
        return $result;
    }
    /*
    * 获取用户信息
    */
    public function get_user_info($openid){
        if (empty($this->access_token)) $this->get_access_token();
        $url ="https://".$this->host."/cgi-bin/user/info?access_token=".$this->access_token.'&openid='.$openid;
        $json=file_get_contents($url);
        $result=json_decode($json,true);
        return $result;
    }

    /*
     * 点对点单发消息，群发调用多次send
     */
    public function send($openid,$content,$type="text"){
        if (empty($this->access_token)) $this->get_access_token();
        if($type =="text"){
            $data = array(
                'touser'=>$openid,
                'msgtype'=>$type,
                $type=>array('content'=>$content),
            );
        }
        $data = json_encode($data);
        $url = "/cgi-bin/message/send?access_token=".$this->access_token;
        $content = $this->sendPost($this->host,$url,$data,true,2);
        $res = json_decode($content,1);
        return $res;
    }


    /**
     *  以POST方式向提定的URL提交数据，返回结果
     */
    function sendPost($host, $url, $data, $isSSL = false,$timeout=2) {
        $port = 80;
        $prefix = "";
        if ($isSSL) {
            $prefix = "ssl://";
            $port = 443;
        }
        $header = "POST ".$url." HTTP/1.0\r\n";
        $header .= "Host:$host:$port\r\n";
        $header .= "User-Agent: Mozilla 4.0\r\n";
        //$header .= "Content-Type: application/x-www-form-urlencoded\r\n";
        $header .= "Content-Type: raw/xml\r\n";
        $header .= "Content-Length: " . strlen($data) . "\r\n";
        $header .= "Connection: Close\r\n\r\n";
        $header .= $data;

        $result = "";
        $content_started = false;
        if ($isSSL)
            $fp = fsockopen($prefix.$host, $port, $errno, $errstr,$timeout);
        else
            $fp = fsockopen($host, $port);

        if ($fp) {
            fputs($fp, $header);
            while (!feof($fp)) {
                $line = fgets($fp);
                if ($content_started==false) {
                    if ($line=="\r\n") $content_started=true;
                } else {
                    $result .= $line;
                }
            }
            fclose($fp);
        }
        return $result;
    }

}



?>