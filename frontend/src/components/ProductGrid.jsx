export default function ProductGrid({ products = [], onAdd }) {
  if (!Array.isArray(products) || products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="products">
      {products.map(p => (
  <div key={p.productId} className="card">
    <h3>{p.name}</h3>
    <p>ID: {p.productId}</p>
    <p>₹{p.price}</p>
    <button onClick={() => onAdd(p.productId)}>Add to cart</button>
  </div>
))}

    </div>
  );
}
