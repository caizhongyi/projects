<?php
/**
 * 微翼统计中心模块定义
 *
 * @author We7 Team
 * @url http://www.we7.cc
 */
defined('IN_IA') or exit('Access Denied');

class StatModuleSite extends WeModuleSite {

	public function doWebKeyword() {
        global $_W, $_GPC;
        $foo = !empty($_GPC['foo']) ? $_GPC['foo'] : 'hit';

        $where = '';
        $starttime = empty($_GPC['start']) ?  strtotime(date("Y-m-d",strtotime("-7 day")))  : strtotime($_GPC['start']);
        $endtime = empty($_GPC['end']) ? strtotime(date('Y-m-d')) + 86399 : strtotime($_GPC['end']) + 86399;
        if($endtime - $starttime == (7*24*60*60+86399)) $period = 7;
        elseif ($endtime - $starttime == (14*24*60*60+86399)) $period = 14;
        elseif ($endtime - $starttime == (30*24*60*60+86399)) $period = 30;
        elseif ($endtime - $starttime == (60*24*60*60+86399)) $period = 60;

        $where .= " AND createtime >= '$starttime' AND createtime < '$endtime'";

        if ($foo == 'hit') {
            $pindex = max(1, intval($_GPC['page']));
            $psize = 50;
            $list = pdo_fetchall("SELECT * FROM ".tablename('stat_keyword')." WHERE  weid = '{$_W['weid']}' $where ORDER BY hit DESC LIMIT ".($pindex - 1) * $psize.','. $psize);
            if (!empty($list)) {
                foreach ($list as $index => &$history) {
                    if (!empty($history['rid'])) {
                        $rids[$history['rid']] = $history['rid'];
                    }
                    $kids[$history['kid']] = $history['kid'];
                }
            }
            if (!empty($rids)) {
                $rules = pdo_fetchall("SELECT name, id, module FROM ".tablename('rule')." WHERE id IN (".implode(',', $rids).")", array(), 'id');
            }
            if (!empty($kids)) {
                $keywords = pdo_fetchall("SELECT content, id FROM ".tablename('rule_keyword')." WHERE id IN (".implode(',', $kids).")", array(), 'id');
            }
            $total = pdo_fetchcolumn("SELECT COUNT(*) FROM ".tablename('stat_keyword')." WHERE  weid = '{$_W['weid']}' $where");
            $pager = pagination($total, $pindex, $psize);
            include $this->template('keyword_hit');
        } elseif ($foo == 'miss') {
            $pindex = max(1, intval($_GPC['page']));
            $psize = 50;
            $list = pdo_fetchall("SELECT content, id, module, rid FROM ".tablename('rule_keyword')." WHERE weid = '{$_W['weid']}' AND id NOT IN (SELECT kid FROM ".tablename('stat_keyword')." WHERE  weid = '{$_W['weid']}' $where) LIMIT ".($pindex - 1) * $psize.','. $psize);
            if (!empty($list)) {
                foreach ($list as $index => $row) {
                    if (!empty($row['rid'])) {
                        $rids[$row['rid']] = $row['rid'];
                    }
                }
            }
            if (!empty($rids)) {
                $rules = pdo_fetchall("SELECT name, id, module FROM ".tablename('rule')." WHERE id IN (".implode(',', $rids).")", array(), 'id');
            }
            $total = pdo_fetchcolumn("SELECT COUNT(*) FROM ".tablename('rule_keyword')." WHERE weid = '{$_W['weid']}' AND id NOT IN (SELECT kid FROM ".tablename('stat_keyword')." WHERE  weid = '{$_W['weid']}' $where)");
            $pager = pagination($total, $pindex, $psize);
            include $this->template('keyword_miss');
        }

    }

