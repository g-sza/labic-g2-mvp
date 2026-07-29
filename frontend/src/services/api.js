// ============================================
// API - CONEXÃO COM O BACKEND REAL
// ============================================

// URL do backend publicado
const API_URL = 'https://labic-api.onrender.com'

// ============================================
// PESQUISADORES
// ============================================

export async function getPesquisadores() {
  const resposta = await fetch(`${API_URL}/pesquisadores`)
  return resposta.json()
}

export async function createPesquisador(dados) {
  const resposta = await fetch(`${API_URL}/pesquisadores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  })
  return resposta.json()
}

export async function deletePesquisador(id) {
  const resposta = await fetch(`${API_URL}/pesquisadores/${id}`, {
    method: 'DELETE',
  })
  return resposta.json()
}

// ============================================
// PROJETOS
// ============================================

export async function getProjetos() {
  const resposta = await fetch(`${API_URL}/projetos`)
  return resposta.json()
}

export async function createProjeto(dados) {
  const resposta = await fetch(`${API_URL}/projetos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  })
  return resposta.json()
}

export async function deleteProjeto(id) {
  const resposta = await fetch(`${API_URL}/projetos/${id}`, {
    method: 'DELETE',
  })
  return resposta.json()
}

// ============================================
// ARTIGOS
// ============================================

export async function getArtigos() {
  const resposta = await fetch(`${API_URL}/artigos`)
  return resposta.json()
}

export async function createArtigo(dados) {
  const resposta = await fetch(`${API_URL}/artigos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  })
  return resposta.json()
}

export async function deleteArtigo(id) {
  const resposta = await fetch(`${API_URL}/artigos/${id}`, {
    method: 'DELETE',
  })
  return resposta.json()
}