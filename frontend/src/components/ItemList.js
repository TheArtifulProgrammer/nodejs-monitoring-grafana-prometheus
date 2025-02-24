import React from "react";

function ItemList({ items, onDeleteItem }) {
  if (items.length === 0) {
    return <p>No items found. Add one to get started!</p>;
  }

  return (
    <div className="item-list">
      <h2>Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id} className="item">
            <div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p className="date">
                {new Date(item.created).toLocaleDateString()}
              </p>
            </div>
            <button
              className="delete-btn"
              onClick={() => onDeleteItem(item._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
