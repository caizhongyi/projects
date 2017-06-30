<?php
/**
 * Created by JetBrains PhpStorm.
 * User: hongmingjie
 * Date: 14-3-13
 * Time: 下午7:02
 * 营业厅资源库
 */

defined('IN_IA') or exit('Access Denied');
global $_GPC, $_W;

$do = isset($_GPC['do'])&&!empty($_GPC['do']) ? trim($_GPC['do']) : 'display';

if($do == "display"){
    $pindex = max(1, intval($_GPC['page']));
    $psize = 50;
    $keyword = $_GPC['keyword'];
    $starttime = empty($_GPC['start']) ? strtotime('-1 year') : strtotime($_GPC['start']);
    $endtime = empty($_GPC['end']) ? TIMESTAMP : strtotime($_GPC['end']) + 86399;
    $where = '';
    $where .= " AND createtime >= '$starttime' AND createtime < '$endtime'";
    if(!empty($keyword)){
        $where .= " AND title like '%".$keyword."%'";
    }
    $list = pdo_fetchall("SELECT * FROM " . tablename('businessoffice_library') . " WHERE uid = {$_W['uid']} $where ORDER BY id DESC LIMIT " . ($pindex - 1) * $psize . ',' . $psize);
    $total = pdo_fetchcolumn("SELECT COUNT(*) FROM " . tablename('businessoffice_library') . " WHERE uid = {$_W['uid']}  $where ");
    $pager = pagination($total, $pindex, $psize);
    template('businessoffice/library');
}elseif($do == "post"){
    if(checksubmit()){

    }
    template('businessoffice/library');
}



