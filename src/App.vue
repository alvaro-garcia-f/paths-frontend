<template>
  <v-app>
    <v-app-bar color="blue" dense dark app>
      <v-toolbar-title><h3>paths</h3></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="white--text" color="blue darken-2"
      @click="logOut()" v-if="logged()">Log Out</v-btn>
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
    logged () {
      return localStorage.getItem('token')
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
