-- AREA TABLE

INSERT INTO area (nome_area) VALUES ("Games");
INSERT INTO area (nome_area) VALUES ("BI");
INSERT INTO area (nome_area) VALUES ("Dev");
INSERT INTO area (nome_area) VALUES ("Inovação Tecnológica");
INSERT INTO area (nome_area) VALUES ("Neutra");

-- CURSO TABLE

INSERT INTO curso (nome_curso) VALUES ("TECH");
INSERT INTO curso (nome_curso) VALUES ("Publicidade e Propaganda");
INSERT INTO curso (nome_curso) VALUES ("Ciências Sociais");
INSERT INTO curso (nome_curso) VALUES ("Design");

-- ITEM TABLE

INSERT INTO item (nome_item, img_url_item, preco_item, id_area) VALUES ("Lâmpada Super legal", "https://www.smashbros.com/wiiu-3ds/sp/images/character/kirby/main.png", 10, 5);
INSERT INTO item (nome_item, img_url_item, preco_item, id_area) VALUES ("Boal de basquete", "https://feliciagamingdiary.files.wordpress.com/2015/12/kirby.png", 10, 2);
INSERT INTO item (nome_item, img_url_item, preco_item, id_area) VALUES ("Pintura da GlADOS", "https://jogoveio.com.br/wp-content/uploads/2017/04/kirbys-dream-land-kirby-jogoveio.png", 10, 1);
INSERT INTO item (nome_item, img_url_item, preco_item, id_area) VALUES ("Fita de NES do Shaq-Fu", "https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Kirby.png/220px-Kirby.png", 10, 1);

-- TIPO_PROJETO TABLE

INSERT INTO tipo_projeto (nome_tipo_projeto, pontos_tipo_projeto) VALUES ("NAEC", 100);
INSERT INTO tipo_projeto (nome_tipo_projeto, pontos_tipo_projeto) VALUES ("Matéria 36H", 50);
INSERT INTO tipo_projeto (nome_tipo_projeto, pontos_tipo_projeto) VALUES ("Matéria 72H", 100);
INSERT INTO tipo_projeto (nome_tipo_projeto, pontos_tipo_projeto) VALUES ("Palestras", 15);
INSERT INTO tipo_projeto (nome_tipo_projeto, pontos_tipo_projeto) VALUES ("PIC", 15);
INSERT INTO tipo_projeto (nome_tipo_projeto, pontos_tipo_projeto) VALUES ("Conclusão Semestral", 15);

-- TIPO_HABILIDADE TABLE

INSERT INTO tipo_habilidade (nome_tipo_habilidade) VALUES ("Idioma");
INSERT INTO tipo_habilidade (nome_tipo_habilidade) VALUES ("Linguagem");
INSERT INTO tipo_habilidade (nome_tipo_habilidade) VALUES ("Metodologia");
INSERT INTO tipo_habilidade (nome_tipo_habilidade) VALUES ("Ferramenta");
INSERT INTO tipo_habilidade (nome_tipo_habilidade) VALUES ("Educação");
INSERT INTO tipo_habilidade (nome_tipo_habilidade) VALUES ("Experiência Profissional");

-- USUARIO TABLE

INSERT INTO usuario(ra_usuario, id_curso, nome_usuario, email_usuario, dt_entrada_usuario, senha_usuario, isAdmin, moedas_usuario) VALUES (11710370, 1, "Cesar Moura Leite Westphal", "cesarmlwestphal@acad.espm.br", "2017/02/01", "Heeloo", FALSE, 0);
INSERT INTO usuario(ra_usuario, id_curso, nome_usuario, email_usuario, dt_entrada_usuario, senha_usuario, isAdmin, moedas_usuario) VALUES (11710370, 1, "Flávio Marques Azevedo", "fmarques@acad.espm.br", "2018/02/01", "Heeloo", TRUE, 80.5);
INSERT INTO usuario(ra_usuario, id_curso, nome_usuario, email_usuario, dt_entrada_usuario, senha_usuario, isAdmin, moedas_usuario) VALUES (11710372, 1, "Carlos Rafael", "crafael@acad.espm.br", "2017/06/01", "Heeloo", TRUE, 32);

-- ITEM_USUARIO TABLE
-- Usuário de RA = 11710372 não possui itens
INSERT INTO item_usuario(ra_usuario, id_item, dt_item, cellx_item, celly_item, width, height, positioned_item) VALUES (11710370, 1, "2018/02/01", 0, 0, 2, 3, FALSE);
INSERT INTO item_usuario(ra_usuario, id_item, dt_item, cellx_item, celly_item, width, height, positioned_item) VALUES (11710370, 2, "2019/05/15", 0, 0, 2, 3, FALSE);
INSERT INTO item_usuario(ra_usuario, id_item, dt_item, cellx_item, celly_item, width, height, positioned_item) VALUES (11710370, 3, "2018/08/15", 0, 0, 2, 3, FALSE);
INSERT INTO item_usuario(ra_usuario, id_item, dt_item, cellx_item, celly_item, width, height, positioned_item) VALUES (11710370, 4, "2018/08/15", 0, 0, 2, 2, TRUE);

