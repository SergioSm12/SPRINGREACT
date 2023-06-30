import { useItemsCart } from "./hooks/useItemscart";
import { Navbar } from "./components/Navbar";
import { CartRoutes } from "./routes/CartRoutes";

export const CartApp = () => {
  const { cartItems, handlerAddProductCart, handlerDeleteProductCart } =
    useItemsCart();

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <h3>Cart App</h3>
        <CartRoutes
          cartItems={cartItems}
          handlerAddProductCart={handlerAddProductCart}
          handlerDeleteProductCart={handlerDeleteProductCart}
        />
      </div>
    </>
  );
};
