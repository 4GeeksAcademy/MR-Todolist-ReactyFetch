import React, { useState } from "react";

const CreateUser = ({ onUserCreated, onUserSearched }) => {
  const [userName, setUserName] = useState("");

  const handleCreateUser = () => {
    fetch(`https://playground.4geeks.com/todo/users/${userName}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }).then(() => onUserCreated(userName));
  };

  const handleDeleteUser = () => {
    fetch(`https://playground.4geeks.com/todo/users/${userName}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => setUserName(""));
  };

  const handleSearchUser = () => {
    fetch(`https://playground.4geeks.com/todo/users/${userName}`)
      .then((response) => response.json())
      .then((data) => onUserSearched && onUserSearched(userName, data));
  };

  return (
    <section>
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong my-5">
              <div className="card-body2">
                <div className="title-container">
                  <h1 className="display-6">API CRD</h1>
                  <h1 className="display-5">USUARIO</h1>
                  <div className="form-outline mb-4">

                    <input
                      type="text"
                      placeholder="Nombre de usuario"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="form-control form-control-lg"
                    />

                  </div>
                </div>

                <br></br>


                <div className="buttons-container">
                  <div className="d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-success btn-lg mb-2"
                      onClick={handleCreateUser}
                    >
                      Crear Usuario
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-primary btn-lg mb-2"
                      onClick={handleSearchUser}
                    >
                      Buscar Usuario
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-danger btn-lg"
                      onClick={handleDeleteUser}
                    >
                      Eliminar Usuario
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateUser;
