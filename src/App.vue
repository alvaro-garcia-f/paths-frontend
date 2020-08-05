<template>
  <v-app>
    <v-app-bar color="blue" dense dark app>
      <v-toolbar-title><h3>paths</h3></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn class="white--text" color="blue darken-2"
      @click="logOut()" v-if="loggedTeacher()">Log Out</v-btn>

      <v-avatar color="blue darken-2" class="white--text"
      @click="logOut()" v-if="loggedStudent()" size="36">St</v-avatar>

    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
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
      window.location.reload()
    }
  }
}
</script>

<style>
  #app {
    color:#333;
  }
</style>
