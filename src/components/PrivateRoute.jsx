// Proteção das rotas que só admin pode acessar

import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }) {
  // pega o token do localStorage
  const token = localStorage.getItem('labic_token')
  
  // se não tiver token, manda pro login
  if (!token) {
    return <Navigate to="/login" replace />
  }
  
  // se tiver, mostra a página
  return children
}

export default PrivateRoute