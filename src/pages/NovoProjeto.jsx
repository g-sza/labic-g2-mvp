// Formulário para cadastrar novo projeto

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProjeto, getPesquisadores } from '../services/api'

function NovoProjeto() {
  const navigate = useNavigate()
  const [pesquisadores, setPesquisadores] = useState([])
  const [form, setForm] = useState({ 
    titulo: '', 
    descricao: '', 
    metodologia: '', 
    pesquisadorResponsavel: '' 
  })
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  // Carrega a lista de pesquisadores para o select
  useEffect(() => {
    async function carregar() {
      const dados = await getPesquisadores()
      setPesquisadores(dados)
    }
    carregar()
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    if (!form.titulo || !form.descricao || !form.metodologia || !form.pesquisadorResponsavel) {
      setErro('Preencha todos os campos obrigatórios')
      return
    }

    setLoading(true)
    setErro('')
    
    try {
      await createProjeto(form)
      navigate('/dashboard')
    } catch (error) {
      setErro('Erro ao cadastrar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pagina">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2>Novo Projeto</h2>
        
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        
        <form className="formulario" onSubmit={handleSubmit}>
          <div>
            <label>Título:*</label>
            <input 
              type="text" 
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div>
            <label>Descrição:*</label>
            <textarea 
              name="descricao"
              rows="3"
              value={form.descricao}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label>Metodologia:*</label>
            <textarea 
              name="metodologia"
              rows="3"
              value={form.metodologia}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label>Pesquisador Responsável:*</label>
            <select 
              name="pesquisadorResponsavel"
              value={form.pesquisadorResponsavel}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              {pesquisadores.map(p => (
                <option key={p.id} value={p.nome}>{p.nome}</option>
              ))}
            </select>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="button" onClick={() => navigate('/dashboard')}>Cancelar</button>
            <button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NovoProjeto