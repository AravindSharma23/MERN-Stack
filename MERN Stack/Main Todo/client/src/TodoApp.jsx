// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const TodoApp = () => {
//   const [todos, setTodos] = useState([]);
//   const [task, setTask] = useState("");

//   // Fetch Todos
//   const fetchTodos = async () => {
//     const response = await axios.get("http://localhost:5000/todos");
//     setTodos(response.data);
//   };

//   // Add a Todo
//   const addTodo = async () => {
//     if (!task.trim()) return;
//     const response = await axios.post("http://localhost:5000/todos", { task });
//     setTodos([...todos, response.data]);
//     setTask("");
//   };

//   // Update a Todo
//   const toggleComplete = async (id, completed) => {
//     const response = await axios.put(`http://localhost:5000/todos/${id}`, { completed: !completed });
//     setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
//   };

//   // Delete a Todo
//   const deleteTodo = async (id) => {
//     await axios.delete(`http://localhost:5000/todos/${id}`);
//     setTodos(todos.filter(todo => todo._id !== id));
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   return (
//     <div style={{ margin: '20px' }}>
//       <h1>To-Do List</h1>
//       <div>
//         <input
//           type="text"
//           value={task}
//           onChange={(e) => setTask(e.target.value)}
//           placeholder="Enter a task"
//         />
//         <button onClick={addTodo}>Add</button>
//       </div>
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo._id}>
//             <input
//               type="checkbox"
//               checked={todo.completed}
//               onChange={() => toggleComplete(todo._id, todo.completed)}
//             />
//             <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
//               {todo.task}
//             </span>
//             <button onClick={() => deleteTodo(todo._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TodoApp;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  // Fetch Todos
  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:5000/todos");
    setTodos(response.data);
  };

  // Add a Todo
  const addTodo = async () => {
    if (!task.trim()) return;
    const response = await axios.post("http://localhost:5000/todos", { task });
    setTodos([...todos, response.data]);
    setTask("");
  };

  // Update a Todo
  const toggleComplete = async (id, completed) => {
    const response = await axios.put(`http://localhost:5000/todos/${id}`, { completed: !completed });
    setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
  };

  // Delete a Todo
  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>To-Do List</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          style={styles.input}
        />
        <button onClick={addTodo} style={styles.addButton}>Add</button>
      </div>
      <ul style={styles.list}>
        {todos.map((todo) => (
          <li key={todo._id} style={styles.listItem}>
            <div style={styles.itemContent}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo._id, todo.completed)}
                style={styles.checkbox}
              />
              <span
                style={{
                  ...styles.taskText,
                  textDecoration: todo.completed ? 'line-through' : 'none',
                }}
              >
                {todo.task}
              </span>
            </div>
            <button onClick={() => deleteTodo(todo._id)} style={styles.deleteButton}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: "'Arial', sans-serif",
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#343a40',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  },
  input: {
    width: '70%',
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    outline: 'none',
    marginRight: '10px',
  },
  addButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  list: {
    listStyle: 'none',
    padding: '0',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
  },
  itemContent: {
    display: 'flex',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: '10px',
  },
  taskText: {
    fontSize: '1rem',
    color: '#495057',
  },
  deleteButton: {
    padding: '5px 10px',
    fontSize: '0.9rem',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default TodoApp;

