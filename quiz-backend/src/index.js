const express = require("express");
const cors = require("cors");

const config = require("./config");
const userRoutes = require("./routes/user-routes");
const authRoutes = require("./routes/auth-routes");
const errorHandler = require("./middlewares/error");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use(errorHandler);
app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`)
})
