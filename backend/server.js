const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const port = 5000;

//connection a la DB
connectDB();

const app = express();

//middleware qui permet de traité les données de la requete en json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/post", require("./routes/post.routes"));

//lancer le server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
