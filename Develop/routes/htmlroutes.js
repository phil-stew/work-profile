const path = require('path');

module.exports = (apps) => {
    apps.get('/', (req, res) =>{
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
    apps.get('/notes', (req, res) =>{
        res.sendFile(path.join( __dirname,'../public/notes.html'));
    });



}