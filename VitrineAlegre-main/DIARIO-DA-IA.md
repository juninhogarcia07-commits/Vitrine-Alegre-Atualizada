# 📔 DIARIO-DA-IA.md — Reflexões sobre o desenvolvimento com apoio de IA

Este documento registra minha experiência desenvolvendo o projeto **Vitrine Alegre** com apoio da IA (Claude, da Anthropic), incluindo erros reais que a IA cometeu ao longo do processo, como eu percebi cada um deles, e como foram corrigidos.

---

## Erros cometidos pela IA

### 1. Arquitetura inicial equivocada para a busca (Etapa 10)

Ao implementar a busca com debounce, a IA inicialmente propôs uma arquitetura em que o campo de busca (`SearchBar`, dentro do `Header`) e a lógica de filtragem (dentro da `Home`) ficariam com **estados desconectados** — cada um controlando sua própria cópia do texto digitado, sem realmente se comunicarem. A própria IA percebeu o problema no meio da explicação, antes de eu sequer copiar o código, e reescreveu a solução corretamente, centralizando o estado da busca em um componente pai comum (`App.jsx`, naquele momento). Foi interessante ver esse processo de autocorreção acontecendo em tempo real, mas também me mostrou que preciso ler as explicações com atenção, e não só copiar código sem entender.

### 2. Instruções incompletas na criação do componente ProductGallery (Etapa 15)

Ao criar o componente de galeria de imagens, a IA me deu o conteúdo dos arquivos `ProductGallery.jsx` e `ProductGallery.css`, mas não deixou suficientemente claro que eu precisava **criar a pasta `ProductGallery` primeiro**, antes dos arquivos. Como resultado, tentei colar o código em um lugar que não existia, e só percebi o problema quando a aplicação quebrou com o erro `Failed to resolve import "../../components/ProductGallery/ProductGallery"`. Precisei mandar um print do erro para a IA identificar a causa e me orientar a criar a pasta manualmente antes de recriar os arquivos.

### 3. Nomes de arquivo e pasta gerando desalinhamento (Etapas 11 e 15)

Em mais de um momento (por exemplo, com `CategoryFilter.css`, que acabei criando com o nome `Category.css` por engano), pequenas divergências entre o nome exato do arquivo pedido pela IA e o que eu efetivamente criei geraram erros de importação no Vite. Embora parte da responsabilidade seja minha (erro de digitação), percebi que a IA poderia ter reforçado mais a importância de copiar os nomes de arquivo **exatamente como especificado**, já que o JavaScript é case-sensitive e não tolera nem a menor diferença de nome.

### 4. Credenciais de teste desatualizadas para o login (Etapa Extra — Login)

Ao implementar a funcionalidade de login com a API DummyJSON, a IA sugeriu inicialmente as credenciais de teste `kminchelle` / `0lelplR`, que eram um exemplo histórico da documentação da API. Ao testar, o login falhou com "usuário ou senha inválidos". A IA precisou pesquisar a documentação oficial atualizada da DummyJSON para descobrir que as credenciais de exemplo haviam mudado para `emilys` / `emilyspass`. Isso me mostrou que informações que a IA "lembra" de treinamento podem estar desatualizadas, e que vale a pena checar documentações oficiais quando algo não funciona como esperado.

### 5. Pequeno bug na construção da URL de categoria com ordenação (Etapa 12)

Na função `buscarProdutosPorCategoria`, dentro de `services/api.js`, a forma como a IA concatenou a URL deixava um caractere `?` sobrando no final quando nenhuma ordenação estava selecionada (ex: `.../category/beauty?`). Isso não chegou a quebrar a aplicação (o `fetch` tolera essa URL), mas é uma pequena imperfeição de código que só percebi ao revisar o arquivo com mais calma. Não cheguei a corrigir isso durante o desenvolvimento guiado, mas ficou registrado aqui como um ponto de atenção para uma futura refatoração.

---

## O que funcionou bem

- O desenvolvimento **passo a passo**, com confirmação antes de avançar, foi essencial para eu conseguir acompanhar e entender cada parte do código, em vez de receber tudo pronto de uma vez.
- Sempre que um erro aparecia, compartilhar o **print da tela** (console do navegador ou terminal) foi a forma mais eficaz de a IA identificar rapidamente a causa.
- A arquitetura sugerida (camada de serviços isolada, Context API para carrinho e autenticação, hooks customizados) me ajudou a entender conceitos de React que eu não dominava bem antes desse projeto, como estado derivado, debounce, e leitura preguiçosa de localStorage.

## O que eu faria diferente

- Prestar mais atenção aos nomes exatos de arquivos e pastas antes de criar, para evitar boa parte dos erros de importação que apareceram ao longo do processo.
- Iniciar o controle de versão (Git) com commits organizados desde o início do projeto, em vez de só configurar isso depois de boa parte do código já estar pronto.

---

## Conclusão

Desenvolver esse projeto com apoio de uma IA me ajudou a entender não só a "receita" de como construir um e-commerce em React, mas também **por que** cada decisão técnica foi tomada — coisa que eu não teria conseguido só copiando código pronto da internet. Os erros que aconteceram no caminho (tanto meus quanto da IA) acabaram sendo boas oportunidades de aprendizado sobre depuração e leitura de mensagens de erro.