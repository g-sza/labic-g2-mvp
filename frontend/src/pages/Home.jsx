import { FaFlask, FaLightbulb, FaBook } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  function irParaProjetos() {
    navigate('/dashboard', { state: { aba: 'projetos' } })
  }

  return (
    <div className="home">
      <div className="banner">
        <h1>LABIC - Inovação e Criatividade</h1>
        <p>Transformando ideias em soluções reais</p>
        <button onClick={irParaProjetos}>
          Ver projetos do LABIC
        </button>
      </div>

      <div className="grid">
        <div className="card">
          <FaFlask size={40} color="#0F6B4F" />
          <h3>Pesquisa Aplicada</h3>
          <p>Soluções tecnológicas para problemas reais da sociedade</p>
        </div>
        
        <div className="card">
          <FaLightbulb size={40} color="#0F6B4F" />
          <h3>Inovação Aberta</h3>
          <p>Espaço colaborativo para estudantes, pesquisadores e empresas</p>
        </div>
        
        <div className="card">
          <FaBook size={40} color="#0F6B4F" />
          <h3>Produção Acadêmica</h3>
          <p>Artigos, projetos e pesquisas de alto impacto publicados</p>
        </div>
      </div>
    </div>
  )
}

export default Home