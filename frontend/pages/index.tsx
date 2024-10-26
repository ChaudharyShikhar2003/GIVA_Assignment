// pages/index.tsx
import styles from '../styles/styles.module.css'; // Ensure this is the correct path
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import AddProductModal from '../components/AddProductModal';
import EditProductModal from '../components/EditProductModal';
import { Product } from '../types';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  // Dummy data
  const dummyProducts: Product[] = [
    { id: 1, name: "Product A", description: "Description for Product A", price: 50, quantity: 0 },
    { id: 2, name: "Product B", description: "Description for Product B", price: 100, quantity: 0 },
    { id: 3, name: "Product C", description: "Description for Product C", price: 150, quantity: 0 },
    { id: 4, name: "Product D", description: "Description for Product D", price: 200, quantity: 0 },
    { id: 5, name: "Product E", description: "Description for Product E", price: 250, quantity: 0 }
  ];

  useEffect(() => {
    setProducts(dummyProducts);
  }, []);

  const handleAddProduct = (newProduct: Product) => {
    const nextId = products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 1; // Ensure max ID calculation
    const productWithId: Product = { ...newProduct, id: nextId }; // Assign a new ID
    setProducts([...products, productWithId]);
    setShowAddModal(false);
  };

  const handleEditProduct = (updatedProduct: Product) => {
    if (currentProduct) {
      setProducts(
        products.map((product) =>
          product.id === currentProduct.id ? { ...product, ...updatedProduct } : product
        )
      );
      setShowEditModal(false);
    }
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Product Listing Application</h2>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          Add Product
        </button>
      </div>
      <div className={styles.listings}>
        <h2>Listings:</h2>
        <div className={styles.row}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => {
                setCurrentProduct(product);
                setShowEditModal(true);
              }}
              onDelete={() => handleDeleteProduct(product.id)}
            />
          ))}
        </div>
      </div>

      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onAddProduct={handleAddProduct}
        />
      )}

      {showEditModal && currentProduct && (
        <EditProductModal
          product={currentProduct}
          onClose={() => setShowEditModal(false)}
          onEditProduct={handleEditProduct}
        />
      )}
    </div>
  );
};

export default Home;
