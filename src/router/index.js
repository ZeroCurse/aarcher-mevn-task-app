import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/authentication/Login.vue'
import Register from '../views/authentication/Register.vue'
import TasksAll from '../views/tasks/TasksAll.vue'
import TasksCreate from '../views/tasks/TasksCreate.vue'
import TasksEdit from '../views/tasks/TasksEdit.vue'

// Vue.use(VueRouter) -- can substitute but will need to change import above to "Import VueRouter"
Vue.use(Router)

// set to true to simulate user being logged in
const isLoggedIn = false;

const routes = new Router({
  routes: [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tasks',
    name: 'tasks-all',
    component: TasksAll,
    // Navigation Guard protects this route. User must be logged in, else will be routed to login page
    beforeEnter: (to, from, next) => {
      if (isLoggedIn) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/tasks/new',
    name: 'tasks-create',
    component: TasksCreate,
    beforeEnter: (to, from, next) => {
      if (isLoggedIn) {
        next();
      } else {
        next('/login');
      }
    } 
  },
  {
    path: '/tasks/:id',
    name: 'tasks-edit',
    component: TasksEdit,
    beforeEnter: (to, from, next) => {
      if (isLoggedIn) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (!isLoggedIn) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (!isLoggedIn) {
        next();
      } else {
        next('/');
      }
    }
  },
  // if navigated to an undeclared route, redirect to root/home
  {
    path: '*',
    redirect: '/'
  }
],
  // linkActiveClass will make the active class toggle stay on while in the component view (login, register, tasks, home)
  linkActiveClass: 'active',
  mode: 'history',
  base: process.env.BASE_URL
})

export default routes;
