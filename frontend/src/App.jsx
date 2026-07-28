// Componente principal com rotas

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'

// Páginas públicas
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import LinhasPesquisa from './pages/LinhasPesquisa'
import Contato from './pages/Contato'
import Login from './pages/Login'

// Páginas privadas (precisa estar logado)
import Dashboard from './pages/Dashboard'
import NovoPesquisador from './pages/NovoPesquisador'
import NovoProjeto from './pages/NovoProjeto'
import NovoArtigo from './pages/NovoArtigo'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/linhas-pesquisa" element={<LinhasPesquisa />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/login" element={<Login />} />
          
          {/* Rotas privadas */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          
          <Route path="/novo-pesquisador" element={
            <PrivateRoute>
              <NovoPesquisador />
            </PrivateRoute>
          } />
          
          <Route path="/novo-projeto" element={
            <PrivateRoute>
              <NovoProjeto />
            </PrivateRoute>
          } />
          
          <Route path="/novo-artigo" element={
            <PrivateRoute>
              <NovoArtigo />
            </PrivateRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App