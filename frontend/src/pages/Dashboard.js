import axios from "axios";
import KeywordChecker from "../components/KeywordChecker";
import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Upload from "../components/Upload";
import Result from "../components/Result";


function Dashboard() {

  const [result, setResult] =
    useState("");
  const [history, setHistory] =
  useState([]);  
  const [darkMode, setDarkMode] =
  useState(false);

  const navigate =
    useNavigate();

  // ✅ Check Login
  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      navigate("/");
    }
    const user =
  JSON.parse(
    localStorage.getItem("user")
  );

fetchHistory(
  user?.user?._id ||
  user?._id
);

const savedTheme =
  localStorage.getItem(
    "darkMode"
  );

if (savedTheme === "true") {

  setDarkMode(true);
}

  }, [navigate]);

  const fetchHistory = async (
  userId
) => {

  try {

    const res =
      await axios.get(

        `https://ai-resume-analyzer-7gyd.onrender.com/history/${userId}`
      );

    setHistory(res.data);

  } catch (error) {

    console.log(error);
  }
};
  
  
  
  const toggleDarkMode = () => {

  const newTheme =
    !darkMode;

  setDarkMode(newTheme);

  localStorage.setItem(
    "darkMode",
    newTheme
  );
};
  
  // ✅ Logout
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");
  };

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  return (

    <div
  style={styles.container(
    darkMode
  )}
>

      <div style={styles.topBar}>

        <h2>
          Welcome {
  user?.user?.name ||
  user?.name
} 👋
        </h2>
<div
  style={{
    display: "flex",
    gap: "10px",
  }}
>

  <button
    style={styles.themeBtn}
    onClick={toggleDarkMode}
  >
    {
      darkMode
        ? "☀️ Light"
        : "🌙 Dark"
    }
  </button>

  <button
    style={styles.logoutBtn}
    onClick={handleLogout}
  >
    Logout
  </button>

</div>

      </div>

      <div
  style={styles.header(
    darkMode
  )}
>
      <h1 style={styles.title}>
  AI Resume Analyzer
</h1>

<p style={styles.subtitle}>
  Analyze resumes, improve ATS score,
  optimize job matching,
  and generate professional AI insights.
</p>  
        

      </div>

      <Upload
  setResult={setResult}
  fetchHistory={fetchHistory}
/>
      <KeywordChecker />

      {
        result && (
          <Result
  result={result}
  darkMode={darkMode}
/>
        )
      }
      <div style={styles.historySection}>

  <h2>
      Resume History
  </h2>

  {
    history.length === 0 ? (

      <p>
        No history found
      </p>

    ) : (

      history.map((item) => (

         <div
  key={item._id}
  style={styles.historyCard(darkMode)}
>

          <h3>
            ATS Score:
            {item.atsScore}%
          </h3>

          <p>

            {
              new Date(
                item.createdAt
              ).toLocaleString()
            }

          </p>

          <details>

            <summary>
              View Analysis
            </summary>

            <pre
              style={{
                whiteSpace:
                  "pre-wrap",
              }}
            >
              {item.analysis}
            </pre>

          </details>

        </div>
      ))
    )
  }

</div>

    </div>
  );
}
const styles = {

  container: (darkMode) => ({

    minHeight: "100vh",

    padding: "40px 20px",

    background: darkMode
      ? "linear-gradient(135deg,#020617,#0f172a,#111827)"
      : "linear-gradient(135deg,#eef2ff,#f8fafc,#ffffff)",

    color: darkMode
      ? "white"
      : "#111827",

    fontFamily:
      "Inter, Arial, sans-serif",

    transition: "0.4s",
  }),

  topBar: {

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: "30px",

    flexWrap: "wrap",

    gap: "20px",
  },

  header: (darkMode) => ({

    textAlign: "center",

    padding: "50px 30px",

    borderRadius: "30px",

    marginBottom: "35px",

    background: darkMode
      ? "rgba(30,41,59,0.7)"
      : "rgba(255,255,255,0.9)",

    backdropFilter: "blur(10px)",

    boxShadow:
      darkMode
        ? "0px 8px 30px rgba(0,0,0,0.4)"
        : "0px 8px 30px rgba(0,0,0,0.08)",
  }),

  title: {
    fontSize: "42px",
    fontWeight: "800",
    marginBottom: "15px",
  },

  subtitle: {
    fontSize: "18px",
    opacity: 0.8,
  },

  logoutBtn: {

    padding: "12px 22px",

    background:
      "linear-gradient(135deg,#ef4444,#dc2626)",

    color: "white",

    border: "none",

    borderRadius: "14px",

    cursor: "pointer",

    fontWeight: "700",

    fontSize: "15px",

    boxShadow:
      "0px 5px 15px rgba(239,68,68,0.3)",
  },

  themeBtn: {

    padding: "12px 22px",

    background:
      "linear-gradient(135deg,#6366f1,#8b5cf6)",

    color: "white",

    border: "none",

    borderRadius: "14px",

    cursor: "pointer",

    fontWeight: "700",

    fontSize: "15px",

    boxShadow:
      "0px 5px 15px rgba(99,102,241,0.3)",
  },

  historySection: {
    marginTop: "60px",
  },

  historyCard: (darkMode) => ({

    background: darkMode
      ? "rgba(30,41,59,0.8)"
      : "rgba(255,255,255,0.95)",

    color: darkMode
      ? "white"
      : "#111827",

    padding: "25px",

    borderRadius: "24px",

    marginBottom: "25px",

    backdropFilter: "blur(10px)",

    boxShadow:
      darkMode
        ? "0px 8px 30px rgba(0,0,0,0.4)"
        : "0px 8px 30px rgba(0,0,0,0.08)",
  }),
};

export default Dashboard;
