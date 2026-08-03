// Proteção das rotas que só admin pode acessar

import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }) {
  // pega o token do localStorage
  const token = localStorage.getItem('labic_token')
  
  // verifica se o usuário é administrador
  const isAdmin = localStorage.getItem('labic_is_admin') === 'true'
  
  // se não tiver token, manda pro login
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // se tiver token, mas não for admin, manda de volta pra tela inicial
  if (!isAdmin) {
    return <Navigate to="/" replace />
  }
  
  // se tiver token e for admin, mostra a página
  return children
}

export default PrivateRoute