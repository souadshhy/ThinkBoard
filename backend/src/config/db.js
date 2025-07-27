import mongoose from 'mongoose'


export const connectDB = async()=>{
try{   
    await mongoose.connect(process.env.MANGO_URI)
    console.log("MANGODB CONNECTED SUCCESSFULLY!")
}catch(err){
    console.error(`Error connecting to Mangodb: ${err.message}`)
    process.exit(1)
}

}