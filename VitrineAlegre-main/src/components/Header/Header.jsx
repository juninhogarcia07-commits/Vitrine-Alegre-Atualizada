import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import SearchBar from '../SearchBar/SearchBar';
import './Header.css';

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const textoBusca = searchParams.get('busca') || '';
  const { quantidadeTotalItens } = useCart();
  const { usuario, logout } = useAuth();

  function aoAlterarBusca(novoTexto) {
    const novosParametros = new URLSearchParams(searchParams);

    if (novoTexto) {
      novosParametros.set('busca', novoTexto);
    } else {
      novosParametros.delete('busca');
    }
    novosParametros.delete('pagina');

    setSearchParams(novosParametros);
  }

  return (
    <header className="header">
      <div className="header__conteudo">
        <Link to="/" className="header__logo">
          Vitrine Alegre
        </Link>

        <div className="header__busca">
          <SearchBar valor={textoBusca} aoAlterar={aoAlterarBusca} />
        </div>

        <div className="header__acoes">
          {usuario ? (
            <div className="header__usuario">
              <span className="header__saudacao">Olá, {usuario.firstName}</span>
              <button type="button" className="header__botao-entrar" onClick={logout}>
                Sair
              </button>
            </div>
          ) : (
            <Link to="/login" className="header__botao-entrar">
              Entrar
            </Link>
          )}

          <Link
            to="/carrinho"
            className="header__botao-carrinho"
            aria-label={`Ver carrinho, ${quantidadeTotalItens} itens`}
          >
            Carrinho
            <span className="header__contador-carrinho">{quantidadeTotalItens}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;