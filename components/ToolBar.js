import styles from './ToolBar.module.css';

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function ToolBar({ count, sort, onSortChange, filtersOpen, onToggleFilters }) {
  return (
    <div className={styles.bar}>
      <button type="button" className={styles.filterToggle} onClick={onToggleFilters}>
        {filtersOpen ? 'HIDE FILTER' : 'SHOW FILTER'}
      </button>

      <p className={styles.count}>{count} ITEMS</p>

      <label className={styles.sort}>
        Sort by
        <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
