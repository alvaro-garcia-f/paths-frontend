<template>
  <v-container class="home" fill-height fluid>
    <HomePage />
  </v-container>
</template>

<script>
// @ is an alias to /src
import HomePage from '@/components/HomePage.vue'

export default {
  name: 'Home',
  components: {
    HomePage
  }
}
</script>
