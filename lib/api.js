const BASE_URL = 'https://fakestoreapi.com';

const BROWSER_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
  Accept: 'application/json',
};

const fallbackProducts = require('./products-fallback.json');

export async function getAllProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`, { headers: BROWSER_HEADERS });

    if (!res.ok) {
      throw new Error(`fakestoreapi responded with ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.warn('Live fakestoreapi fetch failed, serving cached snapshot:', err.message);
    return fallbackProducts;
  }
}
