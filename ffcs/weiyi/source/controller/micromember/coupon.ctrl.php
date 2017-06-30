<?php
/**
 * Created by PhpStorm.
 * User: yangey
 * Date: 13-12-16
 * Time: 下午8:00
 */
defined('IN_IA') or exit('Access Denied');
$actType = $_GPC['actType'];
$actType = empty($actType) ? "list" : $actType;

if ($actType == "list") {
    $pindex =  !empty($_GPC['page']) ? intval($_GPC['page']) : 1;
    $psize = 15;
    
    $url = create_url('rule/post', array('type' => 'list'));
    $queryUrl = create_url('micromember/coupon', array('type' => 'list'));
    //查询，分页，
    $keyWord = $_GPC['keyword-input'];
    $type = $_GPC['query_type'];
    $typetemp = $type;
    
    $condition1 = "a.*,b.name";
    $condition2 = "count(*)";
    $_sql = "SELECT ";
    $sql = " FROM ims_micromember_coupon a, ims_micromember_coupon_type b
             WHERE a.type=b.id and a.status=1 and  weid = {$_W['weid']}";
    if(!empty($type)){
        if(0!=$type)
        $sql = $sql." and a.type=".$type;
    }

    if(!empty($keyWord)){
        $sql = $sql." and a.title like '%".$keyWord."%'";
    }

//    $sql = $sql." order by id desc limit ".$pMin.",".$pMax;
	$sql_end = " order by a.id desc limit ".($pindex - 1) * $psize.','. $psize;
	
    $couponList = pdo_fetchall($_sql.$condition1.$sql.$sql_end);
    $total = pdo_fetchcolumn($_sql.$condition2.$sql);
    $pager = pagination($total, $pindex, $psize);
    template('micromember/coupon/list');
    return;
}

if ($actType == "edit") {
	$id = $_GPC['couponId'];
	$sql = "SELECT a.*,b.name FROM ims_micromember_coupon a, ims_micromember_coupon_type b
			WHERE a.type=b.id and a.status=1 and  weid = {$_W['weid']} and a.id = {$id}";
	$result = pdo_fetch($sql);
	$starttime = strtotime($result['begin_date']);
	$endtime = strtotime($result['end_date']);
    template('micromember/coupon/add');
    return;
}

if ($actType == "detail") {
	$pindex =  !empty($_GPC['page']) ? intval($_GPC['page']) : 1;
	$psize = 20;
	
    $r_couponId = $_GPC['couponId'];
    $r_keyWord = $_GPC['keyword-input'];
    $r_queryType = $_GPC['query_type'];
    
    $condition1 = "a.*,b.username,c.title";
    $condition2 = "count(*)";
	$_sql = "SELECT ";
    $sql = " FROM ims_micromember_coupon_log a,ims_members b,ims_micromember_coupon c
             WHERE a.uid=b.uid
               AND a.coupon_Id=c.id
               AND b.status=0
               AND a.weid = {$_W['weid']}
               AND a.status=1
               AND coupon_id={$r_couponId} ";

    if(!empty($r_queryType)&&!empty($r_keyWord)){
        if("all"==$r_queryType){
            $sql = $sql." AND (b.username like '%".$r_keyWord.
                "%' or b.username like '%".$r_keyWord.
                "%' or b.username like '%".$r_keyWord."%')";
        }
        if("membername"==$r_queryType)
            $sql = $sql." AND b.username like '%".$r_keyWord."%'";
        if("phone"==$r_queryType)
            $sql = $sql." AND a.phone_no like '%".$r_keyWord."%'";
        if("SN"==$r_queryType)
            $sql = $sql." AND a.sn like '%".$r_keyWord."%'";
    }

    //$sql = $sql." order by  a.use_status,a.get_date desc";
	$sql_end = " order by  a.use_status,a.get_date desc limit ".($pindex - 1) * $psize.','. $psize;;
	
    $r_detailList = pdo_fetchall($_sql.$condition1.$sql.$sql_end);
    $total = pdo_fetchcolumn($_sql.$condition2.$sql);
    $pager = pagination($total, $pindex, $psize);
    
    //获取分店列表
    $shops = pdo_fetchall("select id,name from ims_micromember_business_sub order by id desc");
    if(!empty($shops)){
    	foreach ($shops as $shop){
    		$shoplist[$shop['id']] = $shop['name'];
    	}
    }
    template('micromember/coupon/detail');
    return;
}

