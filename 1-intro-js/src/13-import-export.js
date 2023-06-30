import { invoiceByClientName,invoices,papper, } from "./data/invoices";

//Map para guardar los elementos del arreglo en otro
const invoicesName = invoices.map((i) => i.name);

console.log(invoicesName);

const invoiceById = invoices.find((i) => i.id == 1);
console.log(invoiceById);

//Consulta para encontrar
//const invoiceByClientName = invoices.find((i) => i.client.name === "Sergio");
console.log('Buscar por nombre de cliente ')
console.log(invoiceByClientName("Sergio"));

//Consulta para filtrar
const invoiceFilter = invoices.filter((i) => i.id > 1);
console.log(invoiceFilter);

console.log("Filtro para eliminar");
//Ejemplo de como hacer un delete
const invoiceDelete = invoices.filter((i) => i.id != 2);
console.log(invoiceDelete);

//Buscar por referencia
const invoiceFilter2 = invoices.filter((i) => i.items.includes(papper));
console.log(invoiceFilter2);

//Evaluar devuelve true o false
const result = invoices.some((i) => i.client.name == "Sergio");
console.log(result);


