const http = require("http");
const https = require("https");

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin","*");

    const requestUrl = new URL(req.url, "http://localhost:3000");
    const targetUrl = requestUrl.searchParams.get("url") || "https://example.com";

    https.get(targetUrl, (response) => {
        res.end(`STATUS: ${response.statusCode}`);
    });
});

server.listen(3000);