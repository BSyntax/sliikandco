export const getUniqueFilterOptions = (products) => {
  const categories = new Set();
  const brands = new Set();
  const genders = new Set();
  const colors = new Set();
  const sizes = new Set();

  products.forEach((product) => {
    categories.add(product.category);
    brands.add(product.brand);
    genders.add(product.gender);
    product.colors.forEach((color) => colors.add(color.name));
    product.sizesAvailable.forEach((size) => sizes.add(size));
  });
  return {
    categories: Array.from(categories).sort(),
    brands: Array.from(brands).sort(),
    genders: Array.from(genders).sort(),
    colors: Array.from(colors).sort(),
    sizes: Array.from(sizes).sort(),
  };
};
