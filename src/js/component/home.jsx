import React, { useState } from "react";
import Card from "./Card";
import CreateUser from "./CreateUser";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [reload, setReload] = useState(false);

  const handleUserCreated = (userName) => {
    setSelectedUser(userName);
    setReload(!reload);
  };

  const handleUserSearched = (userName) => {
    setSelectedUser(userName);
    setReload(!reload);
  };

  

  return (
    <div>
      <CreateUser
        onUserCreated={handleUserCreated}
        onUserSearched={handleUserSearched}
      />

      {selectedUser && (
        <>

          <Card userName={selectedUser} reloadTasks={reload} />
        </>
      )}

    </div>
  );
};

export default Home;
