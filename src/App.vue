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
            size="36" v-bind="attrs" v-on="on">St</v-avatar>
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar>
                  <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>John Leider</v-list-item-title>
                  <v-list-item-subtitle>Founder of Vuetify.js</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn
                    :class="fav ? 'red--text' : ''"
                    icon
                    @click="fav = !fav"
                  >
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
              <v-list-item>
                <v-list-item-action>
                  <v-switch v-model="message" color="purple"></v-switch>
                </v-list-item-action>
                <v-list-item-title>Enable messages</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-action>
                  <v-switch v-model="hints" color="purple"></v-switch>
                </v-list-item-action>
                <v-list-item-title>Enable hints</v-list-item-title>
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