-- ACHIEVEMENT TABLE

INSERT INTO achievement (nome_achievement, criterio_achievement,descricao_achievement, id_area, id_tipo_projeto_achievement) VALUES ("ACHIEVEMENT TESTE", "05", "DONE SOME WEIRD SHIT ON THE PLATFORM LIKE A BACKFLIP OR SOMETHING WHOLESOME", 5, 1);
INSERT INTO achievement (nome_achievement, criterio_achievement,descricao_achievement, id_area, id_tipo_projeto_achievement) VALUES ("ACHIEVEMENT TESTE2", "10", "DONE MORE WEIRD SHIT LIKE PET A DOG OR EAT A GOGURT", 5, 2);
INSERT INTO achievement (nome_achievement, criterio_achievement,descricao_achievement, id_area, id_tipo_projeto_achievement) VALUES ("ACHIEVEMENT TESTE3", "15", "FAZER A PIADA DO BERIMBAU COM O MAURO", 5, 2);
INSERT INTO achievement (nome_achievement, criterio_achievement,descricao_achievement, id_area, id_tipo_projeto_achievement) VALUES ("ACHIEVEMENT TESTE4", "20", "CUSPIR CÓDIGO ATÉ SEUS DEDOS NÃO AGUENTAREM MAIS. RADICAL!!!", 5, 3);

-- ACHIEVEMENT_USUARIO TABLE
-- Usuário de RA = 11710372 não possui achievements
INSERT INTO achievement_usuario (id_achievement, ra_usuario, dt_achievement, destaque_achievement) VALUES (1, 11710370, "2017/09/15", 0);    
INSERT INTO achievement_usuario (id_achievement, ra_usuario, dt_achievement, destaque_achievement) VALUES (1, 11710370, "2018/07/15", 0);    
INSERT INTO achievement_usuario (id_achievement, ra_usuario, dt_achievement, destaque_achievement) VALUES (2, 11710370, "2019/02/15", 0);

-- HABILIDADE TABLE
-- Usuário de RA = 11710372 não possui habildades
INSERT INTO habilidade (nome_habilidade, ra_usuario, id_tipo_habilidade) VALUES ("Javascript", 11710370, 3);
INSERT INTO habilidade (nome_habilidade, ra_usuario, id_tipo_habilidade) VALUES ("R", 11710370, 3);
INSERT INTO habilidade (nome_habilidade, ra_usuario, id_tipo_habilidade) VALUES ("Python", 11710370, 3);

-- PROJETO TABLE
-- Usuário de RA = 11710372 não possui Projetos
INSERT INTO projeto (id_tipo_projeto, ra_usuario, id_area, dt_comeco_projeto, terminado_projeto, nome_projeto, descricao_projeto, dt_termino_projeto) VALUES (3, 11710370, 2, "2018/02/01", true, "Banco de Dados Avançado", "Matéria ministrada pelo Professor Surian","2018/06/30");
INSERT INTO projeto (id_tipo_projeto, ra_usuario, id_area, dt_comeco_projeto, terminado_projeto, nome_projeto, descricao_projeto, dt_termino_projeto) VALUES (6, 11710370, 3, "2018/08/01", true, "Conclusão semestral", "Semestre 2018.2 concluído", "2019/02/01");
INSERT INTO projeto (id_tipo_projeto, ra_usuario, id_area, dt_comeco_projeto, terminado_projeto, nome_projeto, descricao_projeto, dt_termino_projeto) VALUES (5, 11710370, 1, "2019/08/01", false, "IDTech: Gamificação aplicada ao ensino superior", "Projeto de Iniciação científica orientado por Matheus Matsuda Marangoni", null);
INSERT INTO projeto (id_tipo_projeto, ra_usuario, id_area, dt_comeco_projeto, terminado_projeto, nome_projeto, descricao_projeto, dt_termino_projeto) VALUES (5, 11710370, 1, "2019/08/01", false, "IDTech: Gamificação aplicada ao ensino superior", "Projeto de Iniciação científica orientado por Matheus Matsuda Marangoni", null);
INSERT INTO projeto (id_tipo_projeto, ra_usuario, id_area, dt_comeco_projeto, terminado_projeto, nome_projeto, descricao_projeto, dt_termino_projeto) VALUES (1, 11710370, 1, "2019/08/01", false, "teste", "teste achievements", null);
INSERT INTO projeto (id_tipo_projeto, ra_usuario, id_area, dt_comeco_projeto, terminado_projeto, nome_projeto, descricao_projeto, dt_termino_projeto) VALUES (2, 11710370, 1, "2019/08/01", false, "teste", "teste achievements", null);
INSERT INTO projeto (id_tipo_projeto, ra_usuario, id_area, dt_comeco_projeto, terminado_projeto, nome_projeto, descricao_projeto, dt_termino_projeto) VALUES (4, 11710370, 1, "2019/08/01", false, "teste", "teste achievements", null);





