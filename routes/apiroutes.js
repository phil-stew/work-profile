const path = require('path');

const { readFileSync } = require('fs')
const fs = require('fs')
const {v4 : uuidv4} = require('uuid')




module.exports = (app) => {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // --------------------------------------------------------------------------
    app.get('/api/notes', function(req, res){
      const db = JSON.parse(fs.readFileSync('./db/db.json')) || []
      return res.json(db)
    });
  
    
  
    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------
  
    app.post('/api/notes', (req, res) => {
      const notesTaken = JSON.parse(fs.readFileSync('./db/db.json')) || []
      const newNote = req.body;
      const noteId = uuidv4()
      newNote.id = noteId
      console.log(newNote)
      notesTaken.push(newNote)

      fs.writeFile('./db/db.json', JSON.stringify(notesTaken), err =>{
        if(err) throw err;
        console.log('done')
      });
      return res.json(notesTaken)
    });
  
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!
    app.delete('/api/notes/:id', (req, res) =>{
      const notes = JSON.parse(fs.readFileSync('./db/db.json')) || [];
      const noteId = req.params.id;
      for (var i = 0; i < notes.length; i++){
        if (noteId === notes[i].id) {
          notes.splice(i,1);
        }
      }
      fs.writeFile('./db/db.json', JSON.stringify(notes), err =>{
        if(err) throw err;
        console.log('done')
      });
      res.json(notes)
    })
    
  };