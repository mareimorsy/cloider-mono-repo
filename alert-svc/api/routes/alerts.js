const express = require('express')

const router = express.Router();

const Alert = require('../../models/Alert')

router.get('/', async(req, res) => {
    Alert.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 25
    }).then(alerts => {
        res.json(alerts)
    }).catch(err => {
        res.send('error:' + err)
    })
});

router.post('/', async(req, res) => {
    Alert.create(req.body)
});

router.get('/:id', async (req, res) => {

    let alert = await Alert.findByPk(req.params.id)
    res.json(alert)
});

module.exports = router