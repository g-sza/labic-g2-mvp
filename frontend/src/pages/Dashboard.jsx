import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { FaUsers, FaProjectDiagram, FaFileAlt, FaUserPlus, FaPlus, FaTrash } from 'react-icons/fa'
import { getPesquisadores, getProjetos, getArtigos, deletePesquisador, deleteProjeto, deleteArtigo } from '../services/api'

function Dashboard() {
  const location = useLocation()
  const [aba, setAba] = useState('pesquisadores')
  const [pesquisadores, setPesquisadores] = useState([])
  const [projetos, setProjetos] = useState([])
  const [artigos, setArtigos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (location.state?.aba) {
      setAba(location.state.aba)
    }
  }, [location])

  useEffect(() => {
    carregarDados()
  }, [])

  async function carregarDados() {
    setLoading(true)
    try {
      const [pesq, proj, art] = await Promise.all([
        getPesquisadores(),
        getProjetos(),
        getArtigos()
      ])
      setPesquisadores(pesq)
      setProjetos(proj)
      setArtigos(art)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <h2>Dashboard de Gestão</h2>
        <div className="dashboard-actions">
          <button className="btn-acao" onClick={() => setAba('pesquisadores')}>
            <FaUserPlus /> Novo Pesquisador
          </button>
          <button className="btn-acao" onClick={() => setAba('projetos')}>
            <FaPlus /> Novo Projeto
          </button>
          <button className="btn-acao" onClick={() => setAba('artigos')}>
            <FaPlus /> Novo Artigo
          </button>
        </div>
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

      {loading && <p>Carregando dados...</p>}

      {!loading && aba === 'pesquisadores' && (
        <div className="grid">
          {pesquisadores.map(p => (
            <div key={p.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3>{p.nome}</h3>
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
                  <h3>{p.titulo}</h3>
                  <p>{p.descricao}</p>
                  <p><strong>Responsável:</strong> {p.pesquisadorResponsavel}</p>
                  <p><strong>Status:</strong> {p.status || 'Ativo'}</p>
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
                  <h3>{a.titulo}</h3>
                  <p><strong>Autores:</strong> {a.autores}</p>
                  <p><strong>Status:</strong> {a.status || 'Rascunho'}</p>
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