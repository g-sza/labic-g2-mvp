import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { 
  FaHome, FaInfoCircle, FaSearch, FaEnvelope, 
  FaUsers, FaProjectDiagram, FaFileAlt, 
  FaSignInAlt, FaSignOutAlt,
  FaBars, FaTimes, FaUniversity, FaCog,
  FaUserPlus, FaPlus, FaTrash, FaEdit,
  FaPhone, FaMapMarkerAlt, FaPaperPlane,
  FaFlask, FaLightbulb, FaBook
} from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [logado, setLogado] = useState(false)
  const [menuAberto, setMenuAberto] = useState(false)
  const [contrasteAtivo, setContrasteAtivo] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('labic_token')
    setLogado(!!token)
  }, [])

  function ligarContraste() {
    setContrasteAtivo(!contrasteAtivo)
    document.body.classList.toggle('high-contrast')
  }

  function sair() {
    localStorage.removeItem('labic_token')
    setLogado(false)
    navigate('/')
  }

  function toggleMenu() {
    setMenuAberto(!menuAberto)
  }

  function fecharMenu() {
    setMenuAberto(false)
  }

  function isActive(path) {
    return location.pathname === path
  }

  return (
    <>
      {/* Botão Hamburguer - Mobile */}
      <button className="btn-hamburguer" onClick={toggleMenu}>
        {menuAberto ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Overlay para fechar menu no mobile */}
      {menuAberto && (
        <div className="sidebar-overlay" onClick={fecharMenu}></div>
      )}

      {/* Menu Lateral - VERDE PREDOMINANTE */}
      <div className={`sidebar ${menuAberto ? 'sidebar-aberta' : 'sidebar-fechada'}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <FaUniversity size={28} color="#FFD700" />
          <span>LABIC</span>
        </div>

        {/* Usuário logado */}
        <div className="sidebar-usuario">
          <div className="avatar">MA</div>
          <div className="usuario-info">
            <strong>Miqueas Andrade</strong>
            <span>admin@labic.com</span>
          </div>
        </div>

        {/* Menu de navegação */}
        <nav className="sidebar-nav">
          {/* Início */}
          <div className={`menu-item ${isActive('/') ? 'active' : ''}`}>
            <Link to="/" onClick={fecharMenu}>
              <FaHome /> Início
            </Link>
          </div>

          {/* Páginas Institucionais */}
          <div className="menu-categoria">Páginas Institucionais</div>
          <div className={`menu-item ${isActive('/sobre') ? 'active' : ''}`}>
            <Link to="/sobre" onClick={fecharMenu}>
              <FaInfoCircle /> Sobre
            </Link>
          </div>
          <div className={`menu-item ${isActive('/linhas-pesquisa') ? 'active' : ''}`}>
            <Link to="/linhas-pesquisa" onClick={fecharMenu}>
              <FaSearch /> Linhas de Pesquisa
            </Link>
          </div>
          <div className={`menu-item ${isActive('/contato') ? 'active' : ''}`}>
            <Link to="/contato" onClick={fecharMenu}>
              <FaEnvelope /> Contato
            </Link>
          </div>

          {/* Gestão */}
          <div className="menu-categoria">Gestão</div>
          <div className={`menu-item ${isActive('/dashboard') ? 'active' : ''}`}>
            <Link to="/dashboard" onClick={fecharMenu}>
              <MdDashboard /> Dashboard
            </Link>
          </div>
          <div className={`menu-item ${isActive('/novo-pesquisador') ? 'active' : ''}`}>
            <Link to="/novo-pesquisador" onClick={fecharMenu}>
              <FaUserPlus /> Novo Pesquisador
            </Link>
          </div>
          <div className={`menu-item ${isActive('/novo-projeto') ? 'active' : ''}`}>
            <Link to="/novo-projeto" onClick={fecharMenu}>
              <FaPlus /> Novo Projeto
            </Link>
          </div>
          <div className={`menu-item ${isActive('/novo-artigo') ? 'active' : ''}`}>
            <Link to="/novo-artigo" onClick={fecharMenu}>
              <FaPlus /> Novo Artigo
            </Link>
          </div>

          {/* Administração */}
          <div className="menu-categoria">Administração</div>
          {logado ? (
            <div className="menu-item" onClick={() => { sair(); fecharMenu(); }}>
              <FaSignOutAlt /> Sair
            </div>
          ) : (
            <div className={`menu-item ${isActive('/login') ? 'active' : ''}`}>
              <Link to="/login" onClick={fecharMenu}>
                <FaSignInAlt /> Login
              </Link>
            </div>
          )}

          {/* Acessibilidade */}
          <div className="menu-divider"></div>
          <div className="menu-item">
            <button className="btn-contraste-sidebar" onClick={ligarContraste}>
              <span style={{ fontSize: '20px' }}>🌓</span> Alto Contraste
            </button>
          </div>
        </nav>

        {/* Rodapé do menu */}
        <div className="sidebar-footer">
          <p>© 2026 LABIC</p>
        </div>
      </div>
    </>
  )
}

export default Sidebar