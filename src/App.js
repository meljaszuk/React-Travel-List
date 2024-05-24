import {initialItems} from './data.js';
import { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter(item => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) => items.map((item) => item.id === id ? {...item, packed: !item.packed} : item ))
  }

  return (
    <div>
      <Logo />
      <Form onAddItems={handleAddItems}/>
      <PackingList items={items} onDeleteItem = {handleDeleteItem}/>
      <Stats />
    </div>
  )

  function Logo() {
    return (
      <h1>🌴 Far away 😎</h1>
    )
  }

  function Form({onAddItems}) {
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
 
    function handleSubmit(evnt) {
      evnt.preventDefault();

      if (!description) return;

      const newItem = {description, quantity, packed: false, id: Date.now()};

      onAddItems(newItem);

      setDescription("");
      setQuantity(1);
    }

    return (
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your trip?</h3>
        <select value={quantity} onChange={(event) => setQuantity(Number(event.target.value))}>
          {Array.from({length: 20}, (_, i) => i + 1).map(
            (num) => (
              <option value={num} key={num}>
                {num}
              </option>
            ))
          }
        </select>
        <input 
          type="text" 
          placeholder='Item...' 
          value={description}
          onChange={(evnt) => setDescription(evnt.target.value)}
        />
        <button>
          Add
        </button>
      </form>
    )
  }

  function PackingList({items, onDeleteItem}) {
    return (
      <div className='list'>
        <ul className="list">
          {items.map((item) => (
            <Item 
            item={item} 
            key={item.id}
            onDeleteItem={onDeleteItem}/>
          ))}
        </ul>
      </div>
    )
  }

  function Item({item, onDeleteItem}) {
    return (
      <li>
        <input 
          type="checkbox" 
          value={item.packed}
          onChange={()=>{}} 
        />
        <span style={item.packed ? {textDecoration: "line-through"} : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={() => onDeleteItem(item.id)}>
          ✖️
        </button>
      </li>
    )
  }

  function Stats() {
    return (
      <footer className="stats">
        <em>You have X items on your list, and you already packed X of them (X%).</em>
      </footer>
    )
  }
}