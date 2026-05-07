import React, {
  useState,
} from "react";

import axios from "axios";

function KeywordChecker() {

  const [resumeText, setResumeText] =
    useState("");

  const [jobRole, setJobRole] =
    useState("");

  const [result, setResult] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleCheck = async () => {

    if (!resumeText || !jobRole) {

      alert(
        "Please fill all fields"
      );

      return;
    }

    setLoading(true);

    try {

      const res =
        await axios.post(

          "http://localhost:5000/keyword-check",

          {
            resumeText,
            jobRole,
          }
        );

      setResult(
        res.data.result
      );

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div style={styles.container}>

      <h2>
        🔍 Resume Keyword Checker
      </h2>

      <textarea
        placeholder="Paste Resume Text"
        rows="10"
        style={styles.textarea}
        onChange={(e) =>
          setResumeText(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Enter Job Role"
        style={styles.input}
        onChange={(e) =>
          setJobRole(e.target.value)
        }
      />

      <button
        style={styles.button}
        onClick={handleCheck}
      >
        {
          loading
            ? "Checking..."
            : "Check Keywords"
        }
      </button>

      {
        result && (

          <div style={styles.result}>

            <pre>
              {result}
            </pre>

          </div>
        )
      }

    </div>
  );
}

const styles = {

  container: {
    marginTop: "50px",
    background: "#fff",
    padding: "20px",
    borderRadius: "15px",
    boxShadow:
      "0px 5px 15px rgba(0,0,0,0.1)",
  },

  textarea: {
    width: "100%",
    padding: "15px",
    marginTop: "15px",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },

  button: {
    marginTop: "20px",
    padding: "12px 20px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },

  result: {
    marginTop: "25px",
    background: "#f5f7ff",
    padding: "20px",
    borderRadius: "10px",
  },
};

export default KeywordChecker;

