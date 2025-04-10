import React, { useState } from 'react';
import './edituser.css';

function EditarUsuario() {
  const [cpfBusca, setCpfBusca] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [mensagem, setMensagem] = useState('');

  const buscarUsuario = async () => {
    console.log("Tentando buscar o usuário com CPF:", cpfBusca); // Verifique o CPF antes de buscar

    try {
      const response = await fetch(`http://localhost:1111/users/cpf/${cpfBusca}`);
      if (!response.ok) throw new Error('Usuário não encontrado');
      const data = await response.json();
      setUsuario(data);
      setMensagem('');
    } catch (error) {
      setUsuario(null);
      setMensagem('Usuário não encontrado.');
    }
  };

  const atualizarUsuario = async () => {
    console.log("Dados enviados para atualizar:", usuario); // Verifique os dados enviados

    try {
      const response = await fetch(`http://localhost:1111/users/${usuario.cpf}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
      });
      if (!response.ok) throw new Error('Erro ao atualizar usuário');
      setMensagem('Usuário atualizado com sucesso!');
    } catch (error) {
      setMensagem('Erro ao atualizar usuário.');
    }
  };

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  return (
    <div className="editar-container">
      <h2>Editar Usuário</h2>

      <div className="buscar">
        <input
          type="text"
          placeholder="Digite o CPF"
          value={cpfBusca}
          onChange={(e) => setCpfBusca(e.target.value)}
        />
        <button onClick={buscarUsuario}>Buscar</button>
      </div>

      {mensagem && <p className="mensagem">{mensagem}</p>}

      {usuario && (
        <div className="form-edicao">
          <input name="nome" value={usuario.nome} onChange={handleChange} placeholder="Nome" />
          <input name="cpf" value={usuario.cpf} onChange={handleChange} placeholder="CPF" />
          <input name="email" value={usuario.email} onChange={handleChange} placeholder="Email" />
          <button onClick={atualizarUsuario}>Salvar Alterações</button>
        </div>
      )}
    </div>
  );
}

export default EditarUsuario;
