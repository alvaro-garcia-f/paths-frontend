<template>
  <v-container fluid>
    <v-row class="align-center">
      <v-col cols="1" class="text-right">
        <router-link style="text-decoration: none" to="/main">
          <v-icon>mdi-arrow-left</v-icon>
        </router-link>
      </v-col>
      <v-col>
        <h1>Student Quiz</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-divider></v-divider>
    </v-row>

    <v-row class="mt-2">
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <h3>{{ questionsList[question].question }}</h3>
            {{ questionsList }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-text>
            <h3>{{ questionsList[question].options.a }}</h3>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-text>
            <h3>{{ questionsList[question].options.b }}</h3>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-text>
            <h3>{{ questionsList[question].options.c }}</h3>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-text>
            <h3>{{ questionsList[question].options.d }}</h3>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Lessons from '@/services/lessonService'

export default {
  name: 'QuestionsTest',
  data () {
    return {
      questionsList: [],
      question: 0
    }
  },
  props: {
    id: String
  },
  mounted () {
    Lessons
      .getAllQuestions(this.id)
      .then(response => { this.questionsList = response })
      .catch(err => console.error(err))
  }
}
</script>

<style>

</style>
