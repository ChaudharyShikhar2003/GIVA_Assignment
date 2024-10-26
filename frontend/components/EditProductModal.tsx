// components/EditProductModal.tsx

import { useState, useEffect } from 'react';
import { Product } from '../types';
import styles from '../styles/EditProductModal.module.css'; // Import the CSS module

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onEditProduct: (product: Product) => void;
}

const EditProductModal = ({ product, onClose, onEditProduct }: EditProductModalProps) => {
  const [updatedProduct, setUpdatedProduct] = useState<Product>(product);

  useEffect(() => {
    setUpdatedProduct(product);
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedProduct({
      ...updatedProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onEditProduct(updatedProduct);
  };

  return (
    <div className={`${styles.modal} show d-block`} tabIndex={-1}>
      <div className={styles.modalDialog}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h5 className={styles.modalTitle}>Edit Product</h5>
            <button type="button" className={styles.closeButton} onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className={styles.modalBody}>
            <input
              type="text"
              name="name"
              value={updatedProduct.name}
              className={styles.inputField}
              onChange={handleChange}
            />
            <input
              type="text"
              name="description"
              value={updatedProduct.description}
              className={styles.inputField}
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              value={updatedProduct.price}
              className={styles.inputField}
              onChange={handleChange}
            />
            <input
              type="number"
              name="quantity"
              value={updatedProduct.quantity}
              className={styles.inputField}
              onChange={handleChange}
            />
          </div>
          <div className={styles.modalFooter}>
            <button className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.saveButton} onClick={handleSubmit}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
