<template>
  <v-container fluid>
    <v-overlay :value="lessonOverlay" absolute>
      <v-card width="50vw">
        <v-card-title>
          <h4>Create Lesson</h4>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field label="Title" v-model="title"></v-text-field>
            <v-text-field label="Url" v-model="url"></v-text-field>
            <v-textarea label="Content" v-model="content"></v-textarea>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="toggleOverlay">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn  color="blue" class="white--text" @click.prevent="addLesson">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>

    <v-row>
      <v-col>
        <h1>Lessons</h1>
      </v-col>

      <v-spacer></v-spacer>

      <v-col class="text-right">
        <v-btn color="blue" class="white--text" @click="toggleOverlay" v-if="teacher">Add Lesson</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-divider></v-divider>
    </v-row>

    <v-row class="mt-2">
      <v-col cols="12" sm="6" lg="3" v-for="(lesson, idx) in lessonList" :key="idx">
        <v-card height="250px" class="card-outter">
          <v-card-title>
            <h4>{{ lesson.title }}</h4>
          </v-card-title>
          <v-card-actions class="card-actions">
            <v-btn  color="yellow darken-2" class="white--text" :to="{ name: 'Quiz', params: { id: lesson._id } }">Quiz</v-btn>
            <v-btn  color="blue" class="white--text" :to="{ name: 'Lesson', params: { id: lesson._id } }">Read Lesson</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Lessons from '@/services/lessonService'

export default {
  name: 'LessonsList',
  data () {
    return {
      lessonList: [],
      lessonOverlay: false,
      title: '',
      url: '',
      content: '',
      teacher: localStorage.getItem('role') === 'teacher'
    }
  },
  computed: {
    prepareContent () {
      return this.content.split('<--')
    }
  },
  mounted () {
    this.getAllLessons()
  },
  methods: {
    toggleOverlay () {
      this.lessonOverlay = !this.lessonOverlay
    },

    getAllLessons () {
      Lessons
        .getAllLessons()
        .then(response => { this.lessonList = response })
        .catch(err => console.error(err))
    },

    addLesson () {
      const data = {
        title: this.title,
        url: this.url,
        content: this.prepareContent
      }

      Lessons
        .createLesson(data)
        .then(response => {
          this.getAllLessons()
          this.toggleOverlay()
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
.card-actions {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
