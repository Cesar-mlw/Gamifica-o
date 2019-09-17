CREATE TABLE `Usuario` (
	`ra_usuario` bigint NOT NULL UNIQUE,
	`id_curso` int NOT NULL,
	`nome_usuario` varchar(90) NOT NULL,
	`email_usuario` varchar(60) NOT NULL,
	`pontos_totais` FLOAT,
	`dt_entrada_usuario` DATE NOT NULL,
	`senha_usuario` varchar(250) NOT NULL,
	`isAdmin` BOOLEAN NOT NULL,
	PRIMARY KEY (`ra_usuario`)
);

CREATE TABLE `Curso` (
	`id_curso` int NOT NULL AUTO_INCREMENT,
	`nome_curso` varchar(45) NOT NULL,
	PRIMARY KEY (`id_curso`)
);

CREATE TABLE `Projeto` (
	`id_projeto` bigint NOT NULL AUTO_INCREMENT,
	`id_tipo_projeto` int NOT NULL,
	`ra_usuario` bigint NOT NULL,
	`id_area` int NOT NULL,
	`dt_comeco_projeto` DATE NOT NULL,
	`terminado_projeto` bool NOT NULL,
	`nome_projeto` varchar(150) NOT NULL,
	`descricao_projeto` varchar(250) NOT NULL,
	`dt_termino_projeto` DATE,
	PRIMARY KEY (`id_projeto`)
);

CREATE TABLE `Item_Usuario` (
	`id_item_usuario` int NOT NULL AUTO_INCREMENT,
	`ra_usuario` bigint NOT NULL,
	`id_item` int NOT NULL,
	`dt_item` DATE NOT NULL,
	PRIMARY KEY (`id_item_usuario`)
);

CREATE TABLE `Item` (
	`id_item` int NOT NULL AUTO_INCREMENT,
	`nome_item` varchar(45) NOT NULL,
	`img_url_item` varchar(150) NOT NULL UNIQUE,
	PRIMARY KEY (`id_item`)
);

CREATE TABLE `Habilidade` (
	`id_habilidade` bigint NOT NULL AUTO_INCREMENT,
	`nome_habilidade` varchar(100) NOT NULL,
	`range_habilidade` FLOAT NOT NULL,
	`ra_usuario` bigint NOT NULL,
	`id_tipo_habilidade` int,
	PRIMARY KEY (`id_habilidade`)
);

CREATE TABLE `Achievement_Usuario` (
	`id_achievement_usuario` int NOT NULL AUTO_INCREMENT,
	`id_achievement` int NOT NULL,
	`ra_usuario` bigint NOT NULL,
	`dt_achievement` DATE NOT NULL,
	PRIMARY KEY (`id_achievement_usuario`)
);

CREATE TABLE `Achievement` (
	`id_achievement` int NOT NULL AUTO_INCREMENT,
	`id_area` int NOT NULL,
	`nome_achievement` varchar(90) NOT NULL,
	`descricao_achievement` varchar(250) NOT NULL,
	PRIMARY KEY (`id_achievement`)
);

CREATE TABLE `Area` (
	`id_area` int NOT NULL AUTO_INCREMENT,
	`nome_area` varchar(45) NOT NULL,
	PRIMARY KEY (`id_area`)
);

CREATE TABLE `Tipo_Projeto` (
	`id_tipo_projeto` int NOT NULL AUTO_INCREMENT,
	`nome_tipo_projeto` varchar(100) NOT NULL,
	`pontos_tipo_projeto` FLOAT NOT NULL,
	PRIMARY KEY (`id_tipo_projeto`)
);

CREATE TABLE `Tipo_Habilidade` (
	`id_tipo_habilidade` int NOT NULL AUTO_INCREMENT,
	`nome_tipo_habilidade` varchar(100) NOT NULL,
	PRIMARY KEY (`id_tipo_habilidade`)
);

CREATE TABLE `Links` (
	`id_link` int NOT NULL AUTO_INCREMENT,
	`titulo_link` int NOT NULL,
	`txt_link` varchar(255) NOT NULL,
	`ra_usuario` bigint NOT NULL,
	PRIMARY KEY (`id_link`)
);

CREATE TABLE `Titulo_Link` (
	`id_titulo_link` int NOT NULL AUTO_INCREMENT,
	`nome_titulo_link` varchar(150) NOT NULL,
	PRIMARY KEY (`id_titulo_link`)
);

ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_fk0` FOREIGN KEY (`id_curso`) REFERENCES `Curso`(`id_curso`);

ALTER TABLE `Projeto` ADD CONSTRAINT `Projeto_fk0` FOREIGN KEY (`id_tipo_projeto`) REFERENCES `Tipo_Projeto`(`id_tipo_projeto`);

ALTER TABLE `Projeto` ADD CONSTRAINT `Projeto_fk1` FOREIGN KEY (`ra_usuario`) REFERENCES `Usuario`(`ra_usuario`);

ALTER TABLE `Projeto` ADD CONSTRAINT `Projeto_fk2` FOREIGN KEY (`id_area`) REFERENCES `Area`(`id_area`);

ALTER TABLE `Item_Usuario` ADD CONSTRAINT `Item_Usuario_fk0` FOREIGN KEY (`ra_usuario`) REFERENCES `Usuario`(`ra_usuario`);

ALTER TABLE `Item_Usuario` ADD CONSTRAINT `Item_Usuario_fk1` FOREIGN KEY (`id_item`) REFERENCES `Item`(`id_item`);

ALTER TABLE `Habilidade` ADD CONSTRAINT `Habilidade_fk0` FOREIGN KEY (`ra_usuario`) REFERENCES `Usuario`(`ra_usuario`);

ALTER TABLE `Habilidade` ADD CONSTRAINT `Habilidade_fk1` FOREIGN KEY (`id_tipo_habilidade`) REFERENCES `Tipo_Habilidade`(`id_tipo_habilidade`);

ALTER TABLE `Achievement_Usuario` ADD CONSTRAINT `Achievement_Usuario_fk0` FOREIGN KEY (`id_achievement`) REFERENCES `Achievement`(`id_achievement`);

ALTER TABLE `Achievement_Usuario` ADD CONSTRAINT `Achievement_Usuario_fk1` FOREIGN KEY (`ra_usuario`) REFERENCES `Usuario`(`ra_usuario`);

ALTER TABLE `Achievement` ADD CONSTRAINT `Achievement_fk0` FOREIGN KEY (`id_area`) REFERENCES `Area`(`id_area`);

ALTER TABLE `Links` ADD CONSTRAINT `Links_fk0` FOREIGN KEY (`titulo_link`) REFERENCES `Titulo_Link`(`id_titulo_link`);

ALTER TABLE `Links` ADD CONSTRAINT `Links_fk1` FOREIGN KEY (`ra_usuario`) REFERENCES `Usuario`(`ra_usuario`);






