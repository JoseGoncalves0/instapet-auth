# InstaPet - Sistema de Login e Registro

Este é um projeto React que implementa páginas de login e registro para o InstaPet, baseado no design fornecido.

## Características

- ✅ Design responsivo e moderno
- ✅ Páginas de Login e Registro
- ✅ Validação de formulários
- ✅ Autenticação com credenciais específicas
- ✅ Interface similar ao design fornecido
- ✅ Componentes reutilizáveis com shadcn/ui
- ✅ Estilização com Tailwind CSS

## Credenciais de Login

Para fazer login no sistema, use as seguintes credenciais:

- **Usuário:** `zeca`
- **Senha:** `123123`

## Estrutura do Projeto

```
instapet-auth/
├── public/                 # Arquivos públicos
├── src/
│   ├── components/         # Componentes React
│   │   ├── Login.jsx      # Página de login
│   │   ├── Register.jsx   # Página de registro
│   │   └── ui/            # Componentes UI (shadcn/ui)
│   ├── App.jsx            # Componente principal com roteamento
│   ├── App.css            # Estilos globais
│   └── main.jsx           # Ponto de entrada
├── package.json           # Dependências do projeto
└── README.md             # Este arquivo
```

## Como Executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou pnpm

### Instalação e Execução

1. **Instalar dependências:**
   ```bash
   cd instapet-auth
   npm install
   # ou
   pnpm install
   ```

2. **Executar em modo de desenvolvimento:**
   ```bash
   npm run dev
   # ou
   pnpm run dev
   ```

3. **Acessar a aplicação:**
   - Abra o navegador e acesse: `http://localhost:5173`
   - A aplicação redirecionará automaticamente para a página de login

### Build para Produção

Para criar uma versão otimizada para produção:

```bash
npm run build
# ou
pnpm run build
```

Os arquivos de produção serão gerados na pasta `dist/`.

## Funcionalidades

### Página de Login
- Campo de email/usuário
- Campo de senha com opção de mostrar/ocultar
- Validação de credenciais (usuário: `zeca`, senha: `123123`)
- Links para "Esqueceu sua senha?" e "Cadastre-se"
- Botões de login social (Google, Apple, Microsoft)

### Página de Registro
- Campos obrigatórios: Nome completo, Nome de usuário, E-mail/Telefone, Senha
- Checkbox para aceitar termos da Política de Privacidade
- Validação de formulário
- Redirecionamento para login após cadastro bem-sucedido

### Navegação
- Roteamento entre páginas de login e registro
- Redirecionamento automático para login na página inicial
- URLs amigáveis (`/login`, `/register`)

## Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **React Router DOM** - Roteamento
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI modernos
- **Lucide React** - Ícones
- **Vite** - Bundler e servidor de desenvolvimento

## Personalização

O projeto foi desenvolvido para ser facilmente personalizável:

- **Cores:** Modifique as variáveis CSS em `App.css`
- **Componentes:** Adicione novos componentes na pasta `src/components/`
- **Estilos:** Use classes Tailwind ou CSS customizado
- **Validação:** Modifique a lógica de autenticação nos componentes

## Estrutura de Pastas Detalhada

```
instapet-auth/
├── public/
│   ├── favicon.ico
│   └── vite.svg
├── src/
│   ├── assets/             # Imagens e recursos estáticos
│   ├── components/
│   │   ├── ui/             # Componentes base (shadcn/ui)
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   └── input.jsx
│   │   ├── Login.jsx       # Componente da página de login
│   │   └── Register.jsx    # Componente da página de registro
│   ├── hooks/              # Hooks customizados (se necessário)
│   ├── lib/                # Utilitários e configurações
│   ├── App.css             # Estilos globais e variáveis CSS
│   ├── App.jsx             # Componente raiz com roteamento
│   ├── index.css           # Estilos base
│   └── main.jsx            # Ponto de entrada da aplicação
├── components.json         # Configuração do shadcn/ui
├── eslint.config.js        # Configuração do ESLint
├── index.html              # Template HTML
├── package.json            # Dependências e scripts
├── pnpm-lock.yaml          # Lock file das dependências
├── README.md               # Documentação
└── vite.config.js          # Configuração do Vite
```

## Suporte

Para dúvidas ou problemas, verifique:

1. Se todas as dependências foram instaladas corretamente
2. Se a versão do Node.js é compatível
3. Se não há conflitos de porta (padrão: 5173)

---

**Desenvolvido com React + Vite + Tailwind CSS**

