'use client';

import { use } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import { XIcon } from '../icons/XIcon';
import emptyCartImg from '@/../public/img/illustration-empty-cart.svg';
import treeIcon from '@/../public/img/icon-carbon-neutral.svg';
import orderConfirmedIcon from '@/../public/img/icon-order-confirmed.svg';
import { CartContext } from './cart-context';

export function Cart() {
  const cartContext = use(CartContext);
  if (cartContext == null) {
    throw new Error('CartContext must be used within a CartProvider');
  }

  const itemsInCart = cartContext.items.reduce(
    (sum, item) => (sum += item.quantity),
    0
  );

  return (
    <div className="p-6 bg-white self-start grow rounded-[12px]">
      <div className="text-2xl font-bold text-red mb-6">
        Your Cart ({itemsInCart})
      </div>
      {itemsInCart > 0 ? <CartContent /> : <EmptyCartContent />}
    </div>
  );
}

function CartContent() {
  const cartContext = use(CartContext);
  if (cartContext == null) {
    throw new Error('CartContext must be used within a CartProvider');
  }

  const totalAmount = cartContext.items.reduce(
    (sum, item) => (sum += item.quantity * item.price),
    0
  );

  return (
    <div className="space-y-6">
      <div className="[&>*:not(:first-child)]:pt-4">
        {cartContext.items.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div>Order Total</div>
        <div className="text-2xl font-bold">${totalAmount?.toFixed(2)}</div>
      </div>
      <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-rose-50">
        <Image src={treeIcon} alt="" />
        <span className="text-[0.875rem]">
          This is a <strong>carbon-neutral</strong> delivery
        </span>
      </div>
      <ConfirmOrderButton />
    </div>
  );
}

function CartItem({
  id,
  name,
  price,
  quantity
}: {
  id: string;
  name: string;
  price: number;
  quantity: number;
}) {
  const cartContextValue = use(CartContext);
  if (cartContextValue == null) {
    throw new Error('CartContext must be used within a CartProvider');
  }

  const cartContext = cartContextValue;
  const priceSum = quantity * price;

  function removeItemFromCart() {
    cartContext.removeItem(id);
  }

  return (
    <div className="flex items-center justify-between pb-4 space-y-2 border-b border-rose-100 text-[0.875rem] font-semibold">
      <div>
        <div>{name}</div>
        <div className="flex gap-2">
          <div className="text-red">{quantity}x</div>
          <div className="flex gap-2 text-rose-500">
            <span className="font-normal">@ ${price.toFixed(2)}</span>{' '}
            <span>${priceSum.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <button
        onClick={removeItemFromCart}
        className="group size-5 flex items-center justify-center cursor-pointer border border-rose-400 hover:border-rose-900 rounded-full"
      >
        <XIcon />
      </button>
    </div>
  );
}

function EmptyCartContent() {
  return (
    <>
      <Image src={emptyCartImg} alt="" priority className="pb-4 mx-auto" />
      <div className="text-[0.875rem] text-center font-semibold text-rose-500">
        Your added items will appear here
      </div>
    </>
  );
}

function ConfirmOrderButton() {
  const cartContext = use(CartContext);
  if (cartContext == null) {
    throw new Error('CartContext must be used within a CartProvider');
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) cartContext.clear();
      }}
    >
      <DialogTrigger asChild>
        <button className="w-full rounded-full py-4 bg-red hover:bg-[#952C0B] text-white font-semibold cursor-pointer transition-colors">
          Confirm Order
        </button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="p-10">
        <Image src={orderConfirmedIcon} alt="" className="mb-6" />
        <DialogTitle className="text-[2.5rem] mb-2 font-bold">
          Order Confirmed
        </DialogTitle>
        <div className="text-rose-500 mb-8">We hope you enjoy your food!</div>
        <OrderSummary />
      </DialogContent>
    </Dialog>
  );
}

function OrderSummary() {
  const cartContext = use(CartContext);
  if (cartContext == null) {
    throw new Error('CartContext must be used within a CartProvider');
  }

  const totalOrderAmount = cartContext.items.reduce(
    (sum, item) => (sum += item.quantity * item.price),
    0
  );

  return (
    <div className="bg-rose-50 rounded-xl p-6">
      <div className=" [&>*:not(:first-child)]:pt-4 mb-6">
        {cartContext.items.map((item) => (
          <OrderSummaryItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            thumbnailUrl={item.thumbnailUrl}
          />
        ))}
      </div>
      <div className="flex items-center justify-between mb-8">
        <div>Order Total</div>
        <div className="text-2xl font-bold">${totalOrderAmount.toFixed(2)}</div>
      </div>
      <button
        onClick={() => cartContext.clear()}
        className="w-full py-4 rounded-full bg-red hover:bg-[#952C0B] text-white font-semibold cursor-pointer transition-colors"
      >
        Start New Order
      </button>
    </div>
  );
}

function OrderSummaryItem({
  name,
  price,
  quantity,
  thumbnailUrl
}: {
  name: string;
  price: number;
  quantity: number;
  thumbnailUrl: string;
}) {
  const totalItemPrice = quantity * price;

  return (
    <div className="flex items-center justify-between border-b border-rose-100 pb-4">
      <div className="flex gap-4">
        <Image
          src={thumbnailUrl}
          width={48}
          height={48}
          alt=""
          className="rounded-sm size-12"
        />
        <div className="flex flex-col gap-2">
          <div className="text-[0.875rem] font-semibold">{name}</div>
          <div className="space-x-2 text-rose-500">
            <span className="font-semibold text-red">{quantity}x</span>
            <span>@ ${price.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="font-semibold">${totalItemPrice.toFixed(2)}</div>
    </div>
  );
}
