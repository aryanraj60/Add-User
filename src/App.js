import { Button, Modal } from "flowbite-react";

import User from "./components/User";
import AddUser from "./components/AddUser";
import { useEffect, useState } from "react";
import { db } from "./utils/firebase";
import UpdateUser from "./components/UpdateUser";

function App() {
  const [users, setUsers] = useState([]);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const unSubscribe = db.collection("users").onSnapshot((snapshot) => {
      let allUsers = [];
      snapshot.docs.map((doc) => {
        allUsers.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      console.log("Snap", snapshot);
      setUsers(allUsers);
    });

    return () => {
      unSubscribe();
    };
  }, []);
  console.log("Users", users);
  return (
    <div className="App p-4 h-screen overflow-y-auto bg-gradient-to-r from-[#3f5efb] to-[#fc466b]">
      <div className="bg-slate-100 max-w-[600px] h-full overflow-y-auto m-auto w-full rounded-md shadow-xl p-4">
        <div>
          <h3 className="text-3xl font-bold text-center text-blue-800 p-2">
            Add User App
          </h3>

          <AddUser />
        </div>

        <div className="mt-5">
          <ul className="px-2 font-semibold text-lg">
            {users?.map((user) => (
              <User
                key={user.id}
                user={user}
                setSelectedUser={setSelectedUser}
                setOpenUpdateModal={setOpenUpdateModal}
              />
            ))}
          </ul>

          <UpdateUser
            selectedUser={selectedUser}
            openUpdateModal={openUpdateModal}
            setOpenUpdateModal={setOpenUpdateModal}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
