import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { db } from "../utils/firebase";

const User = ({ user, setSelectedUser, setOpenUpdateModal }) => {
  const handleDelete = (userId) => {
    db.collection("users").doc(userId).delete();
  };

  return (
    <>
      <div className="flex justify-between">
        <li className="p-2">
          <h2
            onClick={() => {
              setOpenUpdateModal(true);
              setSelectedUser(user);
            }}
            className="hover:bg-gray-400 rounded-xl p-2 cursor-pointer"
          >
            {user.name}
          </h2>
        </li>
        <div
          className="rounded-full hover:bg-slate-400 p-2 cursor-pointer"
          onClick={() => handleDelete(user.id)}
        >
          <AiFillDelete size={25} />
        </div>
      </div>
    </>
  );
};

export default User;
