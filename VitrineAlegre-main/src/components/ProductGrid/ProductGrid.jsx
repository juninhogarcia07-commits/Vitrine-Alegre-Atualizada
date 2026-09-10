import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.css';

function ProductGrid({ produtos }) {
  return (
    <div className="product-grid">
      {produtos.map((produto) => (
        <ProductCard key={produto.id} produto={produto} />
      ))}
    </div>
  );
}

export default ProductGrid;