-- Dropping existing tables if they exist
DROP TABLE IF EXISTS Artigo_Artigo CASCADE;
DROP TABLE IF EXISTS Aplicacao_Aplicacao CASCADE;
DROP TABLE IF EXISTS Utilizacao_Aplicacao CASCADE;
DROP TABLE IF EXISTS Implementacao_Aplicacao CASCADE;
DROP TABLE IF EXISTS Implementacao_Estrutura_Dados CASCADE;
DROP TABLE IF EXISTS Aplicacao_Tecnica_Otimizacao CASCADE;
DROP TABLE IF EXISTS Avaliacao_Dataset CASCADE;
DROP TABLE IF EXISTS Avaliacao_Artigo CASCADE;
DROP TABLE IF EXISTS Benchmark CASCADE;
DROP TABLE IF EXISTS Publicacao CASCADE;
DROP TABLE IF EXISTS Implementacao CASCADE;
DROP TABLE IF EXISTS Veiculo CASCADE;
DROP TABLE IF EXISTS Ambiente_de_Execucao CASCADE;
DROP TABLE IF EXISTS Dataset CASCADE;
DROP TABLE IF EXISTS Pesquisador CASCADE;
DROP TABLE IF EXISTS Aplicacao CASCADE;
DROP TABLE IF EXISTS Tecnica_de_Otimizacao CASCADE;
DROP TABLE IF EXISTS Estrutura_de_Dados CASCADE;
DROP TABLE IF EXISTS Complexidade CASCADE;
DROP TABLE IF EXISTS Algoritmo CASCADE;
DROP TABLE IF EXISTS Framework CASCADE;
DROP TABLE IF EXISTS Artigo CASCADE;
DROP TABLE IF EXISTS Instituicao CASCADE;
DROP TABLE IF EXISTS Pessoa CASCADE;

