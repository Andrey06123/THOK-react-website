import { create } from "zustand";

export const useCartStore = create((set) => ({
  cartItems: [],

  addToCart: (product, quantity = 1) =>
    set((state) => {
      const cartId = `${product.type}-${product.id}`;

      const existing = state.cartItems.find(item => item.cartId === cartId);

      if (existing) {
        return {
          cartItems: state.cartItems.map(item =>
            item.cartId === cartId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        cartItems: [
          ...state.cartItems,
          {
            ...product,
            cartId,
            quantity,
          },
        ],
      };
    }),

  increaseQuantity: (cartId) =>
    set((state) => ({
      cartItems: state.cartItems.map(item =>
        item.cartId === cartId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),

  decreaseQuantity: (cartId) =>
    set((state) => ({
      cartItems: state.cartItems
        .map(item =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0),
    })),

  removeFromCart: (cartId) =>
    set((state) => ({
      cartItems: state.cartItems.filter(item => item.cartId !== cartId),
    })),

  clearCart: () =>
    set({
      cartItems: [],
    }),
}));