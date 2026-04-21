import { useProductById } from "@/hooks/useProduct";
import { OrderItem } from "@/types";
import React from "react";
import CartItem from "./CartItem";
import { useOrderStore } from "@/store/orderStore";

interface CartItemWrapperProps {
  item: OrderItem;
}

export default function CartItemWrapper({ item }: CartItemWrapperProps) {
  const { product, loading } = useProductById(item.productId);
  const { increaseQty, decreaseQty, removeItem, updateNote } = useOrderStore();

  if (loading)
    return (
      <div className="text-text-light flex justify-center text-sm">
        Loading...
      </div>
    );

  return (
    <CartItem
      key={item.productId}
      {...item}
      price={product?.price || 0 * item.quantity}
      quantity={item.quantity}
      addQty={() => increaseQty(item.productId)}
      minQty={() => decreaseQty(item.productId)}
      onRemove={() => removeItem(item.productId)}
      note={item.note as string}
      onNoteChange={(note: string) => updateNote(item.productId, note)}
    />
  );
}
