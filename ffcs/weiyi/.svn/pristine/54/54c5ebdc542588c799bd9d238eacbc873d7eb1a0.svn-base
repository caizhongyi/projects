<?php

if(!pdo_fieldexists('research', 'pretotal')) {
	pdo_query("ALTER TABLE `ims_research` ADD `pretotal` INT( 10 ) UNSIGNED NOT NULL DEFAULT '1';");
}
pdo_query("ALTER TABLE `ims_research` CHANGE `description` `description` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '';");