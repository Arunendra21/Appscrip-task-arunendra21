import { useState } from 'react';
import styles from './FilterSidebar.module.css';

export default function FilterSidebar({ categories, selected, onToggle, onClear }) {
  const [open, setOpen] = useState(true);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.groupHeader}>
        <button
          type="button"
          className={styles.groupToggle}
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
        >
          CATEGORY
          <span className={styles.chevron}>{open ? '−' : '+'}</span>
        </button>
        {selected.length > 0 && (
          <button type="button" className={styles.clearLink} onClick={onClear}>
            Clear all
          </button>
        )}
      </div>

      {open && (
        <ul className={styles.optionList}>
          {categories.map((category) => {
            const id = `cat-${category}`;
            const checked = selected.includes(category);

            return (
              <li key={category}>
                <label htmlFor={id} className={styles.option}>
                  <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(category)}
                  />
                  <span>{category}</span>
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
}
