<?php
include_once 'jostudio.wechatmenu.php'; //包含WeChatMenu类

$AppId="d2ae8483db864d23bb53b3729c239a1a";     //公共平台提供的AppId参数
$AppSecret="ec0a9d606acf48238f200b827aa2560c"; //公共平台提供的AppSecret参数

//创建一个WeChatMenu类的实例
//$object = new WeChatMenu("weixin",$AppId, $AppSecret); //第一个参数 "weixin", 表明是针对微信平台的
$object = new WeChatMenu("yixin",$AppId, $AppSecret); //第一个参数 "yixin", 表明是针对易信平台的


//定义一个菜单
$menu = new MenuDefine();

$menu->menuStart();  //菜单开始

$menu->addMenu("娱乐天地");
$menu->addMenuItem("猜谜语", "basic:6:aa");
$menu->addMenuItem("讲笑话", "basic:6:aa");
$menu->addMenuItem("听音乐", "basic:6:aa");
$menu->addMenuItem("看电影", "basic:6:aa");
$menu->addMenuItem("看小说", "basic:6:aa");

$menu->addMenu("实用工具");
$menu->addMenuItem("找美食", "basic:6:aa");
$menu->addMenuItem("城市天气", "basic:6:aa");
$menu->addMenuItem("翻译", "basic:6:aa");
$menu->addMenu("更多..");
$menu->addMenuItem("找美食", "basic:6:aa");
$menu->addMenuItem("城市天气", "basic:6:aa");
$menu->addMenuItem("翻译", "basic:6:aa");

$menu->menuEnd(); //菜单结束, 则此时$menu->str中有菜单定义数据(JSON格式) 

//生成菜单
//echo "<h2>Create Menu</h2>";
//if ($object->createMenu($menu->str))  //$menu->str中有菜单定义数据(JSON格式)
//	echo "Create menu OK";
//else
//	echo "Create menu failure:".$menuObject->errmsg;
//echo "<hr>";


//获取当前菜单数据
echo "<h2>Get Menu: the menu json data is</h2>";
echo $object->getMenu();
echo "<hr>";


//删除菜单
//echo "<h2>Delete Menu</h2>";
//echo $object->deleteMenu();
//echo "<hr>";


?>