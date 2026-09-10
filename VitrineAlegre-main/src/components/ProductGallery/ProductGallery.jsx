import { useState } from 'react';
import './ProductGallery.css';

function ProductGallery({ imagens, nomeProduto }) {
  const [indiceAtivo, setIndiceAtivo] = useState(0);

  if (!imagens || imagens.length === 0) {
    return null;
  }

  return (
    <div className="product-gallery">
      <div className="product-gallery__principal">
        <img
          src={imagens[indiceAtivo]}
          alt={`${nomeProduto} — imagem ${indiceAtivo + 1} de ${imagens.length}`}
          className="product-gallery__imagem-principal"
        />
      </div>

      {imagens.length > 1 && (
        <ul className="product-gallery__miniaturas">
          {imagens.map((imagem, indice) => (
            <li key={imagem}>
              <button
                type="button"
                className={
                  indice === indiceAtivo
                    ? 'product-gallery__miniatura product-gallery__miniatura--ativa'
                    : 'product-gallery__miniatura'
                }
                onClick={() => setIndiceAtivo(indice)}
                aria-label={`Ver imagem ${indice + 1} de ${imagens.length}`}
                aria-current={indice === indiceAtivo ? 'true' : undefined}
              >
                <img src={imagem} alt="" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductGallery;