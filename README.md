# Trybe-Futebol-Clube ⚽🏆

Projeto de estudo Full-Stack feito durante a formação em **Desenvolvimento Web da Trybe**.  
Uma aplicação para **gerenciar times de futebol, partidas e tabelas de classificação**, com API consumível por front-end e lógica de negócio completa.

---

## 📌 O que é este projeto

O *Trybe-Futebol-Clube* é uma aplicação que representa um sistema de futebol onde você pode:

✔️ Criar e listar **times**  
✔️ Adicionar e consultar **partidas**  
✔️ Atualizar placares e status de jogos  
✔️ Ver a **tabela de classificação** com pontos, vitórias, empates e derrotas  
✔️ Filtrar partidas por andamento (em andamento ou finalizadas) 
Ele foi construído para praticar padrões de arquitetura de aplicações, REST APIs e integração com banco de dados usando **Sequelize/MySQL** ou similar. 

---

## 📁 Estrutura típica do projeto

```

.
├── src/                          # Código-fonte (Models, Services, Controllers)
│   ├── controllers/
│   ├── services/
│   ├── models/
│   └── routes/
├── tests/                       # Testes automatizados (Mocha/Chai ou Jest)
├── .env.example                 # Exemplo de variáveis de ambiente
├── docker-compose.yml           # Docker + banco de dados
├── package.json                 # Dependências e scripts
├── README.md                   # Este arquivo
└── …                            # Configurações extras

````

---

## 🛠 Requisitos

Antes de rodar o projeto localmente, você precisa:

✔️ **Node.js** (v14 ou superior)  
✔️ **npm** ou **yarn**  
✔️ **MySQL** (ou outro banco relacional usado no projeto)  
✔️ DBeaver / MySQL Workbench (opcional pra ver tabela)  

---

## 🚀 Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/Thaisvc/Trybe-Futebol-Clube.git
cd Trybe-Futebol-Clube
````

### 2. Instale dependências

```bash
npm install
```

ou

```bash
yarn install
```

### 3. Configure as variáveis de ambiente

Crie um `.env` com suas credenciais do banco de dados, por exemplo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=senha
DB_NAME=trybe_futebol_clube
PORT=3000
```

### 4. Rode a aplicação

```bash
npm start
```

ou em desenvolvimento com live reload:

```bash
npm run dev
```

---

## 🧪 Testes

Este projeto costuma vir com testes automatizados. Para rodar todos:

```bash
npm test
```

ou

```bash
npm run test:watch
```

---

## 🚩 Endpoints principais (exemplos)

*(Ajuste conforme teu código real)*

```plaintext
GET    /teams                 # Lista todos os times
POST   /teams                 # Cria um novo time
GET    /matches               # Lista todas as partidas
POST   /matches               # Cria nova partida
PATCH  /matches/:id           # Atualiza placar/resultado
GET    /leaderboard           # Tabela de classificação
```

---

## 📓 Funcionalidades esperadas

✔️ Cadastro de times e consultas  <br>
✔️ Registro de partidas com placares <br>
✔️ Filtro de partidas por status <br>
✔️ Cálculo automático de pontos e classificação <br>
✔️ Testes cobrindo regras de negócio <br>

---
