"use client";
 
 import { useState } from "react";
 
 export default function NewItem({ onAddItem }) {
   const [name, setName] = useState("");
   const [quantity, setQuantity] = useState(1);
   const [category, setCategory] = useState("produce");
 
   function handleSubmit(event) {
     event.preventDefault();
     const newId = Math.floor(Math.random() * 1000000);
     const item = { id: newId, name, quantity, category };
     onAddItem(item);
 
     setName("");
     setQuantity(1);
     setCategory("produce");
   }
 
   return (
     <main className="w-full">
       <strong className="text-xl m-4 font-bold">Add New Item</strong>
       <br />
       <form
         onSubmit={handleSubmit}
         className="text-black max-w-sm p-2 mt-0 ml-2 mb-4 mr-4 w-full"
       >
         <div className="mb-2">
           <input
             type="text"
             value={name}
             onChange={(event) => setName(event.target.value)}
             required
             placeholder="Item name"
             className="w-full mt-1 border-2 border-gray-300 p-2 rounded-lg"
           />
         </div>
         <div className="flex justify-between">
           <input
             type="number"
             min="1"
             max="99"
             value={quantity}
             onChange={(event) => setQuantity(event.target.value)}
             required
             className="w-20 ml-1 border-2 border-gray-300 p-2 rounded-lg"
           />
           <select
             value={category}
             onChange={(event) => setCategory(event.target.value)}
             className="ml-1 border-2 border-gray-300 p-2 rounded-lg"
           >
             <option disabled>Category</option>
             <option value="produce">Produce</option>
             <option value="dairy">Dairy</option>
             <option value="bakery">Bakery</option>
             <option value="meat">Meat</option>
             <option value="frozen foods">Frozen Foods</option>
             <option value="canned goods">Canned Goods</option>
             <option value="dry goods">Dry Goods</option>
             <option value="beverages">Beverages</option>
             <option value="snacks">Snacks</option>
             <option value="household">Household</option>
             <option value="other">Other</option>
           </select>
         </div>
         <button
           type="submit"
           className="w-full mt-4 py-2 px-4 bg-rose-800 text-white font-semibold rounded-lg hover:bg-rose-700"
         >
           +
         </button>
       </form>
     </main>
   );
 }