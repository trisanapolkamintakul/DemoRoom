CREATE TABLE IF NOT EXISTS `HYORDERHEADER` (
  `HYORDHID` int(100) NOT NULL AUTO_INCREMENT,
  `HYPERIODID` int(100) NOT NULL,
  `HYORDHNAME` varchar(30) NOT NULL,
  `HYORDHTOTALPRICE` decimal(60,5)   NULL,
  PRIMARY KEY (`HYORDHID`)
);