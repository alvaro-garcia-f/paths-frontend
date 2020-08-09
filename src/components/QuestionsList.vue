<template>
  <v-container fluid>
    <v-dialog width="50vw" :value="questionOverlay" absolute>
      <v-card>
        <v-card-title>
          <h4>Add Question</h4>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field label="Question" v-model="question"></v-text-field>
            <v-text-field label="Option A" v-model="optionA"></v-text-field>
            <v-text-field label="Option B" v-model="optionB"></v-text-field>
            <v-text-field label="Option C" v-model="optionC"></v-text-field>
            <v-text-field label="Option D" v-model="optionD"></v-text-field>
            <v-select v-model="answer" :items="answerOptions" label="Correct answer"></v-select>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="toggleOverlay">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn  color="blue" class="white--text" @click.prevent="addQuestion">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog width="50vw" :value="editQuestionOverlay" absolute>
      <v-card>
        <v-card-title>
          <h4>Edit Question</h4>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field label="Question" v-model="question"></v-text-field>
            <v-text-field label="Option A" v-model="optionA"></v-text-field>
            <v-text-field label="Option B" v-model="optionB"></v-text-field>
            <v-text-field label="Option C" v-model="optionC"></v-text-field>
            <v-text-field label="Option D" v-model="optionD"></v-text-field>
            <v-select v-model="answer" :items="answerOptions" label="Correct answer"></v-select>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="toggleEditOverlay">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn  color="blue" class="white--text" @click.prevent="editQuestion">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row class="align-center">
      <v-col cols="1" class="text-right">
        <router-link style="text-decoration: none" to="/main">
          <v-icon>mdi-arrow-left</v-icon>
        </router-link>
      </v-col>
      <v-col>
        <h1>Manage Questions</h1>
      </v-col>

      <v-spacer></v-spacer>

      <v-col class="text-right" v-if="teacher">
        <v-btn color="blue" class="white--text" @click="toggleOverlay">Add Question</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-divider></v-divider>
    </v-row>

    <v-row class="mt-2">
      <v-col>
         <v-list>
          <v-list-item v-for="(question, idx) in questionList" :key="idx">
            <v-card class="my-1" width="100%">
              <v-card-text>
                <v-row align="center">
                  <v-col cols="9" sm="6" class="py-0 my-0">
                    {{ question.question }}
                  </v-col>
                  <v-spacer class="hidden-xs-only"></v-spacer>
                  <v-col cols="1" sm="4" class="text-right py-0 my-0">
                    <v-btn alt="Edit question"  @click="openEditQuestion(question)" icon>
                      <v-icon small>
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                    <v-btn alt="Delete question" @click="removeQuestion(question)" icon>
                      <v-icon small>
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Questions from '@/services/questionService'

export default {
  name: 'QuestionsList',
  data () {
    return {
      questionList: [],
      questionOverlay: false,
      editQuestionOverlay: false,
      questionId: '',
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      answer: '',
      answerOptions: ['a', 'b', 'c', 'd'],
      teacher: localStorage.getItem('role') === 'teacher'
    }
  },
  props: {
    id: String
  },
  methods: {
    toggleOverlay () {
      this.questionOverlay = !this.questionOverlay
      this.question = ''
      this.answer = ''
      this.optionA = ''
      this.optionB = ''
      this.optionC = ''
      this.optionD = ''
    },

    toggleEditOverlay () {
      this.editQuestionOverlay = !this.editQuestionOverlay
      this.questionId = ''
      this.question = ''
      this.answer = ''
      this.optionA = ''
      this.optionB = ''
      this.optionC = ''
      this.optionD = ''
    },

    getAllQuestions () {
      Questions
        .getAllQuestions(this.id)
        .then(response => { this.questionList = response })
        .catch(err => console.error(err))
    },

    addQuestion () {
      const data = {
        question: this.question,
        answer: this.answer,
        option_a: this.optionA,
        option_b: this.optionB,
        option_c: this.optionC,
        option_d: this.optionD
      }

      Questions
        .createQuestion(this.id, data)
        .then(response => {
          this.toggleOverlay()
          this.getAllQuestions()
        })
        .catch(err => console.error(err))
    },

    openEditQuestion (question) {
      this.toggleEditOverlay()
      this.questionId = question._id
      this.question = question.question
      this.answer = question.answer
      this.optionA = question.option_a
      this.optionB = question.option_b
      this.optionC = question.option_c
      this.optionD = question.option_d
    },

    editQuestion () {
      const data = {
        question: this.question,
        answer: this.answer,
        option_a: this.optionA,
        option_b: this.optionB,
        option_c: this.optionC,
        option_d: this.optionD
      }

      Questions
        .editQuestion(this.questionId, data)
        .then(response => {
          this.getAllQuestions()
          this.toggleEditOverlay()
        })
        .catch(err => console.error(err))
    },

    removeQuestion (question) {
      Questions
        .deleteQuestion(question._id)
        .then(response => {
          this.getAllQuestions()
        })
        .catch(err => console.error(err))
    }
  },
  mounted () {
    this.getAllQuestions()
  }
}
</script>

<style>

</style>
