const express = require("express");
const app = express();
const dotenv = require("dotenv");

//Configuration
dotenv.config({ path: "./config/config.env" });

//Database Connection
const dbConnect = require("./config/database");

//Middlewares
const morgan = require("morgan");

//Routers
const transectionRoute = require("./routes/transectionRoute");

const PORT = process.env.PORT || 4001;

//To Handle The Form Data explicitly definining maximum file size
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "20mb" }));
app.use(morgan("common"));


//Routes
app.get("/", (_, res) => {
  res.send("KoinX services Working !!");
});
app.use("/api/v1", transectionRoute);


//Establishing Connection with DB
dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
