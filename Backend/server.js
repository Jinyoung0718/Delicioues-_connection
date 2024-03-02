const exporess = require("express");
const app = exporess();
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes");
const postRoutes = require("./Routes/PostRoutes");

app.use(exporess.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

const PORT = 3000;
app.listen(PORT);