if($actType == "update"){

}

//删除优惠券
if($actType == "delete"){
    $couponId = $_GPC['couponId'];
    $coupon_data = array(
        'status' => 0,
    );

    $update = pdo_update("micromember_coupon",$coupon_data,array( 'weid' => $_W['weid'],'id'=>$couponId));
    if($update){
        message('优惠券删除成功', create_url('micromember/coupon'));
    }else{
        message('优惠券删除失败', create_url('micromember/coupon'));
    }
}

if ($actType == "add") {
    $submit = $_GPC['submit'];
    $starttime = $endtime = time();
    //获取会员等级列表
    template('micromember/coupon/add');
    return;
}

//保存操作
if ($actType == "save") {
	$id = $_GPC['couponId'];
    $permoney = $_GPC['permoney'];
    $allmoney = $_GPC['allmoney'];
    $money = 11;
    $start = $_GPC['start'];
    $end = $_GPC['end'];
    $type = $_GPC['type'];
    $nums = $_GPC['nums'];
    $info = $_GPC['info'];

    $coupon_data = array(
        'weid' => $_W['weid'],
        'title' => $_GPC['title'],
        'user_group' => (int)$_GPC['crowd_type'],
        'type' => (int)$_GPC['type'],
        'begin_date' => $start,
        'end_date' =>  $end,
        'create_date' => date('Y-m-d H:i:s', time()),
        'conpon_desc' => $_GPC['info'],
        'get_num' => (int)$_GPC['nums'],
        'group_param' => (int)$$money
    );
    if(empty($id)){
    	if(pdo_insert('micromember_coupon', $coupon_data)){
    		message('优惠券添加成功', create_url('micromember/coupon'));
    	}else{
    		message('优惠券添加失败', create_url('micromember/coupon'));
    	}
    }else{
    	if(pdo_update('micromember_coupon', $coupon_data, array('id' => $id))){
    		message('优惠券更新成功', create_url('micromember/coupon'));
    	}else{
    		message('优惠券更新失败', create_url('micromember/coupon'));
    	}
    }

    return;
}

if($actType == 'useoff'){
	$id = !empty($_GPC['couponId']) ? intval($_GPC['couponId']) : 0;
	$ids = !empty($_GPC['couponIds']) ? trim($_GPC['couponIds'], ',') : '';
	
	$shop_id = !empty($_GPC['shop_id']) ? intval($_GPC['shop_id']) : 0;
	$payment_type = $_GPC['payment'];
	
	$where = array(
				'id' => $id
			);
	$data = array(
				'shop_id' => $shop_id,
				'payment_type' => $payment_type
			);
	$bool = pdo_update('micromember_coupon_log', $data, $where);
	if($bool === false){
		message('优惠券使用失败', create_url('micromember/coupon', array('actType'=>'useoff','couponId'=>$id,'page'=>$_GPC['page'])));
	}else{
		message('优惠券使用成功', create_url('micromember/coupon', array('actType'=>'useoff','couponId'=>$id,'page'=>$_GPC['page'])));
	}
}

if($actType == 'public_ajax_switch'){
	$couponId = $_GPC['couponId'];
	$operation = $_GPC['op'];
	$ids = !empty($_GPC['ids']) ? trim($_GPC['ids'], ',') : '';
	if(empty($ids)){
		message('请选择操作项目', create_url('micromember/coupon', array('actType'=>'detail','couponId'=>$couponId)));
	}
	
	if($operation == 'enabled'){
		$status = 1;
	}elseif($operation == 'forbidden'){
		$status = 0;
	}
	$sql = "update ims_micromember_coupon_log set status = ".$status." where id in (".$ids.")";
	$bool = pdo_query($sql);
	if($bool === false){
		echo 2;
	}else{
		echo 1;
	}
	exit();
}
