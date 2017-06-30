<?php
/**
 * Created by JetBrains PhpStorm.
 * User: hongmingjie
 * Date: 14-1-13
 * Time: 下午3:28
 * 用户组数据权限割接
 */

set_time_limit(0);
defined('IN_IA') or exit('Access Denied');
$members = pdo_fetchall("select * from".tablename("members"));
foreach($members as $k=>$member){
    if(!$member['groupid']){
        continue;
    }
    $group = pdo_fetch("SELECT modules FROM ".tablename('members_group')." WHERE id = :id", array(':id' => $member['groupid']));
    if (!empty($group['modules'])) {
        $group['modules'] = iunserializer($group['modules']);
        $modules = pdo_fetchall("SELECT mid FROM ".tablename('modules')." WHERE mid IN ('".implode("','", $group['modules'])."')");
        if (!empty($modules)) {
            foreach ($modules as $row) {
                $group = pdo_fetch("SELECT * FROM ".tablename('members_modules')." WHERE uid = ".$member['uid']." and mid = ".$row['mid']);
                if(!$group){
                    pdo_insert('members_modules', array('uid' => $member['uid'], 'mid' => $row['mid']));
                }
            }
        }
    }
}


