import requests
import time
import sys


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
    raise RuntimeError(msg)

def rodar_testes():
    print(f"{CYAN}===============================================")
    print("Iniciando Teste de Integração (Ponta a Ponta)")
    print(f"==============================================={RESET}")
    
    id_pesq_principal = None
    id_pesq_coautor = None
    id_proj = None
    id_art = None
    headers = {}

    try:
        print_step("1. Testando Autenticação (Login JWT)")
        res = requests.post(f"{BASE_URL}/auth/login", data={"username": ADMIN_EMAIL, "password": ADMIN_SENHA})
        if res.status_code != 200: print_err(f"Falha no login. Status: {res.status_code}")
        token = res.json().get("access_token")
        headers = {"Authorization": f"Bearer {token}"}
        print_ok("Login realizado! Token capturado com sucesso.")

        print_step("2. Testando CREATE (Inserção no Banco)")
        payload_pesq = {"nome": "Dr. Principal Teste", "email": "autor_teste@labic.com", "senha_hash": "senha123"}
        pesq_res = requests.post(f"{BASE_URL}/pesquisadores/", json=payload_pesq, headers=headers)
        if pesq_res.status_code not in [200, 201]: print_err(f"Erro Pesquisador: {pesq_res.text}")
        id_pesq_principal = pesq_res.json().get("id_pesquisador")
        
        payload_coautor = {"nome": "Dr. Coautor Teste", "email": "coautor_teste@labic.com", "senha_hash": "senha123"}
        coautor_res = requests.post(f"{BASE_URL}/pesquisadores/", json=payload_coautor, headers=headers)
        if coautor_res.status_code not in [200, 201]: print_err(f"Erro Coautor: {coautor_res.text}")
        id_pesq_coautor = coautor_res.json().get("id_pesquisador")
        
        payload_proj = {"titulo": "Projeto Automático Teste", "status": "Em Andamento", "pesquisador_id": id_pesq_principal}
        proj_res = requests.post(f"{BASE_URL}/projetos/", json=payload_proj, headers=headers)
        if proj_res.status_code not in [200, 201]: print_err(f"Erro Projeto: {proj_res.text}")
        id_proj = proj_res.json().get("id_projeto")
        
        payload_art = {"titulo": "Artigo Automático Teste", "status": "Rascunho", "autor_principal_id": id_pesq_principal}
        art_res = requests.post(f"{BASE_URL}/artigos/", json=payload_art, headers=headers)
        if art_res.status_code not in [200, 201]: print_err(f"Erro Artigo: {art_res.text}")
        id_art = art_res.json().get("id_artigo")
        
        print_ok("Registros criados no banco de dados!")

        print_step("3. Testando Regras de Negócio (Associações)")
        assoc_res = requests.post(f"{BASE_URL}/artigos/{id_art}/pesquisadores/{id_pesq_coautor}?is_autor_publicante=false", headers=headers)
        if assoc_res.status_code in [200, 201]: 
            print_ok("Associação N:M (Coautor <-> Artigo) concluída.")
        else: 
            print_err(f"Falha ao criar associação. Status: {assoc_res.status_code}")

        print_step("4. Testando UPDATE (Atualização de Dados)")
        payload_upd = {"titulo": "Projeto Automático Teste", "status": "Concluido"}
        upd_res = requests.put(f"{BASE_URL}/projetos/{id_proj}", json=payload_upd, headers=headers)
        
        if upd_res.status_code == 200 and upd_res.json().get("status") == "Concluido":
            print_ok("Status do Projeto atualizado para 'Concluído'.")
        else: 
            print_err(f"Falha ao atualizar projeto. Status: {upd_res.status_code} - {upd_res.text}")

        print_step("5. Testando READ (Listagem e Consistência)")
        lista_art = requests.get(f"{BASE_URL}/artigos/", headers=headers).json()
        if any(a["id_artigo"] == id_art for a in lista_art): 
            print_ok("Listagem de dados operando normalmente.")
        else: 
            print_err("Falha na leitura dos dados.")

    finally:
        print_step("6. Limpeza do Banco de Dados")
        time.sleep(1)
        
        if id_art:
            if requests.delete(f"{BASE_URL}/artigos/{id_art}", headers=headers).status_code == 204:
                print_ok("Artigo de teste deletado.")
        if id_proj:
            if requests.delete(f"{BASE_URL}/projetos/{id_proj}", headers=headers).status_code == 204:
                print_ok("Projeto de teste deletado.")
        if id_pesq_principal:
            if requests.delete(f"{BASE_URL}/pesquisadores/{id_pesq_principal}", headers=headers).status_code == 204:
                print_ok("Pesquisador Principal deletado.")
        if id_pesq_coautor:
            if requests.delete(f"{BASE_URL}/pesquisadores/{id_pesq_coautor}", headers=headers).status_code == 204:
                print_ok("Pesquisador Coautor deletado.")

        print(f"\n{CYAN}===============================================")
        print("Teste Finalizado! O banco de dados está limpo.")
        print(f"==============================================={RESET}\n")

if __name__ == "__main__":
    try:
        rodar_testes()
    except RuntimeError:
        sys.exit(1)