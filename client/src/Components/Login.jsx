import React, { useState } from "react";
import { useIndexedDB } from "react-indexed-db-hook";
import { Link, useNavigate } from "react-router-dom";

function Login({ setAuthenticated }) {
  const { getAll, update } = useIndexedDB("users");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    const newErrors = {};
    if (!credentials.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(credentials.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!credentials.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      getAll().then((users) => {
        const user = users.find(
          (us) =>
            us.email === credentials.email &&
            us.password === credentials.password
        );
        if (user) {
          if (user.isBlocked) {
            alert("This Account is Blocked");
          } else {
            alert("Login Successful");
            setAuthenticated(true);
            const currentTime = new Date().toISOString();
            const updateLoginHis = user.loginHistory
              ? [...user.loginHistory, currentTime]
              : [currentTime];
            update({ ...user, loginHistory: updateLoginHis });
            navigate("/user");
          }
        } else {
          alert("Invalid Credentials");
        }
      });
    }
  };

  return (
    <div>
      <div>
        <Link to={"/"}>
          <button>Register</button>
        </Link>
      </div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Enter Your Email:</label>
        <input
          type="email"
          placeholder="Enter Your Email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <br />
        <label htmlFor="password">Enter Your Password:</label>
        <input
          type="password"
          placeholder="Enter Your Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        {errors.password && <span className="error">{errors.password}</span>}
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
