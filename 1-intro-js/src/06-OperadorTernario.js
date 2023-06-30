const average = 5.9;

//Operador ternario
const status2 = average >= 5.5 ? "Aprovado" : "Rechazado";

console.log(`Resultado: ${status2}`);

let max = 0;

const a = 5;
const b = 8;
const c = 35;

max = a > b ? a : b;
max = max > c ? max : c;

console.log(`El mayor es ${max}`);
