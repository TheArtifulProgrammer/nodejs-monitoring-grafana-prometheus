import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/items");
      setItems(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch items. Please try again later.");
      console.error("Error fetching items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddItem = async (newItem) => {
    try {
      const response = await axios.post("/api/items", newItem);
      setItems([...items, response.data]);
    } catch (err) {
      setError("Failed to add item. Please try again.");
      console.error("Error adding item:", err);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`/api/items/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      setError("Failed to delete item. Please try again.");
      console.error("Error deleting item:", err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Item Manager</h1>
      </header>
      {error && <div className="error-message">{error}</div>}
      <main>
        <ItemForm onAddItem={handleAddItem} />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ItemList items={items} onDeleteItem={handleDeleteItem} />
        )}
      </main>
    </div>
  );
}

export default App;