CREATE TABLE Pessoa (
id SERIAL,
cpf VARCHAR(14) NOT NULL,
nome VARCHAR(100) NOT NULL,
cargo VARCHAR(50) NOT NULL,
PRIMARY KEY (id),
UNIQUE (cpf)
);
CREATE TABLE Instituicao (
id SERIAL,
nome VARCHAR(100) NOT NULL,
data_fundacao DATE NOT NULL,
localizacao VARCHAR(150) NOT NULL,
PRIMARY KEY (id),
UNIQUE (nome)
);
CREATE TABLE Artigo (
id SERIAL,
doi VARCHAR(100) NOT NULL,
data_publicacao DATE NOT NULL,
titulo VARCHAR(255) NOT NULL,
num_citacoes INT DEFAULT 0 NOT NULL,
PRIMARY KEY (id),
UNIQUE (doi)
);
CREATE TABLE Framework (
id SERIAL,
nome VARCHAR(50) NOT NULL,
tipo_aresta VARCHAR(50) NOT NULL,
diagrama TEXT NOT NULL,
tipo_consumo_grafo VARCHAR(50) NOT NULL,
linguagem VARCHAR(50) NOT NULL,
link_documentacao VARCHAR(255) NOT NULL,
PRIMARY KEY (id),
UNIQUE (nome)
);
CREATE TABLE Algoritmo (
id SERIAL,
nome VARCHAR(50) NOT NULL,
data_criacao DATE NOT NULL,
pseudocodigo TEXT NOT NULL,
PRIMARY KEY (id),
UNIQUE (nome)

);
CREATE TABLE Complexidade (
id SERIAL,
tipo_alocacao VARCHAR(50) NOT NULL,
complexidade_busca VARCHAR(20) NOT NULL,
complexidade_insercao VARCHAR(20) NOT NULL,
PRIMARY KEY (id),
UNIQUE (tipo_alocacao)
);
CREATE TABLE Estrutura_de_Dados (
id SERIAL,
nome VARCHAR(50) NOT NULL,
complexidade_id INT NOT NULL,
PRIMARY KEY (id),
UNIQUE (nome),
FOREIGN KEY (complexidade_id) REFERENCES Complexidade(id)
);
CREATE TABLE Tecnica_de_Otimizacao (
id SERIAL,
nome VARCHAR(50) NOT NULL,
metodo VARCHAR(100) NOT NULL,
complexidade VARCHAR(20) NOT NULL,
pseudocodigo TEXT NOT NULL,
PRIMARY KEY (id),
UNIQUE (nome)
);
CREATE TABLE Aplicacao (
id SERIAL,
area VARCHAR(50) NOT NULL,
empresa VARCHAR(100) NOT NULL,
problema_resolvido VARCHAR(255) NOT NULL,
licenca VARCHAR(50) NOT NULL,
PRIMARY KEY (id),
UNIQUE (area, empresa, problema_resolvido)
);
CREATE TABLE Pesquisador (
id SERIAL,
orcid VARCHAR(19) NOT NULL,
area_pesquisa VARCHAR(50) NOT NULL,
pessoa_id INT NOT NULL,
instituicao_id INT NOT NULL,
PRIMARY KEY (id),
UNIQUE (orcid),

UNIQUE (pessoa_id),
FOREIGN KEY (pessoa_id) REFERENCES Pessoa(id),
FOREIGN KEY (instituicao_id) REFERENCES Instituicao(id)
);
CREATE TABLE Dataset (
id SERIAL,
nome VARCHAR(100) NOT NULL,
versao VARCHAR(20) NOT NULL,
area VARCHAR(50) NOT NULL,
tamanho_arquivo BIGINT NOT NULL,
qtd_arestas BIGINT NOT NULL,
qtd_vertices BIGINT NOT NULL,
direcionado BOOLEAN NOT NULL,
valorado BOOLEAN NOT NULL,
instituicao_id INT NOT NULL,
PRIMARY KEY (id),
UNIQUE (nome, versao, instituicao_id),
CONSTRAINT chk_dataset_tamanho CHECK (tamanho_arquivo > 0),
CONSTRAINT chk_dataset_arestas CHECK (qtd_arestas >= 0),
CONSTRAINT chk_dataset_vertices CHECK (qtd_vertices > 0),
FOREIGN KEY (instituicao_id) REFERENCES Instituicao(id) ON DELETE CASCADE
);
CREATE TABLE Ambiente_de_Execucao (
id SERIAL,
nome VARCHAR(50) NOT NULL,
sistema_operacional VARCHAR(50) NOT NULL,
memoria_ram INT NOT NULL,
memoria_secundaria INT NOT NULL,
processador VARCHAR(100) NOT NULL,
gpu VARCHAR(100),
qtd_nucleos INT NOT NULL,
nos_numa INT NOT NULL,
instituicao_id INT NOT NULL,
PRIMARY KEY (id),
UNIQUE (nome, instituicao_id),
CONSTRAINT chk_ambiente_ram CHECK (memoria_ram > 0),
CONSTRAINT chk_ambiente_secundaria CHECK (memoria_secundaria > 0),
CONSTRAINT chk_ambiente_nucleos CHECK (qtd_nucleos > 0),
CONSTRAINT chk_ambiente_numa CHECK (nos_numa > 0),
FOREIGN KEY (instituicao_id) REFERENCES Instituicao(id) ON DELETE CASCADE
);
CREATE TABLE Veiculo (
id SERIAL,
nome VARCHAR(100) NOT NULL,
edicao VARCHAR(50) NOT NULL,

area VARCHAR(50) NOT NULL,
tipo VARCHAR(20) NOT NULL,
data_publicacao DATE NOT NULL,
local_publicacao VARCHAR(100) NOT NULL,
paginas INT NOT NULL,
instituicao_id INT NOT NULL,
PRIMARY KEY (id),
UNIQUE (nome, edicao, instituicao_id),
CONSTRAINT chk_veiculo_tipo CHECK (tipo IN ('Revista', 'Conferência')),
CONSTRAINT chk_veiculo_paginas CHECK (paginas > 0),
FOREIGN KEY (instituicao_id) REFERENCES Instituicao(id)
);
CREATE TABLE Implementacao (
id SERIAL,
framework_id INT NOT NULL,
algoritmo_id INT NOT NULL,
PRIMARY KEY (id),
UNIQUE (framework_id, algoritmo_id),
FOREIGN KEY (framework_id) REFERENCES Framework(id),
FOREIGN KEY (algoritmo_id) REFERENCES Algoritmo(id)
);
CREATE TABLE Publicacao (
veiculo_id INT NOT NULL,
artigo_id INT NOT NULL,
pesquisador_id INT NOT NULL,
PRIMARY KEY (veiculo_id, artigo_id, pesquisador_id),
FOREIGN KEY (veiculo_id) REFERENCES Veiculo(id),
FOREIGN KEY (artigo_id) REFERENCES Artigo(id),
FOREIGN KEY (pesquisador_id) REFERENCES Pesquisador(id)
);
CREATE TABLE Benchmark (
tempo DECIMAL(10, 4) NOT NULL,
data_benchmark DATE NOT NULL,
dataset_id INT NOT NULL,
ambiente_id INT NOT NULL,
implementacao_id INT NOT NULL,
PRIMARY KEY (dataset_id, ambiente_id, implementacao_id),
CONSTRAINT chk_benchmark_tempo CHECK (tempo >= 0),
FOREIGN KEY (dataset_id) REFERENCES Dataset(id),
FOREIGN KEY (ambiente_id) REFERENCES Ambiente_de_Execucao(id),
FOREIGN KEY (implementacao_id) REFERENCES Implementacao(id)
);
CREATE TABLE Avaliacao_Artigo (
artigo_id INT NOT NULL,

implementacao_id INT NOT NULL,
PRIMARY KEY (artigo_id, implementacao_id),
FOREIGN KEY (artigo_id) REFERENCES Artigo(id),
FOREIGN KEY (implementacao_id) REFERENCES Implementacao(id)
);
CREATE TABLE Avaliacao_Dataset (
dataset_id INT NOT NULL,
artigo_id INT NOT NULL,
PRIMARY KEY (dataset_id, artigo_id),
FOREIGN KEY (dataset_id) REFERENCES Dataset(id),
FOREIGN KEY (artigo_id) REFERENCES Artigo(id)
);
CREATE TABLE Aplicacao_Tecnica_Otimizacao (
tecnica_id INT NOT NULL,
implementacao_id INT NOT NULL,
data_aplicacao DATE NOT NULL,
PRIMARY KEY (tecnica_id, implementacao_id),
FOREIGN KEY (tecnica_id) REFERENCES Tecnica_de_Otimizacao(id),
FOREIGN KEY (implementacao_id) REFERENCES Implementacao(id)
);
CREATE TABLE Implementacao_Estrutura_Dados (
estrutura_id INT NOT NULL,
implementacao_id INT NOT NULL,
PRIMARY KEY (estrutura_id, implementacao_id),
FOREIGN KEY (estrutura_id) REFERENCES Estrutura_de_Dados(id),
FOREIGN KEY (implementacao_id) REFERENCES Implementacao(id)
);
CREATE TABLE Implementacao_Aplicacao (
aplicacao_id INT NOT NULL,
implementacao_id INT NOT NULL,
PRIMARY KEY (aplicacao_id, implementacao_id),
FOREIGN KEY (aplicacao_id) REFERENCES Aplicacao(id),
FOREIGN KEY (implementacao_id) REFERENCES Implementacao(id)
);
CREATE TABLE Utilizacao_Aplicacao (
pessoa_id INT NOT NULL,
aplicacao_id INT NOT NULL,
PRIMARY KEY (pessoa_id, aplicacao_id),
FOREIGN KEY (pessoa_id) REFERENCES Pessoa(id),
FOREIGN KEY (aplicacao_id) REFERENCES Aplicacao(id)
);
CREATE TABLE Aplicacao_Aplicacao (

aplicacao_base_id INT NOT NULL,
aplicacao_nova_id INT NOT NULL,
PRIMARY KEY (aplicacao_base_id, aplicacao_nova_id),
FOREIGN KEY (aplicacao_base_id) REFERENCES Aplicacao(id),
FOREIGN KEY (aplicacao_nova_id) REFERENCES Aplicacao(id)
);

CREATE TABLE Artigo_Artigo (
  artigo_citando_id INT NOT NULL,
  artigo_citado_id INT NOT NULL,
  PRIMARY KEY (artigo_citando_id, artigo_citado_id),
  CONSTRAINT chk_nao_auto_citacao CHECK (artigo_citando_id <> artigo_citado_id),
  FOREIGN KEY (artigo_citando_id) REFERENCES Artigo(id) ON DELETE CASCADE,
  FOREIGN KEY (artigo_citado_id) REFERENCES Artigo(id) ON DELETE CASCADE
);
