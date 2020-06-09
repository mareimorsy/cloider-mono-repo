const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const morgan = require('morgan')
const monitorRoutes = require('./api/routes/monitors')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', '*')
    }
    next()
})

// const hash = require('object-hash');
// const Monitor = require('./models/Monitor')
// const scheduler  = require('./scheduler')

app.use('/monitor', monitorRoutes)
// app.get('/', (req, res) => res.send('Hello World!'))


// monitors.set(0, "word1");
// monitors.set(1023, "word2");
// for(const [key, value] of monitors) {
//     console.log(key, value, typeof key);
// }


// app.get('/monitor', (req, res) =>{
//     Monitor.findAll().then(monitors => {
//         res.json(monitors)
//     }).catch(err => {
//         res.send('error:' + err)
//     })
// })
// app.post('/monitor', (req, res) => {
//     const id = hash(req.body.request)
//     if (req.body.occurrence > scheduler.maxOccurrence)
//     scheduler.maxOccurrence = req.body.occurrence
//     scheduler.monitors.set(id, req.body);
//     res.sendStatus(200);
// })

// app.listen(port, () => console.log(`cloider is listening at http://localhost:${port}`))

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})
module.exports = app