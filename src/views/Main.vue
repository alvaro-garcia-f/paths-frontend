<template>
  <v-container fill-height fluid>
    <v-overlay :value="lessonOverlay" absolute>
      <v-card>
        <v-card-title>
          <h4>Create Lesson</h4>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field label="Title" v-model="title"></v-text-field>

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

      <v-col>
        <v-btn color="blue" class="white--text" @click="toggleOverlay">Add Lesson</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Lessons from '@/services/lessonService'

export default {
  name: 'Main',
  data () {
    return {
      lessonOverlay: false,
      title: '',
      content: ''
    }
  },
  methods: {
    toggleOverlay () {
      this.lessonOverlay = !this.lessonOverlay
    },

    addLesson () {
      const data = { title: this.title, content: this.content }

      Lessons
        .createLesson(data)
        .then(response => console.log(response))
        .catch(err => console.error(err))
    }
  }

}
</script>

<style>

</style>
