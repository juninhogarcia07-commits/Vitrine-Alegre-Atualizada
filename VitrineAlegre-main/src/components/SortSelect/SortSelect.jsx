import './SortSelect.css';

// Lista de opções de ordenação disponíveis.
// O "value" combina sortBy e order separados por vírgula, para facilitar o controle no <select>.
const OPCOES_ORDENACAO = [
  { value: '', label: 'Relevância' },
  { value: 'price,asc', label: 'Preço: menor para maior' },
  { value: 'price,desc', label: 'Preço: maior para menor' },
  { value: 'title,asc', label: 'Nome: A-Z' },
  { value: 'title,desc', label: 'Nome: Z-A' },
];

function SortSelect({ valor, aoAlterar }) {
  return (
    <select
      className="sort-select"
      value={valor}
      onChange={(evento) => aoAlterar(evento.target.value)}
      aria-label="Ordenar produtos"
    >
      {OPCOES_ORDENACAO.map((opcao) => (
        <option key={opcao.value} value={opcao.value}>
          {opcao.label}
        </option>
      ))}
    </select>
  );
}

export default SortSelect;