import { useMemo, useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FilterSidebar from '../components/FilterSidebar';
import ToolBar from '../components/ToolBar';
import ProductGrid from '../components/ProductGrid';
import { getAllProducts } from '../lib/api';
import styles from '../styles/Home.module.css';

export default function Home({ products }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sort, setSort] = useState('recommended');
  const [filtersOpen, setFiltersOpen] = useState(true);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  const visibleProducts = useMemo(() => {
    let list = products;

    if (selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(p.category));
    }

    const sorted = [...list];
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    if (sort === 'rating') sorted.sort((a, b) => b.rating.rate - a.rating.rate);

    return sorted;
  }, [products, selectedCategories, sort]);

  function toggleCategory(category) {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  }

  const pageTitle = 'Shop All Products | Appscrip Store';
  const pageDescription =
    'Browse our full product catalogue - electronics, jewellery and clothing for men and women, all in one place.';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: visibleProducts.slice(0, 20).map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://appscrip-task-arunendra21.netlify.app/product/${product.id}`,
      name: product.title,
    })),
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <Header />

      <main>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.h1}>Discover Our Products</h1>
            <p className={styles.heroText}>
              Everything from everyday essentials to statement pieces - pulled straight from
              our catalogue and ready to filter by category or sort by price.
            </p>
          </div>
        </section>

        <div className={`container ${styles.layout}`}>
          <h2 className="visually-hidden">Product filters and listing</h2>

          <ToolBar
            count={visibleProducts.length}
            sort={sort}
            onSortChange={setSort}
            filtersOpen={filtersOpen}
            onToggleFilters={() => setFiltersOpen((prev) => !prev)}
          />

          <div className={styles.body}>
            {filtersOpen && (
              <FilterSidebar
                categories={categories}
                selected={selectedCategories}
                onToggle={toggleCategory}
                onClear={() => setSelectedCategories([])}
              />
            )}

            <ProductGrid products={visibleProducts} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const products = await getAllProducts();
    return { props: { products } };
  } catch (err) {
    console.error('Failed to load products from fakestoreapi', err);
    return { props: { products: [] } };
  }
}
