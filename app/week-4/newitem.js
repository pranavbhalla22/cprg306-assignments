"use client";
import { useState } from 'react';

export default function NewItem() {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="p-4 bg-slate-900 max-w-sm rounded-lg">
      <div className="text-center mb-4">
        <p className="text-xl font-bold">Quantity: {quantity}</p>
      </div>
      <div className="flex justify-between">
        <button
          onClick={decrement}
          disabled={quantity === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Decrement
        </button>
        <button
          onClick={increment}
          disabled={quantity === 20}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Increment
        </button>
      </div>
    </div>
  );
}