import { useState, useEffect } from 'react';
import { buscarCategorias } from '../../services/api';
import './CategoryFilter.css';

const CATEGORIA_TODAS = '';

function CategoryFilter({ categoriaAtiva, aoSelecionarCategoria }) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function carregarCategorias() {
      try {
        const lista = await buscarCategorias();
        setCategorias(lista);
      } catch {
        setCategorias([]);
      }
    }

    carregarCategorias();
  }, []);

  return (
    <nav className="category-filter" aria-label="Filtrar por categoria">
      <button
        type="button"
        className={
          categoriaAtiva === CATEGORIA_TODAS
            ? 'category-filter__pilula category-filter__pilula--ativa'
            : 'category-filter__pilula'
        }
        onClick={() => aoSelecionarCategoria(CATEGORIA_TODAS)}
        aria-current={categoriaAtiva === CATEGORIA_TODAS ? 'true' : undefined}
      >
        Todas
      </button>

      {categorias.map((categoria) => (
        <button
          key={categoria}
          type="button"
          className={
            categoriaAtiva === categoria
              ? 'category-filter__pilula category-filter__pilula--ativa'
              : 'category-filter__pilula'
          }
          onClick={() => aoSelecionarCategoria(categoria)}
          aria-current={categoriaAtiva === categoria ? 'true' : undefined}
        >
          {categoria}
        </button>
      ))}
    </nav>
  );
}

export default CategoryFilter;