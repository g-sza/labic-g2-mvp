// Formulário para submeter novo artigo

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
    revisaoBibliografica: '' 
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
            <label>Autores:*</label>
            <input 
              type="text" 
              name="autores"
              value={form.autores}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div>
            <label>Resumo:*</label>
            <textarea 
              name="resumo"
              rows="3"
              value={form.resumo}
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
            <label>Revisão Bibliográfica:*</label>
            <textarea 
              name="revisaoBibliografica"
              rows="3"
              value={form.revisaoBibliografica}
              onChange={handleChange}
              required
            />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="button" onClick={() => navigate('/dashboard')}>Cancelar</button>
            <button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Submeter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NovoArtigo