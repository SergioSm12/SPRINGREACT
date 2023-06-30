import { useEffect, useReducer } from "react";
import { itemsReducer } from "../reducer/itemsReducer";
import {
  AddProductCart,
  DeleteProductcart,
  UpdateQuantityProductcart,
} from "../reducer/itemsAction";
const initialCartItems = JSON.parse(sessionStorage.getItem("cart")) || [];

export const useItemsCart = () => {
  //con uso de use state
  //const [cartItems, setCartItems] = useState(initialCartItems);

  //Con uso de useReducer
  const [cartItems, dispatch] = useReducer(itemsReducer, initialCartItems);

  //Manejar session storage cuando cambia los items
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  //Manejar funcion para recibir datos del componente hijo
  const handlerAddProductCart = (product) => {
    //Buscamos para saber si ya existe el item
    const hasItem = cartItems.find((i) => i.product.id === product.id);
    if (hasItem) {
      //Si existe el item en el carrito aumentamos la cantidad
      dispatch({
        type: UpdateQuantityProductcart,
        payload: product,
      });
    } else {
      //Si no existe en el carrito lo agregamos

      dispatch({
        type: AddProductCart,
        payload: product,
      });
    }
  };

  const handlerDeleteProductCart = (id) => {
    dispatch({
      type: DeleteProductcart,
      payload: id,
    });
  };
  return {
    cartItems,
    handlerAddProductCart,
    handlerDeleteProductCart,
  };
};
