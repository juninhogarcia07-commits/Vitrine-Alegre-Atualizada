// Cotação fixa do dólar para real, conforme definido na especificação da atividade.
// Fixa porque a API DummyJSON não fornece taxa de câmbio, e o objetivo aqui
// não é integrar uma API de câmbio real, e sim simular preços em BRL.
export const COTACAO_DOLAR = 5.2;

// Percentual mínimo de desconto para que o selo "desconto" seja exibido.
export const DESCONTO_MINIMO_PARA_SELO = 5;

/**
 * Calcula o preço final em dólar, aplicando o desconto percentual.
 * @param {number} price - preço original vindo da API (em dólar)
 * @param {number} discountPercentage - percentual de desconto (ex: 12.91)
 * @returns {number} preço final em dólar, já com desconto aplicado
 */
export function calcularPrecoComDesconto(price, discountPercentage) {
  return price * (1 - discountPercentage / 100);
}

/**
 * Converte um valor em dólar para real, usando a cotação fixa do projeto.
 * @param {number} valorEmDolar
 * @returns {number} valor convertido em real
 */
export function converterParaReal(valorEmDolar) {
  return valorEmDolar * COTACAO_DOLAR;
}

/**
 * Formata um número como moeda brasileira (R$ 1.234,56).
 * @param {number} valor - valor numérico em reais
 * @returns {string} valor formatado, ex: "R$ 199,90"
 */
export function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}

/**
 * Função "tudo em um": recebe o produto (ou os dados de preço) da API
 * e devolve os valores já prontos para exibição em tela.
 * Isso evita repetir a mesma sequência de cálculos em cada componente.
 *
 * @param {number} price - preço original em dólar
 * @param {number} discountPercentage - percentual de desconto
 * @returns {{
 *   precoOriginalFormatado: string,
 *   precoFinalFormatado: string,
 *   temDesconto: boolean
 * }}
 */
export function obterPrecosFormatados(price, discountPercentage) {
  const precoFinalDolar = calcularPrecoComDesconto(price, discountPercentage);

  const precoOriginalReal = converterParaReal(price);
  const precoFinalReal = converterParaReal(precoFinalDolar);

  return {
    precoOriginalFormatado: formatarMoeda(precoOriginalReal),
    precoFinalFormatado: formatarMoeda(precoFinalReal),
    temDesconto: discountPercentage >= DESCONTO_MINIMO_PARA_SELO,
  };
}
/**
 * Calcula os totais do carrinho a partir da lista de itens.
 * Esses valores são sempre DERIVADOS — nunca devem ser guardados
 * como estado próprio, para evitar dessincronia com a lista real de itens.
 *
 * @param {Array<{ produto: Object, quantidade: number }>} itens
 * @returns {{
 *   subtotalFormatado: string,
 *   descontoFormatado: string,
 *   totalFormatado: string,
 *   temItens: boolean
 * }}
 */
export function calcularTotaisCarrinho(itens) {
  const subtotalDolar = itens.reduce(
    (acumulado, item) => acumulado + item.produto.price * item.quantidade,
    0
  );

  const totalComDescontoDolar = itens.reduce((acumulado, item) => {
    const precoComDesconto = calcularPrecoComDesconto(
      item.produto.price,
      item.produto.discountPercentage
    );
    return acumulado + precoComDesconto * item.quantidade;
  }, 0);

  const descontoDolar = subtotalDolar - totalComDescontoDolar;

  const subtotalReal = converterParaReal(subtotalDolar);
  const descontoReal = converterParaReal(descontoDolar);
  const totalReal = converterParaReal(totalComDescontoDolar);

  return {
    subtotalFormatado: formatarMoeda(subtotalReal),
    descontoFormatado: formatarMoeda(descontoReal),
    totalFormatado: formatarMoeda(totalReal),
    temItens: itens.length > 0,
  };
}