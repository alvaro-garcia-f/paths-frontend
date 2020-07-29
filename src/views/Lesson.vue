<template>
  <v-container fill-height fluid>
    <v-carousel hide-delimiters :continuous=false>
      <v-carousel-item v-for="(slide, idx) in content" :key="idx">
        <v-card height="100%">
          <v-card-title>
            <h4>{{ getTitle (slide) }}</h4>
          </v-card-title>
          <v-card-text>
            <p>{{ getContent (slide) }}</p>
          </v-card-text>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
export default {
  name: 'Lesson',
  props: {
    content: Array
  },
  methods: {
    getTitle (slide) {
      return slide.split('-->')[0]
    },

    getContent (slide) {
      return slide.split('-->')[1]
    }
  }
}
</script>

<style>

</style>
