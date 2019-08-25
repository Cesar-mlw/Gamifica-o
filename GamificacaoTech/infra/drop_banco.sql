ALTER TABLE `Usuario` DROP FOREIGN KEY `Usuario_fk0`;

ALTER TABLE `Projeto` DROP FOREIGN KEY `Projeto_fk0`;

ALTER TABLE `Projeto` DROP FOREIGN KEY `Projeto_fk1`;

ALTER TABLE `Projeto` DROP FOREIGN KEY `Projeto_fk2`;

ALTER TABLE `Item_Usuario` DROP FOREIGN KEY `Item_Usuario_fk0`;

ALTER TABLE `Item_Usuario` DROP FOREIGN KEY `Item_Usuario_fk1`;

ALTER TABLE `Habilidade` DROP FOREIGN KEY `Habilidade_fk0`;

ALTER TABLE `Habilidade` DROP FOREIGN KEY `Habilidade_fk1`;

ALTER TABLE `Achievement_Usuario` DROP FOREIGN KEY `Achievement_Usuario_fk0`;

ALTER TABLE `Achievement_Usuario` DROP FOREIGN KEY `Achievement_Usuario_fk1`;

ALTER TABLE `Achievement` DROP FOREIGN KEY `Achievement_fk0`;

DROP TABLE IF EXISTS `Usuario`;

DROP TABLE IF EXISTS `Curso`;

DROP TABLE IF EXISTS `Projeto`;

DROP TABLE IF EXISTS `Item_Usuario`;

DROP TABLE IF EXISTS `Item`;

DROP TABLE IF EXISTS `Habilidade`;

DROP TABLE IF EXISTS `Achievement_Usuario`;

DROP TABLE IF EXISTS `Achievement`;

DROP TABLE IF EXISTS `Area`;

DROP TABLE IF EXISTS `Tipo_Projeto`;

DROP TABLE IF EXISTS `Tipo_Habilidade`;
