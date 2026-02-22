const express = require('express');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib'); // zlib diye amra file ke compress korte pari. zlib er gzip method diye amra file ke gzip format e compress korte pari. zlib er createGzip method diye amra gzip stream create korte pari. zlib er createGunzip method diye amra gzip stream ke gunzip korte pari. zlib er createDeflate method diye amra file ke deflate format e compress korte pari. zlib er createInflate method diye amra deflate stream ke inflate korte pari.

const PORT = process.env.PORT || 3000;
const app = express();



// 4000mb file Read  -> 4000mb Zip ->  4000mb write . not memory efficient
// 4000mb file stream read ->4000Zlib-> 4000mb write -> memory efficient

fs.createReadStream(path.resolve('./sample2mbTextFile.txt'), 'utf-8')
    .pipe(zlib.createGzip()) // pipe diye amra stream ke ekta stream e connect korte pari. zlib.createGzip() diye amra gzip stream create korechi. zlib.createGzip() diye amra gzip stream create korechi.
    .pipe(fs.createWriteStream(path.resolve('./sample2mbTextFile.zip'))); // createWriteStream diye amra file e data write korte pari. path.resolve diye amra file er absolute path pabo. zlib.createGzip() diye amra gzip stream create korechi.
   



app.get('/', (req, res) => {
    const stream = fs.createReadStream(path.resolve('./sample2mbTextFile.txt'), 'utf-8'); // createReadStream diye amra file theke data read korte pari. path.resolve diye amra file er absolute path pabo. 'utf-8' diye amra file er encoding specify korechi.

    stream.on('data', (chunk) => {
        //console.log('Received chunk:', chunk); 
        return res.write(chunk); 
    });

    stream.on('end', () => {
        return res.end(); 
    });

    stream.on('error', (err) => {
        console.error('Error reading file:', err); // jokhon file theke data read korte giye kono error hobe tokhon console e dekhabe je error ta ki.
        res.status(500).send('Error reading file');
    });
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});