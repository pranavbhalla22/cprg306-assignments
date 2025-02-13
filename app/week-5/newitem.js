"use client";
import { useState } from 'react';

export default function NewItem() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = { name, quantity, category };
    console.log(item);
    alert(`Added Item: ${name}, Quantity: ${quantity}, Category: ${category}`);
    setName("");
    setQuantity(1);
    setCategory("produce");
  };

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
    <form onSubmit={handleSubmit} className="p-4 bg-slate-900 max-w-sm rounded-lg">
      {/* Name Field */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-white font-bold mb-2">
          Item Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 rounded bg-white text-black"
        />
      </div>

      {/* Quantity Field */}
      <div className="mb-4">
        <label htmlFor="quantity" className="block text-white font-bold mb-2">
          Quantity
        </label>
        <div className="flex items-center">
          <button
            type="button"
            onClick={decrement}
            disabled={quantity === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded-l disabled:bg-gray-400"
          >
            -
          </button>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            max="20"
            required
            className="w-full p-2 text-center bg-white text-black"
          />
          <button
            type="button"
            onClick={increment}
            disabled={quantity === 20}
            className="bg-blue-500 text-white px-4 py-2 rounded-r disabled:bg-gray-400"
          >
            +
          </button>
        </div>
      </div>

      {/* Category Field */}
      <div className="mb-4">
        <label htmlFor="category" className="block text-white font-bold mb-2">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 rounded bg-white text-black"
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen">Frozen Foods</option>
          <option value="canned">Canned Goods</option>
          <option value="dry">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
      >
        Add Item
      </button>
    </form>
  );
}