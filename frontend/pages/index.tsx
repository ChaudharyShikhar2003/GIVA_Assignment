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
    // Hardcoded initial products
    const hardcodedProducts: Product[] = [
      { id: 1, name: "Product A", description: "Description for Product A", price: 50, quantity: 2 },
      { id: 2, name: "Product B", description: "Description for Product B", price: 100, quantity: 1},
      { id: 3, name: "Product C", description: "Description for Product C", price: 150, quantity: 3 },
      { id: 4, name: "Product D", description: "Description for Product D", price: 200, quantity: 6 },
      { id: 5, name: "Product E", description: "Description for Product E", price: 250, quantity: 10 }
    ];

    // Fetch products from the backend
    axios.get('http://localhost:5000/api/products').then((res) => {
      // Combine hardcoded products with those fetched from the backend
      setProducts([...hardcodedProducts, ...res.data]);
    }).catch((error) => {
      console.error('Error fetching products:', error);
      // Even if the fetch fails, you can still display hardcoded products
      setProducts(hardcodedProducts);
    });
  }, []);

  const handleAddProduct = (newProduct: Product) => {
    // You might want to change this to post to your backend
    axios.post('http://localhost:5000/api/products', newProduct)
      .then((res) => {
        setProducts((prevProducts) => [...prevProducts, res.data]);
        setShowAddModal(false);
      })
      .catch((error) => console.error('Error adding product:', error));
  };

  const handleEditProduct = (updatedProduct: Product) => {
    if (currentProduct) {
      axios.put(`http://localhost:5000/api/products/${currentProduct.id}`, updatedProduct)
        .then((res) => {
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === currentProduct.id ? res.data : product
            )
          );
          setShowEditModal(false);
        })
        .catch((error) => console.error('Error editing product:', error));
    }
  };

  const handleDeleteProduct = (id: number) => {
    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then(() => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
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