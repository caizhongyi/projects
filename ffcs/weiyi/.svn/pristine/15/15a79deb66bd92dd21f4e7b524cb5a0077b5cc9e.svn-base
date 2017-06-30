<?php
/**
 * 微翼统计中心模块定义
 *
 * @author We7 Team
 * @url http://www.we7.cc
 */
defined('IN_IA') or exit('Access Denied');

class BusinessstatModuleSite extends WeModuleSite {
    public function doWebTotfans(){
        global $_W, $_GPC;
        $cond = "%Y-%m-%d";
        $pindex = max(1, intval($_GPC['page']));
        $psize = 5;
        $sql0 ="select weid from ".tablename('wechats')." where uid in(select uid from ".tablename('members')." where groupid  in (select id from ".tablename('members_group')." where parent_ids =".$_W['uid']."))";
        $sql = "select date_format(from_unixtime(createtime),'".$cond."') as time,count(*) as pvcount,
                       count(distinct(from_user)) as uvcount from ".tablename('fans')."
                       WHERE weid in ( ".$sql0." )   group by time order by time asc;";
        $list = pdo_fetchall($sql);
        $sql3 = "select t1.weid,count(t1.weid) as total,t2.name as tname,t3.username as tuname from ".tablename('fans')." t1,".tablename('wechats')." t2,".
            tablename('members')." t3 where t1.weid=t2.weid and t2.uid=t3.uid and t1.weid in (".$sql0.") $where  GROUP BY t1.weid ORDER BY total DESC";
        $sql4 = $sql3." LIMIT " .($pindex - 1) * $psize . ',' . $psize;

        $list2 = pdo_fetchall($sql4);
        $total = pdo_fetchall($sql3);
        $total=sizeof($total);
        $pager = pagination($total, $pindex, $psize);
        $tname=$cou =$tot= array();
        if (!empty($list2)) {
            foreach ($list2 as $row) {
                $tname[] = "'".$row['tname']."'";
                $cou[] = $row['cou']?$row['cou']:-1;
                $tot[] = $row['total']?$row['total']:-1;
            }
        }
        $day = $hit = $users = array();
        $pv = 0;
        if (!empty($list)) {
            foreach ($list as $row) {
                $day[] = $row['time'].$dateflag;
                $hit[] = $row['pvcount'];
                $users[] = $row['uvcount'];
            }
            if(!empty($hit)){
                $pv = array_sum($hit);
            }
        }

//        $list = pdo_fetch("SELECT count(distinct(from_user)) as total_uv_count FROM ".tablename('stat_msg_history')." WHERE weid = '{$_W['weid']}' $where");
//        $uv = $list['total_uv_count'];

        include $this->template('totfans');
    }

