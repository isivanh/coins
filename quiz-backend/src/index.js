const express = require("express");
const cors = require("cors");

const config = require("../config");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})