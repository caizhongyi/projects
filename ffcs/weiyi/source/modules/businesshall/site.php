<?php
/**
 * 微商城模块微站定义
 *
 * @author WeEngine Team
 * @url
 */
defined('IN_IA') or exit('Access Denied');

class BusinesshallModuleSite extends WeModuleSite
{

    public function doWebCategory()
    {
        global $_GPC, $_W;
        $operation = !empty($_GPC['op']) ? $_GPC['op'] : 'display';
        if ($operation == 'display') {
            if (!empty($_GPC['displayorder'])) {
                foreach ($_GPC['displayorder'] as $id => $displayorder) {
                    pdo_update('businesshall_category', array('displayorder' => $displayorder), array('id' => $id));
                }
                message('分类排序更新成功！', $this->createWebUrl('category', array('op' => 'display')), 'success');
            }
            $children = array();
            $category = pdo_fetchall("SELECT * FROM " . tablename('businesshall_category') . " WHERE weid = '{$_W['weid']}' ORDER BY parentid ASC, displayorder DESC");
            foreach ($category as $index => $row) {
                if (!empty($row['parentid'])) {
                    $children[$row['parentid']][] = $row;
                    unset($category[$index]);
                }
            }
            include $this->template('category');
        } elseif ($operation == 'post') {
            $parentid = intval($_GPC['parentid']);
            $id = intval($_GPC['id']);
            if (!empty($id)) {
                $category = pdo_fetch("SELECT * FROM " . tablename('businesshall_category') . " WHERE id = '$id'");
            } else {
                $category = array(
                    'displayorder' => 0,
                );
            }
            if (!empty($parentid)) {
                $parent = pdo_fetch("SELECT id, name FROM " . tablename('businesshall_category') . " WHERE id = '$parentid'");
                if (empty($parent)) {
                    message('抱歉，上级分类不存在或是已经被删除！', $this->createWebUrl('post'), 'error');
                }
            }
            if (checksubmit('submit')) {
                if (empty($_GPC['name'])) {
                    message('抱歉，请输入分类名称！');
                }
                $data = array(
                    'weid' => $_W['weid'],
                    'name' => $_GPC['catename'],
                    'displayorder' => intval($_GPC['displayorder']),
                    'parentid' => intval($parentid),
                );
                if (!empty($id)) {
                    unset($data['parentid']);
                    pdo_update('businesshall_category', $data, array('id' => $id));
                } else {
                    pdo_insert('businesshall_category', $data);
                    $id = pdo_insertid();
                }
                message('更新分类成功！', $this->createWebUrl('category', array('op' => 'display')), 'success');
            }
            include $this->template('category');
        } elseif ($operation == 'delete') {
            $id = intval($_GPC['id']);
            $category = pdo_fetch("SELECT id, parentid FROM " . tablename('businesshall_category') . " WHERE id = '$id'");
            if (empty($category)) {
                message('抱歉，分类不存在或是已经被删除！', $this->createWebUrl('category', array('op' => 'display')), 'error');
            }
            pdo_delete('businesshall_category', array('id' => $id, 'parentid' => $id), 'OR');
            message('分类删除成功！', $this->createWebUrl('category', array('op' => 'display')), 'success');
        }
    }

    /*
     * 商品类型属性列表
     */
    public function doWebAttr()
    {
        global $_GPC, $_W;
        $type_id = $_GPC['type_id'];
        $operation = !empty($_GPC['op']) ? $_GPC['op'] : 'display';
        $goods_types = pdo_fetchall("SELECT * FROM " . tablename('businesshall_goods_type') . " WHERE 1 ");
        if ($operation == 'display') {
            if (!empty($_GPC['displayorder'])) {
                foreach ($_GPC['displayorder'] as $attr_id => $displayorder) {
                    pdo_update('businesshall_attribute', array('displayorder' => $displayorder), array('attr_id' => $attr_id));
                }
                message('属性排序更新成功！', $this->createWebUrl('attr', array('op' => 'display', 'type_id' => $type_id)), 'success');
            }
            $goods_types_name = pdo_fetchcolumn("SELECT type_name FROM " . tablename('businesshall_goods_type') . " WHERE 1 ");
            $goods_attrs = pdo_fetchall("SELECT * FROM " . tablename('businesshall_attribute') . " WHERE weid = '{$_W['weid']}' and type_id = '{$type_id}'  ORDER BY  displayorder ");
            include $this->template('attr');
        } elseif ($operation == 'post') {
            $attr_id = intval($_GPC['attr_id']);
            if (checksubmit('submit')) {
                if (empty($_GPC['attr_name'])) {
                    message('抱歉，请输入类型名称！');
                }
                $data = array(
                    'weid' => $_W['weid'],
                    'attr_name' => $_GPC['attr_name'],
                    'type_id' => $_GPC['type_id'],
                    'displayorder' => intval($_GPC['displayorder']),
                    'attr_type' => $_GPC['attr_type'],
                    'attr_input_type' => intval($_GPC['attr_input_type']),
                    'attr_values' => $_GPC['attr_values'],
                );
                if ($_GPC['attr_name'] == '颜色列表') {
                    $data['attr_input_type'] = 3;
                    $data['attr_type'] = 3;
                    $data['displayorder'] = -1;
                }
                if (!empty($attr_id)) {
                    pdo_update('businesshall_attribute', $data, array('attr_id' => $attr_id));
                } else {

                    pdo_insert('businesshall_attribute', $data);
                    $id = pdo_insertid();
                }
                message('更新属性成功！', $this->createWebUrl('attr', array('op' => 'display', 'type_id' => $type_id)), 'success');
            }
            $attr = pdo_fetch("SELECT * FROM " . tablename('businesshall_attribute') . " WHERE attr_id = '{$attr_id}'");
            include $this->template('attr');
        } elseif ($operation == 'delete') {
            $attr_id = intval($_GPC['attr_id']);
            $attr = pdo_fetch("SELECT attr_id FROM " . tablename('businesshall_attribute') . " WHERE attr_id = '$attr_id'");
            if (empty($attr)) {
                message('抱歉，分类不存在或是已经被删除！', $this->createWebUrl('attr', array('op' => 'display')), 'error');
            }
            pdo_delete('businesshall_attribute', array('attr_id' => $attr_id));
            message('分类删除成功！', $this->createWebUrl('attr', array('op' => 'display', 'type_id' => $type_id)), 'success');
        }
    }

    /*
    * 商品类型
    */
    public function doWebGoods_type()
    {
        global $_GPC, $_W;
        $operation = !empty($_GPC['op']) ? $_GPC['op'] : 'display';
        if ($operation == 'display') {

            $goods_type = pdo_fetchall("SELECT * FROM " . tablename('businesshall_goods_type') . " WHERE 1 ");
            include $this->template('goods_type');
        } elseif ($operation == 'post') {
            $type_id = intval($_GPC['type_id']);
            if (!empty($type_id)) {
                $goods_type = pdo_fetch("SELECT * FROM " . tablename('businesshall_goods_type') . " WHERE type_id = '$type_id'");
            }
            if (checksubmit('submit')) {
                if (empty($_GPC['type_name'])) {
                    message('抱歉，请输入分类名称！');
                }
                $data = array(
                   // 'weid' => $_W['weid'],
                    'type_name' => $_GPC['type_name'],
                    'description' => $_GPC['description']
                );
                if (!empty($type_id)) {
                    pdo_update('businesshall_goods_type', $data, array('type_id' => $type_id));
                } else {
                    pdo_insert('businesshall_goods_type', $data);
                    $type_id = pdo_insertid();
                }
                message('更新类型成功！', $this->createWebUrl('goods_type', array('op' => 'display')), 'success');
            }
            include $this->template('goods_type');
        } elseif ($operation == 'delete') {
            $type_id = intval($_GPC['type_id']);
            $goods_type = pdo_fetch("SELECT type_id FROM " . tablename('businesshall_goods_type') . " WHERE type_id = {$type_id}");
            if (empty($goods_type)) {
                message('抱歉，类型不存在或是已经被删除！', $this->createWebUrl('goods_type', array('op' => 'display')), 'error');
            }
            pdo_delete('businesshall_goods_type', array('type_id' => $type_id), 'OR');
            message('分类删除成功！', $this->createWebUrl('goods_type', array('op' => 'display')), 'success');
        }
    }


