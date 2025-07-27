import express from "express"
import notesRouter from "./routes/notesRoutes.js"
import {connectDB} from "./config/db.js"
import rateLimit from "./middleware/ratelimiter.js"
import dotenv from "dotenv"
import cors from 'cors'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5001



// allowing frontend to access apis
app.use(cors({
      origin: 'http://localhost:5173',
}))
app.use(express.json()) // built-in Mw parsing JSON bodies: req.body
app.use(rateLimit)


app.use("/api/notes", notesRouter);

connectDB().then(()=>{
app.listen(PORT, ()=> {
    console.log(`Server started on PORT: ${PORT} `)
})
})
