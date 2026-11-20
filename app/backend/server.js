const http = require("http");
const https = require("https");
const fs = require ("fs");
const dataFile = "app/backend/data/checks.json";

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    if (req.url === "/history") {
        const history = fs.readFileSync(dataFile, "utf8");
        res.end(history);
        return;
    }

    const requestUrl = new URL(req.url, "http://localhost:3000");
    const inputUrl = requestUrl.searchParams.get("url");
        if (!inputUrl) {
            res.statusCode = 400;
            res.end("URL is required");
            return;
        }
    const targetUrl = inputUrl.startsWith("http") ? inputUrl : `https://${inputUrl}`; 

    https.get(targetUrl, (response) => {
        const checks = JSON.parse(fs.readFileSync(dataFile, "utf8"));
        const check = {
            url: targetUrl,
            status: response.statusCode,
            checkedAt: new Date().toISOString()
        };
        checks.push(check);
        fs.writeFileSync(dataFile, JSON.stringify(checks, null, 2));
        res.end(`STATUS: ${response.statusCode}`);
    });
});

server.listen(3000);