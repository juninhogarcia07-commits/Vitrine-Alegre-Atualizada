import './SearchBar.css';

function SearchBar({ valor, aoAlterar }) {
  return (
    <input
      type="text"
      placeholder="Buscar produtos..."
      className="search-bar"
      aria-label="Buscar produtos"
      value={valor}
      onChange={(evento) => aoAlterar(evento.target.value)}
    />
  );
}

export default SearchBar;