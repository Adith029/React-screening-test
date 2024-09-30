import React, { useState } from "react";
import { useIndexedDB } from "react-indexed-db-hook";
import { Link } from "react-router-dom";

function Register() {
  const { add, getAll } = useIndexedDB("users");
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    const newErrors = {};
    if (!user.name) newErrors.name = "Name is required";
    if (!user.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(user.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!user.password) {
      newErrors.password = "Password is required";
    } else if (user.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      getAll().then((users) => {
        const existEmail = users.some((u) => u.email === user.email);
        if (existEmail) {
          setErrors({ email: "Email already exists " });
        } else {
          add({ ...user, isBlocked: false }).then(() => {
            alert("User Registered Successfully");
            setUser({ name: "", email: "", password: "" });
            setErrors({});
          });
        }
      });
    }
  };

  return (
    <div>
      <div>
        <Link to={"/login"}>
          <button>Login</button>
        </Link>
      </div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Enter Your Name:</label>
        <input
          type="text"
          placeholder="Enter Your Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        {errors.name && <span className="error">{errors.name}</span>} <br />
        <label htmlFor="email">Enter Your Email:</label>
        <input
          type="email"
          placeholder="Enter Your Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <br />
        <label htmlFor="password">Enter Your Password:</label>
        <input
          type="password"
          placeholder="Enter Your Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        {errors.password && <span className="error">{errors.password}</span>}
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
