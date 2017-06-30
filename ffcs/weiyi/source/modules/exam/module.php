<?php
/**
 * 考试系统
 *
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');

class ExamModule extends WeModule
{
    public $name = 'Exam';
    public $title = '考试';
    public $ability = '';
    public $tablename = 'exam_reply';

    public function fieldsFormDisplay($rid = 0)
    {
        global $_W;
        if (!empty($rid)) {
            $reply = pdo_fetch("SELECT * FROM " . tablename($this->tablename) . " WHERE rid = :rid ORDER BY `id` DESC", array(':rid' => $rid));
        }
        if (empty($reply['start_time'])) {
            $reply['start_time'] = date('Y-m-d', time()); //默认当前时间
        } else {
            $reply['start_time'] = date('Y-m-d H:i:s', $reply['start_time']);
        }
        if (empty($reply['end_time'])) {
            $reply['end_time'] = date('Y-m-d', time() + 3600 * 24 * 7); //默认一周后
        } else {
            $reply['end_time'] = date('Y-m-d H:i:s', $reply['end_time']);
        }

        include $this->template('form');
    }

    public function fieldsFormValidate($rid = 0)
    {

        return true;
    }
    public function fieldsFormSubmit($rid = 0)
    {
        global $_GPC, $_W;

        if (is_numeric($_GPC['interval'])==false){
            message("时间输入不合法，请输入数字！");
        }
        $id = intval($_GPC['reply_id']);
        $insert = array(
            'rid' => $rid,
            'title' => $_GPC['title'],
            'description' => $_GPC['description'],
            'thumb' => $_GPC['picture'],
            'exam_title' => $_GPC['vote_title']
        );
        $insert['start_time'] = strtotime($_GPC['start']);
        $insert['end_time'] = strtotime($_GPC['end']);
        $insert['exam_time'] = $_GPC['interval'];
        //处理图片
        if (!empty($_GPC['picture'])) {
            file_delete($_GPC['picture-old']);
        } else {
            unset($insert['thumb']);
        }
        if (empty($id)) {
            $id = pdo_insert($this->tablename, $insert);
        } else {
            pdo_update($this->tablename, $insert, array('id' => $id));
        }
        return true;
    }
    public function ruleDeleted($rid = 0)
    {
        global $_W;
        $replies = pdo_fetchall("SELECT id,rid FROM " . tablename($this->tablename) . " WHERE rid = '$rid'");
        $deleteid = array();
        if (!empty($replies)) {
            foreach ($replies as $index => $row) {
                $deleteid[] = $row['id'];
            }
        }
        pdo_delete($this->tablename, "id IN ('" . implode("','", $deleteid) . "')");
        return true;
    }

    public function doinputdata(){
        global $_GPC, $_W;
        $rid = $_GPC['id'];
        if (!empty($_GPC['import_datas'])){
            $this->import_data($rid);
        }
        include $this->template('input_data');
    }

     public function dooption()
    {
        global $_GPC, $_W;
        $rid = $_GPC['id'];
        $type = empty($_GPC['type'])?1:$_GPC['type'];
        $foo = !empty($_GPC['foo']) ? $_GPC['foo'] : 'display';
        if ($foo == 'display') {
            $pindex = max(1, intval($_GPC['page']));
            $psize = 20;
            $condition = '';
            $params = array();

            if (!empty($_GPC['keyword'])) {
                $condition .= " and title LIKE :keyword";
                $params[':keyword'] = "%{$_GPC['keyword']}%";
            }

            if (!empty($type)){
                $condition .= " and type = :type";
                $params[':type'] = $type;
            }

            //批量数据导入
            if (!empty($_GPC['import_datas'])){
                $this->import_data($rid);
            }

            $list = pdo_fetchall("SELECT * FROM ".tablename('exam_option')." WHERE rid = $rid $condition ORDER BY id DESC LIMIT ".($pindex - 1) * $psize.','.$psize, $params);
            $total = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename('exam_option')." WHERE rid = $rid ".$condition, $params);
            $pager = pagination($total, $pindex, $psize);

        }elseif ($foo=='post'){
            $id = intval($_GPC['op_id']);
           // $rid = $_GPC['id'];
            if (!empty($id)) {
                $item = pdo_fetch("SELECT * FROM ".tablename('exam_option')." WHERE id = :id" , array(':id' => $id));
            }

            if (checksubmit('sd_submit')) {
                if (empty($_GPC['title'])) {
                    message('题干信息不能为空，请输入题干！');
                }
                if (empty($_GPC['content']))
                {
                    message("题目选项不能为空，请输入！");
                }
                if (empty($_GPC['answer'])) {
                    message('答案不能为空，答案！');
                }
                if (empty($_GPC['score']) || is_numeric($_GPC['score'])==false)
                {
                    message("输入不合法，请输入数字！");
                }

                if (empty($id)) {
                    $temp =strip_tags(htmlspecialchars_decode($_GPC['content']), '<p>');
                    $data = array(
                        'rid' => $rid,
                        'title' => $_GPC['title'],
                        'content' => $temp,
                        'answer' => $_GPC['answer'],
                        'type' => $type,
                        'score' => $_GPC['score']
                    );
                    //echo var_dump($data);
                    pdo_insert('exam_option', $data);
                    message('添加考题成功！',create_url('site/module', array('do' => 'option', 'name'=>'exam', 'id'=>$rid, 'type'=>$type)), 'success');
                } else {
                    $temp =strip_tags(htmlspecialchars_decode($_GPC['content']), '<p>');
                    $data = array(
                        'title' => $_GPC['title'],
                        'content' => $temp,
                        'answer' => $_GPC['answer'],
                        'score' => $_GPC['score']
                    );
                    pdo_update('exam_option', $data, array('id' => $id));
                    message('更新考题成功！',create_url('site/module', array('do' => 'option', 'name'=>'exam', 'id'=>$item['rid'], 'type'=>$type)), 'success');
                }


            }
        }elseif ($foo == 'delete'){
            $id = intval($_GPC['op_id']);
            $row = pdo_fetch("SELECT id FROM ".tablename('exam_option')." WHERE id = :id", array(':id' => $id));
            if (empty($row)) {
                message('抱歉，该知识点不存在或者已经删除！');
            }
            pdo_delete('exam_option', array('id' => $id));
            message('删除成功！', referer(), 'success');
        }
        include $this->template('question_bank');
    }

    public function doDelete()
    {
        global $_W, $_GPC;
        $id = $_GPC['id'];
        $sql = "SELECT id,  rid FROM " . tablename('exam_option') . " WHERE `id`=:id";
        $row = pdo_fetch($sql, array(':id' => $id));
        if (empty($row)) {
            message('抱歉，回复不存在或是已经被删除！', '', 'error');
        }
        pdo_delete('exam_option', array('id' => $id));
        message('删除试题成功！',create_url('site/module', array('do' => 'option', 'name'=>'exam', 'id' => '$id')), 'success');
    }

    //知识库管理
    public function doknowledge()
    {
        global $_W, $_GPC;
        $foo = !empty($_GPC['foo']) ? $_GPC['foo'] : 'display';
        $rid = $_GPC['id'];
        $weid =  $_W['weid'];

        //取得分类值
        $knowledge_val = pdo_fetchall("SELECT * from".tablename('exam_knowledge_cat')." WHERE weid=$weid");
        $category = array();
        foreach ($knowledge_val as $key => $val){
            $category[$val['id']] = $val['category'];
        }
        if ($foo == 'display') {
            $pindex = max(1, intval($_GPC['page']));
            $psize = 20;
            $condition = '';
            $params = array();

            //批量删除数据
            if (isset($_GPC['alldelete'])) {
                $push_ids = $_POST['push_ids'];
                if (!empty($push_ids)){
                    pdo_delete('exam_knowledge', 'id in('.implode(',', $push_ids).')');
                    message('批量删除数据成功！', referer(), 'success');
                }
            }

            if (!empty($_GPC['keyword'])) {
                $condition .= " and knowledge_name LIKE :keyword";
                $params[':keyword'] = "%{$_GPC['keyword']}%";
            }

            $list = pdo_fetchall("SELECT * FROM ".tablename('exam_knowledge')." WHERE weid=$weid $condition ORDER BY id DESC LIMIT ".($pindex - 1) * $psize.','.$psize, $params);
            $total = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename('exam_knowledge')." WHERE weid=$weid".$condition, $params);
            $pager = pagination($total, $pindex, $psize);

            //批量数据导出
            if (isset($_GPC['export']) && !empty($_GPC['export'])){
                $data = pdo_fetchall("SELECT * FROM ".tablename('exam_knowledge')." WHERE weid=$weid $condition ORDER BY id DESC ", $params);
                if (!empty($data)){
                    $this->export_data($data);
                }else{
                    echo "<script>alert('数据为空不需要导出!'); </script>";
                }
            }
            //批量数据导入
            if (!empty($_GPC['import_datas'])){
               $this->know_import_data();
            }

        }elseif ($foo=='post'){

            $id = intval($_GPC['id']);
            if (!empty($id)) {
                $item = pdo_fetch("SELECT * FROM ".tablename('exam_knowledge')." WHERE id = :id" , array(':id' => $id));
            }

            if (checksubmit('sd_submit')) {
                if (empty($_GPC['title'])) {
                    message('知识点名称不能为空，请输入标题！');
                }
                if (empty($_GPC['content']))
                {
                    message("知识点内容不能为空，请输入！");
                }
                $data = array(
                    'weid' =>  $weid,
                    'knowledge_name' => $_GPC['title'],
                    'content' => htmlspecialchars_decode($_GPC['content']),
                    'describe' => $_GPC['description'],
                    'createtime' => TIMESTAMP,
                    'cat_id' => ($_GPC['cate_1'] > 0) ? $_GPC['cate_1'] : 1
                );

                if (empty($id)) {
                    pdo_insert('exam_knowledge', $data);
                } else {
                    unset($data['createtime']);
                    pdo_update('exam_knowledge', $data, array('id' => $id));
                }

                message('添加知识点成功！',create_url('site/module', array('do' => 'knowledge', 'name'=>'exam')), 'success');
            }
        }elseif ($foo=='delete'){
            $id = intval($_GPC['id']);
            $row = pdo_fetch("SELECT id FROM ".tablename('exam_knowledge')." WHERE id = :id", array(':id' => $id));
            if (empty($row)) {
                message('抱歉，该知识点不存在或者已经删除！');
            }
            pdo_delete('exam_knowledge', array('id' => $id));
            message('删除成功！', referer(), 'success');
        }elseif ($foo=='input_data'){
            /*if (!empty($_GPC['import_datas'])){
                $this->import_data();
             }*/
        }

        include $this->template('knowledge');
    }

    //数据导出处理函数
    public function export_data($datas)
    {
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
        $objPHPExcel->getActiveSheet()->setCellValue('A1', 'id');
        $objPHPExcel->getActiveSheet()->setCellValue('B1', '标题');
        $objPHPExcel->getActiveSheet()->setCellValue('C1', '内容');
        $objPHPExcel->getActiveSheet()->setCellValue('D1', '简介');
        $i = 2;
        foreach($datas as  $k=>$data){
            $objPHPExcel->getActiveSheet()->setCellValue('A' . $i, $data['id']);
            $objPHPExcel->getActiveSheet()->setCellValue('B' . $i, $data['knowledge_name']);
            $objPHPExcel->getActiveSheet()->setCellValue('C' . $i, $data['content']);
            $objPHPExcel->getActiveSheet()->setCellValue('D' . $i, $data['describe']);
            $i ++;
        }
        $objWriter->save("php://output");
    }

    //题库导入
    public function import_data($rid)
    {
        if (empty($_FILES['file']['tmp_name'])) {
            message('空文件不需要上传！', referer(), 'error');
        }

        $upload = file_upload($_FILES['file'], 'file');
        if (is_error($upload)) {
            message($upload['message'], referer(), 'error');
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
            message('上传格式不对,请上传xls或xlsx文件!', referer(), 'error');
        }
        $reader = PHPExcel_IOFactory::createReader($inputFileType);
        $objPHPExcel = $reader->load($filename);
        $sheet = $objPHPExcel->getSheet(0);
        $highestRow = $sheet->getHighestRow(); // 取得总行数
        $highestColumn = $sheet->getHighestColumn(); // 取得总列数

        $messages = array();
        $sql = "INSERT into ".tablename('exam_option')." (`rid`, `title`, `content`,`answer`,`type`, `score`) VALUES ";
        $message['rid'] = $rid;
        $temp = array();
        $flag = 0;

        if ($highestRow > 2){
            for ($j = 2; $j <= $highestRow; $j++) {
                $message['title'] = $objPHPExcel->getActiveSheet()->getCell("A" . $j)->getValue(); //获取A列的值
                $temp = explode("\n", $objPHPExcel->getActiveSheet()->getCell("B" . $j)->getValue()); //获取B列的值
                $message['answer'] = $objPHPExcel->getActiveSheet()->getCell("C" . $j)->getValue(); //获取C列的值
                $message['type'] = $objPHPExcel->getActiveSheet()->getCell("D" . $j)->getValue(); //获取D列的值
                $message['score'] = $objPHPExcel->getActiveSheet()->getCell("E" . $j)->getValue(); //获取D列的值
                //拆分选项中的选项
                //$temp = explode("\n",$message['content']);
                $message['content'] = htmlspecialchars_decode(implode("<p>", $temp));
                if (empty($message['title']) && empty($message['content']) && empty($message['answer'])){
                    continue;
                }
                $messages[] = $message;
                if($j == 2){
                    $sql .='("'.trim($message['rid'] ).'","'.trim($message['title'] ).'","'.trim($message['content'] ).'","'.trim($message['answer']).'","'.trim($message['type']).'","'.trim($message['score']).'")';
                }else{
                    $sql .=',("'.trim($message['rid'] ).'","'.trim($message['title'] ).'","'.trim($message['content'] ).'","'.trim($message['answer']).'","'.trim($message['type']).'","'.trim($message['score']).'")';
                }
                $flag = 1;
            }
            if ($flag==1){
                pdo_query($sql);//快速导入
                message('批量数据入库成功！',create_url('site/module', array('do' => 'option', 'name' => 'exam', 'id' => $rid, 'type' => 1)), 'success');
            }else{
                message('上传文件内容有错，请按规范操作！', referer(), 'success');
            }

        }else{
            message('文件内容为空，不需要上传！', referer(), 'success');
        }
    }

    //知识点导入
    public function know_import_data()
    {
        global $_W;
        $weid = $_W['weid'];
        if (empty($_FILES['file']['tmp_name'])) {
            message('空文件不需要上传！', referer(), 'error');
        }

        $upload = file_upload($_FILES['file'], 'file');
        if (is_error($upload)) {
            message($upload['message'], referer(), 'error');
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
            message('上传格式不对,请上传xls或xlsx文件!', referer(), 'error');
        }
        $reader = PHPExcel_IOFactory::createReader($inputFileType);
        $objPHPExcel = $reader->load($filename);
        $sheet = $objPHPExcel->getSheet(0);
        $highestRow = $sheet->getHighestRow(); // 取得总行数
        $highestColumn = $sheet->getHighestColumn(); // 取得总列数

        $messages = array();
        $a1 = $objPHPExcel->getActiveSheet()->getCell("A" . 1)->getValue();
        $b1 = $objPHPExcel->getActiveSheet()->getCell("B" . 1)->getValue();
        $sql = "INSERT into ".tablename('exam_knowledge')." (`knowledge_name`,`content`,`describe`,`weid`,`createtime`) VALUES ";
        $message['createtime'] = TIMESTAMP;
        $message['weid'] = $_W['weid'];

        if ($highestRow>2){
            for ($j = 2; $j <= $highestRow; $j++) {
                $message['knowledge_name'] = $objPHPExcel->getActiveSheet()->getCell("A" . $j)->getValue(); //获取A列的值
                $message['content'] = $objPHPExcel->getActiveSheet()->getCell("B" . $j)->getValue(); //获取A列的值
                $message['describe'] = $objPHPExcel->getActiveSheet()->getCell("C" . $j)->getValue(); //获取B列的值
                $messages[] = $message;
                if($j == 2){
                    $sql .='("'.trim($message['knowledge_name'] ).'","'.trim($message['content'] ).'","'.trim($message['describe']).'","'.trim($message['weid']).'","'.trim($message['createtime']).'")';
                }else{
                    $sql .=',("'.trim($message['knowledge_name'] ).'","'.trim($message['content'] ).'","'.trim($message['describe']).'","'.trim($message['weid']).'","'.trim($message['createtime']).'")';
                }
            }
            pdo_query($sql);//快速导入
            message('批量数据入库成功！',create_url('site/module', array('do' => 'knowledge', 'name'=>'exam')), 'success');
        }else{
            message('文件内容为空，不需要上传！',referer(), 'success');
        }

    }
}
