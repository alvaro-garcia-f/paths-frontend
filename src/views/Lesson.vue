<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1>{{ lesson.title }}</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-divider></v-divider>
    </v-row>

    <v-row class="mt-2" v-if="lesson.url">
      <v-col class="google-slides-container">
        <p v-html="lesson.url"></p>
      </v-col>
    </v-row>

    <v-carousel hide-delimiters :continuous=false v-else>
      <v-carousel-item v-for="(slide, idx) in lesson.content" :key="idx">
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
import Lessons from '@/services/lessonService'

export default {
  name: 'Lesson',
  data () {
    return {
      lesson: {}
    }
  },
  props: {
    id: String
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
    Lessons
      .getLesson(this.id)
      .then(response => { this.lesson = response })
      .catch(err => console.error(err))
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
