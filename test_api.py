import requests
import time

# ==========================================
# CONFIGURAÇÃO
# ==========================================
BASE_URL = "http://127.0.0.1:8000" 

ADMIN_EMAIL = "admin@labic.com"
ADMIN_SENHA = "123456"

GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
CYAN = '\033[96m'
RESET = '\033[0m'

def print_step(msg):
    print(f"\n{YELLOW}▶ {msg}{RESET}")

def print_ok(msg):
    print(f"{GREEN}  [✓] {msg}{RESET}")

def print_err(msg):
    print(f"{RED}  [X] ERRO: {msg}{RESET}")
    exit(1)

def rodar_testes():
    print(f"{CYAN}===============================================")
    print("Iniciando Teste de Integração")
    print(f"==============================================={RESET}")
    
    print_step("1. Testando Autenticação (Login JWT)")
    res = requests.post(f"{BASE_URL}/auth/login", data={"username": ADMIN_EMAIL, "password": ADMIN_SENHA})
    if res.status_code != 200: print_err("Falha no login. O servidor está rodando?")
    token = res.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    print_ok("Login realizado! Token capturado com sucesso.")

    print_step("2. Testando CREATE (Inserção no Banco)")
    pesq_res = requests.post(f"{BASE_URL}/pesquisadores/", json={"nome": "Dr. Teste Automatizado", "email": "dr.teste@labic.com"}, headers=headers)
    id_pesq = pesq_res.json().get("id_pesquisador")
    
    proj_res = requests.post(f"{BASE_URL}/projetos/", json={"titulo": "Projeto Automático", "status": "Em Andamento", "pesquisador_id": id_pesq}, headers=headers)
    id_proj = proj_res.json().get("id_projeto")
    
    art_res = requests.post(f"{BASE_URL}/artigos/", json={"titulo": "Artigo Automático", "status": "Rascunho"}, headers=headers)
    id_art = art_res.json().get("id_artigo")
    
    if all([id_pesq, id_proj, id_art]): print_ok(f"Registros criados: Pesquisador({id_pesq}), Projeto({id_proj}), Artigo({id_art}).")
    else: print_err("Falha na criação de registros básicos.")

    print_step("3. Testando Regras de Negócio (Associações)")
    assoc_res = requests.post(f"{BASE_URL}/artigos/{id_art}/pesquisadores/{id_pesq}?is_autor_publicante=true", headers=headers)
    if assoc_res.status_code in [200, 201]: print_ok("Associação N:M (Pesquisador <-> Artigo) concluída.")
    else: print_err("Falha ao criar associação.")

    print_step("4. Testando UPDATE (Atualização de Dados)")
    upd_res = requests.put(f"{BASE_URL}/projetos/{id_proj}", json={"status": "Concluído"}, headers=headers)
    if upd_res.status_code == 200 and upd_res.json().get("status") == "Concluído":
        print_ok("Status do Projeto atualizado para 'Concluído'.")
    else: print_err("Falha ao atualizar projeto.")

    print_step("5. Testando READ (Listagem e Consistência)")
    lista_art = requests.get(f"{BASE_URL}/artigos/", headers=headers).json()
    if any(a["id_artigo"] == id_art for a in lista_art): print_ok("Listagem de dados operando normalmente.")
    else: print_err("Falha na leitura dos dados.")

    print_step("6. Testando DELETE (Exclusão em Cascata / Foreign Keys)")
    time.sleep(1)
    if requests.delete(f"{BASE_URL}/artigos/{id_art}", headers=headers).status_code == 200:
        print_ok("Artigo deletado (Limpou dependências na tabela associativa).")
    if requests.delete(f"{BASE_URL}/projetos/{id_proj}", headers=headers).status_code == 200:
        print_ok("Projeto deletado (Limpou dependências na tabela associativa).")
    if requests.delete(f"{BASE_URL}/pesquisadores/{id_pesq}", headers=headers).status_code == 200:
        print_ok("Pesquisador deletado com segurança.")

    print(f"\n{CYAN}===============================================")
    print("Teste Concluído com Sucesso!")
    print(f"==============================================={RESET}\n")

if __name__ == "__main__":
    rodar_testes()