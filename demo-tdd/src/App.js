import React, { useState, useEffect } from 'react';
import TodoList from './Components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState('');
  const [saving, setNewSaving] = useState(false);

  function onChange(e){
    const value = e.target.value;
    setNewTodo(value);
  }

  function addTodo(e) {
    e.preventDefault();
    const value = {
      userId: 3,
      id: Math.floor(Math.random() * 100) + 1,
      title: newTodo,
      completed: false,
    };

    setNewSaving(true);

    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Contents-type': 'application/json; charset=UTF-8',
      },
    })
    .then(response=> response.json())
    .then(result => {
      setTodos(todos.concat({...result, id: value.id}));
      setNewSaving(false);
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('https://jsonplaceholder.typicode.com/todos').then(response => 
        response.json() 
      )

      setTodos(result.slice(0,5));
      setLoading(false);
    }
    fetchData();
  }, []);

  function removeTodo(id) {
    setTodos(todos.filter(t => t.id !== id));
  }

  function updateTodo(id) {
    const newList = todos.map(todoItem => {
      if(todoItem.id === id){
        const updateItem = {...todoItem, completed: !todoItem.completed};
        return updateItem;
      }
      return todoItem
    });
    setTodos(newList)
  }

  return (
    <div className="App">
      <h1 className='header'>My todo list</h1>
      {loading ? 'Loading' : <TodoList todos={todos} removeHandler={removeTodo} updateTodo={updateTodo}/> }

      <div className="add-todo-form">
        {saving ? (
          'Saving'
          ) : (
            <form onSubmit={addTodo}>
              <input type="text" onChange={onChange} />
              <button type="submit">Add new todo</button>
            </form>
        )}
      </div>
    </div>
  );
}

export default App;