// Simula o backend com dados em memória
// Substitui o banco de dados enquanto ainda não temos API real

let pesquisadores = [
  { id: 1, nome: 'Ana Paula Silva', area: 'Inteligência Artificial', email: 'ana@labic.com' },
  { id: 2, nome: 'Carlos Mendes', area: 'Internet das Coisas', email: 'carlos@labic.com' }
]

let projetos = [
  { id: 1, titulo: 'Smart Campus', descricao: 'Monitoramento inteligente', metodologia: 'Ágil', pesquisadorResponsavel: 'Ana Paula Silva' }
]

let artigos = [
  { id: 1, titulo: 'IA na Educação', autores: 'Ana Paula Silva', resumo: 'Resumo do artigo...', metodologia: 'Pesquisa aplicada', revisaoBibliografica: 'Referências...' }
]

// ===== PESQUISADORES =====

export async function getPesquisadores() {
  return new Promise(resolve => setTimeout(() => resolve([...pesquisadores]), 300))
}

export async function createPesquisador(data) {
  return new Promise(resolve => {
    const novo = { id: pesquisadores.length + 1, ...data }
    pesquisadores.push(novo)
    setTimeout(() => resolve(novo), 300)
  })
}

export async function deletePesquisador(id) {
  return new Promise(resolve => {
    pesquisadores = pesquisadores.filter(p => p.id !== id)
    setTimeout(() => resolve({ success: true }), 300)
  })
}

// ===== PROJETOS =====

export async function getProjetos() {
  return new Promise(resolve => setTimeout(() => resolve([...projetos]), 300))
}

export async function createProjeto(data) {
  return new Promise(resolve => {
    const novo = { id: projetos.length + 1, ...data }
    projetos.push(novo)
    setTimeout(() => resolve(novo), 300)
  })
}

export async function deleteProjeto(id) {
  return new Promise(resolve => {
    projetos = projetos.filter(p => p.id !== id)
    setTimeout(() => resolve({ success: true }), 300)
  })
}

// ===== ARTIGOS =====

export async function getArtigos() {
  return new Promise(resolve => setTimeout(() => resolve([...artigos]), 300))
}

export async function createArtigo(data) {
  return new Promise(resolve => {
    const novo = { id: artigos.length + 1, ...data }
    artigos.push(novo)
    setTimeout(() => resolve(novo), 300)
  })
}

export async function deleteArtigo(id) {
  return new Promise(resolve => {
    artigos = artigos.filter(a => a.id !== id)
    setTimeout(() => resolve({ success: true }), 300)
  })
}