import { FaRobot, FaWifi, FaPalette, FaLeaf } from 'react-icons/fa'

function LinhasPesquisa() {
  const linhas = [
    { 
      id: 1, 
      icone: <FaRobot size={40} color="#0F6B4F" />,
      titulo: "Inteligência Artificial", 
      descricao: "Machine learning, visão computacional e processamento de linguagem natural para problemas do cotidiano.", 
      coordenador: "Prof. Dr. Carlos Mendes" 
    },
    { 
      id: 2, 
      icone: <FaWifi size={40} color="#0F6B4F" />,
      titulo: "Internet das Coisas", 
      descricao: "Dispositivos conectados para cidades inteligentes, agricultura de precisão e saúde digital.", 
      coordenador: "Profa. Dra. Ana Carolina Silva" 
    },
    { 
      id: 3, 
      icone: <FaPalette size={40} color="#0F6B4F" />,
      titulo: "Design Digital", 
      descricao: "Novas interfaces, experiências imersivas e metodologias criativas para soluções digitais.", 
      coordenador: "Prof. Me. Ricardo Oliveira" 
    },
    { 
      id: 4, 
      icone: <FaLeaf size={40} color="#0F6B4F" />,
      titulo: "Sustentabilidade", 
      descricao: "Soluções tecnológicas para eficiência energética, gestão de resíduos e desenvolvimento sustentável.", 
      coordenador: "Profa. Dra. Mariana Costa" 
    }
  ]

  return (
    <div className="pagina">
      <h2>🔬 Linhas de Pesquisa</h2>
      <p>O LABIC organiza suas atividades em quatro grandes linhas de pesquisa:</p>
      
      <div className="grid">
        {linhas.map(linha => (
          <div key={linha.id} className="card">
            {linha.icone}
            <h3>{linha.titulo}</h3>
            <p>{linha.descricao}</p>
            <p style={{ color: '#0F6B4F', marginTop: '0.5rem', fontWeight: 'bold' }}>
              📌 Coordenador: {linha.coordenador}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LinhasPesquisa