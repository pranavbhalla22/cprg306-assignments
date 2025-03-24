export default function Item({ name, quantity, category, onSelect }) {
    return (
      <li
        className="p-2 m-2 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-gray-100"
        onClick={() => onSelect(name)}
      >
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <div className="text-sm text-gray-600">
          Buy {quantity} in {category}
        </div>
      </li>
    );
  }