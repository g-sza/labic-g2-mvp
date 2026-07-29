import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaSignInAlt } from 'react-icons/fa'

function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setCarregando(true)
    setErro('')

    setTimeout(() => {
      if (email === 'admin@labic.com' && senha === '123456') {
        localStorage.setItem('labic_token', 'admin_logado')
        navigate('/dashboard')
      } else {
        setErro('Email ou senha incorretos')
      }
      setCarregando(false)
    }, 800)
  }

  return (
    <div className="pagina">
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div className="card" style={{ padding: '32px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>🔐 Login Administrativo</h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '24px', fontSize: '0.9rem' }}>
            Acesso restrito ao LABIC
          </p>
          
          {erro && <div className="erro" style={{ textAlign: 'center' }}>{erro}</div>}
          
          <form className="formulario" onSubmit={handleSubmit}>
            <div style={{ position: 'relative' }}>
              <FaUser style={{ position: 'absolute', top: '14px', left: '14px', color: '#999', fontSize: '18px' }} />
              <input 
                type="email" 
                placeholder="admin@labic.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '44px' }}
                required 
              />
            </div>
            
            <div style={{ position: 'relative' }}>
              <input 
                type="password" 
                placeholder="••••••" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                style={{ paddingLeft: '44px' }}
                required 
              />
            </div>
            
            <button type="submit" className="btn-primary" disabled={carregando} style={{ width: '100%', padding: '14px' }}>
              <FaSignInAlt /> {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
          
          <p style={{ marginTop: '20px', fontSize: '0.8rem', textAlign: 'center', color: '#999' }}>
            Credenciais de teste: <strong>admin@labic.com</strong> / <strong>123456</strong>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login