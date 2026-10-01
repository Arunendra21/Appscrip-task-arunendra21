export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function imageFileNameFor(product) {
  return `${slugify(product.title)}-${product.id}.jpg`;
}
