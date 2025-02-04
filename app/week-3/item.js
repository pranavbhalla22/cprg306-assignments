import React from 'react';

const Item = ({ name, quantity, category }) => {
    return (
        <li className="p-6 border-b border-gray-300 bg-gray-50 rounded-md shadow-sm">
            <div className="font-bold text-xl text-blue-700">{name}</div>
            <div className="text-gray-700">Quantity: {quantity}</div>
            <div className="text-gray-700">Category: {category}</div>
        </li>
    );
};

export default Item;