<?php
$sql = "ALTER TABLE ".tablename('scratchcard_reply')." ADD INDEX `idx_rid` ( `rid` );";
$sql = "ALTER TABLE ".tablename('scratchcard_winner')." ADD INDEX `idx_createtime_fromuser` ( `createtime` , `from_user` ), ADD INDEX `idx_fromuser_rid` (`from_user`,`rid`) ";