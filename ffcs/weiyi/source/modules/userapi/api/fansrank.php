<?php
$message = $this->message;
$ret = preg_match('/(?P<sf>.*)(?P<type>新增粉丝|粉丝量|活跃度)/i', $this->message['content'], $matchs);
$mappings = array(
    '福建' => '福建',
    '广东' => '广东',
//    '上海' => '上海',
//    '北京' => '北京',
//    '山东' => '山东',
//    '西藏' => '西藏',
//    '新疆' => '新疆',
);
$type=$matchs['type'];
$sf=$matchs['sf'];
$code = $mappings[$sf];
$starttime = strtotime(date("Y-m-d",strtotime("-7 day")));
$endtime = strtotime(date('Y-m-d')) + 86399 ;
$where = " AND createtime >= '$starttime' AND createtime < '$endtime'";
global $_W, $_GPC;
$ssql ="select name from ims_members_group where parent_ids = ".$_W['uid'];
$slist = pdo_fetch( $ssql );
$sname = $slist['name'];
if(!$ret) {//格式错误
    return $this->respText('请输入合适的格式, "省份+新增粉丝" 或"省份+粉丝量" 或"省份+活跃度" , 如: "福建新增粉丝"、"福建粉丝量"、"福建活跃度"');
}else if(!strcmp($type,"粉丝量")){//粉丝总量查询
    if(!$sf){//集团查询
        if($sname=="集团组") $restr=getSfanstotrank($_W['uid'],$where);
        else  $restr=getfanstotrank($_W['uid'],$where);
        return $this->respText($restr);
    }else if($code){//省份在列表中时
        $sql ="select parent_ids from ".tablename('members_group')." where name like '".$code."'";
        $list = pdo_fetch($sql);
        $restr=getfanstotrank($list['parent_ids'],$where);
        return $this->respText($restr);
    }
    return $this->respText('请输入合适的格式, "省份+粉丝量" , 如: "福建粉丝量"; ');//格式错误
}else  if(!strcmp($type,"活跃度")){
    if(!$sf){
        if($sname=="集团组") $restr=getSfansactive($_W['uid'],$where);
        else  $restr=getfansactive($_W['uid'],$where);
        return $this->respText($restr);
    }else if($code){//省份在列表中时
        $sql ="select parent_ids from ".tablename('members_group')." where name like '".$code."'";
        $list = pdo_fetch($sql);
        $restr=getfansactive($list['parent_ids'],$where);
        return $this->respText($restr);
    }
    return $this->respText('请输入合适的格式, "省份+活跃度" , 如: "福建活跃度"; ');
}else  if(!strcmp($type,"新增粉丝")){
    if(!$sf){//单纯查询粉丝排行
        if($sname=="集团组") $restr=getSfansaddrank($_W['uid'],$where);
        else  $restr=getfansaddrank($_W['uid'],$where);
        return $this->respText($restr);
    }else if($code){//省份在列表中时
        //1，查找组parent_ids
        $sql ="select parent_ids from ".tablename('members_group')." where name like '".$code."'";
        $list = pdo_fetch($sql);
        $restr=getfansaddrank($list['parent_ids'],$where);
        return $this->respText($restr);
    }
    return $this->respText('请输入合适的格式, "省份+新增粉丝" , 如: "福建新增粉丝"');
}
return $this->respText('请输入合适的格式, "省份+新增粉丝" 或"省份+粉丝量" 或"省份+活跃度" , 如: "福建新增粉丝"、"福建粉丝量"、"福建活跃度"');


function getSfansactive($uid,$where){
    $sql = "select t1.id,t1.parent_ids,t1.`name`,t2.username from ims_members_group t1,ims_members t2 where t2.groupid in (select id from ims_members_group where `name` like '集团%') and t1.parent_ids=t2.uid";
    $list = pdo_fetchall($sql);
    $restr ="[序号]公众号:活跃粉丝量/总粉丝量\n";
    $i=1;
    foreach($list as $lis){
        $sql1 = "select count(DISTINCT(t1.from_user)) as cou from ims_wechats t2,ims_stat_msg_history t1 where t2.uid in
        ( select uid  from ims_members  where groupid =".$lis['id'].") and t1.weid=t2.weid ";
        $sql2 = $sql1.$where;
        $list2 = pdo_fetch($sql2);
        $sql3 = "select count(DISTINCT(t1.id)) as cou,t2.name from ims_wechats t2,ims_fans t1 where t2.uid in
         ( select uid   from ims_members    where groupid =".$lis['id']." ) and t1.weid=t2.weid ";
        $list3 = pdo_fetch($sql3);
        $restr .= "[".$i++."]".$list3['name'].":".$list2['cou']."/".$list3['cou']."\n";
    }
    return $restr;
}

