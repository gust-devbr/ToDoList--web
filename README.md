# Documentação completa do projeto ToDoList--web

## 1) Visão geral
O **ToDoList--web** é uma aplicação full stack em Next.js para gerenciamento de:
- tarefas,
- notas,
- contatos,
- autenticação de usuários,
- painel (dashboard) com gráficos.

A aplicação utiliza **App Router**, **Prisma** com **MongoDB**, autenticação por **JWT em cookie HttpOnly**, e componentes UI baseados em **shadcn/radix**.

---

## 2) Stack técnica
- **Frontend**: Next.js 16, React 19, Tailwind CSS 4, shadcn/ui, Recharts.
- **Backend**: Rotas API do Next.js (`src/app/api/**`).
- **Banco de dados**: MongoDB via Prisma.
- **Autenticação**: JWT (`jsonwebtoken`) + bcrypt.
- **Tema**: `next-themes`.

---

## 3) Scripts do projeto
Comandos disponíveis no `package.json`:

- `npm run dev`: sobe o ambiente de desenvolvimento.
- `npm run build`: gera client Prisma e build de produção.
- `npm run start`: executa a build.
- `npm run lint`: valida o código com ESLint.

---

## 4) Estrutura de pastas
```txt
src/
  app/
    api/
      public/
      private/
    pages/
      (public)/
      (private)/
    layout.js
    page.js
    middleware.js
  components/
    charts/
    icons/
    layout/
    modals/
    tables/
    ui/
    index.js
  context/
  hooks/
  lib/
  styles/
prisma/
  schema.prisma
public/
docs/
  README.md
```

### Responsabilidade por pasta
- `src/app/pages`: telas do sistema (áreas pública e privada).
- `src/app/api`: endpoints HTTP da aplicação.
- `src/components`: componentes visuais e de composição.
- `src/context`: estado global (ex.: autenticação, tema).
- `src/lib` e `src/utils`: utilitários e serviços compartilhados (auth, prisma, validações, config).
- `prisma`: modelagem de dados.

---

## 5) Modelagem de dados (Prisma)
Entidades:

- **User**
  - `id`, `name`, `email`, `password`, `createdAt`
  - relacionamentos: `contacts`, `notes`, `tasks`

- **Task**
  - `id`, `userId`, `title`, `completed`, `createdAt`, `updatedAt`

- **Note**
  - `id`, `userId`, `title`, `content`, `pinned`, `createdAt`, `updatedAt`

- **Contact**
  - `id`, `userId`, `name`, `email`, `tel`, `category`, `favorite`, `createdAt`, `updatedAt`

Relações usam `onDelete: Cascade` para remoção em cascata ao excluir usuário.

---

## 6) Fluxo de autenticação
1. Usuário faz login via `POST /api/public/login`.
2. Se credenciais válidas, API grava cookie `token` (HttpOnly).
3. Frontend consulta `GET /api/private/me` para carregar sessão.
4. Rotas privadas usam `getUserFromToken()` (`src/lib/auth.js`) para validar o usuário logado.
5. Logout remove o cookie em `POST /api/public/logout`.

> Observação: existe `src/app/middleware.js` com validação via header `Authorization`, mas as APIs privadas atualmente dependem principalmente do cookie (`getUserFromToken`).

---

## 7) Endpoints da API

## 7.1 Público
- `POST /api/public/register`
  - Cria usuário (`nome`, `email`, `senha`).
- `POST /api/public/login`
  - Valida credenciais e retorna usuário seguro + cookie JWT.
- `POST /api/public/logout`
  - Remove cookie de autenticação.

## 7.2 Privado - Sessão/Usuário
- `GET /api/private/me`
  - Retorna dados do usuário autenticado.
- `PUT /api/private/user`
  - Altera senha (`atualSenha`, `novaSenha`).
- `DELETE /api/private/user`
  - Exclui a conta do usuário.

## 7.3 Privado - Tarefas
- `GET /api/private/tasks?search=`
- `POST /api/private/tasks`
- `PUT /api/private/tasks/[id]`
- `PATCH /api/private/tasks/[id]` (toggle `completed`)
- `DELETE /api/private/tasks/[id]`

## 7.4 Privado - Notas
- `GET /api/private/notes?search=`
- `POST /api/private/notes`
- `PUT /api/private/notes/[id]`
- `PATCH /api/private/notes/[id]` (toggle `pinned`)
- `DELETE /api/private/notes/[id]`

## 7.5 Privado - Contatos
- `GET /api/private/contacts?search=`
- `POST /api/private/contacts`
- `PUT /api/private/contacts/[id]`
- `PATCH /api/private/contacts/[id]` (toggle `favorite`)
- `DELETE /api/private/contacts/[id]`

---

## 8) Páginas e navegação
Área pública:
- `/` (login)
- `/pages/register` (cadastro)

Área privada:
- `/pages/tasks`
- `/pages/notes`
- `/pages/contacts`
- `/pages/dashboard`
- `/pages/settings`

A estrutura privada é montada via `PrivateStructure` + `AppSidebar` + `Header`.

---

## 9) Componentes principais
- **Layout**: `Header`, `AppSidebar`
- **Modais**: `TaskModal`, `NoteModal`, `ContactModal`, `ChangePassModal`, `ConfirmDialog`
- **Tabelas**: `TableItem`, `TableContact`, `TableFilter`
- **Gráficos**: `StatusPieChart`
- **UI base**: pasta `src/components/ui` (button, input, dialog, card, etc.)

---

## 10) Utilitários e libs internas
- `src/lib/prisma.js`: singleton do Prisma Client.
- `src/lib/utils.js`: utilitário de classes CSS (`cn`).
- `src/utils/auth.js`: resolução do usuário pelo token em cookie.
- `src/utils/validator.js`: validações de formulário (nome, email, senha).
- `src/utils/chart-config.js`: configuração de labels/chaves para dashboard.
- `src/utils/filters-config.js`: configuração de valores/labels/chaves para tabela de filtros.

---

## 11) Contextos globais
- `AuthContext`: estado de usuário, login, logout, delete account.
- `ThemeProvider` / `ThemeToggle`: gerenciamento de tema claro/escuro.

---

## 12) Configuração de ambiente
Crie um arquivo `.env` com no mínimo:

```env
DATABASE_URL="mongodb+srv://..."
JWT_SECRET="sua-chave-secreta"
```

---

## 13) Como rodar localmente
1. Instalar dependências:
   ```bash
   npm install
   ```
2. Configurar `.env`.
3. Rodar em desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acessar `http://localhost:3000`.

---

## 14) Build e produção
```bash
npm run build
npm run start
```

O `build` executa `prisma generate` automaticamente antes da compilação.