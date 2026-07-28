import { FaBullseye, FaEye, FaGem, FaHands, FaStar, FaHeart, FaUsers } from 'react-icons/fa'

function Sobre() {
  return (
    <div className="pagina">
      <h2>📖 Sobre o LABIC</h2>
      
      <div className="grid">
        <div className="card">
          <FaBullseye size={40} color="#0F6B4F" />
          <h3>🎯 Missão</h3>
          <p>Promover inovação e desenvolvimento tecnológico através da pesquisa aplicada, formando profissionais criativos e preparados para os desafios do futuro.</p>
        </div>
        
        <div className="card">
          <FaEye size={40} color="#0F6B4F" />
          <h3>👁️ Visão</h3>
          <p>Ser referência nacional em inovação e criatividade aplicada à tecnologia, conectando academia, indústria e sociedade.</p>
        </div>
        
        <div className="card">
          <FaGem size={40} color="#0F6B4F" />
          <h3>💎 Valores</h3>
          <ul>
            <li>💡 Inovação constante</li>
            <li><FaHands color="#0F6B4F" /> Colaboração interdisciplinar</li>
            <li><FaStar color="#0F6B4F" /> Compromisso com a qualidade</li>
            <li><FaHeart color="#0F6B4F" /> Transparência e ética</li>
            <li><FaUsers color="#0F6B4F" /> Inclusão e diversidade</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sobre