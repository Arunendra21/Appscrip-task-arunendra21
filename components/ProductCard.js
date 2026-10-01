import styles from './ProductCard.module.css';
import { imageFileNameFor } from '../lib/slug';

export default function ProductCard({ product }) {
  const altText = `${product.title} - ${product.category} product photo`;
  const imageSrc = `/api/product-image/${imageFileNameFor(product)}`;

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={imageSrc} alt={altText} loading="lazy" decoding="async" />
      </div>

      <p className={styles.category}>{product.category}</p>
      <h3 className={styles.title}>{product.title}</h3>

      <div className={styles.priceRow}>
        <span className={styles.price}>${product.price.toFixed(2)}</span>
        <span className={styles.rating}>★ {product.rating?.rate ?? 'N/A'}</span>
      </div>
    </article>
  );
}
