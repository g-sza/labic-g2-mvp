import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa'

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
        <div className="card">
          <h2 style={{ textAlign: 'center' }}>🔐 Login Administrativo</h2>
          
          {erro && <p style={{ color: 'red', textAlign: 'center' }}>{erro}</p>}
          
          <form className="formulario" onSubmit={handleSubmit}>
            <div style={{ position: 'relative' }}>
              <FaUser style={{ position: 'absolute', top: '12px', left: '12px', color: '#999' }} />
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '35px' }}
                required 
              />
            </div>
            
            <div style={{ position: 'relative' }}>
              <FaLock style={{ position: 'absolute', top: '12px', left: '12px', color: '#999' }} />
              <input 
                type="password" 
                placeholder="Senha" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                style={{ paddingLeft: '35px' }}
                required 
              />
            </div>
            
            <button type="submit" disabled={carregando} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <FaSignInAlt /> {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
          
          <p style={{ marginTop: '1rem', fontSize: '0.8rem', textAlign: 'center', color: '#666' }}>
            Teste: admin@labic.com / 123456
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login