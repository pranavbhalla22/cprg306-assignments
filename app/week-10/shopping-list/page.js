"use client";
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import ItemList from "./components/item-list";
import NewItem from "./components/new-item";
import MealIdeas from "./components/meal-ideas";
import { getItems, addItem, deleteItem } from '../_services/shopping-list-service';

export default function Page() {
  const { user } = useUserAuth();
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [isLoading, setIsLoading] = useState(false);

  const loadItems = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const items = await getItems(user.uid);
      setItems(items);
      if (items.length > 0 && !selectedItemName) {
        setSelectedItemName(items[0].name);
      }
    } catch (error) {
      console.error("Error loading items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, [user]);

  const handleAddItem = async (item) => {
    try {
      const id = await addItem(user.uid, item);
      setItems([...items, { id, ...item }]);
      setSelectedItemName(item.name);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(user.uid, id);
      setItems(items.filter(item => item.id !== id));
      // Reset selected item if deleted
      if (items.find(item => item.id === id)?.name === selectedItemName) {
        setSelectedItemName(items.length > 1 ? items[0].name : "");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return a.category.localeCompare(b.category);
  });

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shopping List</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column - Shopping List Controls */}
        <div className="space-y-6">
          {/* New Item Form */}
          <div className="bg-white p-4 rounded-lg shadow">
            <NewItem onAddItem={handleAddItem} />
          </div>

          {/* Sort Controls */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium mb-3">Sort by:</h3>
            <div className="flex gap-4">
              <button
                onClick={() => setSortBy("name")}
                className={`px-4 py-2 rounded-lg ${
                  sortBy === "name" ? "bg-blue-500 text-white" : "bg-gray-700"
                }`}
              >
                Name
              </button>
              <button
                onClick={() => setSortBy("category")}
                className={`px-4 py-2 rounded-lg ${
                  sortBy === "category" ? "bg-blue-500 text-white" : "bg-gray-700"
                }`}
              >
                Category
              </button>
            </div>
          </div>

          {/* Item List */}
          <div className="bg-white p-4 rounded-lg shadow">
            {isLoading ? (
              <p className="text-center py-4">Loading items...</p>
            ) : (
              <ItemList 
                items={sortedItems} 
                onDelete={handleDeleteItem}
                onItemSelect={setSelectedItemName}
                selectedItem={selectedItemName}
              />
            )}
          </div>
        </div>

        {/* Right Column - Meal Ideas */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-white">Meal Ideas</h2>
          {selectedItemName ? (
            <>
              <p className="text-gray-300 mb-4">
                Ideas using <span className="font-medium text-white">{selectedItemName}</span>:
              </p>
              <MealIdeas ingredient={selectedItemName} />
            </>
          ) : (
            <p className="text-gray-400">Select an item to see meal ideas</p>
          )}
        </div>
      </div>
    </main>
  );
}