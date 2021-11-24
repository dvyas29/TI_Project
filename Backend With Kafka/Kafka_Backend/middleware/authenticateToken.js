
const credentials = require("../controllers/creds.controller");
const jwt_access_token="ca18e1211791792703c127254e004855fef92f9ff330438118dea2ada4c13d78f5ebfe3a157527e27e0dfc440a941de2e70011c8905a00d10d79264c3a362086";
function authenticateToken(req,res,next)
{
  const authHeader =req.headers.authorization;
 
  const token =authHeader; 
  // .split(' ')[1];
  
  if(!token)
  {
    res.sendStatus(401).json({msg: "User not loged in"});
  }
  try{
   const validToken = verify(token, jwt_access_token)

   if(validToken){
     return next();
   }
  }catch(err){
    console.log("inside authenticateMiddleware")
    return res.json({error:err})
  }
 
}

module.exports = authenticateToken;