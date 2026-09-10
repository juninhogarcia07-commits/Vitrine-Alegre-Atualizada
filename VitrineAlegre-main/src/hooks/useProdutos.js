import { useState, useEffect, useCallback } from 'react';
import {
  buscarProdutos,
  buscarProdutosPorTermo,
  buscarProdutosPorCategoria,
} from '../services/api';

/**
 * Hook que concentra a lógica de buscar produtos: lista normal (paginada),
 * busca por texto, ou filtro por categoria — com suporte a ordenação.
 *
 * Regra de prioridade: se houver termo de busca, ele tem prioridade sobre
 * a categoria, pois a API não oferece um endpoint que combine os dois.
 *
 * @param {Object} opcoes
 * @param {number} opcoes.pagina
 * @param {string} opcoes.termoBusca
 * @param {string} opcoes.categoria
 * @param {string} opcoes.ordenacao - string no formato "campo,direcao", ex: "price,asc"
 */
function useProdutos({ pagina, termoBusca, categoria, ordenacao }) {
  const [produtos, setProdutos] = useState([]);
  const [total, setTotal] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Separa a string "price,asc" em sortBy="price" e order="asc"
  const [sortBy, order] = ordenacao ? ordenacao.split(',') : [undefined, undefined];

  const carregarProdutos = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);

      let resposta;

      if (termoBusca && termoBusca.trim() !== '') {
        resposta = await buscarProdutosPorTermo(termoBusca, sortBy, order);
      } else if (categoria) {
        resposta = await buscarProdutosPorCategoria(categoria, sortBy, order);
      } else {
        resposta = await buscarProdutos(pagina, sortBy, order);
      }

      setProdutos(resposta.products);
      setTotal(resposta.total);
    } catch (erroCapturado) {
      setErro(erroCapturado.message);
    } finally {
      setCarregando(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagina, termoBusca, categoria, sortBy, order]);

  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  return { produtos, total, carregando, erro, recarregar: carregarProdutos };
}

export default useProdutos;