function getfansactive($uid,$where){
    $sql0 ="select weid from ".tablename('wechats')." where uid in(select uid from ".tablename('members')." where groupid  in (select id from ".tablename('members_group')." where parent_ids =".$uid."))";
    $sql = "select weid,count(DISTINCT(from_user)) as total from ".tablename('stat_msg_history')."  where weid in( ".$sql0." ) ".$where." GROUP BY weid ";
    $sql2 = "select t1.weid,count(t1.weid) as sum,t2.name as tname,t3.username as tuname from ".tablename('fans')." t1,".tablename('wechats')." t2,".
        tablename('members')." t3 where t1.weid=t2.weid and t2.uid=t3.uid and t1.weid in (".$sql0.")  GROUP BY t1.weid ORDER BY sum DESC ";
    $sql3 = "SELECT * from ( ".$sql.")as tab1 right join  ( ".$sql2.") as tab2 on(tab1.weid = tab2.weid) ORDER BY tab1.total DESC,tab2.sum DESC ";
    $list =pdo_fetchall($sql3);
    $restr ="[序号]公众号:粉丝活跃量/总粉丝量\n";
    $i=1;
    foreach($list as $lis){
        if(!$lis['tname']) $lis['tname']="N/A";
        if(!$lis['total']) $lis['total']="0";
        if(!$lis['sum']) $lis['sum']="0";
        $restr .= "[".$i++."]".$lis['tname'].":".$lis['total']."/".$lis['sum']."\n";
    }
    return $restr;
}

function getSfanstotrank($uid,$where){
    $sql = "select t1.id,t1.parent_ids,t1.`name`,t2.username from ims_members_group t1,ims_members t2 where t2.groupid in (select id from ims_members_group where `name` like '集团%') and t1.parent_ids=t2.uid";
    $list = pdo_fetchall($sql);
    $restr ="[序号]公众号:总粉丝量\n";
    $i=1;
    foreach($list as $lis){
        $sql1 = "select count(DISTINCT(t1.id)) as cou from ims_wechats t2,ims_fans t1 where t2.uid in
         ( select uid   from ims_members    where groupid =".$lis['id']." ) and t1.weid=t2.weid";
        $list2 = pdo_fetch($sql1);
        $restr .="[".$i++."]".$lis['name'].":".$list2['cou']."\n";
    }
    return $restr;
}
function getfanstotrank($uid,$where){
    $sql0 ="select weid from ".tablename('wechats')." where uid in(select uid from ".tablename('members')." where groupid  in (select id from ".tablename('members_group')." where parent_ids =".$uid."))";
    $sql3 = "select t1.weid,count(t1.weid) as total,t2.name as tname,t3.username as tuname from ".tablename('fans')." t1,".tablename('wechats')." t2,".
        tablename('members')." t3 where t1.weid=t2.weid and t2.uid=t3.uid and t1.weid in (".$sql0.")  GROUP BY t1.weid ORDER BY total DESC ";
    $list = pdo_fetchall($sql3);
    $restr ="[序号]公众号:总粉丝量\n";
    $i=1;
    foreach($list as $lis){
        if(!$lis['tname']) $lis['tname']="N/A";
        $restr .= "[".$i++."]".$lis['tname'].":".$lis['total']."\n";
        //$restr .="[weid=".$lis['weid']."][name=".$lis['name']."][tuname=".$lis['tuname']."][cou=".$lis['cou']."][total=".$lis['total']."]===";
    }
    return $restr;
}

function getSfansaddrank($uid,$where){
    $sql = "select t1.id,t1.parent_ids,t1.`name`,t2.username from ims_members_group t1,ims_members t2 where t2.groupid in (select id from ims_members_group where `name` like '集团%') and t1.parent_ids=t2.uid";
    $list = pdo_fetchall($sql);
    $restr ="[序号]公众号:新增粉丝量/总粉丝量\n";
    $i=1;
    foreach($list as $lis){
        $sql1 = "select count(DISTINCT(t1.id)) as cou from ims_wechats t2,ims_fans t1 where t2.uid in
         ( select uid   from ims_members    where groupid =".$lis['id']." ) and t1.weid=t2.weid";
        $sql2 = $sql1.$where;
        $list2 = pdo_fetch($sql1);
        $list3 = pdo_fetch($sql2);
        $restr .="[".$i++."]".$lis['name'].":".$list3['cou']."/".$list2['cou']."\n";
    }
    return $restr;
}

function getfansaddrank($uid,$where){
    $sql0 ="select weid from ".tablename('wechats')." where uid in(select uid from ".tablename('members')." where groupid  in (select id from ".tablename('members_group')." where parent_ids =".$uid."))";
    $sql2 = "select  t1.WEID,COUNT(t1.weid) as cou,t2.name,t3.username from ".tablename('fans')." t1,".tablename('wechats')." t2,".
        tablename('members')." t3 where t1.weid=t2.weid and t2.uid=t3.uid and t1.weid in (".$sql0.") $where GROUP BY t1.weid ORDER BY cou DESC ";
    $sql3 = "select t1.weid,count(t1.weid) as total,t2.name as tname,t3.username as tuname from ".tablename('fans')." t1,".tablename('wechats')." t2,".
        tablename('members')." t3 where t1.weid=t2.weid and t2.uid=t3.uid and t1.weid in (".$sql0.")  GROUP BY t1.weid ";
    $sql5 = "SELECT * from ( ".$sql2.")as tab1 right join  ( ".$sql3.") as tab2 on(tab1.weid = tab2.weid) ORDER BY tab1.cou DESC,tab2.total DESC limit 10 ";
    $list = pdo_fetchall($sql5);
    $restr ="[序号]公众号:新增粉丝/总粉丝量\n";
    $i=1;
    foreach($list as $lis){
        if(!$lis['cou'])$lis['cou']=0;
        if(!$lis['name']) $lis['name']="N/A";
        $restr .= "[".$i++."]".$lis['name'].":".$lis['cou']."/".$lis['total']."]\n";
        //$restr .="[weid=".$lis['weid']."][name=".$lis['name']."][tuname=".$lis['tuname']."][cou=".$lis['cou']."][total=".$lis['total']."]===";
    }
    return $restr;
}

