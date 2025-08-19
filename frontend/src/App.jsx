import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { API } from './api'; // 
import "./App.css";

function App() {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const res = await API.get('/getTodos');
      setTodos(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className='body'>
      <h1>Todo List (MongoDB)</h1>
      <TodoForm
        fetchTodos={fetchTodos}             
        selectedTodo={selectedTodo}
        setSelectedTodo={setSelectedTodo}
      />
      <TodoList
        todos={todos}                       
        fetchTodos={fetchTodos}            
        selectedTodo={selectedTodo}
        setSelectedTodo={setSelectedTodo}
      />
    </div>
  );
}

export default App;
