const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(req.headers.authorization);
        console.log("check-auth.js => token : " + token);
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        console.log("check-auth.js => decoded token : ");
        console.log(decodedToken);
        req.userData={email : decodedToken.email,userID : decodedToken.userid};
        next();
    }
    catch (error)
    {
        res.status(401).json({message : "Auth failed"});
    }


};