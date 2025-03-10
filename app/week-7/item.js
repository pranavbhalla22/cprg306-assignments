export default function Item({ name, quantity, category }) {
    return (
      <li className="p-2 m-4 bg-white max-w-sm rounded-lg shadow">
        <h2 className="text-xl font-bold text-black">{name}</h2>
        <div className="text-sm text-gray-700">
          Buy {quantity} in {category}
        </div>
      </li>
    );
  }