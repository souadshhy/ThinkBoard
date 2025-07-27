// importing a pre-configured rate limiter instance
import ratelimit from "../config/upstash.js"

const rateLimit = async (req, res, next)=>{ // standard Express middleware function
    try {
        const {success} = await ratelimit.limit(req.ip)
       
        // The limit() method returns an object like:
        // {
        //   success: true,          // whether the request is allowed
        //   limit: 5,               // max requests per window
        //   remaining: 3,           // remaining requests
        //   reset: 168899999        // time when limit resets
        // }

        if(!success) return res.status(429).json({message:"Too many requests, please try again later"})
        
        // continue with the next middleware or route
        next()
    } catch (error) { //unexpected errors, e.g. redis server is down
        console.log("Rate limit error: ", error)
        next(error) // tells Express: 👉 “An error occurred — please stop and send this error to the global error handler.”
                    // Without this line, Express would think everything is okay and try to move to the next route.
                    // ❗Express jumps directly to the error-handling middleware and skips all routes and controllers
    }
}

export default rateLimit