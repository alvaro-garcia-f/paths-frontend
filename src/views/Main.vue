<template>
  <v-container fluid>
    <v-tabs :value = "getActiveTab()">
      <v-tabs-slider></v-tabs-slider>
      <v-tab href="#lessons">Lessons</v-tab>
      <v-tab href="#students" v-if="teacher">Students</v-tab>
      <v-tab href="#practice" v-else>Practice</v-tab>

      <v-tab-item value="lessons">
        <LessonsList></LessonsList>
      </v-tab-item>

      <v-tab-item value="students">
        <StudentsList></StudentsList>
      </v-tab-item>

      <v-tab-item value="practice">
        <PracticeList></PracticeList>
      </v-tab-item>
    </v-tabs>

  </v-container>
</template>

<script>
import LessonsList from '@/components/LessonsList.vue'
import StudentsList from '@/components/StudentsList.vue'
import PracticeList from '@/components/PracticeList.vue'

export default {
  name: 'Main',
  data () {
    return {
      teacher: localStorage.getItem('role') === 'teacher'
    }
  },
  components: {
    LessonsList,
    StudentsList,
    PracticeList
  },
  methods: {
    getActiveTab () {
      return sessionStorage.getItem('tab') || 'lessons'
    }
  }
}
</script>

<style>

</style>
