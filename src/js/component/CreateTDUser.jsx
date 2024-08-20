import React, { useState } from "react";


const CreateTDUser = ({ userName, onTaskAdded }) => {
  const [taskLabel, setTaskLabel] = useState("");
  const [message, setMessage] = useState("");

  const handleAddTask = () => {
    fetch(`https://playground.4geeks.com/todo/todos/${userName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: taskLabel,
        is_done: false,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setMessage(`Tarea "${taskLabel}" ha sido agregada con éxito.`);
          setTaskLabel(""); 
          onTaskAdded(); // Notify parent component if needed
        } else {
          setMessage("Error al agregar la tarea.");
        }
      })
      .catch((error) => {
        console.error("Error al agregar la tarea:", error);
        setMessage("Error al agregar la tarea.");
      });
  };

  return (
    <div className="text-center">
      <h2 className="display-4">Agregar Tarea</h2>
      <div className="card mt-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card-body">
          <input
            type="text"
            placeholder="Descripción de la tarea"
            value={taskLabel}
            onChange={(e) => setTaskLabel(e.target.value)}
            className="form-control mb-3"
          />
          <button className="btn btn-primary mt-2" onClick={handleAddTask}>
            Agregar Tarea
          </button>
          {message && <p className="mt-3">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default CreateTDUser;