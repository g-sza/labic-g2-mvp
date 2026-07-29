import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProjeto, getPesquisadores } from '../services/api'
import { FaTimes, FaCheck } from 'react-icons/fa'

function NovoProjeto() {
  const navigate = useNavigate()
  const [pesquisadores, setPesquisadores] = useState([])
  
  const [form, setForm] = useState({ 
    titulo: '', 
    descricao: '', 
    metodologia: '', 
    pesquisadorResponsavel: '',
    data_inicio: '',
    data_fim: '',
    status: 'Em Planejamento' 
  })
  
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  const exigeDataInicio = form.status === 'Em Andamento' || form.status === 'Concluido'
  const exigeDataFim = form.status === 'Concluido'

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await getPesquisadores()
        setPesquisadores(dados)
      } catch (error) {
        console.error("Erro ao carregar pesquisadores", error)
      }
    }
    carregar()
  }, [])

  function handleChange(e) {
    e.target.setCustomValidity('');
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleInvalid(e) {
    if (e.target.validity.valueMissing) {
      e.target.setCustomValidity('Este campo é obrigatório.');
    } else {
      e.target.setCustomValidity('Valor inválido.');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    if (!form.titulo || !form.descricao || !form.metodologia || !form.pesquisadorResponsavel) {
      setErro('Preencha os campos base obrigatórios.')
      return
    }

    if (exigeDataInicio && !form.data_inicio) {
      setErro('Projetos em andamento ou concluídos exigem uma Data de Início.')
      return
    }

    if (exigeDataFim && !form.data_fim) {
      setErro('Projetos concluídos exigem uma Data de Fim.')
      return
    }

    setLoading(true)
    setErro('')
    
    try {
      const payload = { ...form }
      if (payload.data_inicio === '') payload.data_inicio = null
      if (payload.data_fim === '') payload.data_fim = null

      await createProjeto(payload)
      navigate('/dashboard')
    } catch (error) {
      setErro('Erro ao cadastrar projeto. Tente novamente.')
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
            <input type="text" name="titulo" value={form.titulo} onChange={handleChange} onInvalid={handleInvalid} required />
          </div>
          
          <div>
            <label>Descrição <span className="obrigatorio">*</span></label>
            <textarea name="descricao" rows="3" value={form.descricao} onChange={handleChange} onInvalid={handleInvalid} required />
          </div>
          
          <div>
            <label>Metodologia <span className="obrigatorio">*</span></label>
            <textarea name="metodologia" rows="3" value={form.metodologia} onChange={handleChange} onInvalid={handleInvalid} required />
          </div>
          
          <div>
            <label>Pesquisador Responsável <span className="obrigatorio">*</span></label>
            <select name="pesquisadorResponsavel" value={form.pesquisadorResponsavel} onChange={handleChange} onInvalid={handleInvalid} required >
              <option value="">Selecione um pesquisador</option>
              {pesquisadores.map(p => (
                <option key={p.id_pesquisador} value={p.nome}>{p.nome}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="Em Planejamento">Em Planejamento</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Concluido">Concluído</option>
            </select>
          </div>

          {exigeDataInicio && (
            <div>
              <label>Data de Início <span className="obrigatorio">*</span></label>
              <input type="date" name="data_inicio" value={form.data_inicio} onChange={handleChange} onInvalid={handleInvalid} required={exigeDataInicio} />
            </div>
          )}

          {exigeDataFim && (
            <div>
              <label>Data de Conclusão <span className="obrigatorio">*</span></label>
              <input type="date" name="data_fim" value={form.data_fim} onChange={handleChange} onInvalid={handleInvalid} required={exigeDataFim} />
            </div>
          )}
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '16px' }}>
            <button type="button" className="btn-secondary" onClick={() => navigate('/dashboard')}><FaTimes /> Cancelar</button>
            <button type="submit" className="btn-primary" disabled={loading}><FaCheck /> {loading ? 'Salvando...' : 'Cadastrar'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NovoProjeto