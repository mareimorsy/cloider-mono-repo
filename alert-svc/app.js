const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const morgan = require('morgan')
const alertRoutes = require('./api/routes/alerts')

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

app.use('/alert', alertRoutes)

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