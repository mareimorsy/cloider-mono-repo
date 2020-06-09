# Welcome to Cloider monorepo!
Cloider is a powerful websites monitoring tool for udacity capstone project, you can use it for testing your API endpoints, and it will check your endpoints periodically and trigger alerts if the service was down and another alert if the service recovered.

## Cloider Architecture
Cloider has 4 main components
### Monitoring Service
It's the core of the app, it has the **Scheduler** which manages all different requests synchronously, business logic for triggering requests, retrying mechanism, monitors CRUD and sending monitoring alerts to `alert-service` to notify users.

### Alert Service
It's responsible for notifying users with alerts if monitors has failed or recovered, for now it only saves the alerts into DB, but I'm planning to support sending notifications to users via different methods such as email, slack, PagerDuty, webhooks, etc...

### Frontend Service
It's a simple Single Page VueJS application which manages CRUD operations for monitors and alerts.

### API Gateway
It's a simple nginx server that handles the routing among various api endpoints and the frontend app.

## Cloider Features
- Create,delete, update and view the monitors
- monitor request supports all different HTTP methods
- set occurrence(the period before calling the same request again) by seconds
- set timeout by milliseconds for requests, so if the request didn't get respond within the defined timeout period, it won't last forever :joy:, and it's by milliseconds so it could help you defining and meeting your [SLIs](https://landing.google.com/sre/sre-book/chapters/service-level-objectives/).
- set a Failed Threshold before triggering alerts, for example if you set Failed Threshold into `3`, that means the alert won't be triggered instantly once it fails, it has to fail 3 times in row, in order to trigger the alert
- set a success threshold before triggering recovered alert, so if the service failed it has to success 3 times in row before triggering recovered alert
- View all alerts for failed and recovered monitors
## Todo
- Support JWT Authintication
- Support sending notifications to users via different methods such as email, slack, PagerDuty, webhooks, etc...
- Support validation, for example occurrence can't be 0
- Solve scalability issues by building dispatching service to distribute monitors across different pods, and re-distribute monitors if the pod crashes
- using Vue-CLI, TypeScript, Message Queening(RabbitMQ or Kafka), writing unit and integration tests, using interfaces for all notification providers, deploy using gitOps, use sealed secrets, running unit tests in CI, use Ingress Controller instead of the current API gateway, use istio for managing service mesh, use sonarQube, etc...
## How to deploy
Change the yaml config to suit your environment, then run the following commands
```
kubectl apply -f k8s/database-secret.yaml
kubectl apply -f k8s/mariadb.yaml
kubectl apply -f k8s/monitoring-svc.yaml
kubectl apply -f k8s/alert-svc.yaml
kubectl apply -f k8s/frontend-svc.yaml
kubectl apply -f k8s/test-svc.yaml
kubectl apply -f k8s/api-gateway.yaml
```
then migrate the DB from `migrations/cloider.sql` into your DB
### How to test it
Here's the app link, you can add as many monitors as you want

**PS** I have provided a test server, that you can control it by stopping/starting it, you may use this server for testing monitor's request
**Test Server URL** 
```
http://ad8f2792de3d3456993b3f9e0ed9e14b-454476945.us-east-1.elb.amazonaws.com/api/test/
```

You should create a new monitor using this URL, it accepts any HTTP method and returns `{"message":"server is up!"}` with status code 200

Here's the best part! :joy:

- To stop the testing server,run the following command in your terminal, wait for the failed threshold time, then refresh the Alerts page, you should see new failed alert
```
curl http://ad8f2792de3d3456993b3f9e0ed9e14b-454476945.us-east-1.elb.amazonaws.com/api/test/stop
```

- To start the server again run the following command, wait for the success threshold time, then refresh the Alerts page, you should see new recovered alert
```
curl http://ad8f2792de3d3456993b3f9e0ed9e14b-454476945.us-east-1.elb.amazonaws.com/api/test/start
```


**There's a postman collection and screenshots provided**


# Give it a try!
Here's the Frontend URL
```
http://ad8f2792de3d3456993b3f9e0ed9e14b-454476945.us-east-1.elb.amazonaws.com/
```