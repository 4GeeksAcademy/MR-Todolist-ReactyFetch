import React, { useState, useEffect } from "react";

const Card = ({ userName, reloadTasks }) => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetch(`https://playground.4geeks.com/todo/users/${userName}`)
      .then((response) => response.json())
      .then((data) => setTasks(data.todos || []));
  }, [userName, reloadTasks]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      fetch(`https://playground.4geeks.com/todo/todos/${userName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: inputValue.trim(), is_done: false }),
      }).then(() => {
        setInputValue('');
        fetch(`https://playground.4geeks.com/todo/users/${userName}`)
          .then((response) => response.json())
          .then((data) => setTasks(data.todos || []));
      });
    }
  };

  const handleDelete = (todoId) => {
    fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      fetch(`https://playground.4geeks.com/todo/users/${userName}`)
        .then((response) => response.json())
        .then((data) => setTasks(data.todos || []));
    });
  };



  return (
    <div className="text-center">
      <h1 className="display-4">TODOlist de</h1>

      <h1 className="display-1"><b>{userName}</b></h1>
      
      <div className="card mt-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card-body">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder="Añadir tarea..."
            className="form-control mb-3"
          />


          <ul className="list-group list-group-flush">
            {tasks.length === 0 ? (
              <li className="list-group-item">No hay tareas</li>
            ) : (
              tasks.map((task) => (
                <li key={task.id} 
                className="list-group-item d-flex justify-content-between align-items-center">
                  {task.label}


                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(task.id)}>
                    
                    
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              ))
            )}


          </ul>
        </div>
      </div>
    </div>
  );
};

export default Card;
