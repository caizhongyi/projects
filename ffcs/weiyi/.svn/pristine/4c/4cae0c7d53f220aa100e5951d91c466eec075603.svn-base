<?php
/**
 * Created by JetBrains PhpStorm.
 * User: hongmingjie
 * Date: 13-11-28
 * Time: 下午3:33
 * PHPExcel 测试demo
 */

require '../source/library/excel/PHPExcel.php';
require '../source/library/excel/PHPExcel/Writer/Excel2007.php';

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
header('Content-Disposition:attachment;filename="resume.xls"');
header("Content-Transfer-Encoding:binary");

$objPHPExcel->setActiveSheetIndex(0);
$objPHPExcel->getActiveSheet()->setCellValue('A1', 'ID');
$objPHPExcel->getActiveSheet()->setCellValue('B1', '目录');
$objPHPExcel->getActiveSheet()->setCellValue('C1', '父目录');
$i = 2;
$datas=array(array(1,2,4),array(2,3,5),array(3,4,6));
foreach($datas as  $k=>$data){
    $objPHPExcel->getActiveSheet()->setCellValue('A' . $i, $data['0']);
    $objPHPExcel->getActiveSheet()->setCellValue('B' . $i, $data['1']);
    $objPHPExcel->getActiveSheet()->setCellValue('C' . $i, $data['2']);
    $i ++;
}
$objWriter->save("php://output");
?>