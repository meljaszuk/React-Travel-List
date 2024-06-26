import {initialItems} from './data.js';
import { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([]);

  function handleClearList() {
    setItems([])
  }

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter(item => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) => 
      items.map((item) => 
        item.id === id ? {...item, packed: !item.packed} : item 
      )
    )
  }

  return (
    <div>
      <Logo />
      <Form onAddItems={handleAddItems}/>
      <PackingList 
        items={items} 
        onDeleteItem = {handleDeleteItem}
        onToggleItem = {handleToggleItem}
        onClearList={handleClearList} 
      />
      <Stats items={items} />
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

  function PackingList({items, onDeleteItem, onToggleItem, onClearList}) {
    const [sortBy, setSortBy] = useState('input');
    let sortedItems = [];

    if(sortBy === 'input') sortedItems = items;

    if(sortBy === 'description') sortedItems = items
      .slice()
      .sort((a,b) => a.description.localeCompare(b.description));
    
    if (sortBy === "packed")
      sortedItems = items
      .slice()
      .sort((a,b) => Number(a.packed) - Number(b.packed));


    return (
      <div className='list'>
        <ul className="list">
          {sortedItems.map((item) => (
            <Item 
              item={item} 
              key={item.id}
              onDeleteItem={onDeleteItem}
              onToggleItem={onToggleItem}
            />
          ))}
        </ul>

        <div className='actions'>
          <select value={sortBy} onChange={(evnt) => setSortBy(evnt.target.value)}>
            <option value='input'>Sort by input order</option>
            <option value='description'>Sort by description</option>
            <option value='packed'>Sort by packed status</option>
          </select>
          <button className='actions' onClick={onClearList}>
            Clear list
          </button>
        </div>
      </div>
    )
  }

  function Item({item, onDeleteItem, onToggleItem}) {
    return (
      <li>
        <input 
          type="checkbox" 
          checked={item.packed}
          onChange={()=>onToggleItem(item.id)} 
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

  function Stats({items}) {
    if (!items.length)
      return (
        <p className='stats'>
          <em>Start adding items</em>
        </p>
      );


    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed === true).length;
    const percentage = Math.round((numPacked / numItems) * 100);

    return (
      <footer className="stats">
        <em>You have {numItems} items on your list, and you already packed {numPacked} of them {percentage}%.</em>
      </footer>
    )
  }
}