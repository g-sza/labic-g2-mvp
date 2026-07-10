import { FaFlask, FaLightbulb, FaBook } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <div className="banner">
        <h1>🚀 LABIC - Inovação e Criatividade</h1>
        <p>Transformando ideias em soluções reais</p>
        <button onClick={() => navigate('/dashboard')}>
          Conheça nossos projetos
        </button>
      </div>

      <div className="grid">
        <div className="card">
          <FaFlask size={40} color="#0f6b4f" />
          <h3>Pesquisa Aplicada</h3>
          <p>Soluções tecnológicas para problemas reais da sociedade</p>
        </div>
        
        <div className="card">
          <FaLightbulb size={40} color="#f39c12" />
          <h3>Inovação Aberta</h3>
          <p>Espaço colaborativo para estudantes, pesquisadores e empresas</p>
        </div>
        
        <div className="card">
          <FaBook size={40} color="#0f6b4f" />
          <h3>Produção Acadêmica</h3>
          <p>Artigos, projetos e pesquisas de alto impacto publicados</p>
        </div>
      </div>
    </div>
  )
}

export default Home