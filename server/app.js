const express = require("express");
const cors = require("cors");
const exampleRoutes = require("./routes/exampleRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/examples", exampleRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
