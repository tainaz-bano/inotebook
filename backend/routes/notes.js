const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

// ---------------------------------------------------------------------------------------------

// ROUTE 1: Get all notes of logged in user:  GET /api/notes/fetchallnotes . Login required


router.get(
  "/fetchallnotes",
  fetchuser,
  [
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 8 }),
  ],
  async (req, res) => {
    try {
        // Get all notes associated with the user
      const notes = await Notes.find({ user: req.user.id });
      res.json(notes);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ---------------------------------------------------------------------------------------------

// ROUTE 2: Add notes:  POST /api/notes/addnote . Login required


router.post("/addnote", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //If error send bad request and error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Add a new note
    const note = new Notes({
      title,
      description,
      tag,
      user: req.user.id,
    });
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});


// ---------------------------------------------------------------------------------------------

// ROUTE 3: Update existing note:  POST /api/notes/updatenote . Login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {

    try {
        
    
    const { title, description, tag } = req.body;   
    // Create a new note object
    const newNote={}

    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}

    // Find the note to be updated and update it

    let note = await Notes.findById(req.params.id)
 
    if(!note){
       return res.status(404).send("Not found")
    }

    // Check if the user is same 
    if(note.user.toString() !== req.user.id){
        res.status(401).send("Access Denied")
    }

    // Update Note
    note= await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})

    res.json({note})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
      }
    
})

// ---------------------------------------------------------------------------------------------

// ROUTE 4: Delete existing note:  DELETE /api/notes/deletenote . Login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {

    try {
         
    // Find the note to be deleted and delete it

    let note = await Notes.findById(req.params.id)
 
    if(!note){
       return res.status(404).send("Not found")
    }

    // Check if the user is same who is authenticated
    if(note.user.toString() !== req.user.id){
        res.status(401).send("Access Denied")
    }

    // Update Note
    note= await Notes.findByIdAndDelete(req.params.id)

    res.json({"Success": "Note Deleted"})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
      }
    
})


module.exports = router;
