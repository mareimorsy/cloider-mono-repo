const express = require('express')

const router = express.Router();

const hash = require('object-hash');

const Monitor = require('../../models/Monitor')

const scheduler  = require('../../scheduler')

router.get('/', (req, res) =>{
    Monitor.findAll().then(monitors => {
        res.json(monitors)
    }).catch(err => {
        res.send('error:' + err)
    })
})

router.get('/:monitor_id', async (req, res) =>{
    const monitor_id = req.params.monitor_id

    const monitor = await Monitor.findOne({ where: { id: monitor_id } });
    if (monitor === null) {
    console.log('Not found!');
    } else {
    console.log(monitor); // 'My Title'
    res.json(monitor)
    }
})

router.put('/:monitor_id', async (req, res) =>{
    const monitor_id = req.params.monitor_id
    // let monitor = req.body
    scheduler.monitors.delete(monitor_id)
    let id = hash(req.body.request)

    monitor = await Monitor.findOne({ where: { id: monitor_id } });
    // the name is still "Jane" in the database
    await monitor.destroy();

    monitor = req.body
    monitor.id = id
    Monitor.create(monitor)
    scheduler.monitors.set(id, monitor)
    // Now the name was updated to "Ada" in the database!
    res.status(200).json({"msg": "Done!"})
})

router.delete('/:monitor_id', async (req, res) =>{
    const monitor_id = req.params.monitor_id
    scheduler.monitors.delete(monitor_id)
    monitor = await Monitor.findOne({ where: { id: monitor_id } });
    await monitor.destroy();

    let maxOccurrence = await Monitor.max('occurrence') || 0
    scheduler.maxOccurrence = maxOccurrence

    res.status(200).json({"msg": "Done!"})
})

router.post('/', (req, res) => {
    const id = hash(req.body.request)
    let monitor = req.body
    monitor.id = id
    Monitor.create(monitor);
    
    if (req.body.occurrence > scheduler.maxOccurrence)
        scheduler.maxOccurrence = req.body.occurrence
    scheduler.monitors.set(id, req.body);
    res.status(200).json(monitor)
});

module.exports = router