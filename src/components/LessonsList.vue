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

    <v-dialog  width="500px" :value="editLessonOverlay" absolute>
      <v-card>
        <v-card-title>
          <h4>Edit Lesson</h4>
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
          <v-btn @click="toggleEditOverlay">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn  color="blue" class="white--text" @click.prevent="editLesson">Save</v-btn>
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
        <v-list>
          <vuedraggable v-model="lessonList" group="lessons" @start="drag=true" @end="drag=false" @change="updateOrder()">
            <v-list-item v-for="(lesson, idx) in lessonList" :key="idx">
              <v-card class="my-1" width="100%">
                <v-card-text>
                  <v-row align="center">
                    <v-col cols="9" sm="6" class="py-0 my-0">
                      {{lesson.title}}
                    </v-col>
                    <v-spacer class="hidden-xs-only"></v-spacer>
                    <v-col cols="1" sm="4" class="text-right py-0 my-0">
                      <v-btn alt="Edit quiz" :to="{ name: 'Quiz', params: { id: lesson._id } }" icon>
                        <v-icon small>
                          mdi-comment-question
                        </v-icon>
                      </v-btn>

                      <v-btn alt="Edit lesson"  @click="openEditLesson(lesson)" icon>
                        <v-icon small>
                          mdi-pencil
                        </v-icon>
                      </v-btn>

                      <v-btn alt="Delete lesson" @click="removeLesson(lesson)" icon>
                        <v-icon small>
                          mdi-delete
                        </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-list-item>
          </vuedraggable>
        </v-list>
      </v-col>
    </v-row>

    <v-row class="mt-2" v-else>
      <v-col cols="12" sm="6" lg="3" v-for="(lesson, idx) in lessonList" :key="idx">
        <v-card height="350px" class="card-outter">
          <v-overlay :value="isLocked(lesson.lock)" color="blue" opacity="1" absolute>
            <v-icon x-large>mdi-lock</v-icon>
          </v-overlay>

          <v-img class="align-end" height="200px"
              :src="require('../assets/cards/lesson' + (idx + 1) + '.svg')">
          </v-img>

          <v-card-title> <h4>{{ lesson.title }}</h4> </v-card-title>
          <v-card-text>
            {{ lesson.description}}
          </v-card-text>
          <v-card-actions class="card-actions">
            <v-btn  color="amber darken-2" class="white--text" :to="{ name: 'Quiz', params: { id: lesson._id, type: 'quiz' } }">Quiz</v-btn>
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
import vuedraggable from 'vuedraggable'

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
      editLessonOverlay: false,
      id: '',
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
  components: {
    vuedraggable
  },
  mounted () {
    sessionStorage.setItem('tab', 'lessons')

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
      this.title = ''
      this.url = ''
      this.description = ''
      this.lock = ''
      this.order = ''
    },

    toggleEditOverlay () {
      this.editLessonOverlay = !this.editLessonOverlay
      this.id = ''
      this.title = ''
      this.url = ''
      this.description = ''
      this.lock = ''
      this.order = ''
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
    },

    updateOrder () {
      const data = this.lessonList.map(lesson => lesson._id)
      Lessons
        .updateOrder(data)
        .then(list => {
          this.lessonList = list
        })
    },

    openEditLesson (lesson) {
      this.toggleEditOverlay()
      this.id = lesson._id
      this.title = lesson.title
      this.url = lesson.url
      this.description = lesson.description
      this.lock = this.lessonTitles[this.lessonIds.findIndex(el => el === lesson.lock) + 1]
      this.order = lesson.order
    },

    editLesson () {
      const data = {
        title: this.title,
        url: this.url,
        description: this.description,
        lock: this.lessonIds[this.lessonTitles.findIndex(el => el === this.lock) - 1],
        order: this.order
      }

      Lessons
        .editLesson(this.id, data)
        .then(response => {
          this.getAllLessons()
          this.toggleEditOverlay()
        })
        .catch(err => console.error(err))
    },

    removeLesson (lesson) {
      Lessons
        .deleteLesson(lesson._id)
        .then(response => {
          this.getAllLessons()
        })
        .catch(err => console.error(err))
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
