<?php
if(!pdo_fieldexists('album', 'type')) {
	pdo_query("ALTER TABLE ".tablename('album')." ADD `type` TINYINT( 1 ) UNSIGNED NOT NULL DEFAULT '0' AFTER  `isview`;");
}