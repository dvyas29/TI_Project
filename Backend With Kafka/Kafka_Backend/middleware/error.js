const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next)=>{
    let error = { ...err };
    error.message = err.message;

    console.log("*********Complete ERROR*********", err);
     
    
     //TypeError (got while deleting a document for favorites routes)
    
    //  if(err.name==='TypeError'){
    //    return res.status(200).json({
    //         success: true,
    //         data:{}
    //     });
    // }
    //Mongoose bad id error

     if(err.name==='CastError'){
        const message= `Resource not found with id of ${err.value}`;
        error= new ErrorResponse(message, 404);
    }

    //Mongoose duplicate key error
    if(err.code===11000){
       
        const message= `Duplicate fields found. Try with other values.`;
        error= new ErrorResponse(message, 400);
        
       }

        //mongoose validation error
    if(err.name==='ValidationError'){
        //we want only values so Object.values
        const message = Object.values(err.errors).map(val=>val.message);
        error = new ErrorResponse(message, 400);
        
    }
    res.status(error.statusCode || 400).json({
        success: false,
        error:error.message || 'Server Error'
    });
}

module.exports = errorHandler;