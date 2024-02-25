const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credential: true,
    optionsSuccessStatus: 200,
  })
);

// req와 res의 주체는 사용자, 사용자 입장에서 서버로 전송하는 것은 req, 서버로부터 받는 것은 res.

let users = [{ email: "wo0982@naver.com", password: "korean12" }];

app.post("/api/signup", (req, res) => {
  console.log("req:", req.body);
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match.");
  }

  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    return res.status(400).send("User already exists.");
  }

  users.push({ email, password });
  res.status(201).send("User created.");
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    return res.status(400).send("Invalid credentials.");
  }

  res.send("Login successful");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
