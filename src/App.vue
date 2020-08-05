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

              <v-list-item v-for="(lesson, idx) in this.user.completed" :key="idx" dense>
                <v-list-item-title class="caption"> <strong>{{ lesson.title }}</strong> - <span class="success--text">Completed</span></v-list-item-title>
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

export default {
  name: 'App',
  data () {
    return {
      menu: false,
      user: {}
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
          })
          .catch(err => console.error(err))
      }
    }
  },
  created () {
    this.loadProfile()
    this.$root.$on('logged', () => {
      this.loadProfile()
    })
    this.$root.$on('lessonCompleted', () => {
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
