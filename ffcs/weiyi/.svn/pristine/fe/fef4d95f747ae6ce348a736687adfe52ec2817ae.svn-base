<?php
$str='r189';
$ret1 = preg_match("/^e邮(13[0-9]|15[0|3|6|7|8|9]|18[0-9]|147)\\d{8}$/", trim($str), $matchs);
$ret2 = preg_match("/^e邮\+(13[0-9]|15[0|3|6|7|8|9]|18[0-9]|147)\\d{8}$/", trim($str), $matchs);
$ret3 = preg_match("/^E邮(13[0-9]|15[0|3|6|7|8|9]|18[0-9]|147)\\d{8}$/", trim($str), $matchs);
$ret4 = preg_match("/^E邮\+(13[0-9]|15[0|3|6|7|8|9]|18[0-9]|147)\\d{8}$/", trim($str), $matchs);
if($ret1 || $ret2 || $ret3 || $ret4){
    var_dump(123);exit;
}
var_dump($ret1,$ret2,$ret3,$ret4);

?>