<?php
include '/www/html/_configs/_database_uc.php';
define('UC_CONNECT', 'mysql');
define('UC_DBHOST', $db_uc['host']);
define('UC_DBUSER', $db_uc['user']);
define('UC_DBPW', $db_uc['password']);
define('UC_DBNAME', $db_uc['name']);
define('UC_DBCHARSET', 'gbk');
define('UC_DBTABLEPRE', '`'.$db_uc['name'].'`.uc_');
define('UC_DBCONNECT', '0');
define('UC_KEY', 'ASDFSDFsdfdskfsdfdsjdewewerw1589');
define('UC_API', 'http://u.766.com');
define('UC_CHARSET', $db_uc['charset']);
define('UC_IP', '');
define('UC_APPID', '10');
define('UC_PPP', '20');