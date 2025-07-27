import {Ratelimit} from "@upstash/ratelimit"
import {Redis} from "@upstash/redis"

import dotenv from 'dotenv'

dotenv.config()

// Ratelimit takes which db to store the ratelimit info in and then the actual ratelimit algorithm and rate
// in here algorithm is slidingWindow and rate 10req/20sec
// our db is env variable
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow("100", "60 s")
})

// now we should create the function which utilizes this creation of ratelimiter
//  and checks for user's eligibility before sending the res (i.g. the middleware)
export default ratelimit
