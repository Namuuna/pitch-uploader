const express = require('express')
const app = express()
const multer = require('multer')
const cors = require('cors')
const port = 8080

//use cors for cross origin request
app.use(cors())

//create multer instance for handling uploaded files
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../../uploads');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

var upload = multer({ storage: storage}).single('file');

//upload files in upload folder
app.post('/upload', (req, res) => {
    upload(req, res, function (error) {
        if (error instanceof multer.MulterError) {
            return res.status(500).json(error)
        } else if (error) {
            return res.status(500).json(error)
        }
    return res.status(200).send(req.file)
    });
  });

//upon file is uploaded, then convert them into pdf
app.post('/convert', (req, res) => {
    //call python script to convert the file
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python',["converter.py", req.query.file]);

    pythonProcess.stdout.on('data', (data) => {
       res.send(data)
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
     });
});


app.get('/query', (req, res) => {
    //call python script to get pitch names
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python',["view.py", req.query.action]);

    pythonProcess.stdout.on('data', (data) => {
       res.send(data)
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
     });
});
  
  app.listen(port, () => {
    console.log(`File upload app listening at http://localhost:${port}`)
  })
