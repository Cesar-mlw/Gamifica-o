-- AREA TABLE

INSERT INTO AREA (nome_area) VALUES ("Games");
INSERT INTO AREA (nome_area) VALUES ("BI");
INSERT INTO AREA (nome_area) VALUES ("Dev");
INSERT INTO AREA (nome_area) VALUES ("Inovação Tecnológica");

-- ACHIEVEMENT TABLE

INSERT INTO achievement (nome_achievement, descricao_achievement, id_area) VALUES ("ACHIEVEMENT TESTE", "DONE SOME WEIRD SHIT ON THE PLATFORM LIKE A BACKFLIP OR SOMETHING WHOLESOME", 1);
INSERT INTO achievement (nome_achievement, descricao_achievement, id_area) VALUES ("ACHIEVEMENT TESTE2", "DONE MORE WEIRD SHIT LIKE PET A DOG OR EAT A GOGURT", 3);
INSERT INTO achievement (nome_achievement, descricao_achievement, id_area) VALUES ("ACHIEVEMENT TESTE3", "FAZER A PIADA DO BERIMBAU COM O MAURO", 2);
INSERT INTO achievement (nome_achievement, descricao_achievement, id_area) VALUES ("ACHIEVEMENT TESTE4", "CUSPIR CÓDIGO ATÉ SEUS DEDOS NÃO AGUENTAREM MAIS. RADICAL!!!", 3);

-- CURSO TABLE

INSERT INTO CURSO (nome_curso) VALUES ("TECH");
INSERT INTO CURSO (nome_curso) VALUES ("Publicidade e Propaganda");
INSERT INTO CURSO (nome_curso) VALUES ("Ciências Sociais");
INSERT INTO CURSO (nome_curso) VALUES ("Design");

-- ITEM TABLE

INSERT INTO ITEM (nome_item, img_url_item) VALUES ("Lâmpada Super legal", "https://www.spacejam.com/archive/spacejam/movie/jam.htm");
INSERT INTO ITEM (nome_item, img_url_item) VALUES ("Boal de basquete", "https://www.spacejam.com/archive/spacejam/movie/jam.htm2");
INSERT INTO ITEM (nome_item, img_url_item) VALUES ("Pintura da GlADOS", "https://www.spacejam.com/archive/spacejam/movie/jam.htm3");
INSERT INTO ITEM (nome_item, img_url_item) VALUES ("Fita de NES do Shaq-Fu", "https://www.spacejam.com/archive/spacejam/movie/jam.htm4");

-- TIPO_PROJETO TABLE

INSERT INTO tipo_projeto (nome_tipo_projeto, pontos_tipo_projeto) VALUES ("NAEC", 100);
INSERT INTO tipo_projeto (nome_tipo_projeto, pontos_tipo_projeto) VALUES ("Matéria 36H", 50);
INSERT INTO tipo_projeto (nome_tipo_projeto, pontos_tipo_projeto) VALUES ("Matéria 72H", 100);
INSERT INTO tipo_projeto (nome_tipo_projeto, pontos_tipo_projeto) VALUES ("Palestras", 15);
INSERT INTO tipo_projeto (nome_tipo_projeto, pontos_tipo_projeto) VALUES ("PIC", 15);
INSERT INTO tipo_projeto (nome_tipo_projeto, pontos_tipo_projeto) VALUES ("Conclusão Semestral", 15);

-- TIPO_HABILIDADE TABLE

INSERT INTO tipo_habilidade (nome_tipo_habilidade) VALUES ("Idioma");
INSERT INTO tipo_habilidade (nome_tipo_habilidade) VALUES ("Instrumento");
INSERT INTO tipo_habilidade (nome_tipo_habilidade) VALUES ("Linguagem");
INSERT INTO tipo_habilidade (nome_tipo_habilidade) VALUES ("Arquitetura");
INSERT INTO tipo_habilidade (nome_tipo_habilidade) VALUES ("Framework");

-- USUARIO TABLE

