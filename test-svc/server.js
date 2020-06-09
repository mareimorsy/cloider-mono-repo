var express = require('express');

let app1 = express();
let app2 = express();

app1.listen(6000, () => {
  console.log("Started server on 6000");
});

let server = app2.listen(7000, () => {
  console.log("Started server on 7000");   
});

app2.all('*', (req, res) => {
    res.status(200).json({"message": "server is up!"})
});
app1.get('/stop', (req, res) => {
    server.close();
    res.status(200).json({"message": "server stopped"})
});

app1.get('/start', (req, res) => {
    app2.listen(7000, () => {
        console.log("Started server on 7000");
        res.status(200).json({"message": "server started"})
    });
});