'use client';

import { use } from 'react';
import Image from 'next/image';
import { PlusIcon } from '../icons/PlusIcon';
import { MinusIcon } from '../icons/MinusIcon';
import addToCartIcon from '@/../public/img/icon-add-to-cart.svg';
import { CartContext } from './cart-context';
import type { DessertProps } from '../dessert/dessert-card';

export function AddToCartButton(
  props: Omit<DessertProps, 'category' | 'imageUrls' | 'imageAlt'> & {
    thumbnailUrl: string;
  }
) {
  const cartContextValue = use(CartContext);
  if (!cartContextValue) {
    throw new Error('CartContext must be used within a CartProvider');
  }

  const cartContext = cartContextValue;
  const itemInCart = cartContext.items.find(
    (cartItem) => cartItem.id === props.id
  );

  function addItemToCart() {
    cartContext.addItem({ ...props, quantity: 1 });
  }

  function incrementQuantity() {
    if (itemInCart) {
      cartContext.updateItemQuantity(props.id, itemInCart.quantity + 1);
    }
  }

  function decrementQuantity() {
    if (itemInCart) {
      if (itemInCart.quantity > 1) {
        cartContext.updateItemQuantity(props.id, itemInCart.quantity - 1);
      } else {
        cartContext.removeItem(props.id);
      }
    }
  }

  return (
    <div className="w-[160px] grid items-center justify-items-center absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2">
      {itemInCart != null ? (
        <div className="w-full bg-red rounded-full flex items-center justify-between py-[0.78125rem] px-7">
          <button
            onClick={decrementQuantity}
            className="size-5 flex items-center justify-center cursor-pointer border border-white rounded-full group hover:bg-white active:bg-white transition-colors"
          >
            <MinusIcon />
          </button>
          <div className="text-[0.875rem] font-semibold text-white tabular-nums">
            {itemInCart?.quantity}
          </div>
          <button
            onClick={incrementQuantity}
            className="size-5 flex items-center justify-center cursor-pointer border border-white rounded-full group hover:bg-white active:bg-white transition-colors"
          >
            <PlusIcon />
          </button>
        </div>
      ) : (
        <button
          onClick={addItemToCart}
          className="w-full border-2 border-rose-400 hover:border-red hover:text-red bg-white rounded-full flex items-center justify-center gap-2 py-[0.78125rem] px-7 cursor-pointer transition-colors"
        >
          <Image src={addToCartIcon} alt="" width={20} height={20} priority />
          <span className="font-semibold text-[0.875rem] whitespace-nowrap">
            Add to Cart
          </span>
        </button>
      )}
    </div>
  );
}