INSERT INTO usuario(ra_usuario, id_curso, nome_usuario, email_usuario, pontos_totais, dt_entrada_usuario, senha_usuario) VALUES (11710370, 1, "Cesar Moura Leite Westphal", "cesarmlwestphal@acad.espm.br", null, "2017/02/01", "Heeloo");
INSERT INTO usuario(ra_usuario, id_curso, nome_usuario, email_usuario, pontos_totais, dt_entrada_usuario, senha_usuario) VALUES (11710371, 1, "Flávio Marques Azevedo", "fmarques@acad.espm.br", null, "2018/02/01", "Heeloo");
INSERT INTO usuario(ra_usuario, id_curso, nome_usuario, email_usuario, pontos_totais, dt_entrada_usuario, senha_usuario) VALUES (11710372, 1, "Carlos Rafael", "crafael@acad.espm.br", null, "2017/06/01", "Heeloo");

-- ITEM_USUARIO TABLE
-- Usuário de RA = 11710372 não possui itens
INSERT INTO item_usuario(ra_usuario, id_item, dt_item) VALUES (11710370, 1, "2018/02/01");
INSERT INTO item_usuario(ra_usuario, id_item, dt_item) VALUES (11710371, 2, "2019/05/15");
INSERT INTO item_usuario(ra_usuario, id_item, dt_item) VALUES (11710371, 3, "2018/08/15");

-- ACHIEVEMENT_USUARIO TABLE
-- Usuário de RA = 11710372 não possui achievements
INSERT INTO achievement_usuario (id_achievement, ra_usuario, dt_achievement) VALUES (4, 11710370, "2017/09/15");    
INSERT INTO achievement_usuario (id_achievement, ra_usuario, dt_achievement) VALUES (2  , 11710371, "2018/07/15");    
INSERT INTO achievement_usuario (id_achievement, ra_usuario, dt_achievement) VALUES (3, 11710371, "2019/02/15");

-- HABILIDADE TABLE
-- Usuário de RA = 11710372 não possui habildades
INSERT INTO habilidade (nome_habilidade, range_habilidade, ra_usuario, id_tipo_habilidade) VALUES ("Javascript", 52.5, 11710370, 3);
INSERT INTO habilidade (nome_habilidade, range_habilidade, ra_usuario, id_tipo_habilidade) VALUES ("R", 52.5, 11710371, 3);
INSERT INTO habilidade (nome_habilidade, range_habilidade, ra_usuario, id_tipo_habilidade) VALUES ("Python", 52.5, 11710370, 3);

-- PROJETO TABLE
-- Usuário de RA = 11710372 não possui Projetos
INSERT INTO projeto (id_tipo_projeto, ra_usuario, id_area, dt_comeco_projeto, terminado_projeto, nome_projeto, descricao_projeto, dt_termino_projeto) VALUES (3, 11710371, 2, "2018/02/01", true, "Banco de Dados Avançado", "Matéria ministrada pelo Professor Surian","2018/06/30");
INSERT INTO projeto (id_tipo_projeto, ra_usuario, id_area, dt_comeco_projeto, terminado_projeto, nome_projeto, descricao_projeto, dt_termino_projeto) VALUES (6, 11710371, 3, "2018/08/01", true, "Conclusão semestral", "Semestre 2018.2 concluído", "2019/02/01");
INSERT INTO projeto (id_tipo_projeto, ra_usuario, id_area, dt_comeco_projeto, terminado_projeto, nome_projeto, descricao_projeto, dt_termino_projeto) VALUES (5, 11710370, 1, "2019/08/01", false, "IDTech: Gamificação aplicada ao ensino superior", "Projeto de Iniciação científica orientado por Matheus Matsuda Marangoni", null);


-- SELECTS ALL TABLES
select * from achievement; 
select * from achievement_usuario; 
select * from area;
select * from curso;
select * from habilidade; 
select * from item; -- 
select * from item_usuario; --
select * from projeto;
select * from tipo_habilidade;
select * from tipo_projeto;
select * from usuario;
