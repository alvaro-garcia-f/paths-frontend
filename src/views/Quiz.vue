<template>
  <v-container fluid>
    <QuestionsList :id="id"></QuestionsList>
  </v-container>
</template>

<script>
import QuestionsList from '@/components/QuestionsList.vue'

export default {
  name: 'Quiz',
  components: {
    QuestionsList
  },
  props: {
    id: String
  }
}
</script>

<style>

</style>
