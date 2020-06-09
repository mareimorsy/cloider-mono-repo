// const Alerts = { name:'Alerts', template: '<div>Alerts</div>' }

// 1. Define route components.
const Alerts = {
    name: 'Alerts',
    data: function () {
      return {
        alerts: this.getAlerts()
      }
    },
    methods: {
      getAlerts(){
        axios.get(`${API_URL}/alert`).then((response) => {
          console.log(response.data);
          this.alerts = response.data
        });
      }
    },
    template: `
    <div class="container-fluid">
    <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">URL</th>
        <th scope="col">Method</th>
        <th scope="col">Status</th>
        <th scope="col">Time</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="alert in alerts">
        <td>{{alert.request.url}}</td>
        <td>{{alert.request.method}}</td>
        <td><span class="text-danger" v-if="alert.status == 'FAILED'">FAILED</span> <span class="text-success" v-if="alert.status != 'FAILED'">RECOVERED</span></td>
        <td>{{alert.created_at}}</td>
      </tr>
    </tbody>
  </table>
    </div>
    `}