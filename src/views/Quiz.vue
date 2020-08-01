<template>
  <v-container fluid>
    <QuestionsList :id="id" v-if="teacher"></QuestionsList>
    <QuestionsTest :id="id" v-else></QuestionsTest>
  </v-container>
</template>

<script>
import QuestionsList from '@/components/QuestionsList.vue'
import QuestionsTest from '@/components/QuestionsTest.vue'

export default {
  name: 'Quiz',
  data () {
    return {
      teacher: localStorage.getItem('role') === 'teacher'
    }
  },
  components: {
    QuestionsList,
    QuestionsTest
  },
  props: {
    id: String
  }
}
</script>

<style>

</style>
