CREATE TABLE `Usuario` (
	`ra_usuario` bigint NOT NULL UNIQUE,
	`id_curso` int NOT NULL,
	`nome_usuario` char(90) NOT NULL,
	`email_usuario` char(60) NOT NULL,
	`pontos_totais` FLOAT,
	`dt_entrada_usuario` DATE NOT NULL,
	`senha_usuario` char(250) NOT NULL,
	PRIMARY KEY (`ra_usuario`)
);

CREATE TABLE `Curso` (
	`id_curso` int NOT NULL AUTO_INCREMENT,
	`nome_curso` char(45) NOT NULL,
	PRIMARY KEY (`id_curso`)
);

CREATE TABLE `Projeto` (
	`id_projeto` bigint NOT NULL AUTO_INCREMENT,
	`id_tipo_projeto` int NOT NULL,
	`ra_usuario` bigint NOT NULL,
	`id_area` int NOT NULL,
	`dt_comeco_projeto` DATE NOT NULL,
	`terminado_projeto` bool NOT NULL,
	`nome_projeto` char(150) NOT NULL,
	`descricao_projeto` char(250) NOT NULL,
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
	`nome_item` char(45) NOT NULL,
	`img_url_item` char(150) NOT NULL UNIQUE,
	PRIMARY KEY (`id_item`)
);

CREATE TABLE `Habilidade` (
	`id_habilidade` bigint NOT NULL AUTO_INCREMENT,
	`nome_habilidade` char(100) NOT NULL,
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
	`nome_achievement` char(90) NOT NULL,
	`descricao_achievement` char(250) NOT NULL,
	PRIMARY KEY (`id_achievement`)
);

CREATE TABLE `Area` (
	`id_area` int NOT NULL AUTO_INCREMENT,
	`nome_area` char(45) NOT NULL,
	PRIMARY KEY (`id_area`)
);

CREATE TABLE `Tipo_Projeto` (
	`id_tipo_projeto` int NOT NULL AUTO_INCREMENT,
	`nome_tipo_projeto` char(100) NOT NULL,
	`pontos_tipo_projeto` FLOAT NOT NULL,
	PRIMARY KEY (`id_tipo_projeto`)
);

CREATE TABLE `Tipo_Habilidade` (
	`id_tipo_habilidade` int NOT NULL AUTO_INCREMENT,
	`nome_tipo_habilidade` char(100) NOT NULL,
	PRIMARY KEY (`id_tipo_habilidade`)
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
