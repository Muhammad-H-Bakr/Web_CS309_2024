import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
        .then(response => {
          setItems(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the data!', error);
        });
  }, []);

  const addItem = () => {
    axios.post('http://localhost:5000/api/items', { name })
        .then(response => {
          setItems([...items, response.data]);
          setName('');
        })
        .catch(error => {
          console.error('There was an error adding the item!', error);
        });
  };

  return (
      <div className="App">
        <h1>Items</h1>
        <ul>
          {items.map((item, index) => (
              <li key={index}>{item.name}</li>
          ))}
        </ul>
        <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Add a new item"
        />
        <button onClick={addItem}>Add Item</button>
      </div>
  );
}

export default App;
