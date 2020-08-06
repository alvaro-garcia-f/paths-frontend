import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Lesson from '../views/Lesson.vue'
import Quiz from '../views/Quiz.vue'
import Student from '../views/Student.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/main',
    name: 'Main',
    component: Main
  },
  {
    path: '/lesson/:id',
    name: 'Lesson',
    component: Lesson,
    props: (route) => ({
      id: route.params.id
    })
  },
  {
    path: '/lesson/:id/quiz',
    name: 'Quiz',
    component: Quiz,
    props: (route) => ({
      id: route.params.id
    })
  },
  {
    path: '/student/:id',
    name: 'Student',
    component: Student,
    props: (route) => ({
      id: route.params.id
    })
  }
]

const router = new VueRouter({
  routes
})

export default router
