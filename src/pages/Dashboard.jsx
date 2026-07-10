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
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <Link to="/novo-pesquisador">
          <button><FaUserPlus /> Novo Pesquisador</button>
        </Link>
        <Link to="/novo-projeto">
          <button><FaPlus /> Novo Projeto</button>
        </Link>
        <Link to="/novo-artigo">
          <button><FaPlus /> Novo Artigo</button>
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '2px solid #ddd', marginBottom: '1.5rem' }}>
        <button 
          onClick={() => setAba('pesquisadores')}
          style={{ 
            background: aba === 'pesquisadores' ? '#f39c12' : 'transparent',
            color: aba === 'pesquisadores' ? 'white' : '#333',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '8px 8px 0 0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <FaUsers /> Pesquisadores ({pesquisadores.length})
        </button>
        <button 
          onClick={() => setAba('projetos')}
          style={{ 
            background: aba === 'projetos' ? '#f39c12' : 'transparent',
            color: aba === 'projetos' ? 'white' : '#333',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '8px 8px 0 0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <FaProjectDiagram /> Projetos ({projetos.length})
        </button>
        <button 
          onClick={() => setAba('artigos')}
          style={{ 
            background: aba === 'artigos' ? '#f39c12' : 'transparent',
            color: aba === 'artigos' ? 'white' : '#333',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '8px 8px 0 0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <FaFileAlt /> Artigos ({artigos.length})
        </button>
      </div>

      {loading && <p>Carregando...</p>}

      {!loading && aba === 'pesquisadores' && (
        <div className="grid">
          {pesquisadores.map(p => (
            <div key={p.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <h3><FaUsers color="#0f6b4f" /> {p.nome}</h3>
                  <p><strong>Área:</strong> {p.area}</p>
                  <p><strong>Email:</strong> {p.email}</p>
                </div>
                <button onClick={() => handleDeletePesquisador(p.id)} style={{ background: '#EF4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <h3><FaProjectDiagram color="#0f6b4f" /> {p.titulo}</h3>
                  <p>{p.descricao}</p>
                  <p><strong>Responsável:</strong> {p.pesquisadorResponsavel}</p>
                </div>
                <button onClick={() => handleDeleteProjeto(p.id)} style={{ background: '#EF4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <h3><FaFileAlt color="#0f6b4f" /> {a.titulo}</h3>
                  <p><strong>Autores:</strong> {a.autores}</p>
                  <p>{a.resumo}</p>
                </div>
                <button onClick={() => handleDeleteArtigo(a.id)} style={{ background: '#EF4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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