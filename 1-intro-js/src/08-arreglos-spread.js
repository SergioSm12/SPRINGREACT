let products = ["mesa", "silla", "notebook", "teclado"];

products=products.concat("pantalla lcd", "sony tv");

const fruits = ["peras", "manzanas", "sandias", "frutillas"];

const mercado = [...fruits, ...products, "lechuga", "papas", "uvas"];

console.log(products);
console.log(mercado);
