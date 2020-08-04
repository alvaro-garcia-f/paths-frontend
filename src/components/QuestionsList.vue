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
          <v-btn  color="blue" class="white--text" @click.prevent="editStudent">Save</v-btn>
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
        <h1>Question list</h1>
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
        <v-data-table :headers="headers" :items="questionList"
          hide-default-header hide-default-footer class="elevation-1">

           <template v-slot:item.actions="{ item }">
             <div class="text-right">
              <v-icon small class="mr-2" @click="openEditQuestion(item)">
                mdi-pencil
              </v-icon>

              <v-icon small @click="removeQuestion(item)">
                mdi-delete
              </v-icon>
             </div>
          </template>

        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import Lessons from '@/services/lessonService'
import Questions from '@/services/questionService'

export default {
  name: 'QuestionsList',
  data () {
    return {
      headers: [
        {
          text: 'Question',
          align: 'start',
          value: 'question'
        },
        { text: 'Actions', value: 'actions' }
      ],
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
        options: {
          a: this.optionA,
          b: this.optionB,
          c: this.optionC,
          d: this.optionD
        }
      }

      Questions
        .createQuestion(this.id, data)
        .then(response => {
          this.toggleOverlay()
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
