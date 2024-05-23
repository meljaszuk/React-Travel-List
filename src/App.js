import {initialItems} from './data.js'

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
    return (
      <div className="add-form">
        <h3>What do you need for your trip?</h3>
      </div>
    )
  }

  function PackingList() {
    return (
      <div className='list'>
        <ul className="list">
          {initialItems.map((item) => (
            <Item item={item} />
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