"use client";
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from "next/navigation";
import { useState } from "react"; // Import useState
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

export default function Page() {
  const { user } = useUserAuth();
  const router = useRouter();

  // Redirect to the landing page if the user is not logged in
  if (!user) {
    router.push("/week-9");
    return null; // Return null to prevent rendering anything
  }

  const [items, setItems] = useState(itemsData); // Use useState
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleItemSelect = (itemName) => {
    const cleanedName = itemName
      .replace(/[\u{1F600}-\u{1F6FF}]/gu, "")
      .split(",")[0]
      .trim();
    setSelectedItemName(cleanedName);
  };

  return (
    <main className="p-4 min-h-screen" style={{ backgroundColor: '#4E80EE' }}>
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