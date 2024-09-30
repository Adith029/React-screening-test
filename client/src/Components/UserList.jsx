import React, { useEffect, useState } from "react";
import { useIndexedDB } from "react-indexed-db-hook";
import { Link } from "react-router-dom";

function UserList({ setAuthentication }) {
  const { getAll, update, deleteRecord } = useIndexedDB("users");
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState("");

  useEffect(() => {
    getAll().then((data) => setUsers(data));
  }, []);

  const toggleBlockUser = (user) => {
    const updatedUser = { ...user, isBlocked: !user.isBlocked };
    update(updatedUser).then(() => {
      alert(`User ${updatedUser.isBlocked ? "Blocked" : "Unblocked"}`);
      setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    });
  };

  const removeUser = (id) => {
    deleteRecord(id).then(() => {
      alert("User Removed");
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  const startEditing = (user) => {
    setEditingUser(user);
  };

  const saveUser = (user) => {
    if (user) {
      update(user).then(() => {
        alert("User Updated");
        setUsers(users.map((u) => (u.id === user.id ? user : u)));
        setEditingUser("");
      });
    }
  };

  return (
    <div>
      <div>
        <Link to={"/login"}>
          <button
            onClick={() => {
              setAuthentication(false);
            }}
          >
            Logout
          </button>
        </Link>
        <Link to={"/"}>
          <button>Register</button>
        </Link>
      </div>
      <h2>User List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
            <th>Previous Logins</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {editingUser && editingUser.id === user.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editingUser.name}
                      onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    />
                  </td>
                  <td colSpan="3">
                    <button onClick={() => saveUser(editingUser)}>Save</button>
                    <button onClick={() => setEditingUser(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isBlocked ? "(Blocked)" : "Active"}</td>
                  <td>
                    <button onClick={() => toggleBlockUser(user)}>
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                    <button onClick={() => removeUser(user.id)}>Remove</button>
                    <button onClick={() => startEditing(user)}>Edit</button>
                  </td>
                  <td>
                    <details>
                      <summary>Previous Logins</summary>
                      <ul>
                        {user.loginHistory && user.loginHistory.length > 0 ? (
                          user.loginHistory.map((login, index) => (
                            <li key={index}>{new Date(login).toLocaleString()}</li>
                          ))
                        ) : (
                          <li>No previous logins</li>
                        )}
                      </ul>
                    </details>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>    </div>
  );
}

export default UserList;
