// Not Found

const notFound = (req, res, next) => {

 if( new Error(`Not Found : ${req.originalURL}`) !== undefined) {    
    const error = new Error(`Not Found : ${req.originalURL}`);
    res.status(404);
    next(error);} 
};

// Error Handler

const errorHandler = (err, req, res, next) => {
    
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: err?.message,
      stack: err?.stack,
    });
  };

module.exports = {errorHandler, notFound};