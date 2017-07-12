
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
DROP TABLE IF EXISTS `processstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `processstatus` (
  `id` varchar(40) NOT NULL,
  `process_name` varchar(60) NOT NULL,
  `description` varchar(200) NOT NULL,
  `sequence` int(11) NOT NULL,
  `amount_seq` int(11) NOT NULL,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `language_id` varchar(40) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='处理进度信息表，基础表，每个求职者求职的状态信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `processstatus` WRITE;
/*!40000 ALTER TABLE `processstatus` DISABLE KEYS */;
INSERT INTO `processstatus` VALUES ('79d01f2f-5c99-11e1-b02d-101f74b66417','Submit application','From application submission to process beginning',1,7,'2012-02-21 14:36:44','a1c3e20e-f181-11e0-8a53-00306701b527',1),('79d4a3cc-5c99-11e1-b02d-101f74b66417','In transaction','From process beginning to on-site interview or cancelation',2,7,'2012-02-21 14:36:44','a1c3e20e-f181-11e0-8a53-00306701b527',1),('79d7855e-5c99-11e1-b02d-101f74b66417','First interview','First interview duration',3,7,'2012-02-21 14:36:44','a1c3e20e-f181-11e0-8a53-00306701b527',1),('79da6dbc-5c99-11e1-b02d-101f74b66417','Second interview','Second interview duration',4,7,'2012-02-21 14:36:44','a1c3e20e-f181-11e0-8a53-00306701b527',1),('79dd0642-5c99-11e1-b02d-101f74b66417','Third interview','Third interview duration',5,7,'2012-02-21 14:36:44','a1c3e20e-f181-11e0-8a53-00306701b527',1),('79dfe860-5c99-11e1-b02d-101f74b66417','Hiring process','HR prepare to hire',6,7,'2012-02-21 14:36:44','a1c3e20e-f181-11e0-8a53-00306701b527',1),('79e25e64-5c99-11e1-b02d-101f74b66417','Complete application','Complete application',7,7,'2012-02-21 14:36:44','a1c3e20e-f181-11e0-8a53-00306701b527',1),('79e4842d-5c99-11e1-b02d-101f74b66417','Cacncel application','Process cancelled',8,1,'2012-02-21 14:36:44','a1c3e20e-f181-11e0-8a53-00306701b527',1),('f076024d-1510-11e1-b7d1-000c295f9365','处理取消','申请取消状态',8,1,'2011-11-29 17:48:11','a098d6c8-f181-11e0-8a53-00306701b527',1),('f081843b-1510-11e1-b7d1-000c295f9365','处理中','开始处理到正式面试或者取消处理的时间段',2,7,'2011-11-29 17:48:11','a098d6c8-f181-11e0-8a53-00306701b527',1),('f08a545c-1510-11e1-b7d1-000c295f9365','第二轮面试','第二轮面试完整处理过程的时间段',4,7,'2011-11-29 17:48:11','a098d6c8-f181-11e0-8a53-00306701b527',1),('f0924917-1510-11e1-b7d1-000c295f9365','第三轮面试','第三轮面试完整处理过程的时间段',5,7,'2011-11-29 17:48:11','a098d6c8-f181-11e0-8a53-00306701b527',1),('f0992ad9-1510-11e1-b7d1-000c295f9365','第一轮面试','第一轮面试完整处理过程的时间段',3,7,'2011-11-29 17:48:11','a098d6c8-f181-11e0-8a53-00306701b527',1),('f0a192ec-1510-11e1-b7d1-000c295f9365','聘用处理','聘用处理过程的时间段',6,7,'2011-11-29 17:48:11','a098d6c8-f181-11e0-8a53-00306701b527',1),('f0af12de-1510-11e1-b7d1-000c295f9365','申请提交','用户提交申请到开始处理的时间段',1,7,'2011-11-29 17:48:11','a098d6c8-f181-11e0-8a53-00306701b527',1),('f0be9d33-1510-11e1-b7d1-000c295f9365','完成申请','完成申请状态',7,7,'2011-11-29 17:48:11','a098d6c8-f181-11e0-8a53-00306701b527',1);
/*!40000 ALTER TABLE `processstatus` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

