DROP USER IF EXISTS `__DB_USERNAME__`@`%`;
CREATE USER IF NOT EXISTS `__DB_USERNAME__`@`%` IDENTIFIED BY '__DB_PASSWORD__';
CREATE DATABASE IF NOT EXISTS `__DB_DATABASE__`;
CREATE DATABASE IF NOT EXISTS `__DB_DATABASE___testing`;
GRANT ALL ON `__DB_DATABASE__`.* TO `__DB_USERNAME__`@`%`;
GRANT ALL ON `__DB_DATABASE___testing`.* TO `__DB_USERNAME__`@`%`;
