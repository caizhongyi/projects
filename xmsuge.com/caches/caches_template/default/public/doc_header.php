<?php defined('IN_PHPCMS') or exit('No permission resources.'); ?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
     <meta name="description" content="厦门苏格影像是厦门最专业的摄影机构，隶属厦门苏可文化传播有限公司，苏格影像为您提供厦门孕妇写真摄影，准妈妈照，孕妇写真，孕妇照，宝宝照，宝宝摄影，亲子照，亲子摄影，全家福照，满月宝宝照，周岁宝宝照，百天宝宝照等各类最优质地摄影服务。">
     <meta name="keywords" content="厦门苏格影像,宝宝摄影,准妈妈照,准妈妈摄影，孕妇写真,孕妇摄影,孕妇照,百天宝宝照,亲子照，全家福照，满月宝宝照">
    <title>厦门孕妇摄影,厦门儿童写真,厦门亲子照—厦门苏格影像</title>
    <link rel="stylesheet" type="text/css" href="<?php echo APP_PATH;?>statics/suge/css/base.css">
    <script type="text/javascript" src="<?php echo APP_PATH;?>statics/suge/js/jquery-1.9.1.min.js"></script>
    <?php $n=1;if(is_array($load_css)) foreach($load_css AS $css) { ?>
    <link href="<?php echo APP_PATH;?>statics/suge/css/<?php echo $css;?>.css?v=suge" rel="stylesheet" type="text/css" />
    <?php $n++;}unset($n); ?>
    <script>
        var SITEURL = "<?php echo buildurl();?>";
    </script>
    <?php $n=1;if(is_array($header_js)) foreach($header_js AS $hjs) { ?>
    <script src="<?php echo APP_PATH;?>statics/v3/js/<?php echo $hjs;?>.js?v=suge" ></script>
    <?php $n++;}unset($n); ?>
</head>