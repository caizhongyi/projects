
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
DROP TABLE IF EXISTS `groupevent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groupevent` (
  `id` varchar(40) NOT NULL,
  `event_name` varchar(60) NOT NULL,
  `event_description` varchar(500) NOT NULL,
  `value_nbr` int(11) NOT NULL,
  `standard_title` varchar(60) NOT NULL,
  `standard_content` varchar(500) NOT NULL,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `language_id` varchar(40) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='圈子中可触发事件集合表，基础表';
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `groupevent` WRITE;
/*!40000 ALTER TABLE `groupevent` DISABLE KEYS */;
INSERT INTO `groupevent` VALUES ('656d728a-3493-11e1-9e30-000c29a5c50c','财务员变动','财务员需要变动时使用',5,'XX月XX日发起财务员人员变动事件','发起事件理由是XXXXX','2012-01-01 16:12:42','a098d6c8-f181-11e0-8a53-00306701b527',1),('6570ff5a-3493-11e1-9e30-000c29a5c50c','执行管理员变动','执行管理员需要变动时使用',5,'XX月XX日发起执行管理员人员变动事件','发起事件理由是XXXXX','2012-01-01 16:12:42','a098d6c8-f181-11e0-8a53-00306701b527',1),('65710133-3493-11e1-9e30-000c29a5c50c','超级管理员变动','超级管理员需要变动时使用',5,'XX月XX日发起超级管理员人员变动事件','发起事件理由是XXXXX','2012-01-01 16:12:42','a098d6c8-f181-11e0-8a53-00306701b527',1),('65711d88-3493-11e1-9e30-000c29a5c50c','出纳变动','出纳员需要变动时使用',5,'XX月XX日发起出纳人员变动事件','发起事件理由是XXXXX','2012-01-01 16:12:42','a098d6c8-f181-11e0-8a53-00306701b527',1),('65711f92-3493-11e1-9e30-000c29a5c50c','管理结构信息变更','圈子的管理结构相关信息的变更时使用',4,'XX月XX日发起圈子管理结构相关信息变更事件','发起事件理由是XXXXX','2012-01-01 16:12:42','a098d6c8-f181-11e0-8a53-00306701b527',1),('65712117-3493-11e1-9e30-000c29a5c50c','会计变动','会计员需要变动时使用',5,'XX月XX日发起会计人员变动事件','发起事件理由是XXXXX','2012-01-01 16:12:42','a098d6c8-f181-11e0-8a53-00306701b527',1),('6571222a-3493-11e1-9e30-000c29a5c50c','活动专用预算','圈子发起的活动，并且有预算相关时使用',4,'XX月XX日发起活动专用预算事件','发起事件理由是XXXXX','2012-01-01 16:12:42','a098d6c8-f181-11e0-8a53-00306701b527',1),('6571233d-3493-11e1-9e30-000c29a5c50c','基本信息变更','圈子的基本信息相关的所有变更时使用',4,'XX月XX日发起圈子基本信息变更事件','发起事件理由是XXXXX','2012-01-01 16:12:42','a098d6c8-f181-11e0-8a53-00306701b527',1),('65712451-3493-11e1-9e30-000c29a5c50c','解散圈子','圈子需要解散时使用',2,'XX月XX日发起圈子解散事件','发起事件理由是XXXXX','2012-01-01 16:12:42','a098d6c8-f181-11e0-8a53-00306701b527',1),('65712571-3493-11e1-9e30-000c29a5c50c','收支预算','跟货币收，支预算相关时使用',4,'XX月XX日发起圈子收/支预算申请事件','发起事件理由是XXXXX','2012-01-01 16:12:42','a098d6c8-f181-11e0-8a53-00306701b527',1),('6be67525-34a0-11e1-9e30-000c29a5c50c','删帖','常规权限，管理员均具备，删除管理员认为不合规则的发帖',1,'','','2012-01-01 17:45:56','a098d6c8-f181-11e0-8a53-00306701b527',1),('6bf932f2-34a0-11e1-9e30-000c29a5c50c','加入批准','常规权限，管理员均具备，对于批准加入模式的圈子，发送是否批准许可',1,'','','2012-01-01 17:45:56','a098d6c8-f181-11e0-8a53-00306701b527',1),('6bff4f0b-34a0-11e1-9e30-000c29a5c50c','踢出普通人员','常规权限，管理员均具备，踢出普通的会员',1,'','','2012-01-01 17:45:56','a098d6c8-f181-11e0-8a53-00306701b527',1),('6c05e684-34a0-11e1-9e30-000c29a5c50c','圈子名义发起活动','常规权限，管理员均具备，圈子的名义发起活动',-1,'','','2012-01-01 17:45:56','a098d6c8-f181-11e0-8a53-00306701b527',1),('6c0d1b26-34a0-11e1-9e30-000c29a5c50c','现金收支','常规权限，出纳，财务员具备，对货币资金的操作',-1,'','','2012-01-01 17:45:56','a098d6c8-f181-11e0-8a53-00306701b527',1),('6c1803c2-34a0-11e1-9e30-000c29a5c50c','账面收支','常规权限，会计，财务员具备，对财务进行操作',-1,'','','2012-01-01 17:45:56','a098d6c8-f181-11e0-8a53-00306701b527',1),('a726b8ac-35ca-11e1-8560-101f74b66417','budget','It used as budget income and expense',5,'XX,XX Circle launched XX budget event','The event reason is XXXXX','2012-01-03 05:20:30','a1c3e20e-f181-11e0-8a53-00306701b527',1),('a72e6019-35ca-11e1-8560-101f74b66417','basic information change','It used as basic information change',4,'XX,XX Circle launched basic information change event','The event reason is XXXXX','2012-01-03 05:20:30','a1c3e20e-f181-11e0-8a53-00306701b527',1),('a7329b65-35ca-11e1-8560-101f74b66417','manage structure change','It used as management structure change',4,'XX,XX Circle launched management structure change event','The event reason is XXXXX','2012-01-03 05:20:30','a1c3e20e-f181-11e0-8a53-00306701b527',1),('a738b708-35ca-11e1-8560-101f74b66417','activity budget','It used as activity budget',3,'XX,XX Circle launched activity budget event','The event reason is XXXXX','2012-01-03 05:20:30','a1c3e20e-f181-11e0-8a53-00306701b527',1),('a73e2e74-35ca-11e1-8560-101f74b66417','dimiss circle','It used as circle dismiss',2,'XX,XX Circle launched dismiss evnet','The event reason is XXXXX','2012-01-03 05:20:30','a1c3e20e-f181-11e0-8a53-00306701b527',1),('a7415c14-35ca-11e1-8560-101f74b66417','super manager changes','It used as super manager change',4,'XX,XX Circle launched super manager change event','The event reason is XXXXX','2012-01-03 05:20:30','a1c3e20e-f181-11e0-8a53-00306701b527',1),('a7444f1a-35ca-11e1-8560-101f74b66417','executive manager change','It used as executive manager change',4,'XX,XX Circle launched executive manager change event','The event reason is XXXXX','2012-01-03 05:20:30','a1c3e20e-f181-11e0-8a53-00306701b527',1),('a74723e5-35ca-11e1-8560-101f74b66417','accountant change','It used as treasurer change',4,'XX,XX Circle launched treasurer change event','The event reason is XXXXX','2012-01-03 05:20:30','a1c3e20e-f181-11e0-8a53-00306701b527',1),('a749b1a0-35ca-11e1-8560-101f74b66417','delete posts','General permission, manager permission, delete inappropriate posts',1,'','','2012-01-03 05:20:30','a1c3e20e-f181-11e0-8a53-00306701b527',1),('a7504068-35ca-11e1-8560-101f74b66417','approve applications','General permission, manager permission, approve applications',1,'','','2012-01-03 05:20:31','a1c3e20e-f181-11e0-8a53-00306701b527',1),('a752f33d-35ca-11e1-8560-101f74b66417','kick general staff','General permission, manager permission, kick general staff',1,'','','2012-01-03 05:20:31','a1c3e20e-f181-11e0-8a53-00306701b527',1),('a75549f3-35ca-11e1-8560-101f74b66417','sign up activity by the circle','General permission, manager permission, sign up activity by group',-1,'','','2012-01-03 05:20:31','a1c3e20e-f181-11e0-8a53-00306701b527',1),('a757a1a4-35ca-11e1-8560-101f74b66417','cash receipts and payments','General permission, cashier and treasurer permission, operate cash flow',-1,'','','2012-01-03 05:20:31','a1c3e20e-f181-11e0-8a53-00306701b527',1),('a759c6f9-35ca-11e1-8560-101f74b66417','book balance receipts and payments','General permission, accountant and treasurer permission, operate finance',-1,'','','2012-01-03 05:20:31','a1c3e20e-f181-11e0-8a53-00306701b527',1);
/*!40000 ALTER TABLE `groupevent` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

