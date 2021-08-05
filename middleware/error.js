const winston = require('winston');
module.exports = function(err, req, res, next){

  //err.message => msg err=>meta so 2 properties
 winston.error(err.message, err);
 //level can be : 
  // error
  // warn
  // info
  // verbose
  // debug 
  // silly

  res.status(500).json({erroFromServer:'Something failed.'});
}