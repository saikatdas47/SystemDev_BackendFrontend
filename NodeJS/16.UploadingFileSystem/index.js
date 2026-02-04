const path = require('path');
const express = require('express');
const multer = require('multer');

const app = express();
const PORT = 3000;


app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('homepage');
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Specify the destination directory cb->callback
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Specify the file name
    }
});
const upload = multer({ storage: storage });
app.post('/upload', upload.single('uploadedFile'), (req, res) => { //multiple file input theke upoad korte hole upload.fields([{name:xyz},{name:xyzz}]) use korte hobe
    console.log(req.file); // Uploaded file information
    console.log(req.body); // Other form fields
    return res.redirect('/');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});