<template>
  <v-container fluid>
    <v-tabs>
      <v-tabs-slider></v-tabs-slider>
      <v-tab href="#lessons">Lessons</v-tab>
      <v-tab href="#students">Students</v-tab>

      <v-tab-item value="lessons">
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
            <h1>Lesson list</h1>
          </v-col>

          <v-spacer></v-spacer>

          <v-col class="text-right">
            <v-btn color="blue" class="white--text" @click="toggleOverlay">Add Lesson</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-divider></v-divider>
        </v-row>
        <v-row class="mt-2">
          <v-col cols="12" sm="6" lg="3" v-for="(lesson, idx) in list" :key="idx">
            <v-card height="250px" class="card-outter">
              <v-card-title>
                <h4>{{ lesson.title }}</h4>
              </v-card-title>
              <v-card-actions class="card-actions">
                <v-btn  color="blue" class="white--text" :to="{ name: 'Lesson', params: { url: lesson.url, content: lesson.content } }">Read Lesson</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-tab-item>

      <v-tab-item value="students">
         <v-row>
          <v-col>
            <h1>Students list</h1>
          </v-col>

          <v-spacer></v-spacer>

          <v-col class="text-right">
            <v-btn color="blue" class="white--text" @click="toggleOverlay">Add Student</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-divider></v-divider>
        </v-row>
      </v-tab-item>
    </v-tabs>

  </v-container>
</template>

<script>
import Lessons from '@/services/lessonService'

export default {
  name: 'Main',
  data () {
    return {
      list: [],
      lessonOverlay: false,
      title: '',
      url: '',
      content: ''
    }
  },
  computed: {
    prepareContent () {
      return this.content.split('<--')
    }
  },
  mounted () {
    Lessons
      .getAllLessons()
      .then(response => { this.list = response })
      .catch(err => console.error(err))
  },
  methods: {
    toggleOverlay () {
      this.lessonOverlay = !this.lessonOverlay
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
          console.log(response)
          Lessons
            .getAllLessons()
            .then(response => { this.list = response })
            .catch(err => console.error(err))

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
