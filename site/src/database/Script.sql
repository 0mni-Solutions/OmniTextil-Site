-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/* para workbench - local - desenvolvimento */
CREATE DATABASE omni_textil;
USE omni_textil;

CREATE TABLE Empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nomeEmpresa VARCHAR(45),
responsavel VARCHAR(70),
cadastroEmpresa DATE
);

CREATE TABLE Usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
fkEmpresa INT, 
FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
fkAdmin INT, 
FOREIGN KEY (fkAdmin) REFERENCES Usuario(idUsuario),
nomeUsuario VARCHAR(80),
email VARCHAR(60),
senha VARCHAR(40),
cargo CHAR(5) CONSTRAINT chkCargo 
CHECK (cargo = 'ADMIN' or cargo = 'COMUM'),
cadastroUsuario TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Endereco (
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
estado CHAR(2),
cidade VARCHAR(30),
bairro VARCHAR(25),
rua VARCHAR(45),
numero INT
);

CREATE TABLE Unidade (
idUnidade INT PRIMARY  KEY AUTO_INCREMENT,
fkEmpresa INT, 
FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
fkEndereco INT, 
FOREIGN KEY (fkEndereco) REFERENCES Endereco(idEndereco),
nomeUnidade VARCHAR(15),
fusoHorario CHAR(5) CONSTRAINT chkFuso 
CHECK (fusoHorario IN('GMT-2', 'GMT-3', 'GMT-4', 'GMT-5'))
);

CREATE TABLE Localidade (
idLocalidade INT PRIMARY KEY AUTO_INCREMENT,
descricao VARCHAR(50)
);

CREATE TABLE Setor (
idSetor INT AUTO_INCREMENT,
fkUnidade INT, 
FOREIGN KEY (fkUnidade) REFERENCES Unidade(idUnidade),
fkLocalidade INT, 
FOREIGN KEY (fkLocalidade) REFERENCES Localidade(idLocalidade),
PRIMARY KEY (idSetor, fkUnidade, fkLocalidade),
nomeSetor CHAR(6)
);

CREATE TABLE Sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
fkUnidade INT,
FOREIGN KEY (fkUnidade) REFERENCES Unidade(idUnidade),
fkSetor INT, 
FOREIGN KEY (fkSetor) REFERENCES Setor(idSetor),
fkLocalidade INT, 
FOREIGN KEY (fkLocalidade) REFERENCES Localidade(idLocalidade)
);

CREATE TABLE Dados (
idDados INT PRIMARY KEY AUTO_INCREMENT,
fkSensor INT, 
FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor),
temperatura INT,
umidade INT,
data_hora DATETIME
);




/* para sql server - remoto - produção */

CREATE TABLE Empresa (
idEmpresa INT PRIMARY KEY IDENTITY(1,1),
nomeEmpresa VARCHAR(45),
responsavel VARCHAR(70),
cadastroEmpresa DATE
);

