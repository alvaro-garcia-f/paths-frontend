<template>
  <v-container fluid>
    <v-overlay :value="studentOverlay" absolute>
      <v-card width="50vw">
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
    </v-overlay>

    <v-overlay :value="editStudentOverlay" absolute>
      <v-card width="50vw">
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
    </v-overlay>

    <v-row>
      <v-col>
        <h1>Students list</h1>
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
        <v-data-table :headers="headers" :items="studentList"
          hide-default-header hide-default-footer class="elevation-1">

           <template v-slot:item.actions="{ item }">
             <div class="text-right">
              <v-icon small class="mr-2" @click="openEditStudent(item)">
                mdi-pencil
              </v-icon>

              <v-icon small @click="removeStudent(item)">
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
import Users from '@/services/userService'

export default {
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
      id: '',
      name: '',
      email: '',
      password: '',
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
          console.log(response)
          this.getAllStudents()
        })
        .catch(err => console.error(err))
    }
  },
  mounted () {
    this.getAllStudents()
  }
}
</script>

<style>

</style>
