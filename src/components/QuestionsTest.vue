<template>
  <v-container fill-height fluid>
    <v-row class="align-center">
      <v-col cols="1" class="text-right">
        <router-link style="text-decoration: none" to="/main">
          <v-icon>mdi-arrow-left</v-icon>
        </router-link>
      </v-col>
      <v-col>
        <h1>Quiz</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-divider></v-divider>
    </v-row>

    <v-row class="mt-5" justify="center" align="center" v-if="isQuizDone()">
      <v-col>
        <v-card height="60vh" class="success card-outter">
          <v-card-text height="100%" class="text-center white--text card-text">
            <h1>You have finished the quiz!</h1><br/>
            <h3> You got {{ correctAnswers }} out of {{ questionsList.length }} questions right</h3><br/>
            <h3> {{ returnFeedback(correctAnswers, questionsList.length) }}</h3><br/>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-2" v-else>

      <v-dialog width="50vw" :value="correct" absolute @click:outside="nextQuestion()">
        <v-card height="50vh" class="success card-outter">
          <v-card-text height="100%" class="text-center white--text card-text">
            <h2> That's correct!</h2>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog width="50vw" :value="wrong" absolute @click:outside="nextQuestion()">
        <v-card height="50vh" class="warning card-outter">
          <v-card-text height="100%" class="text-center white--text card-text">
            <h2> I'm sorry but that is wrong</h2><br/>
            <h3>The correct answer is: {{ showAnswer(questionsList[currentQuestion].answer) }}</h3>
          </v-card-text>
        </v-card>
      </v-dialog>

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
              <h3>a. {{ questionsList[currentQuestion].option_a }}</h3>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
      <v-col cols="6">
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 10 : 2" color="py-4 yellow darken-2" @click="answerQuestion('b')">
            <v-card-text class="text-center white--text">
              <h3>b. {{ questionsList[currentQuestion].option_b }}</h3>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
      <v-col cols="6">
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 10 : 2" color="py-4 red darken-2" @click="answerQuestion('c')">
            <v-card-text class="text-center white--text">
              <h3>c. {{ questionsList[currentQuestion].option_c }}</h3>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
      <v-col cols="6">
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 10 : 2" color="py-4 green darken-2" @click="answerQuestion('d')">
            <v-card-text class="text-center white--text">
              <h3>d. {{ questionsList[currentQuestion].option_d }}</h3>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Users from '@/services/userService'
import Questions from '@/services/questionService'

export default {
  name: 'QuestionsTest',
  data () {
    return {
      questionsList: [],
      currentQuestion: 0,
      correctAnswers: 0,
      correct: false,
      wrong: false
    }
  },
  props: {
    id: String
  },

  methods: {
    showAnswer (answer) {
      if (answer === 'a') return this.questionsList[this.currentQuestion].option_a
      if (answer === 'b') return this.questionsList[this.currentQuestion].option_b
      if (answer === 'c') return this.questionsList[this.currentQuestion].option_c
      if (answer === 'd') return this.questionsList[this.currentQuestion].option_d
    },
    returnFeedback (n, total) {
      if (Math.floor(n * 100 / total) >= 75) {
        return 'Well done! You are ready to begin with the next lesson!'
      }
      return 'Maybe next lesson is still too advanced. You should read this lesson again.'
    },
    answerQuestion (answer) {
      if (answer === this.questionsList[this.currentQuestion].answer) {
        this.correct = true
        this.correctAnswers++
      } else {
        this.wrong = true
      }
    },

    nextQuestion () {
      this.correct = false
      this.wrong = false
      if (!this.isQuizDone()) { this.currentQuestion++ }
    },

    isQuizDone () {
      const done = this.currentQuestion === this.questionsList.length
      if (done) this.endQuiz()
      return done
    },

    endQuiz () {
      if (Math.floor(this.correctAnswers * 100 / this.questionsList.length) >= 75) {
        Users
          .completeLesson(this.id)
          .then(() => {
            setTimeout(() => {
              this.$router.push('/main')
              window.location.reload()
            }, 2000)
          })
          .catch(err => console.error(err))
      }
    }
  },
  mounted () {
    Questions
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
