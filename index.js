const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const cookieParer = require('cookie-parser')
const db = require("./models")
const userRouter = require("./routes/user.route.js");
const blogRouter = require('./routes/blog.route.js');
const projectRouter = require('./routes/project.route.js')
const cookieParser = require("cookie-parser");
const messageRouter = require('./routes/message.route.js')
app.use(cors({
    origin: '*',
}));


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(cookieParser())
app.use(bodyParser.urlencoded({
  extended: true
}));


db.sequelize.sync({force: true})
    .then(()=> {
        console.log("synced db")
    })
    .catch((err)=> {
        console.log("failed to sync db: " + err.message)
    })


app.get("/", (req, res) => {
  res.json({ message: "Welcome to ProtoBuilder." });
});

app.use('/api/users', userRouter)
app.use('/api', blogRouter)
app.use('/api', projectRouter)
app.use('/api/msg', messageRouter)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