CREATE TABLE Usuario (
idUsuario INT PRIMARY KEY IDENTITY(1,1),
fkEmpresa INT FOREIGN KEY REFERENCES Empresa(idEmpresa),
fkAdmin INT FOREIGN KEY REFERENCES Usuario(idUsuario),
nomeUsuario VARCHAR(80),
email VARCHAR(60),
senha VARCHAR(40),
cargo CHAR(5) CONSTRAINT chkCargo 
CHECK (cargo = 'ADMIN' or cargo = 'COMUM'),
cadastroUsuario DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Endereco (
idEndereco INT PRIMARY KEY IDENTITY(1,1),
estado CHAR(2),
cidade VARCHAR(30),
bairro VARCHAR(25),
rua VARCHAR(45),
numero INT
);

CREATE TABLE Unidade (
idUnidade INT PRIMARY  KEY IDENTITY(1,1),
fkEmpresa INT FOREIGN KEY REFERENCES Empresa(idEmpresa),
fkEndereco INT FOREIGN KEY REFERENCES Endereco(idEndereco),
nomeUnidade VARCHAR(15),
fusoHorario CHAR(5) CONSTRAINT chkFuso 
CHECK (fusoHorario IN('GMT-2', 'GMT-3', 'GMT-4', 'GMT-5'))
);

CREATE TABLE Localidade (
idLocalidade INT PRIMARY KEY IDENTITY(1,1),
descricao VARCHAR(50)
);

CREATE TABLE Setor (
idSetor INT IDENTITY(1,1),
fkUnidade INT FOREIGN KEY REFERENCES Unidade(idUnidade),
fkLocalidade INT FOREIGN KEY REFERENCES Localidade(idLocalidade),
PRIMARY KEY (idSetor, fkUnidade, fkLocalidade),
nomeSetor CHAR(6)
);

CREATE TABLE Sensor (
idSensor INT PRIMARY KEY IDENTITY(1,1),
fkSetor INT FOREIGN KEY REFERENCES Setor(idSetor)
);

CREATE TABLE Dados (
idDados INT PRIMARY KEY IDENTITY(1,1),
fkSensor INT FOREIGN KEY REFERENCES Sensor(idSensor),
temperatura INT,
umidade INT,
data_hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Analytics (
idAnalytic INT PRIMARY KEY IDENTITY(1,1),
medida VARCHAR(12)
CONSTRAINT chkMedida CHECK (medida = 'umidade' or medida = 'temperatura'),
escala VARCHAR(10)
CONSTRAINT chkEscala CHECK (escala in ('MUITO ALTA', 'ALTA', 'IDEAL', 'BAIXA', 'MUITO BAIXA')),
data_hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- INSERTS INICIAIS ----------------
-- EMPRESA
INSERT INTO Empresa (nomeEmpresa, responsavel, cadastroEmpresa) VALUES
('SPTech', 'Alessandro Goulart', '2022-03-15'),
('Valtex', 'Breno Gomes', '2022-02-22');

-- USUARIO
INSERT INTO Usuario (fkEmpresa, fkAdmin, nomeUsuario, email, senha, cargo) VALUES
(1, NULL, 'SPTECH', 'contato@sptech.com', 'sptech', 'ADMIN'),
(1, 1, 'Fernando Brandão', 'fernando.brandao@sptech.com', 'sptech', 'ADMIN'),
(1, 2, 'Marco Rover', 'marco.rover@sptech.com', 'sptech', 'COMUM'),
(2, NULL, 'VALTEX', 'valtexsbc@uol.com.br', 'valtex159753', 'ADMIN'),
(2, 4, 'Rafael Larucci', 'rafael.lara@valtex.com.br', 'rafavaltex123', 'COMUM');

-- ENDERECO
INSERT INTO Endereco (estado, cidade, bairro, rua, numero) VALUES
('SP', 'São Paulo', 'Cerqueira César', 'Rua Haddock Lobo', 595),
('SP', 'São Bernardo do Campo', 'Vila Flórida', 'Rua Ranieri Mazzilli', 50),
('MG', 'Montes Claros', 'Vila Regina', 'Av. Dr. Sidney Chaves', 300),
('AM', 'Manaus', 'Distrito Industrial I', 'Av. Guaruba', 200);

-- UNIDADE
INSERT INTO Unidade (fkEmpresa, fkEndereco, nomeUnidade, fusoHorario) VALUES
(1, 1, 'Matriz-Paulista', 'GMT-3'),
(2, 2, 'Matriz-ABC', 'GMT-3'),
(1, 3, 'Unidade-MG', 'GMT-3'),
(2, 4, 'Filial-AM', 'GMT-4');

-- LOCALIDADE
INSERT INTO Localidade (descricao) VALUES
('Ala norte'),
('Ala sul'),
('Ala leste'),
('Ala oeste');

-- SETOR
INSERT INTO Setor (fkUnidade, fkLocalidade, nomeSetor) VALUES
(1, 1, 'SetorA'),
(1, 2, 'SetorB'),
(2, 3, 'SetorA'),
(2, 4, 'SetorB'),
(3, 3, 'SetorA'),
(3, 4, 'SetorB'),
(4, 1, 'SetorA'),
(4, 2, 'SetorB');


-- SENSOR
INSERT INTO Sensor(fkSetor) VALUES
(1),
(2),
(3),
(4),
(1),
(2),
(4);


-- COISAS IMPORTANTES NO AZURE -----------------------------
-- TRUNCATE TABLE tabela;
-- Tem q dar insert informando as colunas antes do VALUES
-- FORMAT(coluna, 'dd/MM/yy hh:mm') as nomeColuna