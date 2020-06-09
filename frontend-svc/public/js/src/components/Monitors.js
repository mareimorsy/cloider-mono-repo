// 1. Define route components.
const API_URL="http://localhost:8080/api"
const Monitors = {
    name: 'Monitors',
    data: function () {
      return {
        monitors: this.getMonitors(),
        newMonitor: {request:{url: "", method:'GET', timeout:2000}, occurrence: 60, success_threshold: 3, failed_threshold: 3}
      }
    },
    methods: {
      getMonitors(fn){
        axios.get(`${API_URL}/monitor`).then((response) => {
          console.log(response.data);
          this.monitors = response.data
          if(fn){
            setTimeout(fn, 200)
          }
        });
      },
      createMonitor(){
        if(this.newMonitor.request.url.trim() != ""){
          axios({url:`${API_URL}/monitor`, data: this.newMonitor, method: 'POST'}).then((response) => {
            console.log(response.data);
            this.monitors.push(response.data)
            this.newMonitor = {request:{url: "", method:'GET', timeout:2000}, occurrence: 60, success_threshold: 3, failed_threshold: 3}
        });
        }else{
          alert("Monitor URL can't be empty!")
        }
      },
      updateMonitor(monitor){
        if(monitor.request.url.trim() != ""){
          axios({url:`${API_URL}/monitor/${monitor.id}`, data: monitor, method: 'PUT'}).then((response) => {
            console.log(response.data);
            this.getMonitors()
            this.getMonitors(()=> alert("Updated!"))
        });
        }
      },
      deleteMonitor(monitor){
        axios({url:`${API_URL}/monitor/${monitor.id}`, data: monitor, method: 'DELETE'}).then((response) => {
            console.log(response.data);
            this.getMonitors(()=> alert("Deleted!"))
        });
      }
    },
    template: `
    <div class="container-fluid">
    <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col" width="140">Method</th>
        <th scope="col">URL</th>
        <th scope="col" width="102">Occurrence</th>
        <th scope="col" width="102">Timeout</th>
        <th scope="col" width="102">Success Threshold</th>
        <th scope="col" width="102">Failed Threshold</th>
        <th scope="col" colspan="2" width="200">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background: linear-gradient(45deg, rgba(52, 255, 143, 0.08), transparent)">
        <td scope="row">
          <select class="form-control" v-model="newMonitor.request.method">
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>PATCH</option>
            <option>DELETE</option>
            <option>OPTIONS</option>
          </select>
        </td>

        <td><input type="text" class="form-control" v-model="newMonitor.request.url" placeholder="www.example.com"></td>
        <td><input type="text" class="form-control" v-model="newMonitor.occurrence"></td>
        <td><input type="text" class="form-control" v-model="newMonitor.request.timeout"></td>
        <td><input type="text" class="form-control" v-model="newMonitor.success_threshold"></td>
        <td><input type="text" class="form-control" v-model="newMonitor.failed_threshold"></td>
        <td colspan="2"><button @click="createMonitor()" class="btn btn-success" width="100">Create new monitor!</button></td>
      </tr>

      <tr v-for="monitor in monitors">
        <td scope="row">
          <select class="form-control" v-model="monitor.request.method">
            <option>POST</option>
            <option>GET</option>
            <option>PUT</option>
            <option>PATCH</option>
            <option>DELETE</option>
            <option>OPTIONS</option>
          </select>
        </td>

        <td><input type="text" class="form-control" v-model="monitor.request.url"></td>
        <td><input type="text" class="form-control" v-model="monitor.occurrence"></td>
        <td><input type="text" class="form-control" v-model="monitor.request.timeout"></td>
        <td><input type="text" class="form-control" v-model="monitor.success_threshold"></td>
        <td><input type="text" class="form-control" v-model="monitor.failed_threshold"></td>
        <td width="60"><button class="btn btn-primary" style="width:100%" @click="updateMonitor(monitor)">Update</button</td>
        <td width="60"><button class="btn btn-danger" style="width:100%" @click="deleteMonitor(monitor)">Delete</button></td>
      </tr>
    </tbody>
  </table>
    </div>
    `}

    // <td scope="row"><input type="text" class="form-control" v-model="monitor.request.method"></td>
