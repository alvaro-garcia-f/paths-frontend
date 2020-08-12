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
        <v-card height="60vh" class="success">
          <v-card-text class="text-center white--text" style="height: 100%">
            <v-row align="center" style="height: 100%">
              <v-col>
                <h1>You have finished the quiz!</h1><br/>
                <h3> You got {{ correctAnswers }} out of {{ questionsList.length }} questions right</h3><br/>
                <h3> {{ returnFeedback(correctAnswers, questionsList.length) }}</h3><br/>
                <v-btn class="mt-5" :to="redirectTo()" v-if="type && type !== 'training'">{{ getButtonMessage() }}</v-btn>
              </v-col>
            </v-row>
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
import Results from '@/services/resultsService'
import Lessons from '@/services/lessonService'
import Practice from '@/services/practiceService'

export default {
  name: 'QuestionsTest',
  data () {
    return {
      questionsList: [],
      currentQuestion: 0,
      correctAnswers: 0,
      correct: false,
      wrong: false,
      nextLesson: {},
      time: 0
    }
  },
  props: {
    id: String,
    type: String
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
      const data = {
        lesson: this.id,
        question: this.questionsList[this.currentQuestion]._id
      }

      if (answer === this.questionsList[this.currentQuestion].answer) {
        this.correct = true
        data.correct = true
        this.correctAnswers++
        this.time = Date.now() - this.time
        this.updateInterval()
      } else {
        this.wrong = true
        data.correct = false
        this.restartInterval()
      }
      this.time = Date.now()

      Results
        .addAnswer(data)
        .then(response => {
          this.$root.$emit('dataChange', 'Question answered')
        })
        .catch(err => console.error(err))
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
            this.$root.$emit('dataChange', 'Lesson completed')
          })
          .catch(err => console.error(err))
      }
    },

    // Redirection on Quiz end
    getButtonMessage () {
      if (Math.floor(this.correctAnswers * 100 / this.questionsList.length) >= 75) {
        return 'Read Next Lesson'
      }
      return 'Revise This Lesson'
    },

    redirectTo () {
      if (this.questionsList[0]) {
        if (Math.floor(this.correctAnswers * 100 / this.questionsList.length) >= 75) {
          return this.nextLesson
        } else {
          return { name: 'Lesson', params: { id: this.questionsList[0].lesson } }
        }
      }
    },

    // SuperMemo data
    getResponseQuality () {
      const responseTime = this.time / 1000
      if (responseTime >= 30) return 3
      if (responseTime > 15 && responseTime < 30) return 4
      return 5
    },

    getNewInterval (oldInterval, ef) {
      if (oldInterval === 0) return 1
      if (oldInterval === 1) return 6
      if (oldInterval > 1) return Math.floor(oldInterval * ef)
    },

    restartInterval () {
      const data = {
        next: Date.now(),
        interval: 0,
        repetitions: 0,
        ef: 2.5
      }

      Practice
        .updateQuestionInterval(this.questionsList[this.currentQuestion]._id, data)
        .then(response => console.log(response))
        .catch(err => console.error(err))
    },

    updateInterval (quality) {
      const msecPerDay = 24 * 60 * 60 * 1000
      const data = {
        next: Date.now() + msecPerDay,
        interval: 1,
        repetitions: 1,
        ef: 2.5
      }

      Practice
        .getQuestionInterval(this.questionsList[this.currentQuestion]._id)
        .then(interval => {
          if (interval.length > 0) {
            data.repetitions = interval[0].repetitions + 1
            const q = this.getResponseQuality()
            const eFactor = interval[0].ef - 0.8 + 0.28 * q - 0.02 * q * q

            if (eFactor < 1.3) data.ef = 1.3
            else data.ef = eFactor

            data.interval = this.getNewInterval(interval[0].interval, data.ef)
            data.next = Date.now() + (data.interval * msecPerDay)
          }

          Practice
            .updateQuestionInterval(this.questionsList[this.currentQuestion]._id, data)
            .then(response => console.log(response))
            .catch(err => console.error(err))
        })
        .catch(err => console.error(err))
    }
  },
  mounted () {
    if (this.type === 'quiz') {
      Questions
        .getAllQuestions(this.id)
        .then(response => {
          this.questionsList = response
          this.time = Date.now()

          Lessons
            .getNextLesson(response[0].lesson)
            .then(next => {
              this.nextLesson = { name: 'Lesson', params: { id: next[0]._id } }
            })
            .catch(err => console.error(err))
        })
        .catch(err => console.error(err))
    }

    if (this.type === 'training') {
      Practice
        .getAllIntervals()
        .then(intervals => {
          intervals.forEach(interval => {
            this.questionsList.push(interval.question)
          })
          this.time = Date.now()
        })
        .catch(err => console.error(err))
    }
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
