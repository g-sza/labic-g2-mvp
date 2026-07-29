function LinhasPesquisa() {
  const linhas = [
    {
      id: 1,
      titulo: "Inteligência Artificial",
      descricao: "Machine learning, visão computacional e processamento de linguagem natural para problemas do cotidiano.",
      coordenador: "Prof. Dr. Carlos Mendes"
    },
    {
      id: 2,
      titulo: "Internet das Coisas",
      descricao: "Dispositivos conectados para cidades inteligentes, agricultura de precisão e saúde digital.",
      coordenador: "Profa. Dra. Ana Carolina Silva"
    },
    {
      id: 3,
      titulo: "Design Digital",
      descricao: "Novas interfaces, experiências imersivas e metodologias criativas para soluções digitais.",
      coordenador: "Prof. Me. Ricardo Oliveira"
    },
    {
      id: 4,
      titulo: "Sustentabilidade",
      descricao: "Soluções tecnológicas para eficiência energética, gestão de resíduos e desenvolvimento sustentável.",
      coordenador: "Profa. Dra. Mariana Costa"
    }
  ]

  return (
    <div className="pagina">
      <h2>Linhas de Pesquisa</h2>
      <p>O LABIC organiza suas atividades nas seguintes linhas de pesquisa:</p>

      <div className="grid">
        {linhas.map(linha => (
          <div key={linha.id} className="card">
            <h3>{linha.titulo}</h3>
            <p>{linha.descricao}</p>
            <p style={{ color: '#0F6B4F', marginTop: '0.5rem' }}>
              Coordenador: {linha.coordenador}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LinhasPesquisa