const http = require("http");

const server = http.createServer((req, res) => {res.end("Online");

});

server.listen(3000);