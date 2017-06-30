<?php
/**
 * 粉丝管理
 * 更新移动互联网公众帐号的粉丝数据
 * 20131210
 * 获取聊天记录为‘r’的数据，匹配下面数据：
            2013-12-02 00:08:21 trace :
            ------------
            Array:
            from : 452e03d3a446cb30 ;
            to : a06fa8f0a4359816 ;
            time : 1385914101 ;
            type : text ;
            event :  ;
            tousername : a06fa8f0a4359816 ;
            fromusername : 452e03d3a446cb30 ;
            createtime : 1385914101 ;
            msgid : 170 ;
            msgtype : text ;
            content : r ;
 */

set_time_limit(0);
ini_set('display_errors',1);
defined('IN_IA') or exit('Access Denied');
$i=0;
$j=0;
foreach (glob("./data/logs/*.log") as $k=>$filename) {
    echo $filename.'<br>';

    $handle = fopen($filename, "r");
    if ($handle) {
        while (!feof($handle)) {
            $buffer = fgets($handle, 4096);
            if(preg_match('/\strace :/',$buffer,$match)){
                 $arr  = array();
            }else{
                if(preg_match('/from : /',$buffer,$match)){
                    $value = explode(":", trim($buffer,';'));
                    $arr['from_user']=trim(str_replace(';','',$value['1']));
                }

                if(preg_match('/time : /',$buffer,$match)){
                    $value = explode(":", trim($buffer,';'));
                    $arr['createtime']=trim(str_replace(';','',$value['1']));
                 }
                if(preg_match('/content :/ ',$buffer,$match)){
                    $value = explode(":", trim($buffer,';'));
                    $arr['message']=trim(str_replace(';','',$value['1']));


                    if(strtolower($arr['message']) == 'r'){
                        $sql = "SELECT id FROM ".tablename('stat_msg_history')." WHERE weid=4 and (message like 'r' or message like 'R') and createtime=".$arr['createtime']." limit 1" ;
                        echo $sql;
                        $res = pdo_fetch($sql);

                        if(!$res){
                            $arr['weid']=4;
                            $arr['rid']=35;
                            $arr['kid']=50;
                            $arr['module']='userapi';
                            $arr['type']='text';
                            $i++;
                            WeUtility::logging('history_update 添加到表中'.$i, $arr);
                            var_dump('history_update 添加到表中'.$i, $arr);echo "<br>";
                            pdo_insert('stat_msg_history',$arr);
                        }else{
                            $j++;
                            var_dump('history_update 不要添加到表中'.$j, $arr);echo "<br>";
                            WeUtility::logging('history_update 不要添加到表中'.$j, $arr);
                        }

                    }
                }
            }
        }
        fclose($handle);
    }

}
exit;



















