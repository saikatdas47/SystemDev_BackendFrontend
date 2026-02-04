
const http = require('http');
const fs = require('fs');

const url = require('url');

const myserver = http.createServer((req, res) => {

    const log = `${new Date().toISOString()} ${req.method} ${req.url} New Req Received\n.`;
    const parsedUrl = url.parse(req.url, true);
    console.log('Parsed URL:', parsedUrl);

    fs.appendFile("log.txt", log, (err, data) => { // aikhane express use kora hoy. jeta pore shikbo
        switch (parsedUrl.pathname) {
            case '/':
                if (req.method === 'GET') {
                    res.end('Welcome to the Home Page!');
                } else {
                    res.writeHead(405, { 'Content-Type': 'text/plain' });
                    res.end('Method Not Allowed');
                }
                break;
            case '/signup':
                if (req.methhod==='GET'){   
                    res.end('This is the Signup Page. Please provide your details to sign up.');
                } else if (req.method==='POST'){
                    //database e save korar code likhte hobe ekhane
                    res.end('Signup form submitted successfully!');
                } else {
                    res.writeHead(405, { 'Content-Type': 'text/plain' });
                    res.end('Method Not Allowed');
                }
                break;
            case '/about':
                const username= parsedUrl.query.user || 'Guest';
                const searchquery= parsedUrl.query.search || '';
                res.end(`This is the About Page. Welcome, ${username}! Search Query: ${searchquery}`);
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

