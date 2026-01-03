const errorHandler = (err,req,res,next) => {
    // Agar controller ne koi status set kiya hai (jaise 404 ya 400), toh wahi lo
    // Warna default 500 (Internal Server Error) rakho
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode).json({
        message: err.message,
        // Stack trace sirf development mode mein dikhao (debugging ke liye)
        // Production mein ise null rakhte hain taaki security bani rahe
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
}

module.exports = { errorHandler }