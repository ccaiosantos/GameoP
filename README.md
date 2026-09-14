GameOp

GameOp e uma plataforma web voltada para o universo gamer, desenvolvida como projeto acadêmico. A aplicacao permite que usuarios descubram, avaliem e gerenciem jogos, com funcionalidades planejadas para expandir a experiencia da comunidade gamer em um unico lugar.

Sobre o Projeto

O GameOp nasceu da necessidade de centralizar informacoes sobre jogos de forma pratica e acessivel. A proposta e oferecer uma interface moderna onde os usuarios possam explorar um catalogo de jogos, registrar suas opinioes, acompanhar o que estao jogando e interagir com outros membros da comunidade.

Funcionalidades
-Pagina inicial com apresentacao da plataforma
-Navegacao entre paginas utilizando roteamento no lado do cliente
-Estrutura de componentes reutilizaveis em React
-Layout responsivo e organizado por rotas
-Sistema de cadastro de usuarios com persistencia via LocalStorage
-Criacao de listas personalizadas de jogos, com nome da lista e jogos selecionados como campos obrigatorios, permitindo ao usuario organizar colecoes tematicas como, por exemplo, uma lista exclusiva com jogos de uma -desenvolvedora especifica
-GameList, uma lista pessoal no estilo de lista de espera onde o usuario adiciona jogos que deseja jogar futuramente
-Sistema de avaliacao com estrelas e campo de review textual por jogo
-Busca de jogos por nome e por desenvolvedora

Tecnologias Utilizadas
Front-end
React 19 - biblioteca principal para construcao da interface de usuario com componentes funcionais e hooks
React Router DOM 7 - gerenciamento de rotas no cliente, permitindo navegacao entre paginas sem recarregamento completo
Vite 8 - ferramenta de build e servidor de desenvolvimento com suporte a Hot Module Replacement (HMR), garantindo atualizacoes rapidas durante o desenvolvimento
JavaScript (ESModules) - linguagem principal do projeto, utilizando a sintaxe moderna de modulos ES
Qualidade de Codigo
ESLint 10 - linter para identificacao de erros e inconsistencias no codigo
eslint-plugin-react-hooks - regras especificas para garantir o uso correto dos hooks do React
eslint-plugin-react-refresh - suporte ao React Fast Refresh durante o desenvolvimento
Infraestrutura e Configuracao
@vitejs/plugin-react - plugin oficial do Vite para suporte ao React, utilizando o compilador Oxc internamente
Node.js com ESModules - ambiente de execucao e sistema de modulos do projeto
Estrutura do Projeto
GameoP/
├── public/                 # Arquivos estaticos publicos
├── src/                    # Codigo-fonte da aplicacao
│   ├── components/         # Componentes reutilizaveis de interface
│   ├── context/            # Contextos React para gerenciamento de estado global
│   ├── data/               # Dados estaticos e mocks utilizados pela aplicacao
│   ├── hooks/              # Hooks customizados
│   ├── pages/              # Paginas da aplicacao organizadas por rota
│   ├── services/           # Servicos e logica de acesso a dados externos ou LocalStorage
│   ├── styles/             # Arquivos de estilizacao globais e por modulo
│   ├── App.jsx             # Componente raiz com definicao das rotas
│   └── main.jsx            # Ponto de entrada da aplicacao
├── index.html              # HTML base do projeto
├── vite.config.js          # Configuracao do Vite
├── eslint.config.js        # Configuracao do ESLint
└── package.json            # Dependencias e scripts do projeto
Como Executar Localmente

Pre-requisitos: Node.js 18 ou superior instalado na maquina.

1. Clone o repositorio

bash
git clone https://github.com/ccaiosantos/GameoP.git
cd GameoP

2. Instale as dependencias

bash
npm install

3. Inicie o servidor de desenvolvimento

bash
npm run dev

A aplicacao estara disponivel em http://localhost:5173.

Scripts disponiveis

Comando	Descricao
npm run dev	Inicia o servidor de desenvolvimento com HMR
npm run build	Gera a versao de producao na pasta dist/
npm run preview	Visualiza localmente o build de producao
npm run lint	Executa o ESLint para verificar o codigo
Integrantes do Grupo
Caio Gabriel
Caio Marcos
Pedro Luckas
Victor Alves
Licenca

Este projeto foi desenvolvido para fins academicos.
