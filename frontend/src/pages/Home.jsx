function Home({ setPagina }) {
  return (
    <div className="home">
      
      {/* parte de cima com fundo bonito */}
      <div className="banner">
        <h1>LABIC - Inovação e Criatividade</h1>
        <p>Transformando ideias em soluções reais</p>
        <button onClick={() => setPagina('dashboard')}>
          Conheça nossos projetos
        </button>
      </div>

      {/* os 3 cards */}
      <div className="grid">
        <div className="card">
          <h2></h2>
          <h3>Pesquisa Aplicada</h3>
          <p>Soluções tecnológicas para problemas reais</p>
        </div>
        
        <div className="card">
          <h2></h2>
          <h3>Inovação Aberta</h3>
          <p>Espaço de colaboração para todos</p>
        </div>
        
        <div className="card">
          <h2></h2>
          <h3>Produção Acadêmica</h3>
          <p>Artigos e projetos de alto impacto</p>
        </div>
      </div>
    </div>
  )
}

export default Home