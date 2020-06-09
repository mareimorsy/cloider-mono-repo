// 2. Define some routes
const routes = [
  { path: '/', component: Monitors },
  { path: '/alerts', component: Alerts }
]

// 3. Create the router instance and pass the `routes` option
const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes // short for `routes: routes`
})

// 4. Create and mount the root instance.
const app = new Vue({
  router
}).$mount('#app')