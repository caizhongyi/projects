
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
DROP TABLE IF EXISTS `timezone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `timezone` (
  `id` varchar(40) NOT NULL,
  `zone_name` varchar(60) NOT NULL,
  `time_diff` varchar(40) NOT NULL,
  `description` varchar(300) NOT NULL,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='全球时区表，基础表';
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `timezone` WRITE;
/*!40000 ALTER TABLE `timezone` DISABLE KEYS */;
INSERT INTO `timezone` VALUES ('d2299f7e-1522-11e1-b7d1-000c295f9365','UTC','','Casablanca, Dublin, Edinburgh, Lisbon, London, Monrovia, Reykjavik','2011-11-22 15:57:39',1),('d26afb0d-1522-11e1-b7d1-000c295f9365','UTC+01:00','+01:00','Amesterdam, Berlin, Bern, Rome, Stockholm, Vienna, Belgrade, Bratislava, Budapest, Ljubljana, Prague, Brussels, Copenhagen, Madrid, Paris, Sarajevo, Skopje, Warsaw, Zagreb, West Central Africa, Windhoek','2011-11-22 15:57:40',1),('d27ba3c7-1522-11e1-b7d1-000c295f9365','UTC+02:00','+02:00','Amman, Athens, Bucharest, Beirut, Cairo, Damascus, Harare, Pretoria, Helsinki, kyiv, Riga, Sofia, Talinn, Vilnius, Istanbul, Jerusalem, Minsk','2011-11-22 15:57:40',1),('d2cb8bf5-1522-11e1-b7d1-000c295f9365','UTC+03:00','+03:00','Baghdad, Kaliningrad, Kuwait, Riyadh, Nairobi','2011-11-22 15:57:40',1),('d2d75e5f-1522-11e1-b7d1-000c295f9365','UTC+03:30','+03:30','Tehran','2011-11-22 15:57:40',1),('d2e093c6-1522-11e1-b7d1-000c295f9365','UTC+04:00','+04:00','Abu, Dhabi, Muscat, Baku, Moscow, St.Petersburg, Volgograd, Port Louis, Tbilisi, Verevan','2011-11-22 15:57:40',1),('d2ee1191-1522-11e1-b7d1-000c295f9365','UTC+04:30','+04:30','Kabul','2011-11-22 15:57:41',1),('d2fd3d18-1522-11e1-b7d1-000c295f9365','UTC+05:00','+05:00','Islamabad, Karachi, Tashkent','2011-11-22 15:57:41',1),('d313ef10-1522-11e1-b7d1-000c295f9365','UTC+05:30','+05:30','Chennai, Kolkata, Mumbai, New Delhi, Sri Jayawardenepura','2011-11-22 15:57:41',1),('d36ddb70-1522-11e1-b7d1-000c295f9365','UTC+05:45','+05:45','Kathmandu','2011-11-22 15:57:41',1),('d37e0eb0-1522-11e1-b7d1-000c295f9365','UTC+06:00','+06:00','Astana, Dhaka, Ekaterinburg','2011-11-22 15:57:41',1),('d38d2a7f-1522-11e1-b7d1-000c295f9365','UTC+06:30','+06:30','Yangon(Rangoon)','2011-11-22 15:57:42',1),('d39a3165-1522-11e1-b7d1-000c295f9365','UTC+07:00','+07:00','Bangkok, Hanoi, Jakarta, Novosibirsk','2011-11-22 15:57:42',1),('d3a8a5a4-1522-11e1-b7d1-000c295f9365','UTC+08:00','+08:00','Beijing, Chongqing, Hong Kong, Urumqi, Krasnoyarsk, Kuala Lumpur, Singapore, Perth, Taipei, Ulaanbaatar','2011-11-22 15:57:42',1),('d3fb2f04-1522-11e1-b7d1-000c295f9365','UTC+09:00','+09:00','Irkutsk, Osaka, Sapporo, Tokyo, Seoul','2011-11-22 15:57:42',1),('d407dd7e-1522-11e1-b7d1-000c295f9365','UTC+09:30','+09:30','Adelaide, Darwin','2011-11-22 15:57:42',1),('d4175cbf-1522-11e1-b7d1-000c295f9365','UTC+10:00','+10:00','Brisbane, Canberra, Melbourne, Sydney, Guam, Port Moresby, Hobart, Yakutsk','2011-11-22 15:57:42',1),('d42567b2-1522-11e1-b7d1-000c295f9365','UTC+11:00','+11:00','Solomon Is., New Caledonia, Vladivostok','2011-11-22 15:57:43',1),('d433cc35-1522-11e1-b7d1-000c295f9365','UTC+12:00','+12:00','Auckland, Wellington, Fiji','2011-11-22 15:57:43',1),('d44bac13-1522-11e1-b7d1-000c295f9365','UTC+13:00','+13:00','Nuku\'alofa','2011-11-22 15:57:43',1),('d5385ab9-1522-11e1-b7d1-000c295f9365','UTC-01:00','-01:00','Azores, Cape Verde Is','2011-11-22 15:57:44',1),('d54ab9ea-1522-11e1-b7d1-000c295f9365','UTC-02:00','-02:00','Mid-Atlantic','2011-11-22 15:57:45',1),('d55b96b2-1522-11e1-b7d1-000c295f9365','UTC-03:00','-03:00','Brasilia, Buenos Aires, Cayenne, Fortaleza, Greenland, Montevideo','2011-11-22 15:57:45',1),('d56a8a8a-1522-11e1-b7d1-000c295f9365','UTC-03:30','-03:30','Newfoundland','2011-11-22 15:57:45',1),('d57f21a8-1522-11e1-b7d1-000c295f9365','UTC-04:00','-04:00','Asuncion, Atlantic Time(Canada), Cuiaba, Georgetown, La Paz, Manaus, San Juan, Santiago','2011-11-22 15:57:45',1),('d5c0b217-1522-11e1-b7d1-000c295f9365','UTC-04:30','-04:30','Caracas','2011-11-22 15:57:45',1),('d5cd4e6d-1522-11e1-b7d1-000c295f9365','UTC-05:00','-05:00','Bogota, Lima, Quito, Eastern Time(US & Canada), Indiana(East)','2011-11-22 15:57:45',1),('d5e30175-1522-11e1-b7d1-000c295f9365','UTC-06:00','-06:00','Central America, Central Time(US & Canada), Guadalajara, Mexico City, Monterrey, Saskatchewan','2011-11-22 15:57:45',1),('d5f52677-1522-11e1-b7d1-000c295f9365','UTC-07:00','-07:00','Arizona, Chihuahua, La Paz, Mazatlan, Mountain Time(US & Canada)','2011-11-22 15:57:46',1),('d60dd471-1522-11e1-b7d1-000c295f9365','UTC-08:00','-08:00','Baja California, Pacific Time(US & Canada)','2011-11-22 15:57:46',1),('d66b703a-1522-11e1-b7d1-000c295f9365','UTC-09:00','-09:00','Alaska','2011-11-22 15:57:46',1),('d67d556e-1522-11e1-b7d1-000c295f9365','UTC-10:00','-10:00','Hawaii','2011-11-22 15:57:47',1),('d68cd296-1522-11e1-b7d1-000c295f9365','UTC-11:00','-11:00','Samoa','2011-11-22 15:57:47',1),('d6a8f359-1522-11e1-b7d1-000c295f9365','UTC-12:00','-12:00','International Date Line West','2011-11-22 15:57:47',1);
/*!40000 ALTER TABLE `timezone` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

