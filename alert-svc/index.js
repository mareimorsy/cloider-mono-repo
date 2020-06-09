const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000
const hash = require('object-hash');
const Monitor = require('./models/Monitor')
const scheduler  = require('./scheduler')
app.use(bodyParser.json())
app.get('/', (req, res) => res.send('Hello World!'))


// monitors.set(0, "word1");
// monitors.set(1023, "word2");
// for(const [key, value] of monitors) {
//     console.log(key, value, typeof key);
// }


app.get('/monitor', (req, res) =>{
    Monitor.findAll().then(monitors => {
        res.json(monitors)
    }).catch(err => {
        res.send('error:' + err)
    })
})
app.post('/monitor', (req, res) => {
    const id = hash(req.body.request)
    if (req.body.occurrence > scheduler.maxOccurrence)
    scheduler.maxOccurrence = req.body.occurrence
    scheduler.monitors.set(id, req.body);
    res.sendStatus(200);
})

app.listen(port, () => console.log(`cloider is listening at http://localhost:${port}`))