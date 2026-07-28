import { useState } from 'react'

function Contato() {
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setEnviado(true)
    setTimeout(() => setEnviado(false), 3000)
  }

  return (
    <div className="pagina">
      <h2>Fale Conosco</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div>
          <div className="card">
            <h3>📍 Endereço</h3>
            <p>Rua da Inovação, 1000<br />São Paulo - SP</p>
          </div>
          <div className="card" style={{ marginTop: '1rem' }}>
            <h3>📞 Contato</h3>
            <p>Email: contato@labic.edu.br<br />Telefone: (11) 3456-7890</p>
          </div>
        </div>

        <div className="card">
          <h3>Envie sua mensagem</h3>
          {enviado && <div style={{ background: '#10B981', color: 'white', padding: '0.5rem', borderRadius: '8px', marginBottom: '1rem' }}>Mensagem enviada!</div>}
          
          <form onSubmit={handleSubmit} className="formulario">
            <input type="text" placeholder="Seu nome" required />
            <input type="email" placeholder="Seu email" required />
            <textarea rows="5" placeholder="Sua mensagem" required></textarea>
            <button type="submit">Enviar mensagem</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contato