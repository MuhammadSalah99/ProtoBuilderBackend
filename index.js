
const express = require("express")
const dotenv = require("dotenv")

dotenv.config()

const app = express()
const port = process.env.PORT;

app.get('/', (req,res) => {
    res.send("Hi from backend")
})

app.listen(port, ()=>{
     console.log(`[server]: server is running at port`);
})

