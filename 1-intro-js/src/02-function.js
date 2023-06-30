const sayHello = (name = "Pepe", age = 5) => {
  return `Hola mundo function! ${name} ${age}`;
};

const add = (a = 0, b = 0) => a + b;

const result = sayHello("Sergio");
console.log(result);

console.log(add(8,9));
