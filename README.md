# LABIC - Portal Institucional e Gestão de Pesquisa (MVP)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109+-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18+-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

Projeto desenvolvido como solução tecnológica para o **Desafio Tecnológico do Programa Conecta e Capacita 04 (CEPEDI)**. 

O objetivo deste MVP é fornecer uma vitrine digital e um painel administrativo centralizado para o Laboratório de Inovação e Criatividade (LABIC), permitindo a gestão eficiente de pesquisadores, projetos em execução e artigos acadêmicos.

---

## <img src="https://api.iconify.design/octicon/list-unordered-16.svg?color=%23238636" width="32" align="absmiddle"> Funcionalidades Principais
* **Painel Administrativo:** Gestão completa (CRUD) de pesquisadores, projetos e artigos científicos.
* **Autenticação Segura:** Login protegido via tokens JWT e criptografia de senhas.
* **Associações Complexas:** Relacionamento N:M inteligente entre artigos e múltiplos coautores.
* **Deleção em Cascata:** Limpeza segura de banco de dados e dependências (Teardown).

---

## <img src="https://api.iconify.design/octicon/code-16.svg?color=%23238636" width="32" align="absmiddle"> Tecnologias Utilizadas

**Front-end:**
* **React.js** com **Vite**
* HTML5, CSS3 e JavaScript
* React Router

**Back-end:**
* **Python 3.11+**
* **FastAPI**
* **Pydantic**
* **SQLAlchemy**
* Autenticação com tokens **JWT** e criptografia **Bcrypt**
* Pytest e Requests (Testes unitários e de integração)

**Infraestrutura e Banco de Dados:**
* **SQLite** (Local) / **PostgreSQL** (Nuvem)
* Deploy no **Render** (API), **Vercel** (Front-end) e **Supabase** (Banco de Dados)

---

## <img src="https://api.iconify.design/octicon/globe-16.svg?color=%23238636" width="32" align="absmiddle"> Acesso em Produção (Nuvem)

O sistema já se encontra publicado e pronto para uso.
- **Acesso ao Sistema:** https://labic-frontend.vercel.app/

---

## <img src="https://api.iconify.design/octicon/checklist-16.svg?color=%23238636" width="32" align="absmiddle"> Pré-requisitos para Instalação Local

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:
1. [Git](https://git-scm.com/)
2. [Python 3.11 ou superior](https://www.python.org/downloads/)
3. [Node.js 18 ou superior](https://nodejs.org/) 
4. Um editor de código de sua preferência (ex: VS Code)

---

## <img src="https://api.iconify.design/octicon/terminal-16.svg?color=%23238636" width="32" align="absmiddle"> Como Instalar e Rodar o Projeto Localmente

Siga o passo a passo abaixo para executar a aplicação completa em sua máquina.

### PASSO 1 - Configurando o Backend (API)

1. Clone o repositório:
   ```bash
   git clone https://github.com/g-sza/labic-g2-mvp
   ```

2. Entre na pasta do backend:
   ```bash
   cd labic-g2-mvp/backend/labic-api
   ```
3. Crie o ambiente virtual (venv):
   - Windows: 
   ```bash
   python -m venv venv
   ```
 
   - Mac/Linux: 
   ```bash
   python3 -m venv venv
   ```
4. Ative o ambiente virtual:
   - Windows: 
   ```bash
   venv\Scripts\activate
   ```
 
   - Mac/Linux: 
   ```bash
   source venv/bin/activate
   ``` 

5. Instale as dependências listadas no arquivo **requirements.txt**:
   ```bash
   pip install -r requirements.txt
   ``` 

6. Crie um arquivo chamado `.env` dentro da pasta labic-api com os seguintes dados:

   ```text
   SECRET_KEY="[chave para criação de tokens JWT com no mínimo 32 caracteres]"
   DATABASE_URL="sqlite:///./labic.db"
   FRONTEND_URL="http://localhost:5173"
   ADMIN_EMAIL="admin@labic.com"
   ADMIN_PASSWORD="123456"
   ``` 

   *(Evite caracteres especiais na SECRET_KEY para prevenir erros de tratamento).*

7. Crie o banco de dados e o primeiro administrador:
   
   *(Garanta que o terminal esteja na pasta backend/labic-api com o ambiente virtual ativado)*
   ```bash
   python criar_admin.py
   ``` 

8. Inicie o servidor do Backend:
   ```bash
   uvicorn main:app --reload
   ``` 

   *(A API estará rodando em: http://127.0.0.1:8000)*

---

## <img src="https://api.iconify.design/octicon/book-16.svg?color=%23238636" width="26" align="absmiddle"> Documentação Interativa da API (Swagger)

Como o projeto utiliza o framework FastAPI, a documentação dos endpoints é gerada automaticamente de acordo com o padrão OpenAPI. Com o backend rodando localmente, acesse no seu navegador:

**http://127.0.0.1:8000/docs**

Lá você pode testar rotas e simular requisições diretamente pela interface visual, sem precisar do frontend.

---

### PASSO 2 - Configurando o Frontend

1. Abra um novo terminal na raiz do projeto (mantenha o do backend rodando).

2. Entre na pasta do frontend:
   ```bash
   cd frontend
   ``` 

3. Crie um arquivo chamado `.env` dentro da pasta frontend com o seguinte:
   ```text
   VITE_API_URL="http://127.0.0.1:8000"
   ``` 

4. Instale as dependências do Node na pasta frontend:
   ```bash
   npm install
   ``` 

5. Inicie o servidor do Frontend:
   ```bash
   npm run dev
   ``` 

   *(Pronto! O site estará disponível no seu navegador em: http://localhost:5173)*

---

## <img src="https://api.iconify.design/octicon/shield-check-16.svg?color=%23238636" width="32" align="absmiddle"> Executando a Bateria de Testes

Com a API rodando localmente, você pode validar a integridade do sistema com testes automatizados:

1. Testes Unitários:
   - Abra um terminal na pasta `backend/labic-api/` **com o ambiente virtual ativado** (passo 1.4) e execute:
      ```bash
      pytest tests/test_api.py
      ``` 

2. Testes de Integração (E2E):
   - Abra um terminal na raiz do projeto (`labic-g2-mvp/`) **com o ambiente virtual ativado** (passo 1.4) e execute:
      ```bash
      python test_integracao.py
      ``` 
---

## <img src="https://api.iconify.design/octicon/people-16.svg?color=%23238636" width="32" align="absmiddle"> Equipe Desenvolvedora

* **Emilly Matias Melo da Silva** - Rotas
* **Guilherme Souza Santos** - Segurança e Integração
* **Igo Fernandes Santos Oliveira Junior** - Banco de Dados
* **Miqueas Campos Andrade** - Front-End

---

###   Direitos Autorais e Propriedade Intelectual

**© 2026 CEPEDI / LABIC - Todos os direitos reservados.**

Este projeto foi desenvolvido exclusivamente como requisito para o Desafio Tecnológico do Programa Conecta e Capacita 04. O código-fonte aqui disponibilizado possui finalidade estritamente educacional e de demonstração de portfólio da equipe desenvolvedora. 

Não é permitida a cópia, modificação, distribuição, licenciamento ou uso comercial deste código sem a autorização prévia e expressa da instituição detentora dos direitos.