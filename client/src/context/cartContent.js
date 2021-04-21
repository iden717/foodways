import { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  carts: [],
  qty: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CART":
      const findProductDouble = state.carts.find(
        (cart) => cart.id == action.payload.id
      );
      if (findProductDouble) {
        const updateCart = state.carts.map((cart) =>
          cart.id == action.payload.id
            ? {
                ...cart,
                qty: cart.qty + 1,
              }
            : cart
        );
        return {
          ...state,
          carts: updateCart,
          qty: state.qty + 1,
        };
      }
      return {
        ...state,
        carts: [...state.carts, { ...action.payload, qty: 1 }],
        qty: state.qty + 1,
      };
    case "DICREMENT_CART":
      const findDicrementProduct = state.carts.find(
        (cart) => cart.id == action.payload.id
      );
      if (findDicrementProduct) {
        const updateCart = state.carts.map((cart) =>
          cart.id == action.payload.id
            ? {
                ...cart,
                qty: cart.qty - 1,
              }
            : cart
        );
        return {
          ...state,
          carts: updateCart,
          qty: state.qty - 1,
        };
      }
      return {
        ...state,
        carts: [...state.carts, { ...action.payload, qty: 1 }],
        qty: state.qty - 1,
      };
    case "REMOVE_CART":
      const filter = state.carts.filter(
        (cart) => cart.id !== action.payload.id
      );
      return {
        ...state,
        carts: filter,
        qty: state.qty - 1,
      };
    default:
      throw new Error();
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={[state, dispatch]}>
      {children}
    </CartContext.Provider>
  );
};
