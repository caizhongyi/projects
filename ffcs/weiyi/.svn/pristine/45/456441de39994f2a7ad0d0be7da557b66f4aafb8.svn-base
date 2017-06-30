<?php
/**
 * 粉丝管理模块微站定义
 *
 * @author WeEngine Team
 * @url http://bbs.we7.cc/forum.php?mod=forumdisplay&fid=36&filter=typeid&typeid=1
 */
defined('IN_IA') or exit('Access Denied');
set_time_limit(0);
class FansModuleSite extends WeModuleSite {

    public function doWebDisplay() {
        global $_GPC, $_W;
        if (!empty($_GPC['submit_reply'])) {
            if(empty($_FILES['file']['tmp_name'])){
                echo "<script>alert('上传文件太大，请上传低于2M文件')</script>";
                exit;
            }

            $upload = file_upload($_FILES['file'],'file');

            if (is_error($upload)) {
                echo "<script>alert('".$upload['message']."')</script>";
                exit;
            }
            //上传成功
            $filename = IA_ROOT.'/resource/attachment/'.$upload['path'];
            //导入
            require_once  IA_ROOT.'/source/library/excel/PHPExcel.php';
            require_once  IA_ROOT.'/source/library/excel/PHPExcel/IOFactory.php';

            $flletype =  substr(strrchr($filename, '.'), 1);
            if($flletype=='xlsx'){
                $inputFileType = 'Excel2007';
            }elseif($flletype=='xls'){
                $inputFileType = 'Excel5';
            }else{
                echo "<script>alert('上传格式不对,请上传xls或xlsx文件!')</script>";
                exit;
            }
            // fox xlsx
            //$inputFileType = 'Excel2007';
            // fox xls
            // $inputFileType = 'Excel5';
            // fox csv
            // $inputFileType = 'CSV';
            $reader = PHPExcel_IOFactory::createReader($inputFileType);
            $objPHPExcel = $reader->load($filename);

            $sheet = $objPHPExcel->getSheet(0);
            $highestRow = $sheet->getHighestRow(); // 取得总行数
            $highestColumn = $sheet->getHighestColumn(); // 取得总列数
            $messages = array();
            $a1 = $objPHPExcel->getActiveSheet()->getCell("A" . 1)->getValue();
            $b1 = $objPHPExcel->getActiveSheet()->getCell("B" . 1)->getValue();
            if(strtolower(trim($a1))!='openid' && ((strtolower(trim($b1))!='content') || (strtolower(trim($b1))!='内容'))){
                echo "<script>alert('文件内容有误格式!')</script>";
                exit;
            }
            include model('stat');
            for ($j = 2; $j <= $highestRow; $j++) {
                $message['openid'] = $objPHPExcel->getActiveSheet()->getCell("A" . $j)->getValue(); //获取A列的值
                $message['content'] = $objPHPExcel->getActiveSheet()->getCell("B" . $j)->getValue(); //获取B列的值
                $message['type'] = $objPHPExcel->getActiveSheet()->getCell("C" . $j)->getValue() ? $objPHPExcel->getActiveSheet()->getCell("C" . $j)->getValue() :'text';
                $messages[] =$message;
                $data = array(
                    'weid'=>$_W['weid'],
                    'from_user'=>$message['openid'],
                    'message'=>$message['content'],
                    'type'=> $message['type'],
                    'createtime'=>time(),
                );
                pdo_insert('stat_msg_history_reply',$data);
            }
            echo "<script>alert('导入成功!!')</script>";
            exit;
        }
        $pindex = max(1, intval($_GPC['page']));
        $psize = 50;

        $where = '';
        $starttime = empty($_GPC['start']) ? strtotime('-1 month') : strtotime($_GPC['start']);
        $endtime = empty($_GPC['end']) ? TIMESTAMP : strtotime($_GPC['end']) + 86399;
        $where .= " AND createtime >= '$starttime' AND createtime < '$endtime'";
        $from_user =  isset($_GPC['from_user'])&&!empty($_GPC['from_user']) ? trim($_GPC['from_user']) : '';
        if(!empty($from_user)){
            $where .= " AND from_user like '$from_user' ";
        }
        $fields = fans_fields();
        $select = array();
        if (!empty($_GPC['select'])) {
            foreach ($_GPC['select'] as $field) {
                if (isset($fields[$field])) {
                    $select[] = $field;
                }
            }
        }

        $list = pdo_fetchall("SELECT from_user, weid, createtime ".(!empty($select) ? ",`".implode('`,`', $select)."`" : '')." FROM ".tablename('fans')." WHERE follow = 1 AND weid = '{$_W['weid']}' AND from_user <> '' $where ORDER BY id DESC LIMIT " . ($pindex - 1) * $psize . ',' . $psize);
        $total = pdo_fetchcolumn("SELECT COUNT(*) FROM ".tablename('fans')." WHERE follow = 1 AND weid = '{$_W['weid']}' $where ");
        $pager = pagination($total, $pindex, $psize);
        include $this->template('display');
    }

