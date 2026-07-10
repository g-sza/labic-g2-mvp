import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUserPlus, FaUser, FaEnvelope, FaLink, FaTimes, FaCheck } from 'react-icons/fa'
import { createPesquisador } from '../services/api'

function Formulario() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nome: '', area: '', email: '', lattes: '' })
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    if (!form.nome || !form.area || !form.email) {
      setErro('Preencha todos os campos obrigatórios')
      return
    }

    setLoading(true)
    setErro('')
    
    try {
      await createPesquisador(form)
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
        <h2><FaUserPlus color="#0f6b4f" /> Cadastrar Pesquisador</h2>
        
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        
        <form className="formulario" onSubmit={handleSubmit}>
          <div>
            <label><FaUser color="#0f6b4f" /> Nome completo:*</label>
            <input 
              type="text" 
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div>
            <label>📚 Área de atuação:*</label>
            <input 
              type="text" 
              name="area"
              value={form.area}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div>
            <label><FaEnvelope color="#0f6b4f" /> Email:*</label>
            <input 
              type="email" 
              name="email"
              value={form.email}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div>
            <label><FaLink color="#0f6b4f" /> Link do Lattes:</label>
            <input 
              type="url" 
              name="lattes"
              value={form.lattes}
              onChange={handleChange}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="button" onClick={() => navigate('/dashboard')} style={{ background: '#666' }}>
              <FaTimes /> Cancelar
            </button>
            <button type="submit" disabled={loading}>
              <FaCheck /> {loading ? 'Salvando...' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Formulario