const bycrypt = require('bcrypt')
const db = require('../models')
const jwt = require('jsonwebtoken');
const { log } = require('console');


const User = db.users;

const signup = async (req, res) => {

    try {

        const {userName, email, password} = req.body;
        const data = {
            userName,
            email,
            password: await bycrypt.hash(password, 10),
        };

        const user = await User.create(date);

        if (user) {
            let token = jwt.sign({id: user.id}, process.env.secertKey, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            })

            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true});
            console.log("user", JSON.stringify(user, null, 2));
            console.log(token)

            return res.json(201).send(user)
        } else {
            return res.status(409).send("Deatils are not correct!")
        }
    } catch (error) {
        console.log(error)
    }
};


const login = async (req, res) => {
 try {
const { email, password } = req.body;

   const user = await User.findOne({
     where: {
     email: email
   } 
     
   });

   if (user) {
     const isSame = await bcrypt.compare(password, user.password);


     if (isSame) {
       let token = jwt.sign({ id: user.id }, process.env.secretKey, {
         expiresIn: 1 * 24 * 60 * 60 * 1000,
       });
         
       res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
       console.log("user", JSON.stringify(user, null, 2));
       console.log(token);
         
       return res.status(201).send(user);
     } else {
       return res.status(401).send("Authentication failed");
     }
   } else {
     return res.status(401).send("Authentication failed");
   }
 } catch (error) {
   console.log(error);
 }
};


module.exports = {
    signup,
    login,
}
