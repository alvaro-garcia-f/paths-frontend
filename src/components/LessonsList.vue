<template>
  <v-container fluid>
    <v-dialog  width="500px" :value="lessonOverlay" absolute>
      <v-card>
        <v-card-title>
          <h4>Create Lesson</h4>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field label="Title" v-model="title"></v-text-field>
            <v-text-field label="Url" v-model="url"></v-text-field>
            <v-textarea label="Description" v-model="description"></v-textarea>
            <v-select v-model="lock" :items="lessonTitles" label="Previous lesson"></v-select>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="toggleOverlay">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn  color="blue" class="white--text" @click.prevent="addLesson">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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

    <v-row class="mt-2" v-if="teacher">
      <v-col>
        <v-data-table :headers="headers" :items="lessonList"
          hide-default-header hide-default-footer class="elevation-1">

           <template v-slot:item.actions="{ item }">
              <div class="text-right">
                <v-btn alt="Edit quiz" :to="{ name: 'Quiz', params: { id: item._id } }" text x-small>
                  <v-icon small>
                    mdi-comment-question
                  </v-icon>
                </v-btn>

                <v-btn alt="Edit quiz"  @click="openEditQuestion(item)" text x-small>
                  <v-icon small>
                    mdi-pencil
                  </v-icon>
                </v-btn>

                <v-btn alt="Edit quiz" @click="removeQuestion(item)" text x-small>
                  <v-icon small>
                    mdi-delete
                  </v-icon>
                </v-btn>
             </div>
          </template>

        </v-data-table>
      </v-col>
    </v-row>

    <v-row class="mt-2" v-else>
      <v-col cols="12" sm="6" lg="3" v-for="(lesson, idx) in lessonList" :key="idx">
        <v-card height="350px" class="card-outter">
          <v-overlay :value="isLocked(lesson.lock)" color="blue" opacity="1" absolute>
            <v-icon x-large>mdi-lock</v-icon>
          </v-overlay>

          <v-img class="white--text align-end" height="200px"
              :src="'https://picsum.photos/200/500?random=' + idx">
            <v-card-title> <h4>{{ lesson.title }}</h4> </v-card-title>
          </v-img>

          <v-card-text>
            {{ lesson.description}}
          </v-card-text>
          <v-card-actions class="card-actions">
            <v-btn  color="yellow darken-2" class="white--text" :to="{ name: 'Quiz', params: { id: lesson._id } }">Quiz</v-btn>
            <v-btn  color="blue" class="white--text" :to="{ name: 'Lesson', params: { id: lesson._id } }">View Lesson</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Lessons from '@/services/lessonService'
import Users from '@/services/userService'

export default {
  name: 'LessonsList',
  data () {
    return {
      headers: [
        {
          text: 'Lesson',
          align: 'start',
          value: 'title'
        },
        { text: 'Actions', value: 'actions' }
      ],
      lessonList: [],
      lessonOverlay: false,
      title: '',
      url: '',
      description: '',
      lock: '',
      lessonTitles: [],
      lessonIds: [],
      teacher: localStorage.getItem('role') === 'teacher',
      completedLessons: []
    }
  },
  computed: {
    prepareContent () {
      return this.content.split('<--')
    }
  },
  mounted () {
    this.getAllLessons()

    Users
      .getProfile()
      .then(user => {
        this.completedLessons = user.completed
      })
      .catch(err => console.error(err))
  },
  methods: {
    toggleOverlay () {
      this.lessonOverlay = !this.lessonOverlay
    },

    getAllLessons () {
      Lessons
        .getAllLessons()
        .then(response => {
          this.lessonList = response
          this.lessonTitles = this.lessonList.map(lesson => lesson.title)
          this.lessonTitles.unshift('None')
          this.lessonIds = this.lessonList.map(lesson => lesson._id)
        })
        .catch(err => console.error(err))
    },

    addLesson () {
      const data = {
        title: this.title,
        url: this.url,
        description: this.description,
        lock: this.lessonIds[this.lessonTitles.findIndex(el => el === this.lock) - 1],
        order: this.lessonList.length
      }

      Lessons
        .createLesson(data)
        .then(response => {
          this.getAllLessons()
          this.toggleOverlay()
        })
        .catch(err => console.error(err))
    },

    isLocked (lock) {
      if (localStorage.getItem('role') === 'teacher' || !lock) return false
      return !this.completedLessons.map(lesson => lesson._id).includes(lock)
    }
  }
}
</script>

<style scoped>
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
