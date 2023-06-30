import {
  AddProductCart,
  DeleteProductcart,
  UpdateQuantityProductcart,
} from "./itemsAction";

export const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case AddProductCart:
      return [
        ...state,
        {
          product: action.payload,
          quantity: 1,
        },
      ];
    case UpdateQuantityProductcart:
      return state.map((i) => {
        if (i.product.id === action.payload.id) {
          return {
            ...i,
            quantity: i.quantity + 1,
          };
        }
        return i;
      });
    case DeleteProductcart:
      return [...state.filter((i) => i.product.id !== action.payload)];

    default:
      return state;
  }
};
