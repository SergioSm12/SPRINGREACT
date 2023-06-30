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

const invoiceByClientName = (clienteName) => {
  return invoices.find((i) => i.client.name === clienteName);
};

const invoiceById = (id) => {
  return invoices.find((i) => i.id === id);
};

const findInvoiceById = (id) => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const result = invoiceById(id);
  
        if (result) {
          resolve(result);
        } else {
          reject("Error: no existe la factura por  el id");
        }
  
        // console.log("Realizando una tarea con demora.");
      }, 2500);
    });
  
    return promise;
  };

export { papper, invoices, invoiceByClientName, invoiceById, findInvoiceById };
