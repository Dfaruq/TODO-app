import './App.css';
import { useState } from 'react';



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
      const newTodo = {
        text: input.toUpperCase(),
        completed: false
      };
      setTodos([...todos, newTodo
      ])
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
    setInput(todos[index].text);
  };

  const updateTodo = () => {
    const updatedTodos = todos.map((todo, index) =>
    index === currentTodo ? { ...todo, text: input.toUpperCase() } : todo
  );
  setTodos(updatedTodos);
  setInput('')
  setIsEditing(false);
  setCurrentTodo(null);
  };

  const toggleComplete = index => {
    const updatedTodos = todos.map((todo, i) =>
    i === index ? {...todo, completed: !todo.completed } : todo);
    setTodos(updatedTodos);
  };


  return (
    <div className="App bg-dark text-white min-vh-100 p-5">
      <h1 className="text-center text-warning mb-4">My ToDo List</h1>
      <p className="text-center">{quote}</p>

      <form className="d-flex justify-content-center mb-4">
        <input className="form-control w-50 mr-2" value={input} onChange={e => setInput(e.target.value)} type="text"/>
        <button className="btn btn-primary" type="submit" onClick={addTodo}>{isEditing ? 'Update ToDo' : 'Add ToDo'}</button>
      </form>


      <h2 className="text-center text-warning">List of ToDos</h2>
      {todos.map((todo, index) => (
        <div className="d-flex justify-content-between align-items-center bg-secondary p-2 mb-2 rounded" key={index}>
        <p style={{
            color: todo.completed ? 'lightgreen' : 'white',
            textDecoration: todo.completed ? 'line-through' : 'none'
          }}>
            {todo.text}
          </p>
          <div className="ml-auto">
          <button className="btn btn-success btn-sm mr-2" onClick={() => toggleComplete(index)}>
            {todo.completed ? 'Undo' : 'Complete'}
          </button>
        <button className="btn btn-danger btn-sm mr-2" onClick={() => deleteTodo(index)}>Delete</button>
        <button className="btn btn-warning btn-sm" onClick={() => startEditing(index)}>Edit</button>
          </div>
      </div>
      ))}

    </div>
  );
}

export default App;
