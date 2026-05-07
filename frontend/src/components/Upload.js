import React, { useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

function Upload({
  setResult,
  fetchHistory,
}) {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobDescription, setJobDescription] =
  useState("");

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a PDF");
      return;
    }

    setLoading(true);

    try {

      const formData = new FormData();

      formData.append("resume", file);

      // ✅ Upload PDF
      const uploadRes = await axios.post(
        "https://ai-resume-analyzer-7gyd.onrender.com/upload",
        formData
      );

      // ✅ Analyze Resume
      const aiRes = await axios.post(
        "https://ai-resume-analyzer-7gyd.onrender.com/analyze",
        {
          text: uploadRes.data.text,

          jobDescription,

userId: JSON.parse(
  localStorage.getItem("user")
)?.user?._id ||
JSON.parse(
  localStorage.getItem("user")
)?._id,
        }
      );

      // ✅ Show Result
      setResult(aiRes.data.ai);

  fetchHistory(
  JSON.parse(
    localStorage.getItem("user")
  )?.user?._id ||

  JSON.parse(
    localStorage.getItem("user")
  )?._id
);
    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div>

      <h2>Upload Resume</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <textarea
  placeholder="Paste Job Description"
  rows="8"
  style={styles.textarea}
  value={jobDescription}
  onChange={(e) =>
    setJobDescription(
      e.target.value
    )
  }
/>

      <br /><br />

      <button
  style={styles.button}
  onClick={handleUpload}
  disabled={loading}
>

  {
    loading ? (

      <ThreeDots
        height="20"
        width="50"
        radius="9"
        color="#fff"
        visible={true}
      />

    ) : (
      "Analyze Resume"
    )
  }

</button>
{
  loading && (
    <p style={{ marginTop: "10px" }}>
      AI is analyzing your resume...
    </p>
  )
}

    </div>
  );
}

const styles = {
button: {
  background: "linear-gradient(135deg,#667eea,#764ba2)",
  color: "#fff",
  padding: "12px 25px",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
},
textarea: {
  width: "100%",
  padding: "15px",
  borderRadius: "12px",
  border: "1px solid #ccc",
  marginBottom: "20px",
  marginTop: "20px",
  resize: "none",
},
};

export default Upload;
