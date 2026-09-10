import { useSearchParams } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import useProdutos from '../../hooks/useProdutos';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import Pagination from '../../components/Pagination/Pagination';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import SortSelect from '../../components/SortSelect/SortSelect';
import Loading from '../../components/Loading/Loading';
import ErrorState from '../../components/ErrorState/ErrorState';
import EmptyState from '../../components/EmptyState/EmptyState';
import { PRODUTOS_POR_PAGINA } from '../../services/api';
import './Home.css';

const DELAY_DEBOUNCE_BUSCA = 500;

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const textoBusca = searchParams.get('busca') || '';
  const categoria = searchParams.get('categoria') || '';
  const ordenacao = searchParams.get('ordenacao') || '';
  const pagina = Number(searchParams.get('pagina')) || 1;

  const termoComDebounce = useDebounce(textoBusca, DELAY_DEBOUNCE_BUSCA);

  const { produtos, total, carregando, erro, recarregar } = useProdutos({
    pagina,
    termoBusca: termoComDebounce,
    categoria,
    ordenacao,
  });

  const totalPaginas = Math.ceil(total / PRODUTOS_POR_PAGINA);

  // Função genérica para atualizar um parâmetro da URL, preservando os demais.
  function atualizarParametro(chave, valor) {
    const novosParametros = new URLSearchParams(searchParams);

    if (valor) {
      novosParametros.set(chave, valor);
    } else {
      novosParametros.delete(chave);
    }

    setSearchParams(novosParametros);
  }

  function aoSelecionarCategoria(novaCategoria) {
    const novosParametros = new URLSearchParams(searchParams);

    if (novaCategoria) {
      novosParametros.set('categoria', novaCategoria);
    } else {
      novosParametros.delete('categoria');
    }
    novosParametros.delete('pagina'); // Reseta a página ao trocar de categoria

    setSearchParams(novosParametros);
  }

  function aoAlterarOrdenacao(novaOrdenacao) {
    const novosParametros = new URLSearchParams(searchParams);

    if (novaOrdenacao) {
      novosParametros.set('ordenacao', novaOrdenacao);
    } else {
      novosParametros.delete('ordenacao');
    }
    novosParametros.delete('pagina'); // Reseta a página ao trocar de ordenação

    setSearchParams(novosParametros);
  }

  function aoMudarPagina(novaPagina) {
    atualizarParametro('pagina', String(novaPagina));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <CategoryFilter
        categoriaAtiva={categoria}
        aoSelecionarCategoria={aoSelecionarCategoria}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <SortSelect valor={ordenacao} aoAlterar={aoAlterarOrdenacao} />
      </div>

      <main className="home">
        {carregando && <Loading mensagem="Carregando produtos..." />}

        {!carregando && erro && (
          <ErrorState mensagem={erro} aoTentarNovamente={recarregar} />
        )}

        {!carregando && !erro && produtos.length === 0 && (
          <EmptyState mensagem="Nenhum produto encontrado." />
        )}

        {!carregando && !erro && produtos.length > 0 && (
          <>
            <ProductGrid produtos={produtos} />
            <Pagination
              paginaAtual={pagina}
              totalPaginas={totalPaginas}
              aoMudarPagina={aoMudarPagina}
            />
          </>
        )}
      </main>
    </>
  );
}

export default Home;