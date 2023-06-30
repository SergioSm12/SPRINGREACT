const papper = {
  producto: "papper",
  price: 100,
  quantity: 10,
};

const invoices = [
  {
    id: 1,
    name: "Compras de oficina",
    client: {
      name: "Sergio",
      lastname: "Mesa",
    },
    items: [
      {
        producto: "keyboard",
        price: 399,
        quantity: 2,
      },
      {
        producto: "mouse",
        price: 200,
        quantity: 1,
      },
      papper,
    ],
  },
  {
    id: 2,
    name: "Compras de computacion",
    client: {
      name: "David",
      lastname: "Mesa",
    },
    items: [
      {
        producto: "keyboard",
        price: 399,
        quantity: 2,
      },
      {
        producto: "screen 17",
        price: 800,
        quantity: 1,
      },
      {
        producto: "cpu",
        price: 1000,
        quantity: 10,
      },
    ],
  },
  {
    id: 3,
    name: "Compras de papeleria",
    client: {
      name: "Sergio",
      lastname: "Mesa",
    },
    items: [
      {
        producto: "pencil",
        price: 200,
        quantity: 1,
      },
      papper,
    ],
  },
];

//Map para guardar los elementos del arreglo en otro
const invoicesName = invoices.map((i) => i.name);

console.log(invoicesName);

const invoiceById = invoices.find((i) => i.id == 1);
console.log(invoiceById);

//Consulta para encontrar
const invoiceByClientName = invoices.find((i) => i.client.name === "Sergio");
console.log(invoiceByClientName);

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


