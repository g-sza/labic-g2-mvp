import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

// Páginas públicas
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import LinhasPesquisa from './pages/LinhasPesquisa'
import Contato from './pages/Contato'
import Login from './pages/Login'

// Páginas privadas
import Dashboard from './pages/Dashboard'
import NovoPesquisador from './pages/NovoPesquisador'
import NovoProjeto from './pages/NovoProjeto'
import NovoArtigo from './pages/NovoArtigo'

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main className="main-content">
          <div className="container">
            <Routes>
              {/* Rotas públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/linhas-pesquisa" element={<LinhasPesquisa />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/login" element={<Login />} />
              
              {/* Rotas privadas (protegidas) */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/novo-pesquisador" element={<NovoPesquisador />} />
              <Route path="/novo-projeto" element={<NovoProjeto />} />
              <Route path="/novo-artigo" element={<NovoArtigo />} />
            </Routes>
          </div>
          <Footer />
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App