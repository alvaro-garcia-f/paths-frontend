<template>
  <v-container fill-height fluid>
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

    <v-row class="mt-5" justify="center" align="center" v-if="quizDone()">
      <v-col>
        <v-card height="60vh" class="success card-outter">
          <v-card-text height="100%" class="text-center white--text card-text">
            <h2>Well done! You have completed the quiz!</h2>
            <h4> You got {{ correctAnswers }} out of {{ questionsList.length }} questions right</h4>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-2" v-else>
      <v-col cols="12">
        <v-card class="py-6 question">
          <v-card-text class="text-center">
            <h2>{{ questionsList[currentQuestion].question }}</h2>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 10 : 2" color="py-4 blue darken-2" @click="answerQuestion('a')">
            <v-card-text class="text-center white--text">
              <h3>a. {{ questionsList[currentQuestion].options.a }}</h3>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
      <v-col cols="6">
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 10 : 2" color="py-4 yellow darken-2" @click="answerQuestion('b')">
            <v-card-text class="text-center white--text">
              <h3>b. {{ questionsList[currentQuestion].options.b }}</h3>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
      <v-col cols="6">
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 10 : 2" color="py-4 red darken-2" @click="answerQuestion('c')">
            <v-card-text class="text-center white--text">
              <h3>c. {{ questionsList[currentQuestion].options.c }}</h3>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
      <v-col cols="6">
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 10 : 2" color="py-4 green darken-2" @click="answerQuestion('d')">
            <v-card-text class="text-center white--text">
              <h3>d. {{ questionsList[currentQuestion].options.d }}</h3>
            </v-card-text>
          </v-card>
        </v-hover>
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
      currentQuestion: 0,
      correctAnswers: 0
    }
  },
  props: {
    id: String
  },

  methods: {
    answerQuestion (answer) {
      if (answer === this.questionsList[this.currentQuestion].answer) {
        alert('Correct!')
        this.correctAnswers++
      } else {
        alert(`Wrong! Correct answer is: ${this.questionsList[this.currentQuestion].answer}`)
      }
      this.nextQuestion()
    },

    nextQuestion () {
      if (!this.quizDone()) {
        this.currentQuestion++
      }
    },

    quizDone () {
      return this.currentQuestion === this.questionsList.length
    }
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
.card-outter {
  position: relative;
  padding-bottom: 50px;
}
.card-text {
  position: absolute;
  top: 40%;
}
</style>