    public function doWebFans(){
        global $_W, $_GPC;
        $starttime = empty($_GPC['start']) ?  strtotime(date("Y-m-d",strtotime("-7 day")))  : strtotime($_GPC['start']);
        $endtime = empty($_GPC['end']) ? strtotime(date('Y-m-d')) + 86399 : strtotime($_GPC['end']) + 86399;
        $where = " AND createtime >= '$starttime' AND createtime < '$endtime'";

        $dateflag = '';
        if($endtime - $starttime >= (3*12*30*24*60*60)){ //3年以上 用年表示
            $cond = "%Y";
            $dateflag = '年';
        }elseif(($endtime - $starttime >= (12*30*24*60*60+86399)) && $endtime - $starttime < (3*12*30*24*60*60+86399)){
            $cond = "%Y-%m";
            $dateflag = '月';
        }elseif(($endtime - $starttime > (60*24*60*60+86399)) && ($endtime - $starttime < (12*30*24*60*60+86399))){
            $cond = "%Y-%u";
            $dateflag = '周';
        }else{
            $cond = "%Y-%m-%d";
            $dateflag = '';
            if($endtime - $starttime == (7*24*60*60+86399)) $period = 7;
            elseif ($endtime - $starttime == (14*24*60*60+86399)) $period = 14;
            elseif ($endtime - $starttime == (30*24*60*60+86399)) $period = 30;
            elseif ($endtime - $starttime == (60*24*60*60+86399)) $period = 60;
        }
        $pindex = max(1, intval($_GPC['page']));
        $psize = 5;
        $sql0 ="select weid from ".tablename('wechats')." where uid in(select uid from ".tablename('members')." where groupid  in (select id from ".tablename('members_group')." where parent_ids =".$_W['uid']."))";
        $sql = "select date_format(from_unixtime(createtime),'".$cond."') as time,count(*) as pvcount,
                       count(distinct(from_user)) as uvcount from ".tablename('fans')."
                       WHERE weid in ( ".$sql0." )  $where group by time order by time asc;";
        $list = pdo_fetchall($sql);
        $sql2 = "select  t1.WEID,COUNT(t1.weid) as cou,t2.name,t3.username from ".tablename('fans')." t1,".tablename('wechats')." t2,".
            tablename('members')." t3 where t1.weid=t2.weid and t2.uid=t3.uid and t1.weid in (".$sql0.") $where GROUP BY t1.weid ORDER BY cou DESC ";
        $sql3 = "select t1.weid,count(t1.weid) as total,t2.name as tname,t3.username as tuname from ".tablename('fans')." t1,".tablename('wechats')." t2,".
            tablename('members')." t3 where t1.weid=t2.weid and t2.uid=t3.uid and t1.weid in (".$sql0.")  GROUP BY t1.weid ";
        $sql5 = "SELECT * from ( ".$sql2.")as tab1 right join  ( ".$sql3.") as tab2 on(tab1.weid = tab2.weid) ORDER BY tab1.cou DESC,tab2.total DESC ";
        $sql4 = $sql5." LIMIT " .($pindex - 1) * $psize . ',' . $psize;

        $list2 = pdo_fetchall($sql4);
//        $total = pdo_fetchcolumn($sql5);
        $total = pdo_fetchall($sql5);
        $total=sizeof($total);
//        var_dump($sql0);
        $pager = pagination($total, $pindex, $psize);
        $tname=$cou =$tot= array();
        if (!empty($list2)) {
            foreach ($list2 as $row) {
                $tname[] = "'".$row['tname']."'";
                $cou[] = $row['cou']?$row['cou']:-1;
                if($row['total']&&$row['cou'])
                {
                    if($row['total']-$row['cou']>0) $tot[] = $row['total']-$row['cou'];
                    else $tot[] =-1;
                }else if($row['total']){   $tot[] =$row['total'];
                }else  $tot[] =-1;
            }
        }
        $day = $hit = $users = array();
        $pv = 0;
        if (!empty($list)) {
            foreach ($list as $row) {
                $day[] = $row['time'].$dateflag;
                $hit[] = $row['pvcount'];
                $users[] = $row['uvcount'];
            }
            if(!empty($hit)){
                $pv = array_sum($hit);
            }
        }

//        $list = pdo_fetch("SELECT count(distinct(from_user)) as total_uv_count FROM ".tablename('stat_msg_history')." WHERE weid = '{$_W['weid']}' $where");
//        $uv = $list['total_uv_count'];

        include $this->template('fans');
    }

    public function doWebActive(){
        global $_W, $_GPC;
        $starttime = empty($_GPC['start']) ?  strtotime(date("Y-m-d",strtotime("-7 day")))  : strtotime($_GPC['start']);
        $endtime = empty($_GPC['end']) ? strtotime(date('Y-m-d')) + 86399 : strtotime($_GPC['end']) + 86399;
        if($endtime - $starttime == (7*24*60*60+86399)) $period = 7;
        elseif ($endtime - $starttime == (14*24*60*60+86399)) $period = 14;
        elseif ($endtime - $starttime == (30*24*60*60+86399)) $period = 30;
        elseif ($endtime - $starttime == (60*24*60*60+86399)) $period = 60;
        $where = " AND createtime >= '$starttime' AND createtime < '$endtime'";

        $pindex = max(1, intval($_GPC['page']));
        $psize = 5;
        $sql0 ="select weid from ".tablename('wechats')." where uid in(select uid from ".tablename('members')." where groupid  in (select id from ".tablename('members_group')." where parent_ids =".$_W['uid']."))";
        $sql = "select weid,count(DISTINCT(from_user)) as total from ims_stat_msg_history where weid in( ".$sql0." ) $where GROUP BY weid ";
        $sql2 = "select t1.weid,count(t1.weid) as sum,t2.name as tname,t3.username as tuname from ".tablename('fans')." t1,".tablename('wechats')." t2,".
            tablename('members')." t3 where t1.weid=t2.weid and t2.uid=t3.uid and t1.weid in (".$sql0.")  GROUP BY t1.weid ";
        $sql3 = "SELECT * from ( ".$sql.")as tab1 right join  ( ".$sql2.") as tab2 on(tab1.weid = tab2.weid) ORDER BY tab1.total DESC,tab2.sum DESC ";
        $sql4 = $sql3." LIMIT " .($pindex - 1) * $psize . ',' . $psize;
//        echo($sql4);
        $list2 = pdo_fetchall($sql3);
        $list2=sizeof($list2);
        $pager = pagination($list2, $pindex, $psize);
        $list =pdo_fetchall($sql4);
        $total = $sum = $uname = array();
        if (!empty($list)) {
            foreach ($list as $row) {
                $total[] = $row['total']?$row['total']:-1;
                if($row['total']&&$row['sum'])
                {   if($row['sum']-$row['total']>0)
                        $sum[] = $row['sum']-$row['total'];
                    else  $sum[] =-1;
                }else if( $row['sum']){  $sum[] = $row['sum'];
                }else $sum[] = -1;
                $uname[] = "'".$row['tname']."'";
            }
        }
        include $this->template('active');
    }

}