    public function doWebGoods()
    {
        global $_GPC, $_W;
        $category = pdo_fetchall("SELECT * FROM " . tablename('businesshall_category') . " WHERE weid = '{$_W['weid']}' ORDER BY parentid ASC, displayorder DESC", array(), 'id');
        if (!empty($category)) {
            $children = '';
            foreach ($category as $cid => $cate) {
                if (!empty($cate['parentid'])) {
                    $children[$cate['parentid']][$cate['id']] = array($cate['id'], $cate['name']);
                }
            }
        }
        $operation = !empty($_GPC['op']) ? $_GPC['op'] : 'display';
        /* if ($operation == 'getattrs'){//获取属性列表
             $attrlist =  pdo_fetchall("SELECT * FROM ".tablename('businesshall_attribute')." WHERE type_id = '{$_GPC['type_id']}' ORDER BY  displayorder ");
             $hyattrlist =  pdo_fetchall("SELECT * FROM ".tablename('businesshall_contract'));
             $phattrlist =  pdo_fetchall("SELECT * FROM ".tablename('businesshall_packages'));
             $arr = array(
                 '0'=> $attrlist,
                 '1'=>$hyattrlist,
                 '2'=>$phattrlist,
             );
             echo json_encode($arr);
             exit;
         }elseif ($operation == 'getgoodsattrs') {//获取商品详细属性
             //select * from ims_businesshall_goods_attr a join  ims_businesshall_attribute b on a.attr_id = b.attr_id where a.goods_id=1;
             $goodsattrs = pdo_fetchall("SELECT * FROM ".tablename('businesshall_goods_attr')." a JOIN ".tablename('businesshall_attribute')." b ON a.attr_id = b.attr_id WHERE a.goods_id = '{$_GPC['id']} '");
             $hyattrlist =  pdo_fetchall("SELECT * FROM ".tablename('businesshall_contract'));
             $phattrlist =  pdo_fetchall("SELECT * FROM ".tablename('businesshall_packages'));
             $arr = array(
                 '0'=> $goodsattrs,
                 '1'=>$hyattrlist,
                 '2'=>$phattrlist,
             );
             echo json_encode($arr);
             exit;
         }else*/
        if ($operation == 'post' || $operation == 'getgoodsattrs') {
            $id = intval($_GPC['id']);
            if ((!empty($id) && $operation == 'post') || $operation == 'getgoodsattrs') {
                $item = pdo_fetch("SELECT * FROM " . tablename('businesshall_goods') . " WHERE id = :id", array(':id' => $id));
                if (empty($item) && $operation == 'post') {
                    message('抱歉，商品不存在或是已经删除！', '', 'error');
                }
                if (isset($_GPC['type_id']) && !empty($_GPC['type_id'])) {
                    if (!empty($id)) {
                        $goodsattrs = pdo_fetchall("SELECT b.*,a.goods_id,a.attr_value,a.attr_price,a.attr_type as good_attr_type FROM " . tablename('businesshall_attribute') . " b left join (select * FROM " . tablename('businesshall_goods_attr') . " WHERE goods_id = '$id')  a  ON a.attr_id = b.attr_id WHERE b.type_id= {$_GPC['type_id']} ORDER BY displayorder ");
                    } else {
                        //创建商品
                        $goodsattrs = pdo_fetchall("SELECT * FROM " . tablename('businesshall_attribute') . " b WHERE b.type_id= {$_GPC['type_id']} ORDER BY displayorder ");
                    }
                } else {
                    if (!empty($id)) {
                        $goodsattrs = pdo_fetchall("SELECT b.*,a.goods_id,a.attr_value,a.attr_price,a.attr_type as good_attr_type FROM " . tablename('businesshall_attribute') . " b left join (select * FROM " . tablename('businesshall_goods_attr') . " WHERE goods_id = '$id')  a  ON a.attr_id = b.attr_id WHERE b.type_id= {$item['type_id']} ORDER BY displayorder ");
                        //echo "SELECT b.*,a.goods_id,a.attr_value,a.attr_price,a.attr_type as good_attr_type FROM " . tablename('businesshall_attribute') . " b left join (select * FROM " . tablename('businesshall_goods_attr') . " WHERE goods_id = '$id')  a  ON a.attr_id = b.attr_id WHERE b.type_id= {$item['type_id']} ORDER BY displayorder ";exit;
                    } else {
                        //创建商品
                        $goodsattrs = pdo_fetchall("SELECT * FROM " . tablename('businesshall_attribute') . " b  WHERE b.type_id= {$item['type_id']} ORDER BY displayorder ");
                    }
                }
                $hyattrlist = pdo_fetchall("SELECT * FROM " . tablename('businesshall_contract'));
                $phattrlist = pdo_fetchall("SELECT * FROM " . tablename('businesshall_packages'));
                $attr_texts = '';
                foreach ($goodsattrs as $attr) {
                    $attr_input_type = $attr['attr_input_type'];
                    switch ($attr_input_type) {
                        case 0: //input,textarea
                            $attr_texts .= '<tr><th><label for="">' . $attr["attr_name"] . '</label></th>';
                            if ($attr["attr_type"] == 2) {
                                $attr_texts .= '<td><textarea name="attr' . $attr['attr_id'] . '" cols="60" rows="5">' . $attr['attr_value'] . '</textarea></td></tr>';
                            } else {
                                $attr_texts .= '<td><input type="text" value="' . $attr['attr_value'] . '" class="span6"  name="attr' . $attr['attr_id'] . '" ></td></tr>';
                            }
                            break;
                        case 1:
                            $attr_values = explode("\n", $attr['attr_values']); //option
                            $attr_texts .= '<tr><th><label for="">' . $attr["attr_name"] . '</label></th><td>
                                                <select name="attr' . $attr['attr_id'] . '" class="span3"> ';
                            foreach ($attr_values as $value) {
                                if (trim($attr['attr_value']) == trim($value)) {
                                    $attr_texts .= '<option selected value="' . $value . '">' . $value . '</option>';
                                } else {
                                    $attr_texts .= '<option value="' . $value . '">' . $value . '</option>';
                                }
                            }
                            $attr_texts .= '</select></td></tr>';
                            break;
                        case 2: //checkbox
                            $attr_values = explode("\n", $attr['attr_values']); //option
                            $attr_value_result = explode("\n", $attr['attr_value']); //选择结果
                            $attr_texts .= '<tr><th><label for="">' . $attr["attr_name"] . '</label></th><td>	';
                            foreach ($attr_values as $k => $value) {
                                if (in_array($value, $attr_value_result)) {
                                    $attr_texts .= '<label class="inline" ><input type="checkbox" checked  name="attr' . $attr['attr_id'] . 'unit' . $k . '" value="' . $value . '" > ' . $value . '</label>&nbsp;&nbsp;&nbsp;';
                                } else {
                                    $attr_texts .= '<label class="inline" ><input type="checkbox" name="attr' . $attr['attr_id'] . 'unit' . $k . '"  value="' . $value . '" > ' . $value . '</label>&nbsp;&nbsp;&nbsp;';
                                }
                            }
                            $attr_texts .= '</td></tr>';
                            break;
                        case 3:
                            //获取attr_type: 1]合约列表 2]号码列表 3]颜色列表
                            switch ($attr['attr_type']) {
                                case 1: //1]合约列表
                                    $attr_value_result = @explode("\n", $attr['attr_value']);
                                    $attr_texts .= '<tr><th><label for="">' . $attr["attr_name"] . '</label></th><td>';
                                    foreach ($hyattrlist as $hy) {
                                        if (in_array(trim($hy['contract_id']), $attr_value_result)) {
                                            $attr_texts .= '<label class="span2">' . $hy['contract_name'] . '<input type="checkbox" checked style=""  name="hyattr' . $hy['contract_id'] . '"  value="' . $hy['contract_id'] . '"/></label>';
                                        } else {
                                            $attr_texts .= '<label class="span2">' . $hy['contract_name'] . '<input type="checkbox" style=""  name="hyattr' . $hy['contract_id'] . '"  value="' . $hy['contract_id'] . '"/></label>';
                                        }
                                    }
                                    $attr_texts .= '</td></tr>';
                                    break;
                                case 2: //2]号码列表
                                    $attr_value_result = @explode("\n", $attr['attr_value']);
                                    $attr_texts .= '<tr><th><label for="">' . $attr["attr_name"] . '</label></th><td>';
                                    foreach ($phattrlist as $ph) {
                                        if (in_array(trim($ph['phone_package_id']), $attr_value_result)) {
                                            $attr_texts .= '<label class="span2">' . $ph['phonenum_name'] . '<input type="checkbox" checked style=""  name="phattr' . $ph['phone_package_id'] . '"  value="' . $ph['phone_package_id'] . '"/></label>';
                                        } else {
                                            $attr_texts .= '<label class="span2">' . $ph['phonenum_name'] . '<input type="checkbox" style=""  name="phattr' . $ph['phone_package_id'] . '"  value="' . $ph['phone_package_id'] . '"/></label>';
                                        }

                                    }
                                    $attr_texts .= '</td></tr>';
                                    break;
                                case 3: //3]颜色列表
                                    $attr_values = explode("\n", $attr['attr_values']); //option
                                    $attr_value_result = iunserializer($attr['attr_value']); //选择结果
                                    $attr_texts .= '<tr><th><label for="">' . $attr["attr_name"] . '</label></th><td>	';
                                    foreach ($attr_values as $k => $value) {
                                        if (array_key_exists(trim($value), (array)$attr_value_result) && $attr_value_result[trim($value)]['checked']) {
                                            $attr_texts .= '<div class="color_div"><label class="inline" for="" ><input type="checkbox" checked onclick="select_color(this)" name="attr' . $attr['attr_id'] . 'color' . $k . '" value="' . trim($value) . '" >&nbsp;<a href="###" class="color_icon">' . trim($value) . ' &nbsp;<i class="icon-plus-sign"></i></a></label><br>';
                                        }else{
                                            $attr_texts .= '<div class="color_div"><label class="inline" for="" ><input type="checkbox" onclick="select_color(this)" name="attr' . $attr['attr_id'] . 'color' . $k . '"  value="' . trim($value) . '" >&nbsp;<a href="###" class="color_icon">' . trim($value) . '&nbsp;<i class="icon-plus-sign"></i></a></label><br>';
                                        }
                                        if(!empty($attr_value_result[trim($value)]['path'])){
                                            $attr_texts .= '<div style="display:none" class="clearfix color_thumb">';
                                            foreach ($attr_value_result[trim($value)]['path'] as $key=> $color_item) {
                                                if(empty($color_item)){
                                                   continue;
                                                };
                                                $attr_texts .= '<div class="fileupload fileupload-exists" data-provides="fileupload"  style="margin-right: 20px;float:left;">
						                                             <div class="fileupload-preview thumbnail" style="width: 200px; height: 150px;">';
                                                if (!empty($color_item)) {
                                                    $attr_texts .= '<img src="' . $_W['attachurl'] . $color_item . '" width="200" />';
                                                }
                                                $attr_texts .= '</div>
						                                    <div>
                                                            <span class="btn btn-sm btn-primary btn-file"><span class="fileupload-new">选择图片</span><span class="fileupload-exists">更改</span><input name="attr' . $attr['attr_id'] . 'thumb' . $k . '[\''.$key.'\']" type="file" /></span>
                                                            <a href="#" class="btn fileupload-exists" data-dismiss="fileupload">移除</a>';
                                                if (!empty($color_item)) {
                                                    $attr_texts .= '<button type="submit" name="fileupload-delete" value="' . $color_item . '" class="btn fileupload-new">删除</button>&nbsp;&nbsp;<a onclick="addpicbynode(this)" class="btn  btn-info " >添加</a>';
                                                }
                                                $attr_texts .= '</div>
                                                <span class="help-block"></span><input type="hidden" value="'.$color_item.'" name="attr' . $attr['attr_id'] . 'thumb' . $k . '['.$key.']"></div>';
                                            }
                                            $attr_texts .= '</div></div>';
                                        } else {
                                            $attr_texts .= '<div style="display:none" class="clearfix color_thumb"><div class="fileupload fileupload-new" data-provides="fileupload"  style="margin-right: 20px;float:left;">
						                    <div class="fileupload-preview thumbnail" style="width: 200px; height: 150px;">';
                                            $attr_texts .= '</div>
						                    <div>
                                                <span class="btn btn-sm btn-primary btn-file"><span class="fileupload-new">选择图片</span><span class="fileupload-exists">更改</span><input name="attr' . $attr['attr_id'] . 'thumb' . $k . '[]" type="file" /></span>
                                                <a href="#" class="btn fileupload-exists" data-dismiss="fileupload">移除</a>&nbsp;&nbsp;<a onclick="addpicbynode(this)" class="btn fileupload-exists btn-info " >添加</a>';
                                            $attr_texts .= '</div><span class="help-block"></span></div></div></div>';
                                        }

                                    }
                                    $attr_texts .= '</td></tr>';
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
            if ($operation == 'getgoodsattrs') {
                echo $attr_texts;
                exit;
            }
            if (checksubmit('submit')) {
                if (empty($_GPC['goodsname'])) {
                    message('请输入商品名称！');
                }
                if (empty($_GPC['pcate'])) {
                    message('请选择商品分类！');
                }
                if ($_GPC['ptype'] == -1) {
                    message('请选择商品属性类型！');
                }

                $data = array(
                    'weid' => intval($_W['weid']),
                    'type_id' => intval($_GPC['ptype']),
                    'displayorder' => intval($_GPC['displayorder']),
                    'title' => $_GPC['goodsname'],
                    'pcate' => intval($_GPC['pcate']),
                    'ccate' => intval($_GPC['ccate']),
                    'type' => intval($_GPC['type']),
                    'status' => intval($_GPC['status']),
                    'description' => $_GPC['description'],
                    'content' => htmlspecialchars_decode($_GPC['content']),
                    'productsn' => $_GPC['productsn'],
                    'goodssn' => $_GPC['goodssn'],
                    'marketprice' => $_GPC['marketprice'],
                    'productprice' => $_GPC['productprice'],

                    'total' => intval($_GPC['total']),
                    'unit' => $_GPC['unit'],
                    'createtime' => TIMESTAMP,
                );
                if (!empty($_FILES['thumb']['tmp_name'])) {
                    file_delete($_GPC['thumb_old']);
                    $upload = file_upload($_FILES['thumb']);
                    if (is_error($upload)) {
                        message($upload['message'], '', 'error');
                    }
                    $data['thumb'] = $upload['path'];
                }
                if (empty($id)) {
                    pdo_insert('businesshall_goods', $data);
                    $id = pdo_insertid();
                } else {
                    unset($data['createtime']);
                   $res =  pdo_update('businesshall_goods', $data, array('id' => $id));
                }
                //提交到后台，判断值是否正确，分段保存属性信息
                //1，删除商品的个性属性
                pdo_delete('businesshall_goods_attr', array('goods_id' => $id));
                $attrlist = pdo_fetchall("SELECT * FROM " . tablename('businesshall_attribute') . " WHERE type_id = '{$_GPC['ptype']}' ORDER BY  displayorder ");
                //2,获取页面上属性列表的值，
                foreach ($attrlist as $nattr) {
                    $newattrs = array(
                        'goods_id' => $id,
                        'attr_id' => $nattr['attr_id'],
                    );
                    if ($nattr['attr_input_type'] == 2) { // 复选框
                        $tmp = $nattr['attr_values'];
                        $attrvals = explode("\n", $tmp);
                        $tmpst = "";
                        for ($ii = 0; $ii < sizeof($attrvals); $ii++) {
                            $tmpst .= $_GPC['attr' . $nattr['attr_id'] . 'unit' . $ii] . "\n";
                        }
                        $newattrs['attr_value'] = $tmpst;
                    } else if ($nattr['attr_input_type'] == 3) { //合约、号码套餐、颜色
                        if ($nattr['attr_type'] == 1) { //1] 合约
                            $hyattrlist = pdo_fetchall("SELECT * FROM " . tablename('businesshall_contract'));
                            $tmpst = "";
                            foreach ($hyattrlist as $hyattr) {
                                $tmpst .= $_GPC['hyattr' . $hyattr['contract_id']] . "\n";
                            }
                            $newattrs['attr_value'] = $tmpst;
                            $newattrs['attr_type'] = '1';
                        } else if ($nattr['attr_type'] == 2) { // 2]号码
                            $phattrlist = pdo_fetchall("SELECT * FROM " . tablename('businesshall_packages'));
                            $tmpst = "";
                            foreach ($phattrlist as $phattr) {
                                $tmpst .= $_GPC['phattr' . $phattr['phone_package_id']] . "\n";
                            }
                            $newattrs['attr_value'] = $tmpst;
                            $newattrs['attr_type'] = '2';
                        } else { // 3]颜色
                            $tmp = $nattr['attr_values'];
                            $attrvals = explode("\n", $tmp);
                            $tmpst = "";
                            $color = array();
                            $pathval = '';
                            $color = array();
                            for ($ii = 0; $ii < sizeof($attrvals); $ii++) {
                                $option_color_value = trim($attrvals[$ii]);//选项里面的颜色值
                                $color_value = $_GPC['attr' . $nattr['attr_id'] . 'color' . $ii];//获得的颜色
                                if (empty($color_value)) {
                                    $color[$option_color_value]['checked'] = false;
                                } else {
                                    $color[$option_color_value]['checked'] = true;
                                }
                                $file = 'attr' . $nattr['attr_id'] . 'thumb' . $ii;
                                if (!empty($_FILES[$file]['tmp_name'])) {
                                    foreach ($_FILES[$file]['tmp_name'] as $k1 => $v1) {
                                        if (empty($v1)) {
                                            continue;
                                        }
                                        file_delete($_GPC[$file . '_old']);
                                        $arr['name'] = $_FILES[$file]['name'][$k1];
                                        $arr['type'] = $_FILES[$file]['type'][$k1];
                                        $arr['tmp_name'] = $_FILES[$file]['tmp_name'][$k1];
                                        $arr['error'] = $_FILES[$file]['error'][$k1];
                                        $arr['size'] = $_FILES[$file]['size'][$k1];
                                        $upload = file_upload($arr);
                                        if (is_error($upload)) {
                                            message($upload['message'], '', 'error');exit;
                                        }
                                        unset($arr);
                                        if(!empty($upload['path'])){
                                            $color[$option_color_value]['path'][] = $upload['path'];
                                        }
                                    }
                                }
                                if(!empty($_GPC[$file])){
                                    $color[$option_color_value]['path'] = array_merge((array)$color[$option_color_value]['path'],array_filter((array)$_GPC[$file]));
                                }
                                $tmpst = iserializer($color);
                            }
                            $newattrs['attr_value'] = $tmpst;
                            $newattrs['attr_type'] = '3';

                        }
                    } else {
                        $newattrs['attr_value'] = $_GPC['attr' . $nattr['attr_id']];
                    }
                    pdo_insert('businesshall_goods_attr', $newattrs);
                }

                message('商品更新成功！', $this->createWebUrl('goods', array('op' => 'display')), 'success');
            }
            $typelist = pdo_fetchall("SELECT * FROM " . tablename('businesshall_goods_type') . " WHERE 1");
        } elseif ($operation == 'display') {
            $pindex = max(1, intval($_GPC['page']));
            $psize = 20;
            $condition = '';
            if (!empty($_GPC['keyword'])) {
                $condition .= " AND title LIKE '%{$_GPC['keyword']}%'";
            }

            if (!empty($_GPC['cate_2'])) {
                $cid = intval($_GPC['cate_2']);
                $condition .= " AND ccate = '{$cid}'";
            } elseif (!empty($_GPC['cate_1'])) {
                $cid = intval($_GPC['cate_1']);
                $condition .= " AND pcate = '{$cid}'";
            }

            if (isset($_GPC['status'])) {
                $condition .= " AND status = '" . intval($_GPC['status']) . "'";
            }

            $list = pdo_fetchall("SELECT * FROM " . tablename('businesshall_goods') . " WHERE weid = '{$_W['weid']}' $condition ORDER BY status DESC, displayorder DESC, id DESC LIMIT " . ($pindex - 1) * $psize . ',' . $psize);
            $total = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename('businesshall_goods') . " WHERE weid = '{$_W['weid']}'");
            $pager = pagination($total, $pindex, $psize);
        } elseif ($operation == 'delete') {
            $id = intval($_GPC['id']);
            $row = pdo_fetch("SELECT id, thumb FROM " . tablename('businesshall_goods') . " WHERE id = :id", array(':id' => $id));
            if (empty($row)) {
                message('抱歉，商品不存在或是已经被删除！');
            }
            if (!empty($row['thumb'])) {
                file_delete($row['thumb']);
            }
            pdo_delete('businesshall_goods', array('id' => $id));
            message('删除成功！', referer(), 'success');
        }
        include $this->template('goods');
    }

    public function doWebOrder()
    {
        global $_W, $_GPC;
        $operation = !empty($_GPC['op']) ? $_GPC['op'] : 'display';
        if ($operation == 'display') {
            $pindex = max(1, intval($_GPC['page']));
            $psize = 20;
            $condition = '';
            if (!empty($_GPC['keyword'])) {
                $condition .= " AND title LIKE '%{$_GPC['keyword']}%'";
            }

            if (!empty($_GPC['cate_2'])) {
                $cid = intval($_GPC['cate_2']);
                $condition .= " AND ccate = '{$cid}'";
            } elseif (!empty($_GPC['cate_1'])) {
                $cid = intval($_GPC['cate_1']);
                $condition .= " AND pcate = '{$cid}'";
            }

            if (isset($_GPC['status'])) {
                $condition .= " AND status = '" . intval($_GPC['status']) . "'";
            }

            $list = pdo_fetchall("SELECT * FROM " . tablename('businesshall_order') . " WHERE weid = '{$_W['weid']}' $condition ORDER BY status ASC, createtime DESC LIMIT " . ($pindex - 1) * $psize . ',' . $psize);
            $total = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename('businesshall_order') . " WHERE weid = '{$_W['weid']}'");
            $pager = pagination($total, $pindex, $psize);
            if (!empty($list)) {
                foreach ($list as $row) {
                    $userids[$row['from_user']] = $row['from_user'];
                }
            }
            $users = fans_search($userids, array('realname', 'resideprovince', 'residecity', 'residedist', 'address', 'mobile', 'qq'));
        } elseif ($operation == 'detail') {
            $id = intval($_GPC['id']);
            if (checksubmit('finish')) {
                $this->update_order($id,-1);
                pdo_update('businesshall_order', array('status' => 2, 'remark' => $_GPC['remark']), array('id' => $id));
                message('订单操作成功！', referer(), 'success');
            }
            if (checksubmit('cancel')) {
                $this->update_order($id,2);
                pdo_update('businesshall_order', array('status' => 1, 'remark' => $_GPC['remark']), array('id' => $id));
                message('取消完成订单操作成功！', referer(), 'success');
            }
            if (checksubmit('cancelpay')) {
                $this->update_order($id,2);
                pdo_update('businesshall_order', array('status' => 0, 'remark' => $_GPC['remark']), array('id' => $id));
                message('取消订单付款操作成功！', referer(), 'success');
            }
            if (checksubmit('confrimpay')) {
                $this->update_order($id,2);
                pdo_update('businesshall_order', array('status' => 1, 'remark' => $_GPC['remark']), array('id' => $id));
                message('确认订单付款操作成功！', referer(), 'success');
            }
            if (checksubmit('close')) {
                $this->update_order($id,2);
                pdo_update('businesshall_order', array('status' => -1, 'remark' => $_GPC['remark']), array('id' => $id));
                message('订单关闭操作成功！', referer(), 'success');
            }
            if (checksubmit('open')) {
                $this->update_order($id,2);
                pdo_update('businesshall_order', array('status' => 0, 'remark' => $_GPC['remark']), array('id' => $id));
                message('开启订单操作成功！', referer(), 'success');
            }
            $item = pdo_fetch("SELECT * FROM " . tablename('businesshall_order') . " WHERE id = :id", array(':id' => $id));
            $item['user'] = fans_search($item['from_user'], array('realname', 'resideprovince', 'residecity', 'residedist', 'address', 'mobile', 'qq'));

            $order_goods = pdo_fetchall("SELECT id FROM " . tablename('businesshall_order_goods') . " WHERE orderid = '{$item['id']}'");

            $order_goods_ids = '';
            foreach($order_goods as $k=>$v){
                $order_goods_ids .= $v['id'].',';
            }
            $order_goods_ids =  trim($order_goods_ids,',');
            if(!empty($order_goods_ids)){
                $sql = "SELECT bc.id,bc.goodsid,bc.goods_attr_id,bc.total,bc.goods_attr,bc.goods_add_price,bg.title,bg.thumb,bg.goodssn,bg.productsn,bg.unit,bg.description,bg.marketprice from ".tablename('businesshall_order_goods')." bc left join ".tablename('businesshall_goods')." bg on(bc.goodsid = bg.id) WHERE bc.id in (".$order_goods_ids.")";
                $goods = pdo_fetchall($sql);
                $item['goods'] = $goods;
            }else{
                $item['goods'] = array();
            }

        }
        include $this->template('order');
    }

    public function doWebDeleteImage()
    {
        global $_GPC, $_W;
        $setting = $_W['account']['modules'][$this->_saveing_params['mid']]['config'];
        $setting['picurl'] = '';
        $this->saveSettings($setting);
        message('删除图片成功！', '', 'success');
    }

    public function doWebPhonenum()
    {
        global $_GPC, $_W;
        $operation = !empty($_GPC['op']) ? $_GPC['op'] : 'display';
        if ($operation == 'deletenum') {
            pdo_delete("businesshall_numbers", array('phonenum_id' => $_GPC['phonenum_id']));
            return $_GPC['phonenum_id'];
        } else if ($operation == 'display') {
            $list = pdo_fetchall("SELECT * FROM " . tablename('businesshall_packages'));
        } else if ($operation == 'post') { //update or add
            $id = intval($_GPC['phone_package_id']);
            if (checksubmit('submit')) {
                if (empty($_GPC['phonenum_name'])) {
                    message('请输入套餐名称！');
                }
                if (empty($_GPC['pre_deposit']) && floatval($_GPC['pre_deposit'] < 0)) {
                    message('请输入预存金额！');
                }
                if (empty($_GPC['min_consumption']) && floatval($_GPC['min_consumption'] < 0)) {
                    message('请输入每月最低消费额！');
                }
                if (empty($_GPC['phonenum_price']) && floatval($_GPC['phonenum_price'] < 0)) {
                    message('请输入号码价格！');
                }

                $data = array(
                    'phonenum_name' => $_GPC['phonenum_name'],
                    'phonenum_price' => $_GPC['phonenum_price'],
                    'min_consumption' => floatval($_GPC['min_consumption']),
                    'pre_deposit' => floatval($_GPC['pre_deposit']),
                    'desc' => $_GPC['desc'],
                    'inuse' => intval($_GPC['inuse']),
                );
                if (empty($id)) {
                    pdo_insert('businesshall_packages', $data);
                    $newid = pdo_insertid();
                    //获取numbers并插入
                    for ($ii = 1; $ii <= $_GPC['nums']; $ii++) {
                        $newname = "newnums" . $ii;
                        $newarr = array(
                            "phonenum" => $_GPC[$newname],
                            "pid" => $newid,
                            'weid'=>$_W['weid'],
                            'status'=>0
                        );
                        pdo_insert('businesshall_numbers', $newarr);
                    }

                } else {
                    //1，获取原号码的id列表
                    $nums = pdo_fetchall("SELECT * FROM " . tablename('businesshall_numbers') . " where pid =" . ($_GPC['phone_package_id'])." and  weid = {$_W['weid']} and status =0");
                    //2，对比查看页面上是否有值，有就更新。（没有就删除，但是页面上已经ajax异步删除了）
                    foreach ($nums as $num) {
                        //echo "id:"+$num['phonenum_id']."===".$_GPC["num".$num['phonenum_id']]."\n";
                        $updatenum = array(
                            'phonenum' => $_GPC["num" . $num['phonenum_id']],
                        );
                        $phonenum_id = $num['phonenum_id'];
                        pdo_update('businesshall_numbers', $updatenum, array('phonenum_id' => $phonenum_id));
                    }
                    //3，对新增的numbers加入到数据库
                    for ($ii = 1; $ii <= $_GPC['nums']; $ii++) {
                        $newname = "newnums" . $ii;
                        $newarr = array(
                            "phonenum" => $_GPC[$newname],
                            "pid" => $id,
                            "weid"=>$_W['weid'],
                            'status'=>0
                        );
                        pdo_insert('businesshall_numbers', $newarr);
                    }
                    pdo_update('businesshall_packages', $data, array('phone_package_id' => $id));
                }
                message('套餐更新成功！', $this->createWebUrl('phonenum', array('op' => 'display')), 'success');
            }
        } else if ($operation == 'detail') { // contract detail
            $phonenum = pdo_fetch("SELECT * FROM " . tablename('businesshall_packages') . " where phone_package_id =" . ($_GPC['phone_package_id']));
            $nums = pdo_fetchall("SELECT * FROM " . tablename('businesshall_numbers') . " where pid =" . ($_GPC['phone_package_id'])." and  weid = {$_W['weid']} and status =0");
        } else if ($operation == 'delete') { //生失效套餐
            $contract = pdo_fetch("SELECT * FROM " . tablename('businesshall_packages') . " where phone_package_id =" . ($_GPC['phone_package_id']));
            $contract['inuse'] = 1 - $contract['inuse']; //0、1 互相装换状态
            pdo_update('businesshall_packages', $contract, array('phone_package_id' => $contract['phone_package_id']));
            $list = pdo_fetchall("SELECT * FROM " . tablename('businesshall_packages'));
        }
        include $this->template('phonenum');
    }

    public function doWebContract()
    {
        global $_GPC, $_W;
        $operation = !empty($_GPC['op']) ? $_GPC['op'] : 'display';
        if ($operation == 'display') { //list contract
            $list = pdo_fetchall("SELECT * FROM " . tablename('businesshall_contract'));
        } else if ($operation == 'post') { //update or add
            $id = intval($_GPC['contract_id']);
            if (checksubmit('submit')) {
                if (empty($_GPC['contract_name'])) {
                    message('请输入套餐名称！');
                }
                if (empty($_GPC['contract_period'])) {
                    message('请输入合约期！');
                }
                if (empty($_GPC['contract_price'])) {
                    message('请输入每月月租费！');
                }
                $data = array(
                 // 'weid' => intval($_W['weid']),
                    'contract_name' => $_GPC['contract_name'],
                    'contract_type' => intval($_GPC['contract_type']),
                    'contract_period' => intval($_GPC['contract_period']),
                    'contract_price' => floatval($_GPC['contract_price']),
                    'call_time' => intval($_GPC['call_time']),
                    'mobile_inter_traffic' => intval($_GPC['mobile_inter_traffic']),
                    'mobile_text' => intval($_GPC['mobile_text']),
                    'wifi' => intval($_GPC['wifi']),
                    'call_bill_overflow' => floatval($_GPC['call_bill_overflow']),
                    'inter_bill_overflow' => floatval($_GPC['inter_bill_overflow']),
                    'text_bill_overflow' => floatval($_GPC['text_bill_overflow']),
                );
                if (!empty($_FILES['thumb']['tmp_name'])) {
                    file_delete($_GPC['thumb_old']);
                    $upload = file_upload($_FILES['thumb']);
                    if (is_error($upload)) {
                        message($upload['message'], '', 'error');
                    }
                    $data['thumb'] = $upload['path'];
                } elseif (!empty($_GPC['autolitpic'])) {
                    $match = array();
                    preg_match('/attachment\/(.*?)["|\&quot\;]/', $_GPC['content'], $match);
                    if (!empty($match[1])) {
                        $data['thumb'] = $match[1];
                    }
                }
                if (empty($id)) {
                    pdo_insert('businesshall_contract', $data);
                    $id = pdo_insertid();
                } else {
                    pdo_update('businesshall_contract', $data, array('contract_id' => $id)); //
                }
                $trcout = intval($_GPC['trcount']);
                pdo_delete('businesshall_contract_gift', array('contract_id' => $id));
                for ($tri = 1; $tri <= $trcout; $tri++) {
                    $giftname = "bill_gift_name" . $tri . "";
                    $giftval = "bill_gift" . $tri . "";
                    $giftunit = "bill_gift_unit" . $tri . "";
                    if (($_GPC[$giftname] && $_GPC[$giftname] != "") && ($_GPC[$giftval] && $_GPC[$giftval] != "")) { //name和value都不为空时
                        $newgift = array(
                            'contract_id' => $id,
                            'gift_name' => $_GPC[$giftname],
                            'gift_value' => $_GPC[$giftval],
                            'gift_unit' => $_GPC[$giftunit],
                        );
                        pdo_insert('businesshall_contract_gift', $newgift);
                    }

                }
                message('合约更新成功！', $this->createWebUrl('contract', array('op' => 'display')), 'success');
            }
        } else if ($operation == 'detail') { // contract detail
            $contract = pdo_fetch("SELECT * FROM " . tablename('businesshall_contract') . " where contract_id =" . ($_GPC['contract_id']));
            $pricegifts = pdo_fetchall("SELECT * FROM " . tablename('businesshall_contract_gift') . " where contract_id =" . ($_GPC['contract_id']));
        } else if ($operation == 'delete') {
            $contract = pdo_fetch("SELECT * FROM " . tablename('businesshall_contract') . " where contract_id =" . ($_GPC['contract_id']));
            $contract['contract_type'] = 1 - $contract['contract_type'];
            pdo_update('businesshall_contract', $contract, array('contract_id' => $contract['contract_id']));
            $list = pdo_fetchall("SELECT * FROM " . tablename('businesshall_contract'));
        }
        include $this->template('contract');
    }


    public function doMobilelist()
    {
        global $_GPC, $_W;
        $this->checkAuth();
        $pindex = max(1, intval($_GPC['page']));
        $psize = 20;
        $condition = '';

        if (!empty($_GPC['ccate'])) {
            $cid = intval($_GPC['ccate']);
            $condition .= " AND ccate = '{$cid}'";
        } elseif (!empty($_GPC['pcate'])) {
            $cid = intval($_GPC['pcate']);
            $condition .= " AND pcate = '{$cid}'";
        }

        $children = array();
        $category = pdo_fetchall("SELECT * FROM " . tablename('businesshall_category') . " WHERE weid = '{$_W['weid']}' ORDER BY parentid ASC, displayorder DESC");
        foreach ($category as $index => $row) {
            if (!empty($row['parentid'])) {
                $children[$row['parentid']][] = $row;
                unset($category[$index]);
            }
        }
        $list = pdo_fetchall("SELECT * FROM " . tablename('businesshall_goods') . " WHERE weid = '{$_W['weid']}' AND status = '1' $condition ORDER BY displayorder DESC, id DESC LIMIT " . ($pindex - 1) * $psize . ',' . $psize);
        $total = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename('businesshall_goods') . " WHERE weid = '{$_W['weid']}' AND status = '1' $condition");
        $pager = pagination($total, $pindex, $psize, $url = '', $context = array('before' => 0, 'after' => 0, 'ajaxcallback' => ''));
        include $this->template('list');
    }

    public function doMobileUpdateCart()
    {
        global $_GPC, $_W;
        $result = array('status' => 0, 'message' => '');
        $operation = $_GPC['op'];
        $goodsid = intval($_GPC['goodsid']);

        $goods = pdo_fetch("SELECT id, type, total FROM " . tablename('businesshall_goods') . " WHERE id = :id", array(':id' => $goodsid));
        if (empty($goods)) {
            $result['message'] = '抱歉，该商品不存在或是已经被删除！';
            message($result, '', 'ajax');
        }

        if ($goods['total'] == 0) {
            $result['message'] = '抱歉，该商品库存不足！';
            message($result, '', 'ajax');
        }
        if ($goods['type'] == '1') {
            if (pdo_fetchcolumn("SELECT id, total FROM " . tablename('businesshall_cart') . " WHERE from_user = :from_user AND weid = '{$_W['weid']}' AND goodstype = '2'", array(':from_user' => $_W['fans']['from_user']))) {
                $result['message'] = '抱歉，虚拟物品与实体物品请分开购买！';
                message($result, '', 'ajax');
            }
        } elseif ($goods['type'] == '2') {
            if (pdo_fetchcolumn("SELECT id, total FROM " . tablename('businesshall_cart') . " WHERE from_user = :from_user AND weid = '{$_W['weid']}' AND goodstype = '1'", array(':from_user' => $_W['fans']['from_user']))) {
                $result['message'] = '抱歉，虚拟物品与实体物品请分开购买！';
                message($result, '', 'ajax');
            }
        }
        $row = pdo_fetch("SELECT id, total FROM " . tablename('businesshall_cart') . " WHERE from_user = :from_user AND weid = '{$_W['weid']}' AND goodsid = :goodsid", array(':from_user' => $_W['fans']['from_user'], ':goodsid' => $goodsid));

        if (empty($row['id'])) {
            if ($operation == 'reduce') {
                $result['message'] = '您并没有购买此商品！';
                $result['total'] = 0;
                message($result, '', 'ajax');
            }
            $data = array(
                'weid' => $_W['weid'],
                'goodsid' => $goodsid,
                'goodstype' => $goods['type'],
                'from_user' => $_W['fans']['from_user'],
                'total' => '1',
            );
            pdo_insert('businesshall_cart', $data);
        } else {
            $row['total'] = $operation == 'reduce' ? ($row['total'] - 1) : ($row['total'] + 1);
            if ($goods['total'] > -1 && $row['total'] > $goods['total']) {
                $result['message'] = '抱歉，该商品库存不足！';
                message($result, '', 'ajax');
            }
            if (empty($row['total'])) {
                pdo_delete('businesshall_cart', array('from_user' => $_W['fans']['from_user'], 'weid' => $_W['weid'], 'goodsid' => $goodsid));
            } else {
                $data = array(
                    'total' => $row['total'],
                );
                pdo_update('businesshall_cart', $data, array('from_user' => $_W['fans']['from_user'], 'weid' => $_W['weid'], 'goodsid' => $goodsid));
            }
        }
        $result['status'] = 1;
        $result['message'] = '商品数据更新成功！';
        $result['total'] = intval($data['total']);
        message($result, '', 'ajax');
    }

    public function doMobileMyCart()
    {
        global $_W, $_GPC;
        $this->checkAuth();
        if (checksubmit('submit')) {
            $goodstype = intval($_GPC['goodstype']) ? intval($_GPC['goodstype']) : 1;
            $cart = pdo_fetchall("SELECT * FROM ".tablename('businesshall_cart')." WHERE goodstype = '{$goodstype}' AND weid = '{$_W['weid']}' AND from_user = '{$_W['fans']['from_user']}'");
            if (!empty($cart)) {
                $goods_ids = '';
                foreach($cart as $k=>$v){
                    $goods_ids .= $v['goodsid'].',';
                }
                $goods_ids =  trim($goods_ids,',');
                $sql = "SELECT bc.id,bc.goodsid,bc.goods_attr_id,bc.total,bc.goods_attr,bc.goods_add_price,bg.status,bg.title,bg.thumb,bg.unit,bg.description,bg.marketprice from ".tablename('businesshall_cart')." bc left join ".tablename('businesshall_goods')." bg on(bc.goodsid = bg.id) WHERE bg.id in (".$goods_ids.")";
                $goods = pdo_fetchall($sql);
                if (!empty($goods)) {
                    foreach ($goods as $row) {
                        if (empty($row['total'])) {
                            continue;
						}
                        if ($row['status'] ==0) {
                            message('抱歉，“'.$row['title'].'”此商品已下架！', $this->createMobileUrl('mycart'), 'error');
                        }
						if ($row['total'] != -1 && $row['total'] < $cart[$row['id']]['total']) {
							message('抱歉，“'.$row['title'].'”此商品库存不足！', $this->createMobileUrl('mycart'), 'error');
						}
                        $mobile_detail = $this->get_contract_mobile_detail($row);

						$price += (floatval($row['marketprice']+$mobile_detail['1']['phonenum_price']) * intval($row['total']));
					}
				}
				$data = array(
					'weid' => $_W['weid'],
					'from_user' => $_W['fans']['from_user'],
					'ordersn' => date('md') . random(4, 1),
					'price' => $price,
					'status' => 0,
					'sendtype' => intval($_GPC['sendtype']),
					'paytype' => intval($_GPC['paytype']),
					'goodstype' => intval($_GPC['goodstype']),
					'createtime' => TIMESTAMP,
				);
				pdo_insert('businesshall_order', $data);
				$orderid = pdo_insertid();
				//插入订单商品
				foreach ($goods as $row) {
					if (empty($row)) {
						continue;
					}
					pdo_insert('businesshall_order_goods', array(
						'weid' => $_W['weid'],
						'goodsid' => $row['goodsid'],
						'orderid' => $orderid,
						'total' => $row['total'],
						'createtime' => TIMESTAMP,
                        'goods_attr_id'=>$row['goods_attr_id'],
                        'goods_attr'=>$row['goods_attr'],
                        'goods_add_price'=>$row['goods_add_price']
					));
				}
				//清空购物车
                $this->clear_cart(2);
                //exit;
				//变更商品库存
				if (!empty($goods)) {
					foreach ($goods as $row) {
						if (empty($cart[$row['id']]['total'])) {
							continue;
						}
						pdo_query("UPDATE ".tablename('businesshall_goods')." SET total = :total WHERE id = :id AND total > 0", array(':total' => $row['total'] - $cart[$row['id']]['total'], ':id' => $row['id']));
					}
				}
				//更新粉丝资料
				$fans = array(
					'realname' => $_GPC['realname'],
					'resideprovince' => $_GPC['resideprovince'],
					'residecity' => $_GPC['residecity'],
					'residedist' => $_GPC['residedist'],
					'address' => $_GPC['address'],
					'mobile' => $_GPC['mobile'],
					'qq' => $_GPC['qq'],
				);
				fans_update($_W['fans']['from_user'], $fans);
				
				if ($data['paytype'] == 3) {
					//到付，直接邮件提醒
					if (!empty($this->module['config']['noticeemail'])) {
						$body = "<h3>购买商品清单</h3> <br />";
						if (!empty($goods)) {
							foreach ($goods as $row) {
								$body .= "名称：{$row['title']} ，数量：{$cart[$row['id']]['total']} <br />";
							}
						}
						$body .= "<br />总金额：{$price}元 （货到付款）<br />";
						$body .= "<h3>购买用户详情</h3> <br />";
						$body .= "真实姓名：{$fans['realname']} <br />";
						$body .= "地区：{$fans['resideprovince']} - {$fans['residecity']} -  {$fans['residedist']}<br />";
						$body .= "详细地址：{$fans['address']} <br />";
						$body .= "手机：{$fans['mobile']} <br />";
						$body .= "QQ：{$fans['qq']} <br />";
						ihttp_email($this->module['config']['noticeemail'], '微商城订单提醒', $body);
					}
                    header("Location: ". $this->createMobileUrl('myorder'));
                    //message('提交订单成功！', $this->createMobileUrl('myorder'), 'success');
				} else {
                    //message('提交订单成功，现在跳转至付款页面...', $this->createMobileUrl('pay', array('orderid' => $orderid)), 'success');
                    header("Location: ". $this->createMobileUrl('pay', array('orderid' => $orderid)));
				}
			} else {
				message('抱歉，您的购物车里没有任何商品，请先购买！', $this->createMobileUrl('list'), 'error');
			}
		}
		$goodstype = 1;
		$cart = pdo_fetchall("SELECT * FROM ".tablename('businesshall_cart')." WHERE goodstype = '{$goodstype}' AND weid = '{$_W['weid']}' AND from_user = '{$_W['fans']['from_user']}'");
        if (empty($cart)) {
			$goodstype = 2;
			$cart = pdo_fetchall("SELECT * FROM ".tablename('businesshall_cart')." WHERE goodstype = '{$goodstype}' AND weid = '{$_W['weid']}' AND from_user = '{$_W['fans']['from_user']}'", array(), 'goodsid');
		}
		if (!empty($cart)) {
            $goods_ids = '';
            foreach($cart as $k=>$v){
                $goods_ids .= $v['goodsid'].',';
            }
            $goods_ids =  trim($goods_ids,',');
            $sql = "SELECT bc.id,bc.goodsid,bc.goods_attr_id,bc.total,bc.goods_attr,bc.goods_add_price,bg.title,bg.thumb,bg.unit,bg.description,bg.marketprice from ".tablename('businesshall_cart')." bc left join ".tablename('businesshall_goods')." bg on(bc.goodsid = bg.id) WHERE bg.id in (".$goods_ids.")";
            $goods = pdo_fetchall($sql);
		}
		if (empty($goods)) {
			message('抱歉，您的购物车里没有任何商品，请先购买！', $this->createMobileUrl('list'), 'error');
		}
		$profile = fans_search($_W['fans']['from_user'], array('realname', 'resideprovince', 'residecity', 'residedist', 'address', 'mobile', 'qq'));
		include $this->template('cart');
	}

    public function doMobilePay()
    {
        global $_W, $_GPC;
        $this->checkAuth();
        $data = array(
            'sendtype' => intval($_GPC['sendtype']),
            'paytype' => intval($_GPC['paytype'])
        );
        $orderid = intval($_GPC['orderid']);
	    pdo_update('businesshall_order', $data,array('id'=>$orderid));
        $order = pdo_fetch("SELECT * FROM " . tablename('businesshall_order') . " WHERE id = :id", array(':id' => $orderid));
        if ($order['status'] != '0') {
            message('抱歉，您的订单已经付款或是被关闭，请重新进入付款！', $this->createMobileUrl('myorder'), 'error');
        }
        $order_goods_infos = pdo_fetchall("select  i.goods_attr_id,i.goods_attr,i.goods_add_price,i.orderid,i.goodsid,i.total,i.createtime,ii.title,ii.thumb,ii.description,ii.marketprice,ii.type from ".tablename("businesshall_order_goods")." i left join ".tablename("businesshall_goods")." ii on (i.goodsid = ii.id) where i.orderid = ".$orderid.' and i.weid = '.$_W['weid']);
        if (checksubmit()) {
            if ($order['paytype'] == 1 && $_W['fans']['credit2'] < $order['price']) {
                echo json_encode(array('errno'=>-1,'error'=>'抱歉，您帐户的余额不够支付该订单，请充值！'));exit;
            }
            if ($order['price'] == '0') {
                $this->payResult(array('tid' => $orderid, 'from' => 'return', 'type' => 'credit2'));
                exit;
			}
            foreach($order_goods_infos as $order_goods_info ){
                if(intval($order_goods_info['type_id']) != CONTRACT_MOBILE || empty($order_goods_info['goods_attr'])){
                    continue;
                }
                $phone = explode("\n",$order_goods_info['goods_attr']);
                pdo_update('businesshall_numbers',array('status'=>2),array('phonenum'=>trim($phone['1'])));
            }
            if(!$_W['isajax']){
                if($order['paytype'] == '3'){
                    message('提交订单成功！', $this->createMobileUrl('myorder'), 'success');
                }
            }
            echo json_encode(array('errno'=>200,'error'=>'成功!'));exit;
		}
        $pay_url = $this->createMobileUrl('pay', array('orderid' => $orderid));
        $params['tid'] = $orderid;
        $params['user'] = $_W['fans']['from_user'];
        $params['fee'] = $order['price'];;
        $params['title'] = $_W['account']['name'] . "商城订单{$order['ordersn']}";
        $params['type'] = $order['paytype'];
        $res = $this->pay($params);
        $params = $res['params'];
        $wOpt =  $res['wOpt'];
        $payment_types =$_W['account']['payment'];
        $pay_conf = $_W['config']['payment'];
        $profile = fans_search($_W['fans']['from_user'], array('realname', 'resideprovince', 'residecity', 'residedist', 'address', 'mobile', 'qq'));
        include $this->template('pay');
	}
    protected function pay($params = array()) {
        global $_W;
        if($params['fee'] <= 0) {
            message('支付错误, 金额小于0');
        }
        $params['module'] = $this->module['name'];
        $sql = 'SELECT * FROM ' . tablename('paylog') . ' WHERE `weid`=:weid AND `module`=:module AND `tid`=:tid';
        $pars  = array();
        $pars[':weid'] = $_W['weid'];
        $pars[':module'] = $params['module'];
        $pars[':tid'] = $params['tid'];
        $log = pdo_fetch($sql, $pars);
        if(!empty($log) && $log['status'] == '1') {
            message('这个订单已经支付成功, 不需要重复支付.');
        }
        if(!empty($_W['account']['payment']['wechat']['switch'])) {
            require_once model('payment');
            $wOpt = wechat_build($params, $_W['account']['payment']['wechat']);
        }
        return array('params'=>$params,'wOpt'=>$wOpt);
    }

    public function doMobileClear()
    {
        global $_W, $_GPC;
        $this->checkAuth();
        //清空购物车
        //还原手机状态，变为正常状态0
        $this->clear_cart();
        message('清空购物车成功！', $this->createMobileUrl('list'), 'success');
    }
    /*
     * 清空购物车
     *参数$status : 合约机状态
     */
    private  function clear_cart($status=0){
        global $_W, $_GPC;
        $sql =  "select bc.*,bg.type_id from ".tablename('businesshall_cart')." bc left join ".tablename("businesshall_goods")." as bg on(bc.goodsid = bg.id) where bc.weid = ". $_W['weid']." and bc.from_user = '".$_W['fans']['from_user']."'";
        $carts = pdo_fetchall($sql);
        foreach($carts as $cart ){
            if(intval($cart['type_id']) != CONTRACT_MOBILE || empty($cart['goods_attr'])){
                continue;
            }
            $phone = explode("\n",$cart['goods_attr']);
            pdo_update('businesshall_numbers',array('status'=>$status),array('phonenum'=>trim($phone['1'])));
        }
        pdo_delete('businesshall_cart', array('weid' => $_W['weid'], 'from_user' => $_W['fans']['from_user']));
    }
    /*
     * 更新订单
     */
    private  function update_order($orderid,$status=0){
        global $_W, $_GPC;
        $order_goods = pdo_fetchall("SELECT id FROM " . tablename('businesshall_order_goods') . " WHERE orderid = '{$orderid}'");
        $order_goods_ids = '';
        foreach($order_goods as $k=>$v){
            $order_goods_ids .= $v['id'].',';
        }
        $order_goods_ids =  trim($order_goods_ids,',');
        if(!empty($order_goods_ids)){
            $sql = "SELECT bc.goods_attr,bg.type_id from ".tablename('businesshall_order_goods')." bc left join ".tablename('businesshall_goods')." bg on(bc.goodsid = bg.id) WHERE bc.id in (".$order_goods_ids.")";
            $goods = pdo_fetchall($sql);
        }else{
            $goods = array();
        }
        foreach($goods as $good ){
            if(intval($good['type_id']) != CONTRACT_MOBILE || empty($good['goods_attr'])){
                continue;
            }
            $phone = explode("\n",$good['goods_attr']);
            pdo_update('businesshall_numbers',array('status'=>$status),array('phonenum'=>trim($phone['1'])));
        }
    }

    public function doMobileMyOrder()
    {
        global $_W, $_GPC;
        $this->checkAuth();
        $pindex = max(1, intval($_GPC['page']));
        $psize = 20;
        $list = pdo_fetchall("SELECT * FROM " . tablename('businesshall_order') . " WHERE weid = '{$_W['weid']}' AND from_user = '{$_W['fans']['from_user']}' ORDER BY id DESC LIMIT " . ($pindex - 1) * $psize . ',' . $psize, array(), 'id');
        $total = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename('businesshall_order') . " WHERE weid = '{$_W['weid']}' AND from_user = '{$_W['fans']['from_user']}'");
        $pager = pagination($total, $pindex, $psize);

        if (!empty($list)) {
            foreach ($list as &$row) {
                $order_goods_infos = pdo_fetchall("select  i.goods_attr_id,i.goods_attr,i.goods_add_price,i.total,i.orderid,i.goodsid,i.createtime,ii.title,ii.thumb,ii.type_id,ii.unit,ii.marketprice,ii.type,ii.total as goodtotal from ".tablename("businesshall_order_goods")." i left join ".tablename("businesshall_goods")." ii on (i.goodsid = ii.id) where i.orderid = ".$row['id'].' and i.weid = '.$_W['weid']);
                $row['goods'] = $order_goods_infos;
            }
        }
        include $this->template('order');
    }

