<template>
  <v-container fluid>
    <v-dialog width="500px" :value="studentOverlay" absolute>
      <v-card>
        <v-card-title>
          <h4>Add Student</h4>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field label="Name" v-model="name"></v-text-field>
            <v-text-field label="E-mail" v-model="email"></v-text-field>
            <v-text-field label="Password" v-model="password"></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="toggleOverlay">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn  color="blue" class="white--text" @click.prevent="addStudent">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog width="500px" :value="editStudentOverlay" absolute>
      <v-card>
        <v-card-title>
          <h4>Edit Student</h4>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field label="Name" v-model="name"></v-text-field>
            <v-text-field label="E-mail" v-model="email"></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="toggleEditOverlay">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn  color="blue" class="white--text" @click.prevent="editStudent">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog width="500px" :value="progressOverlay" absolute>
      <v-card>
        <v-card-title>
          <h4>{{ this.name }} - Progress</h4>
        </v-card-title>

        <v-card-text>
          <v-list dense>
            <v-list>
              <v-list-item v-for="(lesson, idx) in completed" :key="idx" dense>
                <v-list-item-title class="caption"> <strong>{{ lesson.title }}</strong> - <span class="success--text">Completed</span></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  color="blue" class="white--text" @click="toggleProgress">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row>
      <v-col>
        <h1>Students</h1>
      </v-col>

      <v-spacer></v-spacer>

      <v-col class="text-right" v-if="teacher">
        <v-btn color="blue" class="white--text" @click="toggleOverlay">Add Student</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-divider></v-divider>
    </v-row>

    <v-row class="mt-2">
      <v-col>
        <v-list>
          <v-list-item v-for="(student, idx) in studentList" :key="idx">
            <v-card class="my-1" width="100%">
              <v-card-text>
                <v-row align="center">
                  <v-col cols="10" sm="4" class="py-0 my-0">
                    {{ student.name }}
                  </v-col>
                  <v-col class="py-0 my-0 hidden-xs-only">
                    {{ student.email }}
                  </v-col>
                  <v-spacer class="hidden-xs-only"></v-spacer>
                  <v-col cols="1" sm="3" class="text-right pa-0 my-0">
                    <v-btn alt="Student progress" :to="{ name: 'Student', params: { id: student._id } }" icon>
                      <v-icon small>
                        mdi-eye
                      </v-icon>
                    </v-btn>
                    <v-btn alt="Edit lesson"  @click="openEditStudent(student)" icon>
                      <v-icon small>
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                    <v-btn alt="Delete lesson" @click="removeStudent(student)" icon>
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
import Users from '@/services/userService'

export default {
  name: 'StudentsList',
  data () {
    return {
      headers: [
        {
          text: 'Student',
          align: 'start',
          value: 'name'
        },
        { text: 'E-mail', value: 'email' },
        { text: 'Actions', value: 'actions' }
      ],
      studentList: [],
      studentOverlay: false,
      editStudentOverlay: false,
      progressOverlay: false,
      id: '',
      name: '',
      email: '',
      password: '',
      completed: [],
      teacher: localStorage.getItem('role') === 'teacher'
    }
  },
  methods: {
    toggleOverlay () {
      this.studentOverlay = !this.studentOverlay
      this.name = ''
      this.email = ''
      this.password = ''
    },

    toggleEditOverlay () {
      this.editStudentOverlay = !this.editStudentOverlay
      this.id = ''
      this.name = ''
      this.email = ''
      this.password = ''
    },

    toggleProgress () {
      this.progressOverlay = !this.progressOverlay
      this.name = ''
      this.email = ''
      this.password = ''
    },

    getAllStudents () {
      Users
        .getAllStudents()
        .then(response => { this.studentList = response })
        .catch(err => console.error(err))
    },

    addStudent () {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      Users
        .addStudent(data)
        .then(response => {
          this.getAllStudents()
          this.toggleOverlay()
        })
    },

    openEditStudent (student) {
      this.toggleEditOverlay()
      this.id = student._id
      this.name = student.name
      this.email = student.email
    },

    editStudent () {
      const data = {
        name: this.name,
        email: this.email
      }

      Users
        .editStudent(this.id, data)
        .then(response => {
          this.getAllStudents()
          this.toggleEditOverlay()
        })
        .catch(err => console.error(err))
    },

    removeStudent (student) {
      Users
        .deleteStudent(student._id)
        .then(response => {
          this.getAllStudents()
        })
        .catch(err => console.error(err))
    },

    openStudentProgress (student) {
      this.toggleProgress()
      this.name = student.name
      this.completed = student.completed
    }
  },
  mounted () {
    this.getAllStudents()
  }
}
</script>

<style>

</style>
