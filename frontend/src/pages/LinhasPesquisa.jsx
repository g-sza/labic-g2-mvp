function LinhasPesquisa() {
  // lista das linhas de pesquisa
  const linhas = [
    { id: 1, titulo: "Inteligência Artificial", descricao: "Machine learning e visão computacional", coordenador: "Prof. Carlos" },
    { id: 2, titulo: "Internet das Coisas", descricao: "Dispositivos conectados", coordenador: "Profa. Ana" },
    { id: 3, titulo: "Design Digital", descricao: "Novas interfaces", coordenador: "Prof. Ricardo" },
    { id: 4, titulo: "Sustentabilidade", descricao: "Tecnologia verde", coordenador: "Profa. Mariana" }
  ]

  return (
    <div className="pagina">
      <h2>Linhas de Pesquisa</h2>
      
      <div className="grid">
        {linhas.map(function(linha) {
          return (
            <div key={linha.id} className="card">
              <h2>{linha.icone}</h2>
              <h3>{linha.titulo}</h3>
              <p>{linha.descricao}</p>
              <p><strong>Coordenador:</strong> {linha.coordenador}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LinhasPesquisa