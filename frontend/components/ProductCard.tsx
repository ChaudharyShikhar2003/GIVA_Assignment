// components/ProductCard.tsx

import { Product } from '../types';
import styles from '../styles/ProductCard.module.css'; // Importing modular CSS for the card

interface ProductCardProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <h5 className={styles.cardTitle}>{product.name}</h5>
        <p className={styles.cardText}>{product.description}</p>
        <div className={styles.cardFooter}>
          <p className={styles.price}>Price: <span>${product.price}</span></p>
          <p className={styles.quantity}>Quantity: <span>{product.quantity}</span></p>
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.editButton} onClick={onEdit}>
            Edit
          </button>
          <button className={styles.deleteButton} onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
