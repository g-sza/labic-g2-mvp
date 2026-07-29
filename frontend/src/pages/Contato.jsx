import { useState } from 'react'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane } from 'react-icons/fa'

function Contato() {
  const [enviado, setEnviado] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setEnviado(true)
    setTimeout(() => setEnviado(false), 3000)
  }

  return (
    <div className="pagina">
      <h2>Fale Conosco</h2>
      
      <div className="grid">
        <div>
          <div className="card">
            <h3><FaMapMarkerAlt color="#0F6B4F" /> Endereço</h3>
            <p>
              Rua da Inovação, 1000<br />
              Bairro Tecnológico<br />
              Aracaju - SE, 01234-567
            </p>
          </div>
          
          <div className="card" style={{ marginTop: '1rem' }}>
            <h3><FaPhone color="#0F6B4F" /> Contato</h3>
            <p>
              <strong>Telefone:</strong> (11) 3456-7890<br />
              <strong>Email:</strong>  contato@labic.edu.br<br />
              <strong>Horário:</strong> Segunda a Sexta, 9h às 18h
            </p>
          </div>
        </div>
        
        <div className="card">
          <h3>Envie sua mensagem</h3>
          
          {enviado && (
            <p style={{ color: 'green', background: '#e8f5e9', padding: '10px', borderRadius: '8px' }}>
              Mensagem enviada com sucesso!
            </p>
          )}
          
          <form className="formulario" onSubmit={handleSubmit}>
            <input type="text" placeholder="Seu nome" required />
            <input type="email" placeholder="Seu email" required />
            <input type="text" placeholder="Assunto" required />
            <textarea rows="5" placeholder="Sua mensagem" required></textarea>
            <button type="submit" className="btn-primary">
              <FaPaperPlane /> Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contato