<?php
/**
 * Created by JetBrains PhpStorm.
 * User: hongmingjie
 * Date: 14-1-14
 * Time: 上午10:41
 * 拜年活动后台展示
 */

defined('IN_IA') or exit('Access Denied');
global $_GPC, $_W;
$do = empty($_GPC['do']) ? 'display' : $_GPC['do'];

if (!empty($_GPC['submit_reply'])) {
    if (empty($_FILES['file']['tmp_name'])) {
        echo "<script>alert('上传文件太大，请上传低于2M文件')</script>";
        exit;
    }

    $upload = file_upload($_FILES['file'], 'file');

    if (is_error($upload)) {
        echo "<script>alert('" . $upload['message'] . "')</script>";
        exit;
    }
    //上传成功
    $filename = IA_ROOT . '/resource/attachment/' . $upload['path'];
    //导入
    require_once IA_ROOT . '/source/library/excel/PHPExcel.php';
    require_once IA_ROOT . '/source/library/excel/PHPExcel/IOFactory.php';

    $flletype = substr(strrchr($filename, '.'), 1);
    if ($flletype == 'xlsx') {
        $inputFileType = 'Excel2007';
    } elseif ($flletype == 'xls') {
        $inputFileType = 'Excel5';
    } else {
        echo "<script>alert('上传格式不对,请上传xls或xlsx文件!')</script>";
        exit;
    }
    $reader = PHPExcel_IOFactory::createReader($inputFileType);
    $objPHPExcel = $reader->load($filename);
    $sheet = $objPHPExcel->getSheet(0);
    $highestRow = $sheet->getHighestRow(); // 取得总行数
    $highestColumn = $sheet->getHighestColumn(); // 取得总列数
    $messages = array();
    $a1 = $objPHPExcel->getActiveSheet()->getCell("A" . 1)->getValue();
    $b1 = $objPHPExcel->getActiveSheet()->getCell("B" . 1)->getValue();
    $sql = "INSERT into ".tablename('bainian_results')." (`time_slot`,`phone`,`credits`,`rank`) VALUES ";
    for ($j = 2; $j <= $highestRow; $j++) {
        $message['time_slot'] = $objPHPExcel->getActiveSheet()->getCell("A" . $j)->getValue(); //获取A列的值
        $message['phone'] = $objPHPExcel->getActiveSheet()->getCell("B" . $j)->getValue(); //获取A列的值
        $message['credits'] = $objPHPExcel->getActiveSheet()->getCell("C" . $j)->getValue(); //获取B列的值
        $message['rank'] = $objPHPExcel->getActiveSheet()->getCell("D" . $j)->getValue();
        $messages[] = $message;
        if($j == 2){
            $sql .='("'.trim($message['time_slot'] ).'","'.trim($message['phone'] ).'","'.trim($message['credits']).'","'.trim($message['rank']).'")';
        }else{
            $sql .=',("'.trim($message['time_slot'] ).'","'.trim($message['phone'] ).'","'.trim($message['credits']).'","'.trim($message['rank']).'")';
        }

    }
    pdo_query($sql);//快速导入
    echo "<script>alert('导入成功!!'); </script>";
    exit;
}
$pindex = max(1, intval($_GPC['page']));
$psize = 50;
$where = '';
$starttime = empty($_GPC['start']) ? strtotime('-1 month') : strtotime($_GPC['start']);
$endtime = empty($_GPC['end']) ? TIMESTAMP : strtotime($_GPC['end']) + 86399;
$where .= " AND i.createtime >= '$starttime' AND i.createtime < '$endtime'";
$from_user = isset($_GPC['from_user']) && !empty($_GPC['from_user']) ? trim($_GPC['from_user']) : '';
if (!empty($from_user)) {
    $where .= " AND i.openid like '%$from_user%' ";
}
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
    $objPHPExcel->getActiveSheet()->setCellValue('B1', '报名时间');
    $objPHPExcel->getActiveSheet()->setCellValue('C1', '报名电话');
    $objPHPExcel->getActiveSheet()->setCellValue('D1', '积分');
    $objPHPExcel->getActiveSheet()->setCellValue('E1', '排名');
    $datas = pdo_fetchall("SELECT i.openid,i.phone,i.createtime,ii.credits,ii.rank    FROM " . tablename('bainian_logs') . " i left join (SELECT * from (SELECT * from ims_bainian_results where 1  ORDER BY id desc) results GROUP BY phone) ii on(i.phone = ii.phone) WHERE weid = '{$_W['weid']}'".$where);
    $i = 2;
    foreach($datas as  $k=>$data){
        $objPHPExcel->getActiveSheet()->setCellValue('A' . $i, $data['openid']);
        $objPHPExcel->getActiveSheet()->setCellValue('B' . $i, date("Y-m-d H:s:i",$data['createtime']));
        $objPHPExcel->getActiveSheet()->setCellValue('C' . $i, $data['phone']);
        $objPHPExcel->getActiveSheet()->setCellValue('D' . $i, $data['credits']);
        $objPHPExcel->getActiveSheet()->setCellValue('E' . $i, $data['rank']);
        $i ++;
    }
    $objWriter->save("php://output");
    exit;
}

$list = pdo_fetchall("SELECT i.openid,i.phone,i.createtime,ii.credits,ii.rank  FROM " . tablename('bainian_logs') . " i left join (SELECT * from (SELECT * from ims_bainian_results where 1  ORDER BY id desc) results GROUP BY phone) ii on(i.phone = ii.phone) WHERE weid = '{$_W['weid']}'".$where."  LIMIT " . ($pindex - 1) * $psize . ',' . $psize);

$total = pdo_fetchcolumn("SELECT COUNT(*) FROM (select * from " . tablename('bainian_logs')." group by openid) i where weid ='{$_W['weid']}' ");
$pager = pagination($total, $pindex, $psize);
template('mobile_internet/bainian');
