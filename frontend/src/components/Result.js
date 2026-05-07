import React from "react";
import jsPDF from "jspdf";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import
"react-circular-progressbar/dist/styles.css";

function Result({
  result,
  darkMode,
}) {

  // ✅ Extract Score
 const scoreMatch =
  result.match(
    /ATS Score[^0-9]*(\d{1,3})/i
  );

const score =
  scoreMatch
    ? parseInt(scoreMatch[1])
    : 75;
const matchMatch =
  result.match(
    /Job Match Percentage[^0-9]*(\d{1,3})/i
  );

const matchPercentage =
  matchMatch
    ? parseInt(matchMatch[1])
    : 70;

    const downloadPDF = () => {

  const doc = new jsPDF();

  doc.setFontSize(20);

  doc.text(
    "AI Resume Analysis Report",
    20,
    20
  );

  doc.setFontSize(14);

  doc.text(
    `ATS Score: ${score}%`,
    20,
    40
  );

  doc.text(
    `Job Match: ${matchPercentage}%`,
    20,
    55
  );

  const splitText =
    doc.splitTextToSize(
      result,
      170
    );

  doc.text(
    splitText,
    20,
    80
  );

  doc.save(
    "resume-analysis-report.pdf"
  );
};

  return (

    <div style={styles.container}>

      <h2>
         AI Resume Analysis
      </h2>

      {/* ATS Score */}
      <div style={styles.scoreBox}>

     <div
  style={{
    width: "220px",
    maxWidth: "90%",
    margin: "auto",
    marginBottom: "35px",
  }}
>

          <CircularProgressbar

            value={score}

            text={`${score}%`}

            styles={buildStyles({

  textSize: "16px",

  pathColor: "#667eea",

  textColor: darkMode
    ? "#ffffff"
    : "#333",

  trailColor: darkMode
    ? "#334155"
    : "#d6d6d6",

})}
          />

        </div>

      </div>
<div style={styles.cardsContainer}>

  {/* ATS Card */}
  <div
  style={styles.infoCard(
    darkMode
  )}
>

    <h3>
      ATS Score
    </h3>

    <h1>
      {score}%
    </h1>

  </div>

  {/* Match Card */}
  <div
  style={styles.infoCard(
    darkMode
  )}
  >

    <h3>
       Job Match
    </h3>

    <h1>
      {matchPercentage}%
    </h1>

  </div>

</div>

<button
  style={styles.downloadBtn}
  onClick={downloadPDF}
>
    Download PDF Report
</button>
      {/* Result Card */}
        <div
  style={{
    ...styles.card,
    color: darkMode
      ? "white"
      : "black",
    background: darkMode
      ? "#1e293b"
      : "white",
  }}
>

        <pre
  style={{
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    lineHeight: "1.8",
  }}
>
          {result}
        </pre>

      </div>

    </div>
  );
}

const styles = {

  container: {
    marginTop: "40px",
  },

  scoreBox: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "30px",
  },

card: {

  padding: "35px",

  borderRadius: "30px",

  backdropFilter: "blur(10px)",

  boxShadow:
    "0px 10px 35px rgba(0,0,0,0.08)",
},
  
cardsContainer: {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(250px,1fr))",

  gap: "25px",

  marginBottom: "35px",
},

// infoCard: {
//   flex: 1,
//   minWidth: "220px",
//   background: "white",
//   padding: "25px",
//   borderRadius: "20px",
//   textAlign: "center",
//   boxShadow:
//     "0px 5px 20px rgba(0,0,0,0.08)",
// },

infoCard: (darkMode) => ({

  background: darkMode
    ? "linear-gradient(135deg,#1e293b,#0f172a)"
    : "linear-gradient(135deg,#ffffff,#f8fafc)",

  color: darkMode
    ? "white"
    : "#111827",

  padding: "35px 25px",

  borderRadius: "26px",

  textAlign: "center",

  boxShadow: darkMode
    ? "0px 10px 35px rgba(0,0,0,0.45)"
    : "0px 10px 35px rgba(0,0,0,0.08)",

  border: darkMode
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid rgba(0,0,0,0.04)",

  transition: "0.3s",
}),







downloadBtn: {

  marginBottom: "30px",

  padding: "16px 28px",

  background:
    "linear-gradient(135deg,#10b981,#059669)",

  color: "white",

  border: "none",

  borderRadius: "16px",

  cursor: "pointer",

  fontSize: "16px",

  fontWeight: "700",

  transition: "0.3s",

  boxShadow:
    "0px 8px 25px rgba(16,185,129,0.3)",
},
};

export default Result;