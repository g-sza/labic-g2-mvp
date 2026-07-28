import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaUsers, FaProjectDiagram, FaFileAlt, FaUserPlus, FaPlus, FaTrash } from 'react-icons/fa'
import { getPesquisadores, getProjetos, getArtigos, deletePesquisador, deleteProjeto, deleteArtigo } from '../services/api'

function Dashboard() {
  const [aba, setAba] = useState('pesquisadores')
  const [pesquisadores, setPesquisadores] = useState([])
  const [projetos, setProjetos] = useState([])
  const [artigos, setArtigos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    carregarDados()
  }, [])

  async function carregarDados() {
    setLoading(true)
    const [pesq, proj, art] = await Promise.all([
      getPesquisadores(),
      getProjetos(),
      getArtigos()
    ])
    setPesquisadores(pesq)
    setProjetos(proj)
    setArtigos(art)
    setLoading(false)
  }

  async function handleDeletePesquisador(id) {
    if (window.confirm('Tem certeza que deseja excluir este pesquisador?')) {
      await deletePesquisador(id)
      carregarDados()
    }
  }

  async function handleDeleteProjeto(id) {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      await deleteProjeto(id)
      carregarDados()
    }
  }

  async function handleDeleteArtigo(id) {
    if (window.confirm('Tem certeza que deseja excluir este artigo?')) {
      await deleteArtigo(id)
      carregarDados()
    }
  }

  return (
    <div className="pagina">
      <h2>📊 Dashboard de Gestão</h2>
      
      <div className="dashboard-actions">
        <Link to="/novo-pesquisador" className="btn-acao">
          <FaUserPlus /> Novo Pesquisador
        </Link>
        <Link to="/novo-projeto" className="btn-acao">
          <FaPlus /> Novo Projeto
        </Link>
        <Link to="/novo-artigo" className="btn-acao">
          <FaPlus /> Novo Artigo
        </Link>
      </div>

      <div className="abas-container">
        <button 
          className={`aba ${aba === 'pesquisadores' ? 'ativa' : ''}`}
          onClick={() => setAba('pesquisadores')}
        >
          <FaUsers /> Pesquisadores <span className="badge">{pesquisadores.length}</span>
        </button>
        <button 
          className={`aba ${aba === 'projetos' ? 'ativa' : ''}`}
          onClick={() => setAba('projetos')}
        >
          <FaProjectDiagram /> Projetos <span className="badge">{projetos.length}</span>
        </button>
        <button 
          className={`aba ${aba === 'artigos' ? 'ativa' : ''}`}
          onClick={() => setAba('artigos')}
        >
          <FaFileAlt /> Artigos <span className="badge">{artigos.length}</span>
        </button>
      </div>

      {loading && <p>Carregando...</p>}

      {!loading && aba === 'pesquisadores' && (
        <div className="grid">
          {pesquisadores.map(p => (
            <div key={p.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3><FaUsers color="#0F6B4F" /> {p.nome}</h3>
                  <p><strong>Área:</strong> {p.area}</p>
                  <p><strong>Email:</strong> {p.email}</p>
                </div>
                <button className="btn-excluir" onClick={() => handleDeletePesquisador(p.id)}>
                  <FaTrash /> Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && aba === 'projetos' && (
        <div className="grid">
          {projetos.map(p => (
            <div key={p.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3><FaProjectDiagram color="#0F6B4F" /> {p.titulo}</h3>
                  <p>{p.descricao}</p>
                  <p><strong>Responsável:</strong> {p.pesquisadorResponsavel}</p>
                </div>
                <button className="btn-excluir" onClick={() => handleDeleteProjeto(p.id)}>
                  <FaTrash /> Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && aba === 'artigos' && (
        <div className="grid">
          {artigos.map(a => (
            <div key={a.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3><FaFileAlt color="#0F6B4F" /> {a.titulo}</h3>
                  <p><strong>Autores:</strong> {a.autores}</p>
                  <p>{a.resumo}</p>
                </div>
                <button className="btn-excluir" onClick={() => handleDeleteArtigo(a.id)}>
                  <FaTrash /> Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard