import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'

// Páginas públicas
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import LinhasPesquisa from './pages/LinhasPesquisa'
import Contato from './pages/Contato'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

// Páginas privadas (protegidas)
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
              
              <Route path="/dashboard" element={<Dashboard />} />
              
              <Route path="/novo-pesquisador" element={
                <PrivateRoute><NovoPesquisador /></PrivateRoute>
              } />
              <Route path="/novo-projeto" element={
                <PrivateRoute><NovoProjeto /></PrivateRoute>
              } />
              <Route path="/novo-artigo" element={
                <PrivateRoute><NovoArtigo /></PrivateRoute>
              } />
            </Routes>
          </div>
          <Footer />
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App