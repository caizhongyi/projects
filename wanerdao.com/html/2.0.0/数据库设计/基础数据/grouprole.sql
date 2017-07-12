
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
DROP TABLE IF EXISTS `grouprole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grouprole` (
  `id` varchar(40) NOT NULL,
  `role_name` varchar(60) NOT NULL,
  `description` varchar(500) NOT NULL,
  `level` int(11) NOT NULL,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `language_id` varchar(40) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='圈子角色列表，基础表，记录支持的角色类型，比如超级管理员，执行管理员，财务员等';
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `grouprole` WRITE;
/*!40000 ALTER TABLE `grouprole` DISABLE KEYS */;
INSERT INTO `grouprole` VALUES ('9aa0fea0-6084-11e1-b186-101f74b66417','Super administrator','Founder, Highest priority, except general administrator\'s function, hire and lay off general administrator and dismiss group',0,'2012-02-26 14:17:24','a1c3e20e-f181-11e0-8a53-00306701b527',1),('9aa2d8db-6084-11e1-b186-101f74b66417','General administrator','general manage function',1,'2012-02-26 14:17:24','a1c3e20e-f181-11e0-8a53-00306701b527',1),('9aa54d65-6084-11e1-b186-101f74b66417','Cashier','Manage cash flow function',2,'2012-02-26 14:17:24','a1c3e20e-f181-11e0-8a53-00306701b527',1),('9aa76149-6084-11e1-b186-101f74b66417','Accountant','Manage book balance function',3,'2012-02-26 14:17:24','a1c3e20e-f181-11e0-8a53-00306701b527',1),('9aa9a22d-6084-11e1-b186-101f74b66417','Treasurer','Both cashier and accountant function',4,'2012-02-26 14:17:24','a1c3e20e-f181-11e0-8a53-00306701b527',1),('9aabe99d-6084-11e1-b186-101f74b66417','Auditor','Audit all money relative operation',5,'2012-02-26 14:17:24','a1c3e20e-f181-11e0-8a53-00306701b527',1),('9aae30df-6084-11e1-b186-101f74b66417','General participants','General participants',6,'2012-02-26 14:17:24','a1c3e20e-f181-11e0-8a53-00306701b527',1),('d899747f-15fc-11e1-bb4e-000c295f9365','财务员','拥有出纳和会计的双重权限',4,'2012-01-01 15:48:21','a098d6c8-f181-11e0-8a53-00306701b527',1),('d8a302bd-15fc-11e1-bb4e-000c295f9365','超级管理员','创建人，拥有最高权限，除了执行管理员权限以外，可以增，删执行管理员，解散圈子',0,'2012-01-01 15:49:31','a098d6c8-f181-11e0-8a53-00306701b527',1),('d8abe786-15fc-11e1-bb4e-000c295f9365','出纳员','管理货币资金的权限',2,'2012-01-01 15:49:48','a098d6c8-f181-11e0-8a53-00306701b527',1),('d8b7421b-15fc-11e1-bb4e-000c295f9365','会计员','管理账务的操作权限',3,'2012-01-01 15:50:05','a098d6c8-f181-11e0-8a53-00306701b527',1),('d8be66b9-15fc-11e1-bb4e-000c295f9365','监察员','对金钱所有相关操作进行审计权限',5,'2012-01-01 15:50:16','a098d6c8-f181-11e0-8a53-00306701b527',1),('d8c4fc32-15fc-11e1-bb4e-000c295f9365','普通人员','普通参加活动的人员',6,'2012-01-01 15:50:27','a098d6c8-f181-11e0-8a53-00306701b527',1),('d8cd3da4-15fc-11e1-bb4e-000c295f9365','执行管理员','拥有活动内的普通管理权限',1,'2012-01-01 15:50:39','a098d6c8-f181-11e0-8a53-00306701b527',1);
/*!40000 ALTER TABLE `grouprole` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

