module.exports = function (handler) {
    return async (req, res, next) => {
      try {
        await handler(req, res);
      }
      catch(ex) {
        next(ex);
      }
    };  

    //solve the problem of repitetef code try catch block..u can use npm install express-async-errors --save
  }