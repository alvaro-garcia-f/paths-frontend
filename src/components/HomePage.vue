<template>
  <v-container  class="text-center" fill-height fluid>

    <v-overlay :value="logInOverlay" absolute>
      <v-card>
        <v-card-title>
          <h4>Begin your journey</h4>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field label="E-mail" prepend-icon="mdi-mail"
            v-model="email"></v-text-field>

            <v-text-field type="password" label="Password" prepend-icon="mdi-lock"
            v-model="password"></v-text-field>

          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="toggleOverlay">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn  color="blue" class="white--text" @click.prevent="userLogIn">Start</v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>

    <v-row>
      <v-col cols="12">
        <h1>Welcome to Paths</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
          <v-btn color="blue" class="white--text" @click="toggleOverlay">Start</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Users from '@/services/userService'

export default {
  name: 'HomePage',
  data () {
    return {
      logInOverlay: false,
      email: '',
      password: ''
    }
  },
  methods: {
    toggleOverlay () {
      this.logInOverlay = !this.logInOverlay
    },

    userLogIn () {
      const data = { email: this.email, password: this.password }

      Users
        .logIn(data)
        .then(response => {
          if (response.error) console.error(response.error)
          else {
            localStorage.setItem('token', response.token)
            localStorage.setItem('email', response.email)
            this.$router.push({ path: '/main' })
          }
        })
        .catch(err => console.error(err))
    }
  }
}
</script>
