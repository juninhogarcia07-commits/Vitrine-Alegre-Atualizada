# 🛍️ Vitrine Alegre

🔗 **Repositório:** https://github.com/juninhogarcia07-commits/Vitrine-Alegre-Atualizada
🌐 **Site publicado:** https://vitrine-alegre-atualizada.vercel.app

E-commerce fictício desenvolvido como atividade acadêmica, consumindo a API pública [DummyJSON](https://dummyjson.com/) para exibir produtos reais em um fluxo completo de vitrine, detalhe de produto e carrinho de compras.

---

## 📋 Sobre o projeto

O Vitrine Alegre é uma aplicação React que simula uma loja virtual completa, incluindo:

- Vitrine de produtos com busca, filtro por categoria, ordenação e paginação
- Página de detalhe do produto, com galeria de imagens, avaliações e especificações
- Carrinho de compras persistente, com totais calculados dinamicamente
- Autenticação simples de usuário (login/logout) usando a própria API DummyJSON
- Tratamento completo de estados de interface (carregando, erro, vazio, sucesso)
- Layout responsivo (desktop, tablet e mobile)
- Recursos de acessibilidade (navegação por teclado, `aria-labels`, skip link)

> ⚠️ **Nota sobre escopo:** a especificação oficial da atividade indica explicitamente que login não faz parte do escopo obrigatório. A funcionalidade foi implementada mesmo assim, como um extra opcional, para demonstrar o uso de Context API e integração com autenticação de uma API real. Essa decisão está documentada em `DIARIO-DA-IA.md` (Erro 5).

---

---

## 🚀 Tecnologias utilizadas

- [React](https://react.dev/) (componentes funcionais + Hooks)
- [Vite](https://vite.dev/) (build tool e servidor de desenvolvimento)
- [React Router DOM](https://reactrouter.com/) (v7 — rotas e navegação)
- CSS puro (sem frameworks de estilo)
- [DummyJSON](https://dummyjson.com/) (API pública de produtos e autenticação)
- Context API (gerenciamento de estado do carrinho e da autenticação)
- localStorage (persistência do carrinho e da sessão do usuário)

---

## 📁 Estrutura de pastas
src/
├── assets/ # Arquivos estáticos
├── components/ # Componentes reutilizáveis
│ ├── CategoryFilter/
│ ├── EmptyState/
│ ├── ErrorState/
│ ├── Footer/
│ ├── Header/
│ ├── Loading/
│ ├── Pagination/
│ ├── ProductCard/
│ ├── ProductGallery/
│ ├── ProductGrid/
│ ├── QuantitySelector/
│ ├── Rating/
│ ├── SearchBar/
│ └── SortSelect/
├── context/ # Contextos globais (Carrinho e Autenticação)
│ ├── AuthContext.jsx
│ └── CartContext.jsx
├── hooks/ # Hooks customizados
│ ├── useDebounce.js
│ └── useProdutos.js
├── pages/ # Páginas / rotas da aplicação
│ ├── Cart/
│ ├── Home/
│ ├── Login/
│ ├── NotFound/
│ └── ProductDetail/
├── services/ # Camada de comunicação com a API
│ └── api.js
├── utils/ # Funções utilitárias (preço, formatação)
│ └── formatters.js
├── App.jsx
├── main.jsx
└── index.css


---

## 🖥️ Como rodar o projeto localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão 18 ou superior recomendada)
- npm (já vem junto com o Node.js)

### Passo a passo

1. Clone o repositório:
```bash
git clone https://github.com/juninhogarcia07-commits/Vitrine-Alegre-Atualizada.git
```

2. Entre na pasta do projeto:
```bash
cd Vitrine-Alegre-Atualizada
```

3. Instale as dependências:
```bash
npm install
```

4. Rode o servidor de desenvolvimento:
```bash
npm run dev
```

5. Abra o navegador no endereço indicado no terminal (geralmente `http://localhost:5173`)

---

## 🔑 Testando o login

A autenticação usa usuários reais cadastrados na DummyJSON. Para testar, use, por exemplo:

- **Usuário:** `emilys`
- **Senha:** `emilyspass`

(Outros usuários de teste podem ser consultados em [dummyjson.com/users](https://dummyjson.com/users), lembrando que cada usuário tem uma senha própria.)

---

## 🌐 Rotas da aplicação

| Rota              | Descrição                          |
|-------------------|-------------------------------------|
| `/`                | Vitrine de produtos (Home)         |
| `/produtos/:id`    | Detalhe de um produto específico   |
| `/carrinho`        | Carrinho de compras                |
| `/login`           | Autenticação de usuário            |
| `*` (qualquer outra) | Página 404                       |

---

## 🧠 Decisões técnicas relevantes

- **Camada de serviços (`services/api.js`):** todas as chamadas à API DummyJSON ficam centralizadas nesse arquivo. Nenhum componente ou página acessa a API diretamente.
- **Totais do carrinho são derivados:** subtotal, desconto e total nunca são guardados como estado — são recalculados a partir da lista de itens sempre que necessário, evitando dessincronia.
- **Busca com debounce:** o campo de busca só dispara a requisição depois que o usuário para de digitar, evitando excesso de chamadas à API.
- **Filtros sincronizados com a URL:** busca, categoria, ordenação e página vivem como query params, sobrevivendo a atualizações de página (F5).
- **Persistência com `localStorage`:** tanto o carrinho quanto a sessão de login usam a técnica de "estado inicial preguiçoso" do `useState`, lendo o `localStorage` apenas uma vez na primeira renderização.

---

## 👤 Autor

**Marcelo Junior de Moura Garcia**
Projeto desenvolvido como atividade acadêmica, com apoio de IA (Claude, Anthropic) para orientação técnica passo a passo. Veja mais detalhes do processo em [`PROMPTS.md`](./PROMPTS.md) e [`DIARIO-DA-IA.md`](./DIARIO-DA-IA.md).