    public function doMobileDetail()
    {
        global $_W, $_GPC;
        $this->checkAuth();
        $goodsid = intval($_GPC['id']);
        $goods = pdo_fetch("SELECT * FROM " . tablename('businesshall_goods') . " WHERE id = :id", array(':id' => $goodsid));
        if (empty($goods)) {
            message('抱歉，商品不存在或是已经被删除！');
        }
        if (checksubmit('submit')) {
            $_GPC['count'] = intval($_GPC['count']);

            if ($goods['total'] > -1 && $goods['total'] < $_GPC['count']) {
                message('抱歉，该商品库存不足！');
            }
            pdo_update('businesshall_numbers',array('status'=>1),array('weid'=>$_W['weid'],'phonenum'=>$_GPC['phone']));
            if($goods['type_id'] ==CONTRACT_MOBILE){
                $hyji = $_GPC['hyjh'];
                $color = $_GPC['color'];
                $phone = $_GPC['phone'];
                $phone_price = $_GPC['phone_price'];
                $sql ='select GROUP_CONCAT(attr_id)  from (select * from '.tablename('businesshall_goods_attr').' where goods_id = 5 and attr_type in(1,2,3)  order by attr_type asc)t GROUP BY goods_id ';
                $goods_attr_id = pdo_fetchcolumn($sql);
                $goods_attr = $hyji."\n".$phone."\n".$color."\n";
                $goods_add_price = "0,".$phone_price.",0";
            }
            $row = pdo_fetch("SELECT id, total FROM " . tablename('businesshall_cart') . " WHERE from_user = :from_user AND weid = '{$_W['weid']}' AND goodsid = :goodsid AND goods_attr = :goods_attr ", array(':from_user' => $_W['fans']['from_user'], ':goodsid' => $goodsid,':goods_attr'=>$goods_attr));
            if (empty($row['id'])) {
                $data = array(
                    'weid' => $_W['weid'],
                    'goodsid' => $goodsid,
                    'goodstype' => $goods['type'],
                    'from_user' => $_W['fans']['from_user'],
                    'total' => $_GPC['count'],
                    'goods_attr'=>$goods_attr,
                    'goods_attr_id'=>$goods_attr_id,
                    'goods_add_price'=>$goods_add_price
                );
                pdo_insert('businesshall_cart', $data);
            } else {
                $data = array(
                    'total' => $row['total'] + $_GPC['count'],
                );
                if ($goods['total'] > -1 && $goods['total'] < $data['total']) {
                    message('抱歉，该商品库存不足！');
                }
                pdo_update('businesshall_cart', $data, array('from_user' => $_W['fans']['from_user'], 'weid' => $_W['weid'], 'goodsid' => $goodsid));
            }
            //TODO 这边数据添加成功，号码状态需要修改

            message('添加商品成功，请去“我的购物车”提交订单！', $this->createMobileUrl('list'), 'success');
        }
//        var_dump($goods['type_id']);exit;
        if($goods['type_id'] ==CONTRACT_MOBILE){
            //合约机（进入合约机详情页面）
            //合约列表
            $contract_ids = pdo_fetchcolumn("SELECT a.attr_value good_attr_type FROM " . tablename('businesshall_attribute') . " b left join (select * FROM " . tablename('businesshall_goods_attr') . " WHERE goods_id = '{$goodsid} ')  a  ON a.attr_id = b.attr_id WHERE b.type_id= {$goods['type_id']} and b.attr_input_type=3 and b.attr_type =1 ORDER BY displayorder ");
            $contract_ids = str_replace("\n",",",trim($contract_ids));
            $getcontracturl = $this->createMobileUrl('getcontract');
            $getphoneurl = $_W['siteroot'].$this->createMobileUrl('getphone');
            $car_url = $_W['siteroot'].$this->createMobileUrl('detail');
            $pay_url =  $_W['siteroot'].$this->createMobileUrl('mycart');
            if(!empty($contract_ids)){
                $contracts = pdo_fetchall("select  * from ". tablename('businesshall_contract') ." where contract_id in (".$contract_ids.")");
                $contractgifts = pdo_fetchall("select  * from ". tablename('businesshall_contract') ." where contract_id in (".$contract_ids.")");
            }else{
                $contracts = array();
                $contractgifts = array();
            }
            $goods_detail = $this->get_detail($goods);
            //号码套餐
            $phone_ids = pdo_fetchcolumn("SELECT a.attr_value good_attr_type FROM " . tablename('businesshall_attribute') . " b left join (select * FROM " . tablename('businesshall_goods_attr') . " WHERE goods_id = '{$goodsid} ')  a  ON a.attr_id = b.attr_id WHERE b.type_id= {$goods['type_id']} and b.attr_input_type=3 and b.attr_type =2 ORDER BY displayorder ");
            $phone_ids = str_replace("\n",",",trim($phone_ids));
            if(!empty($phone_ids)){
                $phone_infos = pdo_fetchall("select  * from ". tablename('businesshall_packages') ." where phone_package_id in (".$phone_ids.")");
                $sql = "select * from ".tablename('businesshall_numbers')." where pid=".$phone_infos['0']['phone_package_id']." and weid = ".$_W['weid']." and status = 0 limit  10";
                $phone_nums = pdo_fetchall($sql);
            }else{
                $phone_infos = array();
                $phone_nums = array();
            }

            //颜色属性
            $color_infos = pdo_fetchcolumn("SELECT a.attr_value FROM " . tablename('businesshall_attribute') . " b left join (select * FROM " . tablename('businesshall_goods_attr') . " WHERE goods_id = '{$goodsid} ')  a  ON a.attr_id = b.attr_id WHERE b.type_id= {$goods['type_id']} and b.attr_input_type=3 and b.attr_type =3 ORDER BY displayorder ");
            $color_infos = iunserializer($color_infos);
            include $this->template('detail1');
        }else{
            include $this->template('detail');
        }

    }
    /*
     * 获取商品详情颜色对应不同的照片（属性）
     * 参数$goods：商品表中一条商品数据
     * 返回：html段
     */
    public function doMobileGetphone(){
        global $_GPC,$_W;
        $numberpagecur = $_GPC['numberPageCur'];

         $sql = "select * from ".tablename('businesshall_numbers')." where pid=".$_GPC['phoneid']." and weid = ".$_W['weid']." and status = 0 limit ".($numberpagecur*10)." , 10";
         $phone_infos = pdo_fetchall($sql);
         $res = array();
         foreach($phone_infos as $k =>$phone){
             $res['data'][] = array('created'=>'2013-09-09 18:20:00','id'=>$phone['phonenum_id'],'number'=>$phone['phonenum'],'prestore'=>0,'type'=>"189");
         }
        $res['data1']=null;
        $res['data2']=null;
        $res['data3']=null;
        $res['local']=fasle;
        $res['success']=true;
        $res['timeout']=false;
        $res['title']='';
        $res['total']=10;
        echo json_encode($res);exit;
    }
    /*
     * 获取商品详情（属性）
     * 参数$goods：商品表中一条商品数据
     * 返回：html段
     */
    public function get_detail($goods){
        if(empty($goods)|| !is_array($goods)){
            return '';
        }
        $goodsattrs = pdo_fetchall("SELECT b.*,a.goods_id,a.attr_value,a.attr_price,a.attr_type as good_attr_type FROM " . tablename('businesshall_attribute') . " b left join (select * FROM " . tablename('businesshall_goods_attr') . " WHERE goods_id = '{$goods['id']}')  a  ON a.attr_id = b.attr_id WHERE b.attr_input_type < '3'and b.type_id= {$goods['type_id']} ORDER BY displayorder ");
        $key ='';
        $value ='';
        $res ='';
        foreach($goodsattrs as $k=>$attr){
            $attr_value = trim($attr['attr_value']);
            if($attr['attr_input_type']=='2'){
                $attr_value = preg_replace("/\s+/", "、",trim($attr['attr_value']));
            }
            if($k%3==0){
                $key.='<tr><td>'.$attr['attr_name'].'</td>';
                $value.='<tr><td>'.$attr_value.'</td>';
            }elseif($k%3==2){
                $key.='<td>'.$attr['attr_name'].'</td></tr>';
                $value.='<td>'.$attr_value.'</td></tr>';
                $res.=$key.$value;
                $key = '';
                $value = '';
            }else{
                $key.='<td>'.$attr['attr_name'].'</td>';
                $value.='<td>'.$attr_value.'</td>';
            }
        }
        if($k%3==0){
            $key.='<td></td><td></td>';
            $value.='<td></td><td></td><td></td>';
        }elseif($k%3==1){
            $key.='<td></td>';
            $value.='<td></td>';
        }else{
            $key.='</tr>';
            $value.='</tr>';

        }
        $res.=$key.$value;
        //echo $res;exit;
        return $res;
    }
    /*
     * 获取额外的合约信息
     */
    public function doMobileGetcontract(){
        $id = $_GET['id'];
        if(empty($id)){
            echo '';exit;
        }
        $contractgifts = pdo_fetchall("select  * from ". tablename('businesshall_contract_gift') ." where contract_id =".$id);
        $key ='';
        $value ='';
        $res ='';
        foreach($contractgifts as $k=>$gift){
           if($k%4==0){
               $key.='<tr><td>'.$gift['gift_name'].'('.$gift['gift_unit'].')</td>';
               $value.='<tr><td>'.$gift['gift_value'].'</td>';
           }elseif($k%4==3){
               $key.='<td>'.$gift['gift_name'].'('.$gift['gift_unit'].')</td></tr>';
               $value.='<td>'.$gift['gift_value'].'</td></tr>';
               $res.=$key.$value;
               $key = '';
               $value = '';
           }else{
               $key.='<td>'.$gift['gift_name'].'('.$gift['gift_unit'].')</td>';
               $value.='<td>'.$gift['gift_value'].'</td>';
           }
        }
        if($k%4==0){
            $key.='<td></td><td></td><td></td>';
            $value.='<td></td><td></td><td></td>';
        }elseif($k%4==1){
            $key.='<td></td><td></td>';
            $value.='<td></td><td></td>';
        }elseif($k%4==2){
            $key.='<td></td>';
            $value.='<td></td>';
        }else{
            $key.='</tr>';
            $value.='</tr>';

        }
        $res.=$key.$value;
        echo $res;exit;
    }
    private function checkAuth()
    {
        global $_W;
        checkauth();
    }
    /*
     * 获取购物车物品详情
     * 参数$cart：购物表中一条数据
     */
    public function get_contract_mobile_detail($cart){
        $goods_attr = explode("\n",trim($cart['goods_attr']));
        $goods_attr_id = explode(",",$cart['goods_attr_id']);
        $goods_add_price =  explode(",",$cart['goods_add_price']);
        //合约信息
        if(!empty($goods_attr['0'])){
            $contract_info = pdo_fetch("select  * from ". tablename('businesshall_contract') ." where contract_id =".$goods_attr['0']);
        }
        //号码信息
        if(!empty($goods_attr['1'])){
            $sql = "select * from ".tablename('businesshall_numbers')."  as bn left join ". tablename('businesshall_packages') ." as bp on(bn.pid = bp.phone_package_id) where bn.phonenum = '{$goods_attr['1']}'";
            $phone_info = pdo_fetch($sql);
        }
        $color = $goods_attr['2'];
        return array('0'=>$contract_info,'1'=>$phone_info,'2'=>$color);
    }

