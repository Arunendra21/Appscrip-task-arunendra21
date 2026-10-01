const products = require('../../../lib/products-fallback.json');

const BROWSER_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
};

export default async function handler(req, res) {
  const { filename } = req.query;
  const match = /-(\d+)\.[a-zA-Z0-9]+$/.exec(filename || '');
  const product = match ? products.find((p) => p.id === Number(match[1])) : null;

  if (!product) {
    res.status(404).end();
    return;
  }

  try {
    const upstream = await fetch(product.image, { headers: BROWSER_HEADERS });

    if (!upstream.ok) {
      res.writeHead(302, { Location: product.image });
      res.end();
      return;
    }

    const buffer = Buffer.from(await upstream.arrayBuffer());
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
    res.status(200).send(buffer);
  } catch (err) {
    res.writeHead(302, { Location: product.image });
    res.end();
  }
}
