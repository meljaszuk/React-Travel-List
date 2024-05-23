import {initialItems} from './data.js';
import { useState } from 'react';

export default function App() {
  return (
    <div>
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  )

  function Logo() {
    return (
      <h1>🌴 Far away 😎</h1>
    )
  }

  function Form() {
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(evnt) {
      evnt.preventDefault();

      if (!description) return;

      const newItem = {description, quantity, packed: false, id: Date.now()};

      setDescription("");
      setQuantity(1);
    }

    return (
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your trip?</h3>
        <select>
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

  function PackingList() {
    return (
      <div className='list'>
        <ul className="list">
          {initialItems.map((item) => (
            <Item item={item} key={item.id}/>
          ))}
        </ul>
      </div>
    )
  }

  function Item({item}) {
    return (
      <li>
        <span style={item.packed ? {textDecoration: "line-through"} : {}}>
          {item.quantity} {item.description}
        </span>
        <button>
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