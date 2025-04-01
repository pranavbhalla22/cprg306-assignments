"use client";
import { useState, useMemo } from "react";
import Item from "./item";

export default function ItemList({ items, onItemSelect }) {
  const [sortBy, setSortBy] = useState("name");

  // Fixed: Use useMemo to avoid mutating original array and unnecessary re-sorts
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => 
      sortBy === "name" 
        ? a.name.localeCompare(b.name) 
        : a.category.localeCompare(b.category)
    );
  }, [items, sortBy]);

  // Fixed: Simplified click handlers
  const handleSort = (type) => {
    setSortBy(type);
  };

  // Fixed: Changed 'for' to 'htmlFor' in label
  // Fixed: Added proper key prop to list items
  return (
    <div className="m-4">
      <div>
        <label htmlFor="sort" className="mr-2">Sort by:</label>
        <button
          id="sort-name"
          onClick={() => handleSort("name")}
          className={
            sortBy === "name"
              ? "bg-slate-500 p-1 m-2 w-28"
              : "bg-slate-700 p-1 m-2 w-28"
          }
        >
          Name
        </button>
        <button
          onClick={() => handleSort("category")}
          className={
            sortBy === "category"
              ? "bg-slate-500 p-1 m-2 w-28"
              : "bg-slate-700 p-1 m-2 w-28"
          }
        >
          Category
        </button>
      </div>
      <ul className="m-4">
        {sortedItems.map((item) => (
          <li 
            key={item.id}  // Moved key here (should be on the outermost element in the list)
            className="w-80 bg-rose-900 text-white mb-2 last:mb-0"
          >
                      <Item
            name={item.name}
            quantity={item.quantity}
            category={item.category}
            onSelect={() => onItemSelect(item.name)}  // Only pass the name (or specific value)
          />
          </li>
        ))}
      </ul>
    </div>
  );
}