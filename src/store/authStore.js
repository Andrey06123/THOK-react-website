// src/store/authStore.js
import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import { useCartStore } from './cartStore'

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,
  isLoggedIn: false,
  message: null,

  signUp: async (email, password) => {
    set({ loading: true, error: null, message: null })

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data:{
          full_name: name,
        },
        emailRedirectTo: 'https://thok.store/account'
      },
    })

    if (error) {
      set({ error: error.message, loading: false })
      return
    }

    set({
      user: data.user,
      loading: false,
      isLoggedIn: true,
      message: 'Check your email to verify your account.',
    })
  },

  login: async (email, password) => {
    set({ loading: true, error: null })
    

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      set({ error: error.message, loading: false })
      return
    }
    

    set({
      user: data.user,
      loading: false,
      isLoggedIn: true,
    })
    await useCartStore.getState().loadCart();
  },

  logout: async () => {
    set({ loading: true, error: null })

    const { error } = await supabase.auth.signOut()

    if (error) {
      set({ error: error.message, loading: false })
      return
    }

    set({
      user: null,
      loading: false,
      isLoggedIn: false,
    })

    useCartStore.getState().clearCart();
  },

  clearError: () => set({ error: null }),
}))