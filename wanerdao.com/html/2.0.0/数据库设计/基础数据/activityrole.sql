
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
DROP TABLE IF EXISTS `activityrole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activityrole` (
  `id` varchar(40) NOT NULL,
  `role_name` varchar(60) NOT NULL,
  `description` varchar(200) NOT NULL,
  `level` int(11) NOT NULL,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `language_id` varchar(40) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='活动角色列表，基础表，记录支持的角色类型，比如超级管理员，执行管理员，财务员等';
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `activityrole` WRITE;
/*!40000 ALTER TABLE `activityrole` DISABLE KEYS */;
INSERT INTO `activityrole` VALUES ('519efc1c-5a44-11e1-956c-101f74b66417','Super administrator','Founder, Highest priority, except general administrator\'s function, hire and lay off',0,'2012-02-18 15:22:07','a1c3e20e-f181-11e0-8a53-00306701b527',1),('51a3f90d-5a44-11e1-956c-101f74b66417','General administrator','General manage function',1,'2012-02-18 15:22:07','a1c3e20e-f181-11e0-8a53-00306701b527',1),('51a576df-5a44-11e1-956c-101f74b66417','Cashier','Manage cash flow function',2,'2012-02-18 15:22:07','a1c3e20e-f181-11e0-8a53-00306701b527',1),('51a7d57f-5a44-11e1-956c-101f74b66417','Accountant','Manage book balance function',3,'2012-02-18 15:22:07','a1c3e20e-f181-11e0-8a53-00306701b527',1),('51aa14da-5a44-11e1-956c-101f74b66417','Treasurer','Both cashier and accountant function',4,'2012-02-18 15:22:07','a1c3e20e-f181-11e0-8a53-00306701b527',1),('51ac37b5-5a44-11e1-956c-101f74b66417','Inspector','Inspect all money relative operation',5,'2012-02-18 15:22:07','a1c3e20e-f181-11e0-8a53-00306701b527',1),('51ae4d52-5a44-11e1-956c-101f74b66417','General Staff','General staff',6,'2012-02-18 15:22:07','a1c3e20e-f181-11e0-8a53-00306701b527',1),('86715257-15fd-11e1-bb4e-000c295f9365','财务员','拥有出纳和会计的双重权限',4,'2012-01-04 15:12:24','a098d6c8-f181-11e0-8a53-00306701b527',1),('867e7daf-15fd-11e1-bb4e-000c295f9365','超级管理员','创建人，拥有最高权限，除了执行管理员权限以外，可以增，删执行管理员，解散活动',0,'2012-01-04 15:11:32','a098d6c8-f181-11e0-8a53-00306701b527',1),('8682b6c9-15fd-11e1-bb4e-000c295f9365','出纳员','管理货比资金的权限',2,'2012-01-04 15:12:02','a098d6c8-f181-11e0-8a53-00306701b527',1),('86870ea5-15fd-11e1-bb4e-000c295f9365','会计员','管理账务的操作权限',3,'2012-01-04 15:12:14','a098d6c8-f181-11e0-8a53-00306701b527',1),('868de60f-15fd-11e1-bb4e-000c295f9365','普通人员','普通参加活动的人员',6,'2012-01-04 15:12:45','a098d6c8-f181-11e0-8a53-00306701b527',1),('8695ffad-15fd-11e1-bb4e-000c295f9365','审计员','对金钱所有相关操作进行审计权限',5,'2012-01-04 15:12:34','a098d6c8-f181-11e0-8a53-00306701b527',1),('869d272f-15fd-11e1-bb4e-000c295f9365','执行管理员','拥有活动内的普通管理权限',1,'2012-01-04 15:11:51','a098d6c8-f181-11e0-8a53-00306701b527',1);
/*!40000 ALTER TABLE `activityrole` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

