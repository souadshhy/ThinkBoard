import Note from "../models/Note.js"


export async function getAllNotes(_, res) {
    try {
        const notes = await Note.find().sort({createdAt:-1}) // -1 sorts in desc order, newest first
        res.status(200).json(notes)
        
    } catch (err) {
        console.error("Error in getAllNotes controller", err)
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getNoteById(req,res){
    try{
    const note = await Note.findById(req.params.id)
    if(!note) return res.status(404).json({message:"Note not found"})
    
    res.status(200).json(note)
    }catch(err){
        console.log("Error in getNoteById controller", err)
        res.status(500).json({message:"Internal server error"})
    }
}

export async function createNote(req, res) {
    try {
        const {title, content} = req.body
        const note = new Note({title,content})
        
        // .save() => Validation based on schema, Persist the instance to DB
        
        const savedNote = await note.save()
        res.status(201).json(savedNote)

    } catch (error) {
        console.error("Error in createNote controller", err)
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateNote(req, res) {
    try{
    const {title, content} = req.body
    const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        {title,content},
        {new:true}
     )
     // .findByIdAndUpdate does validation & persistence in db => no need .save()
    if(!updatedNote) return res.status(404).json({message:"Note not found"})

    res.status(201).json(updatedNote)
    }catch(err){
        console.error("Error in updateNote controller", err)
        res.status(500).json({ message: "Internal server error" })
    }
    

}

export async function deleteNote(req, res) {
    try{
    const note = await Note.findByIdAndDelete(req.params.id)
    if(!note) return res.status(404).json({message:"Note not found"})

    res.status(201).json({message:"Note deleted successfully"})
    }catch(err){
        console.error("Error in deleteNote controller", err)
        res.status(500).json({ message: "Internal server error" })
    }
    
}

