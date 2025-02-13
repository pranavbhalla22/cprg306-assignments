"use client";
import { useState } from 'react';
import Item from './item';
import items from './item.json';

export default function ItemList() {
  const [sortBy, setSortBy] = useState('name');
  const [grouped, setGrouped] = useState(false);

  // Sort the items
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'category') {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-4">
        <span className="mr-2">Sort by:</span>
        <button
          onClick={() => { setSortBy('name'); setGrouped(false); }}
          className={`p-2 mr-2 ${sortBy === 'name' && !grouped ? 'bg-blue-500' : 'bg-gray-500'}`}
        >
          Name
        </button>
        <button
          onClick={() => { setSortBy('category'); setGrouped(false); }}
          className={`p-2 mr-2 ${sortBy === 'category' && !grouped ? 'bg-blue-500' : 'bg-gray-500'}`}
        >
          Category
        </button>
        <button
          onClick={() => setGrouped(true)}
          className={`p-2 ${grouped ? 'bg-blue-500' : 'bg-gray-500'}`}
        >
          Group by Category
        </button>
      </div>
      {grouped ? (
        Object.keys(groupedItems)
          .sort()
          .map((category) => (
            <div key={category}>
              <h2 className="text-xl font-bold capitalize mt-4">{category}</h2>
              <ul>
                {groupedItems[category]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item) => (
                    <Item
                      key={item.id}
                      name={item.name}
                      quantity={item.quantity}
                      category={item.category}
                    />
                  ))}
              </ul>
            </div>
          ))
      ) : (
        <ul>
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))}
        </ul>
      )}
    </div>
  );
}