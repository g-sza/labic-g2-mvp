import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
// Ícones para o menu
import { FaHome, FaInfoCircle, FaSearch, FaEnvelope, FaUser, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'

function Navbar() {
  const navigate = useNavigate()
  const [logado, setLogado] = useState(false)
  const [contrasteAtivo, setContrasteAtivo] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('labic_token')
    setLogado(!!token)
  }, [])

  // Função do alto contraste
  function ligarContraste() {
    setContrasteAtivo(!contrasteAtivo)
    document.body.classList.toggle('high-contrast')
  }

  function sair() {
    localStorage.removeItem('labic_token')
    setLogado(false)
    navigate('/')
  }

  return (
    <div className="topo">
      <h1>LABIC</h1>
      <nav>
        <Link to="/"><button><FaHome /> Home</button></Link>
        <Link to="/sobre"><button><FaInfoCircle /> Sobre</button></Link>
        <Link to="/linhas-pesquisa"><button><FaSearch /> Linhas</button></Link>
        <Link to="/contato"><button><FaEnvelope /> Contato</button></Link>
        
        {logado ? (
          <>
            <Link to="/dashboard"><button><MdDashboard /> Dashboard</button></Link>
            <button onClick={sair}><FaSignOutAlt /> Sair</button>
          </>
        ) : (
          <Link to="/login"><button><FaSignInAlt /> Admin</button></Link>
        )}
        
        {/* 🔥 BOTÃO NOVO AQUI - SUBSTITUA O ANTIGO POR ESSE */}
        <button 
          onClick={ligarContraste}
          style={{
            background: contrasteAtivo ? '#FFD700' : 'transparent',
            border: '2px solid white',
            color: contrasteAtivo ? '#000' : 'white',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          aria-label="Ativar alto contraste"
          title={contrasteAtivo ? 'Alto Contraste Ativado' : 'Alto Contraste'}
        >
          {contrasteAtivo ? '☀️' : '🌓'}
        </button>
      </nav>
    </div>
  )
}

export default Navbar