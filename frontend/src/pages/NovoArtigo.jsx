import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createArtigo } from '../services/api'

function NovoArtigo() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ 
    titulo: '', 
    autores: '', 
    resumo: '', 
    metodologia: '', 
    revisaoBibliografica: '',
    status: 'Rascunho'
  })
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    if (!form.titulo || !form.autores || !form.resumo || !form.metodologia || !form.revisaoBibliografica) {
      setErro('Preencha todos os campos obrigatórios')
      return
    }

    setLoading(true)
    setErro('')
    
    try {
      await createArtigo(form)
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
        <h2>Novo Artigo</h2>
        
        {erro && <div className="erro">{erro}</div>}
        
        <form className="formulario" onSubmit={handleSubmit}>
          <div>
            <label>Título <span className="obrigatorio">*</span></label>
            <input 
              type="text" 
              name="titulo"
              placeholder="Digite o título do artigo"
              value={form.titulo}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div>
            <label>Autores <span className="obrigatorio">*</span></label>
            <input 
              type="text" 
              name="autores"
              placeholder="Nomes dos autores"
              value={form.autores}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div>
            <label>Resumo <span className="obrigatorio">*</span></label>
            <textarea 
              name="resumo"
              rows="3"
              placeholder="Resumo do artigo"
              value={form.resumo}
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
            <label>Revisão Bibliográfica <span className="obrigatorio">*</span></label>
            <textarea 
              name="revisaoBibliografica"
              rows="3"
              placeholder="Referências bibliográficas"
              value={form.revisaoBibliografica}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label>Status</label>
            <select 
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="Rascunho">Rascunho</option>
              <option value="Publicado">Publicado</option>
              <option value="Em revisão">Em revisão</option>
              <option value="Rejeitado">Rejeitado</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '8px' }}>
            <button type="button" className="btn-secondary" onClick={() => navigate('/dashboard')}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Salvando...' : 'Submeter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NovoArtigo