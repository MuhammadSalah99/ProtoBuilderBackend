const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const cookieParer = require('cookie-parser')
const db = require("./models")
const userRouter = require("./routes/user.route.js");
const cookieParser = require("cookie-parser");
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

db.sequelize.sync({force: true})
    .then(()=> {
        console.log("synced db")
    })
    .catch((err)=> {
        console.log("failed to sync db: " + err.message)
    })


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.use('/api/users', userRouter)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

