import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";

// Get all items for a user
export const getItems = async (userId) => {
  const itemsCollection = collection(db, "users", userId, "items");
  const snapshot = await getDocs(itemsCollection);

  const items = [];
  snapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() });
  });

  return items;
};

// Add a new item
export const addItem = async (userId, item) => {
  const itemsCollection = collection(db, "users", userId, "items");
  const docRef = await addDoc(itemsCollection, item);

  return docRef.id;
};

// Delete an item
export const deleteItem = async (userId, itemId) => {
  try {
    const itemRef = doc(db, "users", userId, "items", itemId);
    await deleteDoc(itemRef);
    return true; // Indicate success
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error; // Re-throw for error handling in components
  }
};