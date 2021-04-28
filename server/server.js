const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
let fullpath = path.join(__dirname, "config/config.env");
dotenv.config({ path: fullpath });
const db = require("./db/db.connection");
const tutorialsRouter = require("./routes/tutorial.route") ; 
const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db.sequelize.sync().then(() => {
  console.log("db connection is on ");
});
app.get("/", (req, res) => {
  res.json({
    message: "this sis the entry point of our app",
  });
});
app.use("/api/tutorials" ,tutorialsRouter ) ; 

app.listen(PORT, () => {
  console.log("app is running on port " + PORT);
});
