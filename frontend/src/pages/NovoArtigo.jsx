import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createArtigo } from '../services/api'

function NovoArtigo() {
  const navigate = useNavigate()
  
  const [form, setForm] = useState({ 
    titulo: '', 
    resumo: '', 
    metodologia: '', 
    revisao_bibliografica: '',
    arquivos_url: '',
    data_publicacao: '',
    status: 'No Rascunho' 
  })
  
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  const exigeCamposBase = form.status !== 'No Rascunho'
  const exigeCamposPublicacao = form.status === 'Publicado'

  function handleChange(e) {
    e.target.setCustomValidity('');
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleInvalid(e) {
    if (e.target.validity.valueMissing) {
      e.target.setCustomValidity('Este campo é obrigatório. Por favor, preencha-o.');
    } else if (e.target.validity.typeMismatch) {
      if (e.target.type === 'url') {
        e.target.setCustomValidity('Por favor, insira uma URL válida.');
      } else {
        e.target.setCustomValidity('Formato inválido.');
      }
    } else {
      e.target.setCustomValidity('Valor inválido.');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    if (!form.titulo) {
      setErro('O título é obrigatório.')
      return
    }

    if (exigeCamposBase) {
      if (!form.resumo || !form.metodologia || !form.revisao_bibliografica) {
         setErro('Resumo, metodologia e revisão bibliográfica são obrigatórios para artigos em andamento ou publicados.')
         return
      }
    }

    if (exigeCamposPublicacao) {
      if (!form.data_publicacao || !form.arquivos_url) {
        setErro('Artigos publicados exigem data de publicação e o link (URL) do arquivo.')
        return
      }
    }

    setLoading(true)
    setErro('')
    
    try {
      const payload = { ...form }
      if (payload.data_publicacao === '') payload.data_publicacao = null

      await createArtigo(payload)
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
            <input type="text" name="titulo" value={form.titulo} onChange={handleChange} onInvalid={handleInvalid} required />
          </div>
          
          <div>
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="No Rascunho">No Rascunho</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Publicado">Publicado</option>
            </select>
          </div>

          <div>
            <label>Resumo {exigeCamposBase && <span className="obrigatorio">*</span>}</label>
            <textarea name="resumo" rows="3" value={form.resumo} onChange={handleChange} onInvalid={handleInvalid} required={exigeCamposBase} />
          </div>
          
          <div>
            <label>Metodologia {exigeCamposBase && <span className="obrigatorio">*</span>}</label>
            <textarea name="metodologia" rows="3" value={form.metodologia} onChange={handleChange} onInvalid={handleInvalid} required={exigeCamposBase} />
          </div>
          
          <div>
            <label>Revisão Bibliográfica {exigeCamposBase && <span className="obrigatorio">*</span>}</label>
            <textarea name="revisao_bibliografica" rows="3" value={form.revisao_bibliografica} onChange={handleChange} onInvalid={handleInvalid} required={exigeCamposBase} />
          </div>
          
          {exigeCamposPublicacao && (
            <>
              <div>
                <label>Data de Publicação <span className="obrigatorio">*</span></label>
                <input type="date" name="data_publicacao" value={form.data_publicacao} onChange={handleChange} onInvalid={handleInvalid} required />
              </div>

              <div>
                <label>Link do Arquivo (URL) <span className="obrigatorio">*</span></label>
                <input type="url" name="arquivos_url" placeholder="https://..." value={form.arquivos_url} onChange={handleChange} onInvalid={handleInvalid} required />
              </div>
            </>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '8px' }}>
            <button type="button" className="btn-secondary" onClick={() => navigate('/dashboard')}>Cancelar</button>
            <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Salvando...' : 'Submeter'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NovoArtigo