    public function doWebRule() {
        global $_W, $_GPC;
        $foo = !empty($_GPC['foo']) ? $_GPC['foo'] : 'hit';

        $where = '';
        $starttime = empty($_GPC['start']) ?  strtotime(date("Y-m-d",strtotime("-7 day")))  : strtotime($_GPC['start']);
        $endtime = empty($_GPC['end']) ? strtotime(date('Y-m-d')) + 86399 : strtotime($_GPC['end']) + 86399;
        if($endtime - $starttime == (7*24*60*60+86399)) $period = 7;
        elseif ($endtime - $starttime == (14*24*60*60+86399)) $period = 14;
        elseif ($endtime - $starttime == (30*24*60*60+86399)) $period = 30;
        elseif ($endtime - $starttime == (60*24*60*60+86399)) $period = 60;

        $where .= " AND createtime >= '$starttime' AND createtime < '$endtime'";

        if ($foo == 'hit') {
            $pindex = max(1, intval($_GPC['page']));
            $psize = 50;
            $list = pdo_fetchall("SELECT * FROM ".tablename('stat_rule')." WHERE  weid = '{$_W['weid']}' $where ORDER BY hit DESC LIMIT ".($pindex - 1) * $psize.','. $psize);
            if (!empty($list)) {
                foreach ($list as $index => &$history) {
                    if (!empty($history['rid'])) {
                        $rids[$history['rid']] = $history['rid'];
                    }
                }
            }
            if (!empty($rids)) {
                $rules = pdo_fetchall("SELECT name, id, module FROM ".tablename('rule')." WHERE id IN (".implode(',', $rids).")", array(), 'id');
            }
            $total = pdo_fetchcolumn("SELECT COUNT(*) FROM ".tablename('stat_rule')." WHERE weid = '{$_W['weid']}' $where");
            $pager = pagination($total, $pindex, $psize);
            include $this->template('rule_hit');
        } elseif ($foo == 'miss') {
            $pindex = max(1, intval($_GPC['page']));
            $psize = 50;
            $list = pdo_fetchall("SELECT name, id, module FROM ".tablename('rule')." WHERE weid = '{$_W['weid']}' AND id NOT IN (SELECT rid FROM ".tablename('stat_rule')." WHERE  weid = '{$_W['weid']}' $where) LIMIT ".($pindex - 1) * $psize.','. $psize);
            $total = pdo_fetchcolumn("SELECT COUNT(*) FROM ".tablename('rule')." WHERE weid = '{$_W['weid']}' AND id NOT IN (SELECT rid FROM ".tablename('stat_rule')." WHERE  weid = '{$_W['weid']}' $where)");
            $pager = pagination($total, $pindex, $psize);
            include $this->template('rule_miss');
        }

    }

