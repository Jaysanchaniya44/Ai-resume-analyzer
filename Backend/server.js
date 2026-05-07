const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const Resume =
  require("./models/Resume");

const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());


// ==============================
// ✅ MONGODB CONNECT
// ==============================

mongoose.connect(process.env.MONGO_URI)

.then(() => {

  console.log("MongoDB Connected ✅");

})

.catch((err) => {

  console.log(err);

});


// ==============================
// ✅ OPENROUTER SETUP
// ==============================

const openai = new OpenAI({

  baseURL: "https://openrouter.ai/api/v1",

  apiKey: process.env.OPENROUTER_API_KEY,

});


// ==============================
// ✅ MULTER
// ==============================

const upload = multer();


// ==============================
// ✅ SIGNUP
// ==============================

app.post("/signup", async (req, res) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({

        error: "User already exists",

      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await User.create({

      name,

      email,

      password: hashedPassword,

    });

    res.json({

      success: true,

      message: "Signup successful",

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error: "Signup failed",

    });
  }
});


// ==============================
// ✅ LOGIN
// ==============================

app.post("/login", async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({

        error: "User not found",

      });
    }

    const isMatch =
      await bcrypt.compare(

        password,

        user.password
      );

    if (!isMatch) {

      return res.status(400).json({

        error: "Invalid password",

      });
    }

    const token = jwt.sign(

      {
        id: user._id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }
    );

    res.json({

      success: true,

      token,

     user: {

  _id: user._id,

  name: user.name,

  email: user.email,

},
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error: "Login failed",

    });
  }
});


// ==============================
// ✅ ANALYZE RESUME
// ==============================

app.post("/analyze", async (req, res) => {

  try {

const {
  text,
  userId,
  jobDescription,
} = req.body;

    if (!text) {

      return res.status(400).json({

        error: "No resume text found",

      });
    }

 const prompt = `

You are an advanced ATS Resume Analyzer.

Analyze this resume according to
the given job description.

Provide:

1. ATS Score (0-100)
2. Job Match Percentage
3. Matching Skills
4. Missing Skills
5. Strengths
6. Weaknesses
7. Resume Improvements
8. Important Keywords Missing

Job Description:
${jobDescription}

Resume:
${text}

`;

    const completion =
      await openai.chat.completions.create({

        model: "openai/gpt-3.5-turbo",

        messages: [

          {
            role: "user",
            content: prompt,
          },
        ],
      });

    const aiText =
      completion.choices[0].message.content;
      const scoreMatch =
  aiText.match(
    /ATS Score[^0-9]*(\d{1,3})/i
  );

const atsScore =
  scoreMatch
    ? parseInt(scoreMatch[1])
    : 75;

    await Resume.create({

  userId,

  resumeText: text,

  analysis: aiText,

  atsScore,

});

    res.json({

      success: true,

      ai: aiText,

    });

  } catch (error) {

    console.log("AI ERROR:", error);

    res.status(500).json({

      error: "AI failed",

    });
  }
});
app.get(
  "/history/:userId",

  async (req, res) => {

    try {

      const resumes =
        await Resume.find({

          userId:
            req.params.userId,

        }).sort({
          createdAt: -1,
        });

      res.json(resumes);

    } catch (error) {

      console.log(error);

      res.status(500).json({

        error:
          "Failed to fetch history",

      });
    }
  }
);

// ==============================
// ✅ PDF UPLOAD
// ==============================

app.post(

  "/upload",

  upload.single("resume"),

  async (req, res) => {

    try {

      if (!req.file) {

        return res.status(400).json({

          error: "No file uploaded",

        });
      }

      const data =
        await pdfParse(req.file.buffer);

      res.json({

        text: data.text,

      });

    } catch (error) {

      console.log("PDF ERROR:", error);

      res.status(500).json({

        error: "PDF failed",

      });
    }
  }
);
app.post("/keyword-check", async (req, res) => {

  try {

    const {
      resumeText,
      jobRole,
    } = req.body;

    const prompt = `

You are an AI Resume Keyword Checker.

Analyze this resume for the role:
${jobRole}

Provide:

1. Missing Keywords
2. Missing Skills
3. ATS Improvement Suggestions
4. Important Technologies to Learn

Resume:
${resumeText}

`;

    const completion =
      await openai.chat.completions.create({

        model: "openai/gpt-3.5-turbo",

        messages: [

          {
            role: "user",
            content: prompt,
          },
        ],
      });

    const result =
      completion.choices[0]
      .message.content;

    res.json({

      success: true,

      result,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error: "Keyword check failed",

    });
  }
});


// ==============================
// ✅ TEST ROUTE
// ==============================

app.get("/", (req, res) => {

  res.send("Server Running ✅");

});


// ==============================
// ✅ SERVER
// ==============================

const PORT = 5000;

app.listen(PORT, () => {

  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );

});