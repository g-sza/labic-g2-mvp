import { useState } from 'react'

function Formulario() {
  // dados do formulário
  const [form, setForm] = useState({
    nome: '',
    area: '',
    email: '',
    lattes: ''
  })

  // atualiza os dados quando realiza a digitação
  function mudarDados(e) {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  // salva o formulário
  function salvar(e) {
    e.preventDefault()
    alert('Cadastrado com sucesso!')
    console.log(form)
  }

  return (
    <div className="pagina">
      <h2>Cadastrar Pesquisador</h2>
      
      <div className="card">
        <form className="formulario" onSubmit={salvar}>
          
          <div>
            <label>Nome completo:*</label>
            <input 
              type="text" 
              name="nome"
              value={form.nome}
              onChange={mudarDados}
              required 
            />
          </div>
          
          <div>
            <label>Área de atuação:*</label>
            <input 
              type="text" 
              name="area"
              value={form.area}
              onChange={mudarDados}
              required 
            />
          </div>
          
          <div>
            <label>Email:*</label>
            <input 
              type="email" 
              name="email"
              value={form.email}
              onChange={mudarDados}
              required 
            />
          </div>
          
          <div>
            <label>Link do Lattes:</label>
            <input 
              type="url" 
              name="lattes"
              value={form.lattes}
              onChange={mudarDados}
            />
          </div>
          
          <div>
            <button type="button">Cancelar</button>
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      </div>
      
      <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#666' }}>
        Versão estática. Integração com API em 30/06.
      </p>
    </div>
  )
}

export default Formulario