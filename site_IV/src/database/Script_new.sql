-- DROP DATABASE omni_textil;
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

-- INSERTS INICIAIS
-- EMPRESA
INSERT INTO Empresa VALUES
(1, 'SPTech', 'Alessandro Goulart', '2022-03-15'),
(2, 'Valtex', 'Breno Gomes', '2022-02-22');
SELECT * FROM Empresa;

-- USUARIO
INSERT INTO Usuario VALUES
(NULL, 1, NULL, 'SPTECH', 'contato@sptech.com', 'sptech', 'ADMIN', DEFAULT),
(NULL, 1, 1, 'Fernando Brandão', 'fernando.brandao@sptech.com', 'sptech', 'ADMIN', DEFAULT),
(NULL, 1, 2, 'Marco Rover', 'marco.rover@sptech.com', 'sptech', 'COMUM', DEFAULT),

(NULL, 2, NULL, 'VALTEX', 'valtexsbc@uol.com.br', 'valtex159753', 'ADMIN', DEFAULT),
(NULL, 2, 4, 'Rafael Larucci', 'rafael.lara@valtex.com.br', 'rafavaltex123', 'COMUM', DEFAULT);
SELECT * FROM Usuario;

-- ENDEREÇO
INSERT INTO Endereco VALUES
(NULL, 'SP', 'São Paulo', 'Cerqueira César', 'Rua Haddock Lobo', 595),
(NULL, 'SP', 'São Bernardo do Campo', 'Vila Flórida', 'Rua Ranieri Mazzilli', 50),
(NULL, 'MG', 'Montes Claros', 'Vila Regina', 'Av. Dr. Sidney Chaves', 300),
(NULL, 'AM', 'Manaus', 'Distrito Industrial I', 'Av. Guaruba', 200);
SELECT * FROM Endereco;

-- UNIDADE
INSERT INTO Unidade VALUES
(NULL, 1, 1, 'Matriz-Paulista', 'GMT-3'),
(NULL, 2, 2, 'Matriz-ABC', 'GMT-3'),
(NULL, 1, 3, 'Unidade-MG', 'GMT-3'),
(NULL, 2, 4, 'Filial-AM', 'GMT-4');
SELECT * FROM Unidade;

-- LOCALIDADE
INSERT INTO Localidade VALUES
(NULL, 'Ala norte'),
(NULL, 'Ala sul'),
(NULL, 'Ala leste'),
(NULL, 'Ala oeste');
SELECT * FROM Localidade;

-- SETOR
INSERT INTO Setor VALUES
(NULL, 1, 4, 'SetorA'),
(NULL, 1, 3, 'SetorB'),
(NULL, 2, 1, 'SetorA'),
(NULL, 3, 2, 'SetorA'),
(NULL, 3, 3, 'SetorB'),
(NULL, 4, 1, 'SetorA');
SELECT * FROM Setor;