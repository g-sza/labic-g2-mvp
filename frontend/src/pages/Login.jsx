import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa'

function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const navigate = useNavigate()

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

  async function handleSubmit(e) {
    e.preventDefault()
    setCarregando(true)
    setErro('')

    try {
      const detalhesLogin = new URLSearchParams()
      detalhesLogin.append('username', email)
      detalhesLogin.append('password', senha)

      const resposta = await fetch('https://labic-api.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: detalhesLogin,
      })

      const dados = await resposta.json()

      if (!resposta.ok) {
        setErro(dados.detail || 'Email ou senha incorretos')
        setCarregando(false)
        return
      }

      localStorage.setItem('labic_token', dados.access_token)
      navigate('/dashboard')
    } catch (error) {
      setErro('Erro ao conectar com o servidor. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="pagina">
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div className="card" style={{ padding: '32px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>Login Administrativo</h2>
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
                onChange={(e) => { 
                  e.target.setCustomValidity(''); 
                  if (!e.target.validity.valid) handleInvalid(e);
                  setEmail(e.target.value); 
                }}
                onInvalid={handleInvalid}
                style={{ paddingLeft: '44px' }}
                required 
              />
            </div>
            
            <div style={{ position: 'relative' }}>
              <FaLock style={{ position: 'absolute', top: '14px', left: '14px', color: '#999', fontSize: '18px' }} />
              <input 
                type="password" 
                placeholder="••••••" 
                value={senha}
                onChange={(e) => { 
                  e.target.setCustomValidity(''); 
                  if (!e.target.validity.valid) handleInvalid(e);
                  setSenha(e.target.value); 
                }}
                onInvalid={handleInvalid}
                style={{ paddingLeft: '44px' }}
                minLength={6}
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