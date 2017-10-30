CREATE DATABASE  IF NOT EXISTS `demo_res_room` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `demo_res_room`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: demo_res_room
-- ------------------------------------------------------
-- Server version	5.6.21-log

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

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room` (
  `RMID` int(11) NOT NULL AUTO_INCREMENT,
  `RMCode` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `RMType` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `RMName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `RMDetail` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `RMLocation` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `RMAmountAttend` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `RMActive` int(2) DEFAULT NULL COMMENT '0 = inactive\n1 = active\n',
  `CREATE_DATE` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CREATE_USER` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `UPDATE_DATE` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `UPDATE_USER` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`RMID`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (14,'SR202','Study Room','C2-202','For study','C2','20 ',NULL,'2017-10-25 15:46:24.918','admin','2017-10-26 13:09:55.82','admin'),(15,'MR103','Meeting Room','S7-103','For meeting','S7','25',NULL,'2017-10-25 15:46:48.804','admin','2017-10-26 13:09:55.854','admin'),(20,'AR101','Activity Room','C5-101','For doing activity','C5','40',NULL,'2017-10-25 14:02:35.677','admin','2017-10-26 13:09:55.869','admin'),(24,'MR101','Meeting Room','D1-101','For meeting','D1','30',NULL,'2017-10-25 16:37:07.567','admin','2017-10-26 13:09:55.883','admin'),(25,'SR223','Study Room','C2-223','For study','C2','25',NULL,'2017-10-24 22:11:14.328','admin','2017-10-26 13:09:55.895','admin'),(26,'MR102','Meeting Room','D1-102','For meeting','D1','20',NULL,'2017-10-24 22:18:23.41','admin','2017-10-26 13:09:55.906','admin'),(27,'MR104','Study Room','D1-104','For meeting','D1','20',NULL,'2017-10-24 22:21:13.993','admin','2017-10-26 13:09:55.925','admin');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-26 15:58:02
