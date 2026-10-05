import { create } from "zustand";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "./authStore";

export const useCartStore = create((set, get) => ({
  cartItems: [],
  loading: false,
  error: null,

  addToCart: async (product, quantity = 1) => {
    const user = useAuthStore.getState().user;
    const cartId = `${product.type}-${product.id}`;

    const existing = get().cartItems.find((item) => item.cartId === cartId);

    if (existing) {
      const newQuantity = existing.quantity + quantity;

      set({
        cartItems: get().cartItems.map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: newQuantity }
            : item
        ),
      });

      if (user) {
        await supabase
          .from("cart_items")
          .update({ quantity: newQuantity })
          .eq("user_id", user.id)
          .eq("product_id", cartId);
      }

      return;
    }

    const newItem = {
      ...product,
      cartId,
      quantity,
    };

    set({
      cartItems: [...get().cartItems, newItem],
    });

    if (user) {
      const { error } = await supabase.from("cart_items").insert({
        user_id: user.id,
        product_id: cartId,
        name: product.name,
        price: product.price,
        image_url: product.img,
        quantity,
      });

      if (error) {
        set({ error: error.message });
      }
    }
  },

  increaseQuantity: async (cartId) => {
    const user = useAuthStore.getState().user;

    const item = get().cartItems.find((item) => item.cartId === cartId);
    if (!item) return;

    const newQuantity = item.quantity + 1;

    set({
      cartItems: get().cartItems.map((item) =>
        item.cartId === cartId
          ? { ...item, quantity: newQuantity }
          : item
      ),
    });

    if (user) {
      await supabase
        .from("cart_items")
        .update({ quantity: newQuantity })
        .eq("user_id", user.id)
        .eq("product_id", cartId);
    }
  },

  decreaseQuantity: async (cartId) => {
    const user = useAuthStore.getState().user;

    const item = get().cartItems.find((item) => item.cartId === cartId);
    if (!item) return;

    const newQuantity = item.quantity - 1;

    if (newQuantity <= 0) {
      get().removeFromCart(cartId);
      return;
    }

    set({
      cartItems: get().cartItems.map((item) =>
        item.cartId === cartId
          ? { ...item, quantity: newQuantity }
          : item
      ),
    });

    if (user) {
      await supabase
        .from("cart_items")
        .update({ quantity: newQuantity })
        .eq("user_id", user.id)
        .eq("product_id", cartId);
    }
  },

  removeFromCart: async (cartId) => {
    const user = useAuthStore.getState().user;

    set({
      cartItems: get().cartItems.filter((item) => item.cartId !== cartId),
    });

    if (user) {
      await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", cartId);
    }
  },

  clearCart: async () => {
    const user = useAuthStore.getState().user;

    set({ cartItems: [] });

    if (user) {
      await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id);
    }
  },

  loadCart: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const { data, error } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      set({ error: error.message });
      return;
    }

    set({
      cartItems: data.map((item) => ({
        cartId: item.product_id,
        id: item.product_id,
        name: item.name,
        price: item.price,
        img: item.image_url,
        quantity: item.quantity,
      })),
    });
  },

  getQuantity: (cartId) => {
    const item = get().cartItems.find((item) => item.cartId === cartId);
    return item ? item.quantity : 0;
  },
}));