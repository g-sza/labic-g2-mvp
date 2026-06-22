// Menu de navegação mostra login/logout

import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {
  const navigate = useNavigate()
  const [logado, setLogado] = useState(false)

  // Verifica se o usuário está logado
  useEffect(() => {
    const token = localStorage.getItem('labic_token')
    setLogado(!!token)
  }, [])

  function ligarContraste() {
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
        <Link to="/"><button>Home</button></Link>
        <Link to="/sobre"><button>Sobre</button></Link>
        <Link to="/linhas-pesquisa"><button>Linhas</button></Link>
        <Link to="/contato"><button>Contato</button></Link>
        
        {logado ? (
          <>
            <Link to="/dashboard"><button>Dashboard</button></Link>
            <button onClick={sair}>Sair</button>
          </>
        ) : (
          <Link to="/login"><button>Admin</button></Link>
        )}
        
        <button onClick={ligarContraste}>Alto Contraste</button>
      </nav>
    </div>
  )
}

export default Navbar