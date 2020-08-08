<template>
  <v-container  class="text-center" fill-height fluid>
    <v-dialog width="500px" :value="logInOverlay" absolute>
      <v-card>
        <v-card-title>
          <h4>Begin your journey</h4>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field label="E-mail" prepend-icon="mdi-mail" v-model="email"
            :rules="loginRules" @keypress.enter.prevent="userLogIn()" @focus="resetValidation()" required></v-text-field>

            <v-text-field type="password" label="Password" prepend-icon="mdi-lock" v-model="password"
            :rules="loginRules" @keypress.enter.prevent="userLogIn()" @focus="resetValidation()" required></v-text-field>

          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="toggleOverlay">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn  color="blue" class="white--text" @click.prevent="userLogIn()">Start</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row class="align-center">
        <v-col cols="12">
          <h1>Welcome to Paths</h1>
          <h2>Learn your own way</h2>
        </v-col>
    </v-row>

    <v-img height="55vh" src="../assets/home.svg" contain position="bottom" />

    <v-row>
      <v-col>
          <v-btn color="blue darken-2" class="white--text" @click="toggleOverlay">Start</v-btn>
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
      password: '',
      loginCorrect: true,
      valid: true,
      loginRules: [
        v => !!v || 'This cannot be empty',
        v => (v && this.loginCorrect) || "Ooops! I don't recognize that username or password"
      ]
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
          if (response.error) {
            console.error(response.error)
            this.loginCorrect = false
            console.log(this.$refs.form)
            this.$refs.form.validate()
          } else {
            localStorage.setItem('token', response.token)
            localStorage.setItem('email', response.email)
            localStorage.setItem('role', response.role)
            this.$root.$emit('dataChange', 'User logged in')
            this.$router.push({ path: '/main' })
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    resetValidation () {
      this.loginCorrect = true
      this.$refs.form.resetValidation()
    }
  }
}
</script>
