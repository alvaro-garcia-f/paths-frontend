<template>
  <v-container fluid>
    <v-row v-if="url">
      <v-col class="google-slides-container">
        <p v-html="url"></p>
      </v-col>
    </v-row>

    <v-carousel hide-delimiters :continuous=false v-else>
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
    url: String,
    content: Array
  },
  methods: {
    getTitle (slide) {
      return slide.split('-->')[0]
    },

    getContent (slide) {
      return slide.split('-->')[1]
    }
  },
  mounted () {
    console.log('content', this.content)
    console.log('url', this.url)
  }
}
</script>

<style>
.google-slides-container{
    position: relative;
    width: 100%;
    padding-top: 60%;
    overflow: hidden;
}

.google-slides-container iframe{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
