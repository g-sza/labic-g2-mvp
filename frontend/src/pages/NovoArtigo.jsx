import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createArtigo, getPesquisadores } from '../services/api'
import { FaTimes } from 'react-icons/fa'

function NovoArtigo() {
  const navigate = useNavigate()
  
  const [pesquisadores, setPesquisadores] = useState([])
  const [coautorSelecionado, setCoautorSelecionado] = useState('')

  const [form, setForm] = useState({ 
    titulo: '', 
    autor_principal_id: '',
    coautor_ids: [],
    resumo: '', 
    metodologia: '', 
    revisao_bibliografica: '',
    arquivos_url: '',
    data_publicacao: '',
    status: 'Rascunho' 
  })
  
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  const exigeCamposBase = form.status !== 'Rascunho'
  const exigeCamposPublicacao = form.status === 'Publicado'

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
    const { name, value } = e.target;
    
    let novoForm = { ...form, [name]: value };

    if (name === 'autor_principal_id') {
      const idNum = parseInt(value);
      novoForm.coautor_ids = novoForm.coautor_ids.filter(id => id !== idNum);
    }

    setForm(novoForm);
  }

  function handleAdicionarCoautor(e) {
    const id = parseInt(e.target.value);
    if (id && !form.coautor_ids.includes(id)) {
      setForm({ ...form, coautor_ids: [...form.coautor_ids, id] });
    }
    setCoautorSelecionado(''); 
  }

  function removerCoautor(idParaRemover) {
    setForm({ 
      ...form, 
      coautor_ids: form.coautor_ids.filter(id => id !== idParaRemover) 
    });
  }

  function handleInvalid(e) {
    if (e.target.validity.valueMissing) {
      e.target.setCustomValidity('Este campo é obrigatório. Por favor, preencha-o.');
    } else if (e.target.validity.typeMismatch) {
      if (e.target.type === 'url') {
        e.target.setCustomValidity('Por favor, insira uma URL válida (exemplo: https://meusite.com).');
      } else {
        e.target.setCustomValidity('Formato inválido.');
      }
    } else {
      e.target.setCustomValidity('Valor inválido.');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    if (!form.titulo || !form.autor_principal_id) {
      setErro('O título e o autor principal são obrigatórios.')
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
      
      payload.autor_principal_id = parseInt(payload.autor_principal_id)
      payload.coautor_ids = payload.coautor_ids.map(id => parseInt(id))

      if (payload.data_publicacao === '') payload.data_publicacao = null

      await createArtigo(payload)

      navigate('/dashboard')
    } catch (error) {
      setErro('Erro ao cadastrar o artigo. Verifique os dados e tente novamente.')
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
            <label>Autor Principal <span className="obrigatorio">*</span></label>
            <select name="autor_principal_id" value={form.autor_principal_id} onChange={handleChange} onInvalid={handleInvalid} required >
              <option value="">Selecione o autor principal</option>
              {pesquisadores.map(p => (
                <option key={p.id_pesquisador} value={p.id_pesquisador}>{p.nome}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Coautores</label>
            <select value={coautorSelecionado} onChange={handleAdicionarCoautor}>
              <option value="" disabled>Selecione para adicionar um coautor...</option>
              {pesquisadores
                .filter(p => p.id_pesquisador !== parseInt(form.autor_principal_id) && !form.coautor_ids.includes(p.id_pesquisador))
                .map(p => (
                  <option key={p.id_pesquisador} value={p.id_pesquisador}>{p.nome}</option>
                ))
              }
            </select>

            {form.coautor_ids.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
                {form.coautor_ids.map(id => {
                  const pesq = pesquisadores.find(p => p.id_pesquisador === id);
                  return (
                    <span key={id} style={{
                      background: 'var(--verde)',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '16px',
                      fontSize: '0.85rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      {pesq?.nome}
                      <FaTimes style={{ cursor: 'pointer', opacity: 0.8 }} onClick={() => removerCoautor(id)} title="Remover coautor" />
                    </span>
                  )
                })}
              </div>
            )}
          </div>
          
          <div>
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="Rascunho">Rascunho</option>
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

          <div style={{ display: 'flex', gap: '1rem', marginTop: '16px' }}>
            <button type="button" className="btn-secondary" onClick={() => navigate('/dashboard')}>Cancelar</button>
            <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Salvando...' : 'Submeter'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NovoArtigo