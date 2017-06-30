<?php
if(!pdo_fieldexists('egg_reply', 'periodlottery')) {
	pdo_query("ALTER TABLE `ims_egg_reply` ADD `periodlottery` SMALLINT( 10 ) UNSIGNED NOT NULL DEFAULT '1' COMMENT '0为无周期';");
}

