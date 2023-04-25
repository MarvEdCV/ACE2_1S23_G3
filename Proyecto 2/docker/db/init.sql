/* CREAR LA BASE DE DATOS SI NO EXISTE */
CREATE DATABASE IF NOT EXISTS `emqx` DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci;
USE `emqx`;

/* CREAR LA TABLA MQTT USER */
CREATE TABLE `mqtt_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `salt` varchar(35) DEFAULT NULL,
  `is_superuser` tinyint(1) DEFAULT 0,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mqtt_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/* INSERTAR USUARIOS */
INSERT INTO `mqtt_user` ( `username`, `password`, `salt`, `is_superuser`, `created`) VALUES
('supersu', 'efa1f375d76194fa51a3556a97e641e61685f914d446979da50a551a4333ffd7', NULL, 1, NOW()),
('backend', 'efa1f375d76194fa51a3556a97e641e61685f914d446979da50a551a4333ffd7', NULL, 0, NOW()),
('device', 'efa1f375d76194fa51a3556a97e641e61685f914d446979da50a551a4333ffd7', NULL, 0, NOW()),
('frontend', 'efa1f375d76194fa51a3556a97e641e61685f914d446979da50a551a4333ffd7', NULL, 0, NOW());

/* CREAR TABLA DE REGLAS ACL */
CREATE TABLE `mqtt_acl` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `allow` int(1) DEFAULT 1 COMMENT '0: deny, 1: allow',
  `ipaddr` varchar(60) DEFAULT NULL COMMENT 'IpAddress',
  `username` varchar(100) DEFAULT NULL COMMENT 'Username',
  `clientid` varchar(100) DEFAULT NULL COMMENT 'ClientId',
  `access` int(2) NOT NULL COMMENT '1: subscribe, 2: publish, 3: pubsub',
  `topic` varchar(100) NOT NULL DEFAULT '' COMMENT 'Topic Filter',
  PRIMARY KEY (`id`),
  INDEX (ipaddr),
  INDEX (username),
  INDEX (clientid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/* INSERTAR REGLAS POR DEFECTO EN MQTT_ACL */
INSERT INTO mqtt_acl (allow, ipaddr, username, clientid, access, topic) 
VALUES 
    (0, NULL, '$all', NULL, 1, '$SYS/#'),
    (0, '10.59.1.100', NULL, NULL, 1, '$SYS/#'),
    (1, NULL, 'backend', NULL, 3, 'backend/status'),
    (1, NULL, 'backend', NULL, 3, 'device/#'),
    (1, NULL, 'backend', NULL, 3, 'frontend/#'),
    (1, NULL, 'frontend', NULL, 3, '%u/#'),
    (1, NULL, 'device', NULL, 3, '%u/#');

/* CREAR TABLA DISPOSITIVOS */
CREATE TABLE `device_temp_1` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `device` VARCHAR(255) DEFAULT NULL,
  `name` VARCHAR(255) DEFAULT NULL,
  `data` VARCHAR(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/* INSERTAR DISPOSITIVOS */
INSERT INTO device_temp_1 (`device`, `name`, `data`, `created`) VALUES 
('dispositivo-001', 'temp1', '12.54', NOW());

/* CREAR TABLA DISPOSITIVOS */
CREATE TABLE `device_temp_2` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `device` VARCHAR(255) DEFAULT NULL,
  `name` VARCHAR(255) DEFAULT NULL,
  `data` VARCHAR(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/* INSERTAR DISPOSITIVOS */
INSERT INTO device_temp_2 (`device`, `name`, `data`, `created`) VALUES 
('dispositivo-001', 'temp2', '22.54', NOW());

/* CREAR TABLA DISPOSITIVOS */
CREATE TABLE `device_hum_1` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `device` VARCHAR(255) DEFAULT NULL,
  `name` VARCHAR(255) DEFAULT NULL,
  `data` VARCHAR(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/* INSERTAR DISPOSITIVOS */
INSERT INTO device_hum_1 (`device`, `name`, `data`, `created`) VALUES 
('dispositivo-001', 'hum1', '100', NOW());

/* CREAR TABLA DISPOSITIVOS */
CREATE TABLE `device_dist_1` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `device` VARCHAR(255) DEFAULT NULL,
  `name` VARCHAR(255) DEFAULT NULL,
  `data` VARCHAR(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/* INSERTAR DISPOSITIVOS */
INSERT INTO device_dist_1 (`device`, `name`, `data`, `created`) VALUES 
('dispositivo-001', 'dist1', '100', NOW());

CREATE TABLE `device_bomba` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `device` VARCHAR(255) DEFAULT NULL,
  `name` VARCHAR(255) DEFAULT NULL,
  `data` VARCHAR(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/* INSERTAR DISPOSITIVOS */
INSERT INTO device_bomba (`device`, `name`, `data`, `created`) VALUES 
('dispositivo-001', 'bomba', '0', NOW());