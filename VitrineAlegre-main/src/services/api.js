// URL base da API. Fica centralizada aqui — se mudar um dia, só muda neste lugar.
const BASE_URL = 'https://dummyjson.com';

// Quantidade de produtos exibidos por página (usado na paginação da Home).
export const PRODUTOS_POR_PAGINA = 12;

/**
 * Função auxiliar interna: faz o fetch e já trata erros de resposta.
 * Centralizar essa checagem evita repetir "if (!response.ok)" em cada função.
 */
async function fazerRequisicao(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados: ${response.status}`);
  }

  return response.json();
}

/**
 * Monta os parâmetros de ordenação (sortBy/order), se informados.
 * Retorna uma string pronta para concatenar na URL, como "&sortBy=price&order=asc",
 * ou uma string vazia se não houver ordenação.
 */
function montarParametrosOrdenacao(sortBy, order) {
  if (!sortBy || !order) {
    return '';
  }
  return `&sortBy=${sortBy}&order=${order}`;
}

/**
 * Busca uma lista paginada de produtos.
 * @param {number} pagina - página atual (começando em 1)
 * @param {string} [sortBy] - campo de ordenação (ex: "price", "title")
 * @param {string} [order] - direção da ordenação ("asc" ou "desc")
 * @returns {Promise<{ products: Array, total: number }>}
 */
export async function buscarProdutos(pagina = 1, sortBy, order) {
  const skip = (pagina - 1) * PRODUTOS_POR_PAGINA;
  const ordenacao = montarParametrosOrdenacao(sortBy, order);
  const url = `${BASE_URL}/products?limit=${PRODUTOS_POR_PAGINA}&skip=${skip}${ordenacao}`;
  return fazerRequisicao(url);
}

/**
 * Busca um único produto pelo ID.
 * @param {string|number} id
 * @returns {Promise<Object>}
 */
export async function buscarProdutoPorId(id) {
  const url = `${BASE_URL}/products/${id}`;
  return fazerRequisicao(url);
}

/**
 * Busca produtos por texto digitado (usado na busca com debounce).
 * @param {string} termo
 * @param {string} [sortBy]
 * @param {string} [order]
 * @returns {Promise<{ products: Array, total: number }>}
 */
export async function buscarProdutosPorTermo(termo, sortBy, order) {
  const ordenacao = montarParametrosOrdenacao(sortBy, order);
  const url = `${BASE_URL}/products/search?q=${encodeURIComponent(termo)}${ordenacao}`;
  return fazerRequisicao(url);
}

/**
 * Busca a lista de categorias disponíveis (array de strings).
 * @returns {Promise<string[]>}
 */
export async function buscarCategorias() {
  const url = `${BASE_URL}/products/category-list`;
  return fazerRequisicao(url);
}

/**
 * Busca produtos de uma categoria específica.
 * @param {string} categoria
 * @param {string} [sortBy]
 * @param {string} [order]
 * @returns {Promise<{ products: Array, total: number }>}
 */
export async function buscarProdutosPorCategoria(categoria, sortBy, order) {
  const ordenacao = montarParametrosOrdenacao(sortBy, order);
  const url = `${BASE_URL}/products/category/${categoria}?${ordenacao.replace('&', '')}`;
  return fazerRequisicao(url);
}
/**
 * Autentica um usuário na DummyJSON.
 * Diferente das outras funções, esta faz uma requisição POST com corpo,
 * por isso não reaproveita a função "fazerRequisicao" (que é só para GET).
 *
 * @param {string} username
 * @param {string} password
 * @returns {Promise<Object>} dados do usuário autenticado + token
 */
export async function loginUsuario(username, password) {
  const url = `${BASE_URL}/auth/login`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, expiresInMins: 60 }),
  });

  if (!response.ok) {
    throw new Error('Usuário ou senha inválidos.');
  }

  return response.json();
}