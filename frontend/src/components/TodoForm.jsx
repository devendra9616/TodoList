import { useState, useEffect } from 'react';
import { API } from '../api';
import "./TodoForm.css";

const TodoForm = ({ fetchTodos, selectedTodo, setSelectedTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedTodo) {
      setTitle(selectedTodo.title);
      setDescription(selectedTodo.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [selectedTodo]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedTodo) {
        
        await API.put(`/updateTodo/${selectedTodo._id}`, {
          title,
          description,
        });
        setSelectedTodo(null); 
      } else {
        
        await API.post('/createTodo', {
          title,
          description,
        });
      }

      setTitle('');
      setDescription('');

      
      fetchTodos();
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Title"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">
        {selectedTodo ? 'Update' : 'Add'}
      </button>
    </form>
  );
};

export default TodoForm;
