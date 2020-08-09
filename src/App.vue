<template>
  <v-app>
    <v-app-bar color="blue" dense dark app>
      <v-toolbar-title><h3>paths</h3></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn class="white--text" color="blue darken-2"
      @click="logOut()" v-if="loggedTeacher()">Log Out</v-btn>

      <div class="text-center">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-x
          v-if="loggedStudent()"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-avatar color="blue darken-2" class="white--text"
            size="36" v-bind="attrs" v-on="on"><img src="./assets/avatar.svg"></v-avatar>
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar>
                  <img src="./assets/avatar.svg">
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ this.user.name }}</v-list-item-title>
                  <v-list-item-subtitle>Apprentice</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn icon="">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>
            <v-list>
              <v-list-item>
                <v-list-item-title><strong>Progress</strong></v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>

              <v-list-item class="caption mb-1" v-for="(lesson, idx) in lessons" :key="idx" dense>
                  <v-list-item-title v-if="isLessonActive(lesson)"> <strong>{{ lesson.title }}</strong> <span v-if="lessonCompleted(lesson)"><v-icon class="success--text" small>mdi-check</v-icon></span><br/>
                  <span class="font-weight-light">Total Answers: {{ lessonTotals(lesson._id) }}<br/> Correct Answers: {{ lessonCorrects(lesson._id) }}</span>
                  </v-list-item-title>
                  <v-list-item-action v-if="isLessonActive(lesson)">
                    <v-progress-circular size="40" :value="correctPercentage(lesson._id)" color="green lighten-2">{{ correctPercentage(lesson._id) }}</v-progress-circular>
                  </v-list-item-action>
              </v-list-item>
            </v-list>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn class="white--text" color="blue darken-2"
              @click="logOut()" >Log Out</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Users from '@/services/userService'
import Lessons from '@/services/lessonService'
import Results from '@/services/resultsService'

export default {
  name: 'App',
  data () {
    return {
      menu: false,
      user: {},
      results: [],
      lessons: []
    }
  },
  methods: {
    loggedTeacher () {
      return localStorage.getItem('token') && localStorage.getItem('role') === 'teacher'
    },
    loggedStudent () {
      return localStorage.getItem('token') && localStorage.getItem('role') === 'student'
    },
    logOut () {
      localStorage.clear()
      this.$router.push('/')
    },
    loadProfile () {
      if (localStorage.getItem('token')) {
        Users
          .getProfile()
          .then(profile => {
            this.user.name = profile.name
            this.user.completed = profile.completed

            Lessons
              .getAllLessons()
              .then(lessons => {
                this.lessons = lessons

                Results
                  .getOwnResults()
                  .then(results => {
                    this.results = results
                  })
                  .catch(err => console.error(err))
              })
              .catch(err => console.error(err))
          })
          .catch(err => console.error(err))
      }
    },
    lessonCompleted (lesson) {
      if (localStorage.getItem('token')) {
        const matches = this.user.completed.filter(l => lesson.title === l.title)
        return matches.length > 0
      }
    },
    lessonTotals (id) {
      if (localStorage.getItem('token')) {
        return this.results.filter(r => r.lesson === id).length
      }
    },
    lessonCorrects (id) {
      if (localStorage.getItem('token')) {
        return this.results.filter(r => r.lesson === id && r.correct).length
      }
    },
    correctPercentage (id) {
      if (localStorage.getItem('token')) {
        return Math.floor(this.lessonCorrects(id) * 100 / this.lessonTotals(id)) || 0
      }
    },
    isLessonActive (lesson) {
      return lesson.order <= this.user.completed.length
    }
  },
  created () {
    this.loadProfile()
    this.$root.$on('dataChange', () => {
      this.loadProfile()
    })
  }
}
</script>

<style>
  #app {
    color:#333;
  }
</style>
