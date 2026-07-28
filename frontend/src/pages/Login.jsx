// Tela de login só admin entra

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

    // Simula uma requisição pro backend
    setTimeout(() => {
      // Credenciais de teste
      if (email === 'admin@labic.com' && senha === '123456') {
        // Salva o token no navegador
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
        <h2>Login Administrativo</h2>
        
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        
        <form className="formulario" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Senha" 
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required 
          />
          <button type="submit" disabled={carregando}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        
        <p style={{ marginTop: '1rem', fontSize: '0.8rem' }}>
          Teste: admin@labic.com / 123456
        </p>
      </div>
    </div>
  )
}

export default Login