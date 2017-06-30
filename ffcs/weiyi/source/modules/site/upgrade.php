<?php
if(!pdo_fieldexists('article', 'iscommend')) {
	pdo_query("ALTER TABLE ".tablename('article')." ADD `iscommend` TINYINT( 1 ) UNSIGNED NOT NULL DEFAULT '0' AFTER `title` ;");
	pdo_query("ALTER TABLE ".tablename('article')." ADD `ishot` TINYINT( 1 ) UNSIGNED NOT NULL DEFAULT '0' AFTER `iscommend` ;");
	pdo_query("ALTER TABLE ".tablename('article')." ADD `description` VARCHAR( 1000 ) NOT NULL DEFAULT '' AFTER `title`;");
}

if(!pdo_fieldexists('article', 'type')) {
	pdo_query("ALTER TABLE ".tablename('article')." ADD `type` VARCHAR( 10 ) NOT NULL DEFAULT '' ;");
}
