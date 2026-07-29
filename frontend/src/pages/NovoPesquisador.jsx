import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPesquisador } from '../services/api'
import { FaUserPlus, FaUser, FaEnvelope, FaLink, FaTimes, FaCheck } from 'react-icons/fa'

function NovoPesquisador() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ 
    nome: '', 
    area: '', 
    email: '', 
    lattes: '' 
  })
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
      console.log('Enviando dados:', form) // ← veja no console o que está sendo enviado
      const resposta = await createPesquisador(form)
      console.log('Resposta do backend:', resposta) // ← veja a resposta
      navigate('/dashboard')
    } catch (error) {
      console.error('Erro completo:', error) // ← veja o erro detalhado
      setErro('Erro ao cadastrar. Tente novamente.')
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
            <input 
              type="text" 
              name="nome"
              placeholder="Digite o nome completo"
              value={form.nome}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div>
            <label>Área de atuação: <span className="obrigatorio">*</span></label>
            <input 
              type="text" 
              name="area"
              placeholder="Ex: Inteligência Artificial, IoT, Design"
              value={form.area}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div>
            <label><FaEnvelope color="#0F6B4F" /> Email: <span className="obrigatorio">*</span></label>
            <input 
              type="email" 
              name="email"
              placeholder="email@labic.com"
              value={form.email}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div>
            <label><FaLink color="#0F6B4F" /> Link do Lattes:</label>
            <input 
              type="url" 
              name="lattes"
              placeholder="http://lattes.cnpq.br/..."
              value={form.lattes}
              onChange={handleChange}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '8px' }}>
            <button type="button" className="btn-secondary" onClick={() => navigate('/dashboard')}>
              <FaTimes /> Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              <FaCheck /> {loading ? 'Salvando...' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NovoPesquisador