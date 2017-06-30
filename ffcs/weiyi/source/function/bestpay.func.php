<?php
function get_code($button_attr = '',$params=array())
{
    if (strtoupper($params['gateway_method']) == 'GET') $str = '<form action="' . $params['gateway_url'] . '" method="GET">';
    else $str = '<form action="' . $params['gateway_url'] . '" method="POST">';
    unset($params['gateway_url'],$params['gateway_url']);
    foreach ($params as $key => $value) $str .= '<input type="hidden" name="' . $key . '" value="' . $value . '" />';
    $str .= '<input id="btn_commit_pay" type="submit" ' . $button_attr . ' />';
    $str .= '</form>';

    return $str;
}

/**
 * 客户端接收数据，前台回调页面。
 */
function receive($receive_data,$params) {
    $uptranseq = trim($receive_data['UPTRANSEQ']);
    $trandate = trim($receive_data['TRANDATE']);
    $retncode = trim($receive_data['RETNCODE']);
    $retninfo = trim($receive_data['RETNINFO']);
    $orderreqtranseq = trim($receive_data['ORDERREQTRANSEQ']);
    $orderseq = trim($receive_data['ORDERSEQ']);
    $orderamount = number_format($receive_data['ORDERAMOUNT'], 2, '.', ''); //单位为分，本系统以元展示计算
    $productamount = number_format($receive_data['PRODUCTAMOUNT'], 2, '.', ''); //单位为分，本系统以元展示计算
    $attachamount = number_format($receive_data['ATTACHAMOUNT'], 2, '.', '');
    $curtype = trim($receive_data['CURTYPE']);
    $encodetype = trim($receive_data['ENCODETYPE']);
    $bankid = trim($receive_data['BANKID']);
    $attach = trim($receive_data['ATTACH']);
    $sign = trim($receive_data['SIGN']);

    $data = 'UPTRANSEQ=' . $uptranseq;
    $data .= '&MERCHANTID=' . $params['merchantid'];
    $data .= '&ORDERSEQ=' . $orderseq;
    $data .= '&ORDERAMOUNT=' . $orderamount;
    $data .= '&RETNCODE=' . $retncode;
    $data .= '&RETNINFO=' . $retninfo;
    $data .= '&TRANDATE=' . $trandate;
    $data .= '&KEY=' . $params['bestpay_key'];

    $md5string = strtoupper(md5($data));
    if ($sign == $md5string) {
        $return_data['order_id'] = $orderseq;
        $return_data['order_total'] = $orderamount; //响应回来的价格
        $return_data['price'] = $orderamount; //响应回来的价格
        $return_data['attach'] = $attach; //响应回来的备注
        if ($retncode == "0000") {
            $return_data['order_status'] = 0;
            logging($orderseq . ' - 订单状态成功：' . var_export($return_data, 1));
            return $return_data;
        } else {
            logging($orderseq . ' - 订单状态失败：' . var_export($return_data, 1));
            exit('订单状态失败.');
        }
    } else {
        logging($orderseq . ' - sign非法：' . var_export($md5string, 1));
        exit('sign非法.');
    }
}

/**
 * POST接收数据
 */
function notify($receive_data,$params) {
    $uptranseq = trim($receive_data['UPTRANSEQ']);
    $trandate = trim($receive_data['TRANDATE']);
    $retncode = trim($receive_data['RETNCODE']);
    $retninfo = trim($receive_data['RETNINFO']);
    $orderreqtranseq = trim($receive_data['ORDERREQTRANSEQ']);
    $orderseq = trim($receive_data['ORDERSEQ']);
    $orderamount = number_format($receive_data['ORDERAMOUNT'], 2, '.', '');
    $productamount = number_format($receive_data['PRODUCTAMOUNT'], 2, '.', '');
    $attachamount = number_format($receive_data['ATTACHAMOUNT'], 2, '.', '');
    $curtype = trim($receive_data['CURTYPE']);
    $encodetype = trim($receive_data['ENCODETYPE']);
    $bankid = trim($receive_data['BANKID']);
    $attach = trim($receive_data['ATTACH']);
    $sign = trim($receive_data['SIGN']);

    $data = 'UPTRANSEQ=' . $uptranseq;
    $data .= '&MERCHANTID=' . $params['merchantid'];
    $data .= '&ORDERSEQ=' . $orderseq;
    $data .= '&ORDERAMOUNT=' . $orderamount;
    $data .= '&RETNCODE=' . $retncode;
    $data .= '&RETNINFO=' . $retninfo;
    $data .= '&TRANDATE=' . $trandate;
    $data .= '&KEY=' . $params['bestpay_key'];

    $md5string = strtoupper(md5($data));
    if ($sign == $md5string) {
        $return_data['order_id'] = $orderseq;
        $return_data['order_total'] = $orderamount; //响应回来的价格为分
        $return_data['price'] = $orderamount; //响应回来的价格为分
        $return_data['uptranseq'] = $uptranseq;
        $return_data['attach'] = $attach; //响应回来的备注
        if ($retncode == "0000") {
            $return_data['order_status'] = 0;
            logging($orderseq . ' - 订单状态成功：' . var_export($return_data, 1));
            return $return_data;
        } else {
            logging($orderseq . ' - 订单状态失败：' . var_export($return_data, 1));
            return false;
        }
    } else {
        logging($orderseq . ' - sign非法：' . var_export($md5string, 1));
        return false;
    }
}

/**
 * 相应服务器应答状态
 * @param $result
 */
function response($result) {
    paylog('最终响应:' . $result);
    if (false == $result)
        echo 'fail';
    else
        echo 'UPTRANSEQ_' . $result;
}

function logging($message = '') {
    $filename = IA_ROOT . '/data/logs/pay_log.log';
    mkdirs(dirname($filename));
    $content = date('Y-m-d H:i:s') . ":\n------------\n";
    if(is_string($message)) {
        $content .= "String:\n{$message}\n";
    }
    if(is_array($message)) {
        $content .= "Array:\n";
        foreach($message as $key => $value) {
            $content .= sprintf("%s : %s ;\n", $key, $value);
        }
    }
    if($message == 'get') {
        $content .= "GET:\n";
        foreach($_GET as $key => $value) {
            $content .= sprintf("%s : %s ;\n", $key, $value);
        }
    }
    if($message == 'post') {
        $content .= "POST:\n";
        foreach($_POST as $key => $value) {
            $content .= sprintf("%s : %s ;\n", $key, $value);
        }
    }
    $content .= "\n";

    $fp = fopen($filename, 'a+');
    fwrite($fp, $content);
    fclose($fp);
}
?>