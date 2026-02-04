const http = require('http');
const express = require('express');

const app = express(); //initialize express app

// const myserver = http.createServer((req, res) => { //// aikhane express use kora hoy. jeta pore shikbo aikkhane proti case a get post put del sob daoya onek kothin manage kora kothin ai pura code ta express diye onek sohoje kora jay function ar nam app.get() .post() etc diye

//     const log = `${new Date().toISOString()} ${req.method} ${req.url} New Req Received\n.`;
//     const parsedUrl = url.parse(req.url, true);
//     console.log('Parsed URL:', parsedUrl);

//     fs.appendFile("log.txt", log, (err, data) => { 
//         switch (parsedUrl.pathname) {
//             case '/':
//                 if (req.method === 'GET') {
//                     res.end('Welcome to the Home Page!');
//                 } else {
//                     res.writeHead(405, { 'Content-Type': 'text/plain' });
//                     res.end('Method Not Allowed');
//                 }
//                 break;
//             case '/signup':
//                 if (req.methhod === 'GET') {
//                     res.end('This is the Signup Page. Please provide your details to sign up.');
//                 } else if (req.method === 'POST') {
//                     //database e save korar code likhte hobe ekhane
//                     res.end('Signup form submitted successfully!');
//                 } else {
//                     res.writeHead(405, { 'Content-Type': 'text/plain' });
//                     res.end('Method Not Allowed');
//                 }
//                 break;
//             default:
//                 res.end('404 Not Found');
//         }

//     });
// });



//// aikhane express use kora hoy. jeta pore shikbo aikkhane proti case a get post put del sob daoya onek kothin manage kora kothin ai pura code ta express diye onek sohoje kora jay function ar nam app.get() .post() etc diye
app.get('/', (req, res) => {
   return res.send(`Welcome to the Home Page! Hey ${req.query.name} age ${req.query.age}`);
});

app.get('/signup', (req, res) => {
  return  res.send('This is the Signup Page. Please provide your details to sign up.');
});

app.post('/signup', (req, res) => {
    //database e save korar code likhte hobe ekhane
   return res.send('Signup form submitted successfully!');
});

app.use((req, res) => {
   return res.status(404).send('404 Not Found');
});


// const myserver = http.createServer(app); 
// //We use `req` (request) to access information about the incoming HTTP request, such as headers, URL, and method.- The HTTP request object representing the client's request.
// // We use `res` (response) to construct and send the HTTP response back to the client, including status code, headers, and body.The HTTP response object used to send a response back to the client.
// myserver.listen(3000, () => {
//     console.log('Server is listening on port 3000');
// });

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});