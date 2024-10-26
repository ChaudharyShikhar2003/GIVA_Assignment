import { useState } from 'react';
import { Product } from '../types';
import styles from '../styles/AddProductModal.module.css'; 

interface AddProductModalProps {
  onClose: () => void;
  onAddProduct: (product: Product) => void;
}

const AddProductModal = ({ onClose, onAddProduct }: AddProductModalProps) => {
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    quantity: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onAddProduct(product);
    onClose(); // Close the modal after adding
  };

  return (
    <div className={`${styles.modal} show d-block`} tabIndex={-1}>
      <div className={`${styles.modalDialog}`}>
        <div className={`${styles.modalContent}`}>
          <div className={`${styles.modalHeader}`}>
            <h5 className={styles.modalTitle}>Add Product</h5>
            <button type="button" className={styles.closeButton} onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className={`${styles.modalBody}`}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className={`${styles.inputField}`}
              onChange={handleChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              className={`${styles.inputField}`}
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              className={`${styles.inputField}`}
              onChange={handleChange}
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              className={`${styles.inputField}`}
              onChange={handleChange}
            />
          </div>
          <div className={`${styles.modalFooter}`}>
            <button className={`${styles.cancelButton}`} onClick={onClose}>
              Cancel
            </button>
            <button className={`${styles.addButton}`} onClick={handleSubmit}>
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
