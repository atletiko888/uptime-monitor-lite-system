const http = require("http");
const https = require("https");

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin","*");

    const targetUrl = "https://example.com";

    https.get(targetUrl, (response) => {
        res.end(`STATUS: ${response.statusCode}`);
    });
});

server.listen(3000);