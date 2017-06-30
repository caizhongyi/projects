<?php
/**
 * 粉丝管理
 * 更新移动互联网公众帐号的粉丝数据
 * 20131210
 * 导入H码
样例：
H码,区号,城市
1810020,20,广州
 */

set_time_limit(0);
ini_set('display_errors',1);
defined('IN_IA') or exit('Access Denied');
//header("Content-type: text/html; charset=gbk");


//foreach (glob("./resource/Hcode/*/*.txt") as $k=>$filename) {
/*    var_dump($filename);echo '<br>';
     $type = 0;
    $data =array();
    if(preg_match('/dianxin/',$filename,$match)){
        $type=1;
    }elseif(preg_match('/yidong/',$filename,$match)){
        $type=2;
    }elseif(preg_match('/liantong/',$filename,$match)){
        $type=3;
    }
    $sql = "INSERT into ims_hcode (`hcode`,`areacode`,`city`,`type`) VALUES ";
    $handle = fopen($filename, "r");
    if ($handle) {
        $n = 0;//第一行
        while (!feof($handle)) {
            $data = array();
            $buffer = fgets($handle, 4096);

            if($n == 0){
                //第一行不解析；
                $n++;
                continue;
            }else{
                $value = explode(",", trim($buffer,';'));
//                $data = array(
//                         'hcode'=>trim($value['0']),
//                         'areacode'=>trim($value['1']),
//                         'city'=>trim($value['2']),
//                         'type'=>$type
//                         );
                if(!$value['0']){
                    $n++;
                    continue;
                }
                if($n == 1){
                    $sql .='('.trim($value['0']).','.trim($value['1']).',"'.trim($value['2']).'",'.$type.')';
                }else{
                    $sql .=',('.trim($value['0']).','.trim($value['1']).',"'.trim($value['2']).'",'.$type.')';
                }
                //pdo_insert('hcode',$data);
                $n++;
            }
        }
        fclose($handle);
    }
    //echo $sql;
    pdo_query($sql);//快速导入

}*/
$sql = "SELECT from_user,mobile,createtime FROM `ims_fans` WHERE weid =4 AND `mobile` >0 AND follow =1";
$list = pdo_fetchall($sql);
$csv_txt = "openid ,手机号码,时间,网段\n";

foreach($list as $k => $v){
    $hcode_sql = "SELECT * FROM `ims_hcode` WHERE  type<>1 and hcode = '".substr($v['mobile'],0,7)."'  limit 1";

    $res = pdo_fetch($hcode_sql);
    if(!empty($res)){
        if ($res['type']==2){
            $csv_txt .= $v['from_user'] . ',' . $v['mobile'] . ',' . date('Y年m月d日H时i分s秒',$v['createtime']) . ','."移动". "\n";
        }else{
            $csv_txt .= $v['from_user'] . ',' . $v['mobile'] . ',' . date('Y年m月d日H时i分s秒',$v['createtime']) . ','."联通". "\n";
        }

    }
}
$csv_txt = iconv("UTF-8", "GBK", $csv_txt);
header('Content-Type:application/octet-stream;');
header('Content-Disposition: attachment; filename=移动互联网应用异网电话信息' . date('YmdHis') . '.csv');
echo $csv_txt;
exit;



















