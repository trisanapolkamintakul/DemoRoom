CREATE TABLE IF NOT EXISTS `HYPERIOD` (
  `HYPERIODID` int(100) NOT NULL AUTO_INCREMENT,
  `HYPERIODNAME` varchar(30) NOT NULL,
  `HYPERIODDATE` date NOT NULL,
  `HYPERIODPRICE2` decimal(60,5)   NULL,
  `HYPERIODPRICE3` decimal(60,5)   NULL,
  PRIMARY KEY (`HYPERIODID`),
  UNIQUE KEY `LOGIN` (`HYPERIODDATE`)
);