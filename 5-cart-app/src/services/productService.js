export const getProducts = async() => {
  const response = await fetch("http://localhost:8080/products");
  const products = await response.json();
  return products;
};

export const calculateTotal = (items) => {
  return items.reduce(
    (acumulator, item) => acumulator + item.product.price * item.quantity,
    0
  );
};
