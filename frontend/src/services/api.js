// ============================================
// API - CONEXÃO COM O BACKEND
// ============================================

const API_URL = import.meta.env.API_URL

// ============================================
// FUNÇÃO PARA PEGAR O TOKEN
// ============================================

function getToken() {
  const token = localStorage.getItem('labic_token')
  console.log('Token sendo usado:', token)  // ← veja se o token existe
  return token
}

// ============================================
// PESQUISADORES
// ============================================

export async function getPesquisadores() {
  const token = getToken()
  const resposta = await fetch(`${API_URL}/pesquisadores/`, {
    headers: { 'Authorization': `Bearer ${token}` },
  })
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`)
  }
  return resposta.json()
}

export async function createPesquisador(dados) {
  const token = getToken()
  const resposta = await fetch(`${API_URL}/pesquisadores/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  })
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`)
  }
  return resposta.json()
}

export async function deletePesquisador(id) {
  const token = getToken()
  const resposta = await fetch(`${API_URL}/pesquisadores/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  })
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`)
  }
  return resposta.json()
}

// ============================================
// PROJETOS
// ============================================

export async function getProjetos() {
  const token = getToken()
  const resposta = await fetch(`${API_URL}/projetos/`, {
    headers: { 'Authorization': `Bearer ${token}` },
  })
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`)
  }
  return resposta.json()
}

export async function createProjeto(dados) {
  const token = getToken()
  const resposta = await fetch(`${API_URL}/projetos/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  })
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`)
  }
  return resposta.json()
}

export async function deleteProjeto(id) {
  const token = getToken()
  const resposta = await fetch(`${API_URL}/projetos/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  })
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`)
  }
  return resposta.json()
}

// ============================================
// ARTIGOS
// ============================================

export async function getArtigos() {
  const token = getToken()
  const resposta = await fetch(`${API_URL}/artigos/`, {
    headers: { 'Authorization': `Bearer ${token}` },
  })
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`)
  }
  return resposta.json()
}

export async function createArtigo(dados) {
  const token = getToken()
  const resposta = await fetch(`${API_URL}/artigos/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  })
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`)
  }
  return resposta.json()
}

export async function deleteArtigo(id) {
  const token = getToken()
  const resposta = await fetch(`${API_URL}/artigos/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  })
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`)
  }
  return resposta.json()
}

// ============================================
// ASSOCIAÇÕES
// ============================================

export async function associarPesquisadorProjeto(idProjeto, idPesquisador, papel = "Participante") {
  const token = getToken()
  const resposta = await fetch(`${API_URL}/projetos/${idProjeto}/pesquisadores/${idPesquisador}?papel=${papel}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  })
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`)
  }
  return resposta.json()
}

export async function associarPesquisadorArtigo(idArtigo, idPesquisador, isAutorPublicante = true) {
  const token = getToken()
  const resposta = await fetch(`${API_URL}/artigos/${idArtigo}/pesquisadores/${idPesquisador}?is_autor_publicante=${isAutorPublicante}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  })
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`)
  }
  return resposta.json()
}