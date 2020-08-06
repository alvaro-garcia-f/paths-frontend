<template>
  <v-container fluid>
    <v-row class="align-center">
      <v-col cols="1" class="text-right">
        <router-link style="text-decoration: none" to="/main">
          <v-icon>mdi-arrow-left</v-icon>
        </router-link>
      </v-col>
      <v-col>
        <h1>{{ lesson.title }}</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-divider></v-divider>
    </v-row>

    <v-row class="mt-2 align-center justify-center google-slides-container" v-if="lesson.url" align="center">
      <v-col class="text-center">
        <div v-html="lesson.url"></div>
      </v-col>
    </v-row>

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

.google-slides-container {
  height: 70vh;
}

.google-slides-container iframe{
    width: 80vw;
    height: 70vh;
}
</style>
