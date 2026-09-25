# 📝 PROMPTS.md — Registro do processo de desenvolvimento com IA

Este documento resume as interações realizadas com a IA (Claude, da Anthropic) ao longo do desenvolvimento do projeto **Vitrine Alegre**, organizadas por etapa. O processo seguiu uma abordagem passo a passo: cada etapa era implementada, testada no navegador, e só avançávamos para a próxima depois de confirmação de que estava funcionando.

---

## Prompt inicial (mestre)

Foi fornecido um prompt inicial extenso e detalhado, especificando:
- Tecnologias obrigatórias (React, Vite, JavaScript, CSS puro, react-router-dom)
- A API a ser usada (DummyJSON) e seus endpoints
- Regras de arquitetura (camada de serviços isolada, sem URLs espalhadas pelos componentes)
- Estrutura de pastas esperada
- Identidade visual (cores, dimensões, tipografia)
- Regras de negócio (cotação de dólar, cálculo de desconto, paginação)
- Uma ordem fixa de 30 etapas de desenvolvimento, a serem seguidas uma por vez, com confirmação do usuário entre cada uma

A IA foi instruída a **nunca pular etapas**, sempre explicar decisões técnicas, mostrar a estrutura de pastas atualizada, o conteúdo completo dos arquivos, e onde cada arquivo deveria ser criado.

---

## Etapas de desenvolvimento

| Etapa | Solicitação (resumo) | Entregue |
|---|---|---|
| 0 | Criar o projeto | Comandos `npm create vite`, instalação de dependências, primeiro `npm run dev` |
| 1 | Estrutura de pastas | Criação de todas as pastas de `components`, `pages`, `context`, `hooks`, `services`, `utils` |
| 2 | Camada de serviços | `services/api.js` com funções de busca de produtos, categorias, etc. |
| 3 | Testar conexão com a API | `App.jsx` temporário listando produtos reais da DummyJSON |
| 4 | Constantes e utilitários de preço | `utils/formatters.js` (cotação, desconto, formatação em R$) |
| 5 | Header e Footer | Componentes visuais estáticos |
| 6 | ProductCard estático | Card de produto com imagem, preço, desconto, estrelas |
| 7 | ProductGrid | Grade responsiva (4/2/1 colunas) |
| 8 | Página Home | Extração da lógica do `App.jsx` para `pages/Home/Home.jsx` |
| 9 | Estados de interface | Componentes `Loading`, `ErrorState`, `EmptyState` |
| 10 | Busca com debounce | `hooks/useDebounce.js`, `hooks/useProdutos.js`, `SearchBar` |
| 11 | Categorias | `CategoryFilter`, integração com a API de categorias |
| 12 | Ordenação | `SortSelect`, parâmetros `sortBy`/`order` na API |
| 13 | Paginação | `Pagination`, cálculo de páginas a partir do `total` da API |
| 14 | Rotas + Detalhe do produto | Instalação do `react-router-dom`, `useSearchParams`, primeira versão do `ProductDetail` |
| 15 | Galeria de imagens | `ProductGallery`, miniaturas clicáveis e navegáveis por teclado |
| 16 | Especificações e avaliações | Componente `Rating` reutilizável, `ProductReviews`, dados de envio/garantia/devolução |
| 17 | CartContext | Context API do carrinho (itens, adicionar, remover, aumentar/diminuir) |
| 18 | Integração do carrinho na Home | Botão "Adicionar" funcional, contador no Header |
| 19 | Integração do carrinho no Detalhe | `QuantitySelector`, adicionar com quantidade escolhida |
| 20 | Página do Carrinho | `pages/Cart/Cart.jsx`, listagem de itens, rota `/carrinho` |
| 21 | Quantidades e remoção no carrinho | Reaproveitamento do `QuantitySelector`, botão "Remover" |
| 22 | Totais derivados | Cálculo de subtotal, desconto e total a partir dos itens (sem guardar em state) |
| 23 | Persistência com localStorage | Leitura/escrita do carrinho no `localStorage`, com estado inicial preguiçoso |
| 24 | Página 404 | Rota coringa (`path="*"`), componente `NotFound` |
| 25 | Responsividade | Ajustes de `Header`, `CategoryFilter` e `Cart` (resumo como barra fixa no mobile) |
| 26 | Acessibilidade | Skip link, `aria-current`, `aria-label` em botões, idioma da página |
| 27 | Revisão completa | Checklist de testes manuais em todas as funcionalidades |
| Extra | Login com DummyJSON | `AuthContext`, página `Login`, integração com `/auth/login`, Header reativo (Entrar/Sair) |
| 28 | README.md | Documentação de instalação, tecnologias e decisões técnicas |
| 29 | PROMPTS.md | Este documento |
| 30 | DIARIO-DA-IA.md | Reflexão sobre o processo, incluindo erros cometidos pela IA |

---

## Observações sobre o processo

- A IA foi instruída a nunca gerar o projeto inteiro de uma vez, sempre aguardando confirmação de que cada etapa estava funcionando no navegador antes de avançar.
- Diversos erros de integração (arquivos não criados, nomes de arquivo incorretos, importações quebradas) foram identificados através de prints de tela compartilhados durante o desenvolvimento, e corrigidos interativamente — esse processo está detalhado no arquivo `DIARIO-DA-IA.md`.
- A funcionalidade de login foi um adicional ao escopo original da especificação, implementada posteriormente por decisão do desenvolvedor.