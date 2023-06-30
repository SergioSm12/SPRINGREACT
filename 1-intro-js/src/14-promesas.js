import { invoiceById, findInvoiceById } from "./data/invoices";



findInvoiceById(2)
  .then((result) => {
    console.log(result);
    console.log("Realizada con exito alguna tarea con demora.");
  })
  .catch((error) => {
    console.error(error);
  });
