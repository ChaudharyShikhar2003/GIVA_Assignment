// pages/index.tsx
import styles from '../styles/styles.module.css'; // Ensure this is the correct path
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import AddProductModal from '../components/AddProductModal';
import EditProductModal from '../components/EditProductModal';
import { Product } from '../types';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products').then((res) => {
      setProducts(res.data);
    });
  }, []);

  const handleAddProduct = (newProduct: Product) => {
    axios
      .post('http://localhost:5000/api/products', newProduct)
      .then((res) => {
        setProducts([...products, res.data]);
        setShowAddModal(false);
      })
      .catch((error) => console.error('Error adding product:', error));
  };

  const handleEditProduct = (updatedProduct: Product) => {
    if (currentProduct) {
      axios
        .put(`http://localhost:5000/api/products/${currentProduct.id}`, updatedProduct)
        .then((res) => {
          setProducts(
            products.map((product) =>
              product.id === currentProduct.id ? res.data : product
            )
          );
          setShowEditModal(false);
        })
        .catch((error) => console.error('Error editing product:', error));
    }
  };

  const handleDeleteProduct = (id: number) => {
    axios
      .delete(`http://localhost:5000/api/products/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => console.error('Error deleting product:', error));
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

      {/* Add Product Modal */}
      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onAddProduct={handleAddProduct}
        />
      )}

      {/* Edit Product Modal */}
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
