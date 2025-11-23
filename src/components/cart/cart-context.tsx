'use client';

import { createContext, useContext, useState, useCallback } from 'react';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  thumbnailUrl: string;
};

type Cart = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  clear: () => void;
};

export const CartContext = createContext<Cart | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prevItems) => {
      const existingItemInCartIdx = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItemInCartIdx !== -1) {
        return prevItems.map((cartItem, idx) =>
          idx === existingItemInCartIdx
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        return [...prevItems, item];
      }
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.id !== itemId)
    );
  }, []);

  const updateItemQuantity = useCallback((itemId: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === itemId ? { ...cartItem, quantity } : cartItem
      )
    );
  }, []);

  const clear = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <CartContext
      value={{
        items,
        addItem,
        removeItem,
        updateItemQuantity,
        clear
      }}
    >
      {children}
    </CartContext>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
