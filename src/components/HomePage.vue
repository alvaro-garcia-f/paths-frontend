<template>
  <v-container>
    <v-row class="text-center">

      <v-col cols="12" md="6">
        <v-sheet min-height="50vh">
          <h1>Welcome to Paths</h1>
        </v-sheet>
      </v-col>

      <v-col cols="12" md="6">
        <v-sheet min-height="50vh">
          <h4>Begin your journey</h4>
          <v-form>
            <v-text-field label="E-mail" prepend-icon="mdi-mail"
            v-model="email"></v-text-field>

            <v-text-field type="password" label="Password" prepend-icon="mdi-lock"
            v-model="password"></v-text-field>

            <v-btn @click.prevent="userLogIn">Start</v-btn>
          </v-form>
        </v-sheet>
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
      email: '',
      password: ''
    }
  },
  methods: {
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
