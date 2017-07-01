<?php
header('Access-Control-Allow-Origin:http://www.a.com');
header('Access-Control-Allow-Methods:POST,GET');
header('Access-Control-Allow-Credentials:true');
echo 'Cross-domain Ajax';

$code = $_FILES["file"]['error'];
 $echo($_POST("category"));

if (!$code) {
    $root = dirname(__FILE__) .'/upload/';
    if( $_GET['name'] ){
        $url =  $root. $_GET['name'] ;
        unlink($url);
        echo json_encode(array(
            'error' => 0,
            'url' => $url
        ));
    }
    else{
        $_FILES["file"]["name"] = time() . $_FILES["file"]["name"];
            $url =  $root. $_FILES["file"]["name"] ;
            move_uploaded_file($_FILES["file"]["tmp_name"], $url);
            echo json_encode(array(
                    'error' => 0,
                    'name'  => $_FILES["file"]["name"],
                    'url'   => $url
            ));
    }

} else {
    echo json_encode(array(
            'error' => 1,
            'text' => '错误代码(' . $code . ')'
        ));
}