    public function payResult($params)
    {
        $fee = intval($params['fee']);
        pdo_update('businesshall_order', array('status' => 1), array('id' => $params['tid']));
        if ($params['from'] == 'return') {
            //邮件提醒
            if (!empty($this->module['config']['noticeemail'])) {
                $order = pdo_fetch("SELECT price, from_user FROM " . tablename('businesshall_order') . " WHERE id = '{$params['tid']}'");
                $ordergoods = pdo_fetchall("SELECT goodsid, total FROM " . tablename('businesshall_order_goods') . " WHERE orderid = '{$params['tid']}'", array(), 'goodsid');
                $goods = pdo_fetchall("SELECT id, title, thumb, marketprice, unit, total FROM " . tablename('businesshall_goods') . " WHERE id IN ('" . implode("','", array_keys($ordergoods)) . "')");

                $body = "<h3>购买商品清单</h3> <br />";
                if (!empty($goods)) {
                    foreach ($goods as $row) {
                        $body .= "名称：{$row['title']} ，数量：{$ordergoods[$row['id']]['total']} <br />";
                    }
                }
                $fans = fans_search($order['from_user'], array('realname', 'resideprovince', 'residecity', 'residedist', 'address', 'mobile', 'qq'));
                $body .= "<br />总金额：{$order['price']}元 （已付款）<br />";
                $body .= "<h3>购买用户详情</h3> <br />";
                $body .= "真实姓名：{$fans['realname']} <br />";
                $body .= "地区：{$fans['resideprovince']} - {$fans['residecity']} -  {$fans['residedist']}<br />";
                $body .= "详细地址：{$fans['address']} <br />";
                $body .= "手机：{$fans['mobile']} <br />";
                $body .= "QQ：{$fans['qq']} <br />";
                ihttp_email($this->module['config']['noticeemail'], '微商城订单提醒', $body);
            }
            if ($params['type'] == 'credit2') {
                message('支付成功！', $this->createMobileUrl('myorder'), 'success');
            } else {
                message('支付成功！', '../../' . $this->createMobileUrl('myorder'), 'success');
            }
        }
    }
}
