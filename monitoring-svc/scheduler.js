

const hash = require('object-hash');
const moment = require('moment');
const axios = require('axios');
const Monitor = require('./models/Monitor')
const config = require('./config')

let scheduler = setInterval(()=>{
    scheduler.ticks +=1;
    console.log(scheduler.ticks)

    for(const [id, monitor] of scheduler.monitors) {
        // console.log(key, value, typeof key);
        
        if(scheduler.ticks % monitor.occurrence == 0){
            // console.log(hash(monitor.request))
            // Trigger the request
            scheduler.makeRequest(monitor, id)
        }

    }


    if (scheduler.ticks == scheduler.maxOccurrence)
        scheduler.ticks = 0
}, 1000);

scheduler.makeRequest = (monitor, request_id)=>{
    // console.log(request_id, request)
    let startDate = moment();

    axios(monitor.request).then((res) => {
        var endDate = moment();
        console.log('Request took: ' + endDate.diff(startDate) + ' ms.');
        console.log("status " + res.status)

        let response = {request_id: "", status: 200, time: 20, data: "" } 



        
        // if(scheduler.success.get(request_id) == monitor.occurrence && scheduler.success.get(request_id)){
        if(scheduler.failed.get(request_id)){
            if(scheduler.success.get(request_id)){
                scheduler.success.set(request_id, scheduler.success.get(request_id) + 1)
            }else{
                scheduler.success.set(request_id, 1)
            }

            if(scheduler.success.get(request_id) == monitor.success_threshold){
                scheduler.failed.delete(request_id)
                scheduler.success.delete(request_id)
                console.log(request_id, 'Recovered ALERT!!!!!!')
                axios({
                    url: config.alert_endpoint,
                    method: "POST",
                    data: {status: "RECOVERED", request: monitor.request},
                    timeout: 3000
                }).then(res => console.log(res.dataValues)).catch(err => console.log(err.message))
            }
        }

    }).catch((err) => {
        console.log(err.message)
        if(scheduler.failed.get(request_id)){
            scheduler.failed.set(request_id, scheduler.failed.get(request_id) + 1)
        }else{
            scheduler.failed.set(request_id, 1)
        }

        if(scheduler.failed.get(request_id) == monitor.failed_threshold){
            scheduler.success.delete(request_id)
            console.log(request_id, 'FAILED ALERT!!!!!!')
            axios({
                url: config.alert_endpoint,
                method: "POST",
                data: {status: "FAILED", request: monitor.request},
                timeout: 3000
            }).then(res => console.log(res.dataValues)).catch(err => console.log(err.message))
        }

        // if(scheduler.failed.get(request_id) == monitor.occurrence ){
        //     console.log(request_id, 'ALERT!!!!!!')
        // }

        
        // console.log(scheduler.failed)
        // console.log(scheduler.failed)

    })
}

scheduler.ticks = 0;
scheduler.maxOccurrence = 1;
scheduler.monitors = new Map();
scheduler.success = new Map();
scheduler.failed = new Map();

// scheduler.monitors.set('b7bbffacb7518024c469b70ff640b8073aecbc70', {
//     request: {
//     method: "POST",
//     url: "http://localhost:8081/sleep",
//     headers: {"Content-Type":"application/json", "header-2":"value-2"},
//     body: "This is body",
//     timeout: 1000
//     },
//     occurrence: 2,
//     success_threshold: 3,
//     failed_threshold: 3 
// });

// console.log(scheduler.monitors)


Monitor.findAll().then(monitors => {
    monitors.map(monitor => {
        if (monitor.occurrence > scheduler.maxOccurrence)
            scheduler.maxOccurrence = monitor.occurrence
        scheduler.monitors.set(monitor.dataValues.id, monitor.dataValues)
    })
}).catch(err => {
    res.send('error:' + err)
})

module.exports = scheduler