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
    pesquisadorResponsavel: '',
    status: 'Ativo'
  })
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

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
        
        {erro && <div className="erro">{erro}</div>}
        
        <form className="formulario" onSubmit={handleSubmit}>
          <div>
            <label>Título <span className="obrigatorio">*</span></label>
            <input 
              type="text" 
              name="titulo"
              placeholder="Digite o título do projeto"
              value={form.titulo}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div>
            <label>Descrição <span className="obrigatorio">*</span></label>
            <textarea 
              name="descricao"
              rows="3"
              placeholder="Descreva o projeto"
              value={form.descricao}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label>Metodologia <span className="obrigatorio">*</span></label>
            <textarea 
              name="metodologia"
              rows="3"
              placeholder="Descreva a metodologia"
              value={form.metodologia}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label>Pesquisador Responsável <span className="obrigatorio">*</span></label>
            <select 
              name="pesquisadorResponsavel"
              value={form.pesquisadorResponsavel}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um pesquisador</option>
              {pesquisadores.map(p => (
                <option key={p.id} value={p.nome}>{p.nome}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label>Status</label>
            <select 
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="Ativo">Ativo</option>
              <option value="Concluído">Concluído</option>
              <option value="Pausado">Pausado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '8px' }}>
            <button type="button" className="btn-secondary" onClick={() => navigate('/dashboard')}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Salvando...' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NovoProjeto