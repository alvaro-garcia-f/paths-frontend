<template>
 <v-container width="75vw">
    <v-row class="align-center">
      <v-col cols="1" class="text-right">
        <router-link style="text-decoration: none" to="/main">
          <v-icon>mdi-arrow-left</v-icon>
        </router-link>
      </v-col>
      <v-col>
        <h1>Student Progress</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-divider></v-divider>
    </v-row>

    <v-row class="mt-2">
      <v-col cols="12">
        <v-card>
          <div class="d-flex flex-no-wrap align-center">
            <v-avatar class="ma-3" size="125" tile>
                <v-img src="../assets/avatar.svg"></v-img>
            </v-avatar>

            <div>
              <v-card-title class="headline" v-text="student.name"></v-card-title>
              <v-card-subtitle v-text="student.email"></v-card-subtitle>

            </div>
            <v-spacer></v-spacer>
            <div class="ma-3">
              <v-card-title class="headline">Total Results</v-card-title>
              <v-card-text class="body-1">
                Total answers: {{ results.length }} <br/>
                Total correct: {{ totalCorrect() }}
              </v-card-text>
            </div>
            <v-progress-circular color="green lighten-2" class="ma-3" size="125" :value="totalPercentage()">
               {{ totalPercentage() }}
            </v-progress-circular>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6" lg="3" v-for="(lesson, idx) in lessonList" :key="idx">
        <v-card height="250px" class="card-outter">
          <v-card-title>
            <h4>{{ lesson.title }}</h4>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Users from '@/services/userService'
import Lessons from '@/services/lessonService'
import Results from '@/services/resultsService'

export default {
  data () {
    return {
      student: {},
      lessonList: [],
      results: []
    }
  },
  props: {
    id: String
  },
  methods: {
    totalCorrect () {
      return this.results.filter(r => r.correct).length
    },
    totalPercentage () {
      return this.totalCorrect() * 100 / this.results.length
    }
  },
  created () {
    Users
      .getStudent(this.id)
      .then(student => {
        this.student = student

        Lessons
          .getAllLessons()
          .then(lessons => {
            this.lessonList = lessons

            Results
              .getResults(this.student._id)
              .then(results => {
                this.results = results
              })
              .catch(err => console.error(err))
          })
          .catch(err => console.error(err))
      })
      .catch(err => console.error(err))
  }
}
</script>

<style>

</style>
