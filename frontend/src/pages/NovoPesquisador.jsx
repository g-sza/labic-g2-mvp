import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPesquisador } from '../services/api'
import { FaUserPlus, FaUser, FaEnvelope, FaLock, FaGraduationCap, FaBuilding, FaBriefcase, FaUserShield, FaTimes, FaCheck } from 'react-icons/fa'

function NovoPesquisador() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ 
    nome: '', 
    email: '', 
    senha_hash: '', 
    titulacao: '',
    tipo_vinculo: '',
    instituicao: 'LABIC',
    is_admin: false
  })
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  function handleInvalid(e) {
    if (e.target.validity.valueMissing) {
      e.target.setCustomValidity('Este campo é obrigatório. Por favor, preencha-o.');
    } else if (e.target.validity.typeMismatch) {
      if (e.target.type === 'email') {
        e.target.setCustomValidity('Por favor, insira um endereço de e-mail válido contendo "@" e um domínio.');
      } else {
        e.target.setCustomValidity('Formato inválido.');
      }
    } else if (e.target.validity.tooShort) {
      e.target.setCustomValidity(`Este campo precisa ter no mínimo ${e.target.minLength} caracteres.`);
    } else {
      e.target.setCustomValidity('Valor inválido.');
    }
  }

  function handleChange(e) {
    e.target.setCustomValidity(''); 
    
    if (!e.target.validity.valid) {
      handleInvalid(e);
    }

    const valor = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: valor })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    if (!form.nome || !form.email || !form.senha_hash) {
      setErro('Preencha os campos obrigatórios (Nome, Email e Senha)')
      return
    }

    setLoading(true)
    setErro('')
    
    try {
      await createPesquisador(form)
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
      setErro('Erro ao cadastrar. Verifique se o e-mail já existe.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pagina">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2><FaUserPlus color="#0F6B4F" /> Cadastrar Pesquisador</h2>
        
        {erro && <div className="erro">{erro}</div>}
        
        <form className="formulario" onSubmit={handleSubmit}>
          <div>
            <label><FaUser color="#0F6B4F" /> Nome completo: <span className="obrigatorio">*</span></label>
            <input type="text" name="nome" value={form.nome} onChange={handleChange} onInvalid={handleInvalid} required />
          </div>
          
          <div>
            <label><FaEnvelope color="#0F6B4F" /> Email: <span className="obrigatorio">*</span></label>
            <input type="email" name="email" value={form.email} onChange={handleChange} onInvalid={handleInvalid} placeholder="exemplo@labic.com" required />
          </div>

          <div>
            <label><FaLock color="#0F6B4F" /> Senha de Acesso: <span className="obrigatorio">*</span></label>
            <input type="password" name="senha_hash" value={form.senha_hash} onChange={handleChange} onInvalid={handleInvalid} placeholder="Mínimo 6 caracteres" minLength={6} required />
          </div>
          
          <div>
            <label><FaGraduationCap color="#0F6B4F" /> Titulação:</label>
            <input type="text" name="titulacao" value={form.titulacao} onChange={handleChange} placeholder="Ex: Doutor, Mestre, Graduando..." />
          </div>

          <div>
            <label><FaBriefcase color="#0F6B4F" /> Tipo de Vínculo:</label>
            <input type="text" name="tipo_vinculo" value={form.tipo_vinculo} onChange={handleChange} placeholder="Ex: Bolsista, Voluntário, Servidor..." />
          </div>

          <div>
            <label><FaBuilding color="#0F6B4F" /> Instituição:</label>
            <input type="text" name="instituicao" value={form.instituicao} onChange={handleChange} />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', padding: '10px', background: 'var(--code-bg)', borderRadius: '8px' }}>
            <input type="checkbox" name="is_admin" id="is_admin" checked={form.is_admin} onChange={handleChange} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
            <label htmlFor="is_admin" style={{ margin: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaUserShield color="#f39c12" /> Dar permissões de Administrador
            </label>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '16px' }}>
            <button type="button" className="btn-secondary" onClick={() => navigate('/dashboard')}><FaTimes /> Cancelar</button>
            <button type="submit" className="btn-primary" disabled={loading}><FaCheck /> {loading ? 'Salvando...' : 'Cadastrar'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NovoPesquisador