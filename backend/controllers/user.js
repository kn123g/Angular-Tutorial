
const bcrypt= require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");

exports.createUser = (req,res)=>{
    bcrypt.hash(req.body.password,10).then(hash => {
      const user = new User(
        {
          email: req.body.email ,
          password : hash
        });
        user.save().
        then(result => {
          console.log("user.js => user created");
          console.log(result);
            res.status(201).json({
                message:"user created",
                result : {email : result.email,userid : result._id},
                created : true
            });
        } )
        .catch(err => {
          console.log("user.js  => failed user creation");
            res.status(401).json({
            error: "failed user creation",
            });
        });
    });
  };

  exports.loginUser = (req,res)=>{
    let fetchedUser;
      User.findOne({email:req.body.email }).then(user => {
          if(!user)
          {
          console.log("user not found");  
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        else{
          fetchedUser = user;
         return bcrypt.compare(req.body.password,user.password);
        }
      }).then(result =>{
          if(!result){
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          else{
            const token = jwt.sign(
              {
                email : fetchedUser.email , 
                userid : fetchedUser._id 
              },
              process.env.JWT_KEY,{expiresIn : '1h'});
              res.status(200).json({
                token :token,
                expiresIn: 3600,
                userId : fetchedUser._id
              });
          }
      })
      .catch(err=>{
        return res.status(401).json({
          message: "Auth failed"
        })
      });
  }