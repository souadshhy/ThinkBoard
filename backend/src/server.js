import express from "express"
import notesRouter from "./routes/notesRoutes.js"
import {connectDB} from "./config/db.js"
import rateLimit from "./middleware/rateLimiter.js"
import dotenv from "dotenv"
import cors from 'cors'
import path from 'path'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5001

const __dirname = path.resolve() // gives you the absolute path to the current directory

if(process.env.NODE_ENV !== 'production'){
// allowing frontend to access apis
    app.use(cors({
        origin: 'http://localhost:5173',
    }))
}

app.use(express.json()) // built-in Mw parsing JSON bodies: req.body
app.use(rateLimit)


app.use("/api/notes", notesRouter);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req,res)=>{
        res.sendFile(path.join(__dirname,'../frontend','dist','index.html'))
    })
}

connectDB().then(()=>{
app.listen(PORT, ()=> {
    console.log(`Server started on PORT: ${PORT} `)
})
})
