-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 
-- Server version: 5.6.16
-- PHP Version: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `appspringboot`
--

-- --------------------------------------------------------

--
-- โครงสร้างตาราง `employee`
--

CREATE TABLE IF NOT EXISTS `EMPLOYEE` (
  `ID` int(100) NOT NULL AUTO_INCREMENT,
  `USERNAME` varchar(30) NOT NULL,
  `PASSWORD` varchar(20) NOT NULL,
  `ROLE` varchar(10) NOT NULL,
  `CREATE_USER` varchar(10) NOT NULL,
  `CREATE_DATE` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `UPDATE_USER` varchar(10) NOT NULL,
  `UPDATE_DATE` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`ID`),
  UNIQUE KEY `USERNAME` (`USERNAME`,`PASSWORD`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- dump ตาราง `employee`
--

INSERT INTO `EMPLOYEE` (`ID`, `USERNAME`, `PASSWORD`, `ROLE`, `CREATE_USER`, `CREATE_DATE`, `UPDATE_USER`, `UPDATE_DATE`) VALUES
(1, 'user', '1111', 'USER', 'admin', '2015-08-06 10:41:47.245609', 'admin', '0000-00-00 00:00:00.000000');

-- --------------------------------------------------------

--
-- โครงสร้างตาราง `item`
--

CREATE TABLE IF NOT EXISTS `ITEM` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `STOREID` int(10) NOT NULL,
  `CODE` varchar(20) NOT NULL,
  `NAME` varchar(30) NOT NULL,
  `PRICE` decimal(10,0) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `STOREID` (`STOREID`,`CODE`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- dump ตาราง `item`
--

INSERT INTO `ITEM` (`ID`, `STOREID`, `CODE`, `NAME`, `PRICE`) VALUES
(1, 1, '000001', 'Pad Thai', '50'),
(2, 2, '000002', 'Omlage', '66'),
(3, 4, '000003', 'Mouse', '170'),
(4, 1, '000003', 'Computer', '25000');

-- --------------------------------------------------------

--
-- โครงสร้างตาราง `store`
--

CREATE TABLE IF NOT EXISTS `STORE` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `CODE` varchar(20) NOT NULL,
  `NAME` varchar(30) NOT NULL,
  `USERNAME` varchar(30) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `CODE` (`CODE`,`USERNAME`),
  KEY `CODE_2` (`CODE`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- dump ตาราง `store`
--

INSERT INTO `STORE` (`ID`, `CODE`, `NAME`, `USERNAME`) VALUES
(1, '000', 'BIG C', 'user'),
(2, '001', 'AEON', 'user'),
(4, '002', 'Lotus', 'user');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
