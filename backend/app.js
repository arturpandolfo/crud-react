require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORTBACK || 1111;  

app.use(cors());
app.use(express.json());

// Rota para buscar um usuário pelo CPF
app.get('/users/cpf/:cpf', (req, res) => {
  const cpf = req.params.cpf;
  const sql = 'SELECT * FROM users WHERE cpf = ?';
  
  db.query(sql, [cpf], (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ erro: 'Erro ao buscar usuário' });
    }
    if (results.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    res.json(results[0]);  // Retorna o primeiro usuário encontrado
  });
});

// Rota para listar todos os usuários
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuários:', err);
      return res.status(500).json({ erro: 'Erro ao buscar usuários' });
    }
    res.json(results);
  });
});

// Rota para criar um novo usuário
app.post('/users', (req, res) => {
  const { nome, email, cpf } = req.body;
  const sql = 'INSERT INTO users (nome, email, cpf) VALUES (?, ?, ?)';
  const values = [nome, email, cpf];
  
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao criar usuário:', err);
      return res.status(500).json({ erro: 'Erro ao criar usuário' });
    }
    res.status(201).json({ id: result.insertId, nome, email, cpf });
  });
});

// Rota para atualizar um usuário
app.put('/users/:cpf', (req, res) => {
  const { cpf } = req.params;
  const { nome, email } = req.body;
  const sql = 'UPDATE users SET nome = ?, email = ? WHERE cpf = ?';
  const values = [nome, email, cpf];
  
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao atualizar usuário:', err);
      return res.status(500).json({ erro: 'Erro ao atualizar usuário' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado para atualizar' });
    }
    res.send('Usuário atualizado com sucesso!');
  });
});

// Rota para deletar um usuário
app.delete('/users/:cpf', (req, res) => {
  const { cpf } = req.params;
  const sql = 'DELETE FROM users WHERE cpf = ?';
  
  db.query(sql, [cpf], (err, result) => {
    if (err) {
      console.error('Erro ao deletar usuário:', err);
      return res.status(500).json({ erro: 'Erro ao deletar usuário' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado para excluir' });
    }
    res.send('Usuário deletado com sucesso');
  });
});

// Inicializa o servidor na porta configurada
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
