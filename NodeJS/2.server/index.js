
const http = require('http');
const fs = require('fs');

const myserver = http.createServer((req, res) => {
    const log = `${new Date().toISOString()} ${req.url} New Req Received\n.`;
    fs.appendFile("log.txt", log, (err,data) => { // aikhane express use kora hoy. jeta pore shikbo
        switch(req.url) {
            case '/':
                res.end('Welcome to the Home Page!');
                break;
            case '/about':
                res.end('This is the About Page.');
                break;
            case '/home':
                res.end('This is the Home Page.');
                break;
            default:
                res.end('404 Not Found');
        }
       
    });
});

//We use `req` (request) to access information about the incoming HTTP request, such as headers, URL, and method.- The HTTP request object representing the client's request.
// We use `res` (response) to construct and send the HTTP response back to the client, including status code, headers, and body.The HTTP response object used to send a response back to the client.
myserver.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

