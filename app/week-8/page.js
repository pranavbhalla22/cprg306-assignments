"use client";
import { useState } from 'react';
import NewItem from './new-item';
import ItemList from './item-list';
import MealIdeas from './meal-ideas';
import itemsData from './item.json'; // Ensure this path is correct

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState('');

  // Event handler to add a new item
  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  // Event handler to select an item
  const handleItemSelect = (itemName) => {
    // Clean up the item name (remove size, emoji, etc.)
    const cleanedName = itemName
      .replace(/[\u{1F600}-\u{1F6FF}]/gu, '') // Remove emojis
      .split(',')[0] // Remove size/weight
      .trim();
    setSelectedItemName(cleanedName);
  };

  return (
    <main className="p-4 min-h-screen" style={{ backgroundColor: '#070429' }}>
      <h1 className="text-3xl font-bold mb-4 text-white">Shopping List</h1>
      <div className="flex">
        <div className="flex-1 max-w-sm mr-4">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <div className="flex-1 max-w-sm">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}