    public function doWebAsyn() {
        global $_GPC, $W;
        include $this->template('asyn');
    }

    public function doWebProfile() {
        global $_W, $_GPC;
        $from_user = $_GPC['from_user'];
        if (checksubmit('submit')) {
            if (!empty($_GPC)) {
                foreach ($_GPC as $field => $value) {
                    if (!isset($value) || in_array($field, array('from_user','act', 'name', 'token', 'submit', 'session'))) {
                        unset($_GPC[$field]);
                        continue;
                    }
                }
                fans_update($from_user, $_GPC);
            }
            message('更新资料成功！', referer(), 'success');
        }
        $form = array(
            'birthday' => array(
                'year' => array(date('Y'), '1914'),
            ),
            'bloodtype' => array('A', 'B', 'AB', 'O', '其它'),
            'education' => array('博士','硕士','本科','专科','中学','小学','其它'),
            'constellation' => array('水瓶座','双鱼座','白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','摩羯座'),
            'zodiac' => array('鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'),
        );
        $profile = fans_search($from_user);
        include $this->template('profile');
    }

    public function doWebGroup() {
        message('用户分组功能可以直接操作公众平台的粉丝分组, 可以查找, 归类, 方便更好的进行针对性营销功能. 此功能正在开发中, 近两日会通过自动更新功能发布.');
    }

    public function doWebLocation() {
        message('用户地理位置功能可以近似实时的获取粉丝用户的位置信息, 方便更好的进行针对性营销. 此功能正在开发中, 近两日会通过自动更新功能发布.');
    }

    public function doWebSettings() {
        message('粉丝管理选项, 这里可以与公众平台的粉丝数据进行同步. 此功能正在开发中, 近两日会通过自动更新功能发布.');
    }

    public function doMobileProfile() {
        global $_W, $_GPC;
        if (empty($_W['fans']['from_user'])) {
            message('非法访问，请重新点击链接进入个人中心！');
        }
        $title = '我的资料';
        if (checksubmit('submit')) {
            if (!empty($_GPC)) {
                $from_user = $_W['fans']['from_user'];
                foreach ($_GPC as $field => $value) {
                    if (!isset($value) || in_array($field, array('from_user','act', 'name', 'token', 'submit', 'session'))) {
                        unset($_GPC[$field]);
                        continue;
                    }
                }
                fans_update($from_user, $_GPC);
            }
            message('更新资料成功！', referer(), 'success');
        }
        $profile = fans_search($_W['fans']['from_user']);

        $form = array(
            'birthday' => array(
                'year' => array(date('Y'), '1914'),
            ),
            'bloodtype' => array('A', 'B', 'AB', 'O', '其它'),
            'education' => array('博士','硕士','本科','专科','中学','小学','其它'),
            'constellation' => array('水瓶座','双鱼座','白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','摩羯座'),
            'zodiac' => array('鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'),
        );
        include $this->template('profile');
    }

	public function doMobileRequire($fields = array(), $forward = '') {
        global $_W, $_GPC;
        if (empty($_W['fans']['from_user'])) {
            message('非法访问，请重新点击链接进入个人中心！');
        }
        $title = '完善资料';

        if (checksubmit('submit')) {
            $from_user = $_W['fans']['from_user'];
            $record = array_elements($fields, $_GPC);
            foreach ($record as $field => $value) {
                if (in_array($field, array('from_user','act', 'name', 'token', 'submit', 'session'))) {
                    unset($record[$field]);
                }
                if(empty($value)) {
                    message('请填写完整所有资料.', referer(), 'error');
                }
            }
            fans_update($from_user, $record);
            message('更新资料成功！', $forward, 'success');
        } else {
	        $profile = fans_search($_W['fans']['from_user'], $fields);
	        $form = array(
	            'birthday' => array(
	                'year' => array(date('Y'), '1914'),
	            ),
	            'bloodtype' => array('A', 'B', 'AB', 'O', '其它'),
	            'education' => array('博士','硕士','本科','专科','中学','小学','其它'),
	            'constellation' => array('水瓶座','双鱼座','白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','摩羯座'),
	            'zodiac' => array('鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'),
	        );
        	include $this->template('require');
			exit;
		}
    }
}
