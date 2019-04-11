CREATE DATABASE wallet;

USE wallet;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `wallet`;
CREATE TABLE `wallet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(100) NOT NULL,
  `publickey` varchar(100) NOT NULL,
  `privatekey` varchar(100) NOT NULL,
  `userid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);
