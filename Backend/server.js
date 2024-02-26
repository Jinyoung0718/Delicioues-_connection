const exporess = require("express");
const app = exporess();
const cors = require("cors");
const userRoutes = require("./Routes/UserRoutes");

app.use(exporess.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use("/api/users", userRoutes);

const PORT = 3000;
app.listen(PORT);
