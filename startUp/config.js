const config = require('config');

module.exports = function() {

  //if environment variables not defined 
  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
  }

}