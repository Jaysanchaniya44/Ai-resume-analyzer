import React, { useState } from "react";

import axios from "axios";

import {
  Link,
  useNavigate,
} from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({

      email: "",

      password: "",
    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleLogin = async () => {

    try {

      const res =
        await axios.post(

          "https://ai-resume-analyzer-7gyd.onrender.com/login",

          formData
        );

      // ✅ Save Token
      localStorage.setItem(

        "token",

        res.data.token
      );

      // ✅ Save User
      localStorage.setItem(

        "user",

        JSON.stringify(res.data.user)
      );

      alert("Login Successful ✅");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert(
        error.response.data.error
      );
    }
  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1>Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          style={styles.input}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          style={styles.input}
          onChange={handleChange}
        />

        <button
          style={styles.button}
          onClick={handleLogin}
        >
          Login
        </button>

        <p>

          New user?

          <Link to="/signup">
            Signup
          </Link>

        </p>

      </div>

    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg,#667eea,#764ba2)",
  },

  card: {
  background: "white",
  padding: "30px",
  borderRadius: "15px",
  width: "90%",
  maxWidth: "350px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
},

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  button: {
    padding: "12px",
    background: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Login;
