const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({err:'Access denied. No token provided.'});


  //try catch bcz if token  is not  valid =>  throw an exception
  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    //decode ===payload
    req.user = decoded; 

    console.log("req.user",req.user);
    next();
  }
  catch (ex) {
    res.status(400).json({err:'Invalid token.'});
  }
}