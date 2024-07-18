import './App.css';
import { useState } from 'react'

function App() {
  const quote = ''
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null)

  const addTodo = e => {
    e.preventDefault();
    if (isEditing) {
      updateTodo();
    } else {
      const capitalisedInput = input.toUpperCase()
      setTodos([...todos, capitalisedInput])
      setInput('')
    }
  };

  const deleteTodo = index => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const startEditing = index => {
    setIsEditing(true);
    setCurrentTodo(index);
    setInput(todos[index]);
  };

  const updateTodo = () => {
    const updatedTodos = todos.map((todo, index) =>
    index === currentTodo ? input.toUpperCase() : todo
  );
  setTodos(updatedTodos);
  setInput('')
  setIsEditing(false);
  setCurrentTodo(null);
  };


  return (
    <div className="App">
      <h1>My ToDo List</h1>
      <p>{quote}</p>

      <form>
        <input value={input} onChange={e => setInput(e.target.value)} type="text"/>
        <button type="submit" onClick={addTodo}>{isEditing ? 'Update ToDo' : 'Add ToDo'}</button>
      </form>


      <h2>List of ToDos</h2>
      {todos.map((todo, index) => (
        <div key={index}>
        <p>{todo}</p>
        <button onClick={() => deleteTodo(index)}>Delete</button>
        <button onClick={() => startEditing(index)}>Edit</button>
      </div>
      ))}

    </div>
  );
}

export default App;
