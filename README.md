# 🧩 CRUD de Usuários (React + Node + MySQL)

Este projeto consiste em um sistema completo de Cadastro de Usuários, com funcionalidades de **criar**, **listar**, **editar** e **deletar** usuários por CPF. O frontend foi feito com React e o backend com Node.js + Express, utilizando banco de dados MySQL.

---

## 🚀 Como Rodar o Projeto Localmente

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

---

### 2. Configure o Banco de Dados

Crie um banco chamado `crud` no seu MySQL local e execute o seguinte comando para criar a tabela:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100),
  cpf VARCHAR(11) UNIQUE
);
```

---

### 3. Backend (Node.js)

```bash
cd backend
npm install
```

Crie um arquivo `.env` com o seguinte conteúdo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=1234
DB_NAME=crud
PORTBACK=1111
```

Execute o servidor:

```bash
npm start
```

O backend estará rodando em: [http://localhost:1111](http://localhost:1111)

---

### 4. Frontend (React)

Abra outro terminal e execute:

```bash
cd frontend/reactproject
npm install
npm start
```

O frontend abrirá em: [http://localhost:3000](http://localhost:3000)

---

## 👨‍💻 Autor

Artur Pandolfo Meneghete  
---

