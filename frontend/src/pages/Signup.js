import React, { useState } from "react";

import axios from "axios";

import {
  Link,
  useNavigate,
} from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({

      name: "",

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

  const handleSignup = async () => {

    try {

      const res =
        await axios.post(

          "http://localhost:5000/signup",

          formData
        );

      alert(
        res.data.message
      );

      navigate("/");

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

        <h1>Signup</h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          style={styles.input}
          onChange={handleChange}
        />

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
          onClick={handleSignup}
        >
          Signup
        </button>

        <p>

          Already have account?

          <Link to="/">
            Login
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
    background: "#764ba2",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Signup;