    public function doWebHistory() {

        global $_W, $_GPC;
        $where = '';
        $starttime = empty($_GPC['start']) ?  strtotime(date("Y-m-d",strtotime("-7 day")))  : strtotime($_GPC['start']);
        $endtime = empty($_GPC['end']) ? strtotime(date('Y-m-d')) + 86399 : strtotime($_GPC['end']) + 86399;
        if($endtime - $starttime == (7*24*60*60+86399)) $period = 7;
        elseif ($endtime - $starttime == (14*24*60*60+86399)) $period = 14;
        elseif ($endtime - $starttime == (30*24*60*60+86399)) $period = 30;
        elseif ($endtime - $starttime == (60*24*60*60+86399)) $period = 60;

        $where .= " AND createtime >= '$starttime' AND createtime < '$endtime'";
        !empty($_GPC['keyword']) && $where .= " AND message LIKE '%{$_GPC['keyword']}%'";

        switch ($_GPC['searchtype']) {
            case 'default':
                $where .= " AND module = 'default'";
                break;
            case 'rule':
            default:
                $where .= " AND module <> 'default'";
                break;
        }
        //导出
        if(isset($_GPC['export']) && !empty($_GPC['export'])){
            require_once  IA_ROOT.'/source/library/excel/PHPExcel.php';
            require_once IA_ROOT.'/source/library/excel/PHPExcel/Writer/Excel2007.php';
            $objPHPExcel = new PHPExcel();
            //保存excel—2007格式
            $objWriter = new PHPExcel_Writer_Excel2007($objPHPExcel);
            //或者$objWriter = new PHPExcel_Writer_Excel5($objPHPExcel);
            //非2007格式
            $objWriter->save("xxx.xlsx");
            //直接输出到浏览器
            $objWriter = new PHPExcel_Writer_Excel5($objPHPExcel);
            header("Pragma: public");
            header("Expires: 0");
            header("Cache-Control:must-revalidate, post-check=0, pre-check=0");
            header("Content-Type:application/force-download");
            header("Content-Type:application/vnd.ms-execl");
            header("Content-Type:application/octet-stream");
            header("Content-Type:application/download");
            $filename = date("YmdHsi",time()).'.xls';
            header('Content-Disposition:attachment;filename="'.$filename.'"');
            header("Content-Transfer-Encoding:binary");

            $objPHPExcel->setActiveSheetIndex(0);
            $objPHPExcel->getActiveSheet()->setCellValue('A1', 'openid');
            $objPHPExcel->getActiveSheet()->setCellValue('B1', '内容');
            $objPHPExcel->getActiveSheet()->setCellValue('C1', '模块');
            $objPHPExcel->getActiveSheet()->setCellValue('D1', '时间');
            $datas = pdo_fetchall("SELECT * FROM ".tablename('stat_msg_history')." WHERE weid = '{$_W['weid']}' $where ORDER BY createtime DESC ");
            $i = 2;
            foreach($datas as  $k=>$data){
                $objPHPExcel->getActiveSheet()->setCellValue('A' . $i, $data['from_user']);
                $objPHPExcel->getActiveSheet()->setCellValue('B' . $i, $data['message']);
                $objPHPExcel->getActiveSheet()->setCellValue('C' . $i, $data['module']);
                $objPHPExcel->getActiveSheet()->setCellValue('D' . $i, date("Y-m-d H:s:i",$data['createtime']));
                $i ++;
            }
            $objWriter->save("php://output");
        }
        $pindex = max(1, intval($_GPC['page']));
        $psize = 20;
        $list = pdo_fetchall("SELECT * FROM ".tablename('stat_msg_history')." WHERE weid = '{$_W['weid']}' $where ORDER BY createtime DESC LIMIT ".($pindex - 1) * $psize.','. $psize);
        if (!empty($list)) {
            foreach ($list as $index => &$history) {
                if ($history['type'] == 'link') {
                    $history['message'] = iunserializer($history['message']);
                    $history['message'] = '<a href="'.$history['message']['link'].'" target="_blank" title="'.$history['message']['description'].'">'.$history['message']['title'].'</a>';
                } elseif ($history['type'] == 'image') {
                    $history['message'] = '<a href="'.$history['message'].'" target="_blank">查看图片</a>';
                } elseif ($history['type'] == 'location') {
                    $history['message'] = iunserializer($history['message']);
                    $history['message'] = '<a href="http://st.map.soso.com/api?size=800*600&center='.$history['message']['y'].','.$history['message']['x'].'&zoom=16&markers='.$history['message']['y'].','.$history['message']['x'].',1" target="_blank">查看方位</a>';
                } else {
                    $history['message'] = emotion($history['message']);
                }
                if (!empty($history['rid'])) {
                    $rids[$history['rid']] = $history['rid'];
                }
            }

        }
        if (!empty($rids)) {
            $rules = pdo_fetchall("SELECT name, id FROM ".tablename('rule')." WHERE id IN (".implode(',', $rids).")", array(), 'id');
        }
        $total = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename('stat_msg_history') . " WHERE weid = '{$_W['weid']}' $where");
        $pager = pagination($total, $pindex, $psize);
        include $this->template('history');

    }
	public function doWebTrend() {

        global $_W, $_GPC;
        $id = intval($_GPC['id']);
        $starttime = empty($_GPC['start']) ?  strtotime(date("Y-m-d",strtotime("-7 day")))  : strtotime($_GPC['start']);
        $endtime = empty($_GPC['end']) ? strtotime(date('Y-m-d')) + 86399 : strtotime($_GPC['end']) + 86399;
        if($endtime - $starttime == (7*24*60*60+86399)) $period = 7;
        elseif ($endtime - $starttime == (14*24*60*60+86399)) $period = 14;
        elseif ($endtime - $starttime == (30*24*60*60+86399)) $period = 30;
        elseif ($endtime - $starttime == (60*24*60*60+86399)) $period = 60;

        $list = pdo_fetchall("SELECT createtime, hit  FROM ".tablename('stat_rule')." WHERE weid = '{$_W['weid']}' AND rid = :rid AND createtime >= :createtime AND createtime <= :endtime ORDER BY createtime ASC", array(':rid' => $id, ':createtime' => $starttime, ':endtime' => $endtime));
        $day = $hit = array();
        if (!empty($list)) {
            foreach ($list as $row) {
                $day[] = date('m-d', $row['createtime']);
                $hit[] = intval($row['hit']);
            }
        }

        $list = pdo_fetchall("SELECT createtime, hit, rid, kid FROM ".tablename('stat_keyword')." WHERE weid = '{$_W['weid']}' AND rid = :rid AND createtime >= :createtime AND createtime <= :endtime ORDER BY createtime ASC", array(':rid' => $id, ':createtime' => $starttime, ':endtime' => $endtime));
        if (!empty($list)) {
            foreach ($list as $row) {
                $keywords[$row['kid']]['hit'][] = $row['hit'];
                $keywords[$row['kid']]['day'][] = date('m-d', $row['createtime']);
            }
            $keywordnames = pdo_fetchall("SELECT content, id FROM ".tablename('rule_keyword')." WHERE id IN (".implode(',', array_keys($keywords)).")", array(), 'id');
        }

        include $this->template('trend');

    }
    public function doWebPu() {global $_W, $_GPC;
        $starttime = empty($_GPC['start']) ?  strtotime(date("Y-m-d",strtotime("-7 day")))  : strtotime($_GPC['start']);
        $endtime = empty($_GPC['end']) ? strtotime(date('Y-m-d')) + 86399 : strtotime($_GPC['end']) + 86399;
        $where .= " AND createtime >= '$starttime' AND createtime < '$endtime'";

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

        $sql = "select date_format(from_unixtime(createtime),'".$cond."') as time,count(*) as pvcount,count(distinct(from_user)) as uvcount from ".tablename('stat_msg_history')." WHERE weid = '{$_W['weid']}' $where group by time order by time asc;";
        $list = pdo_fetchall($sql);
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
        $list = pdo_fetch("SELECT count(distinct(from_user)) as total_uv_count FROM ".tablename('stat_msg_history')." WHERE weid = '{$_W['weid']}' $where");
        $uv = $list['total_uv_count'];

        include $this->template('pu');
    }
}
