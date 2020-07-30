<template>
  <container fluid>
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

    <v-row class="mt-2">
      <v-col>
        <v-data-table :headers="headers" :items="studentList"
          hide-default-header hide-default-footer class="elevation-1">

           <template v-slot:item.actions="{ item }">
             <div class="text-right">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>

              <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon>
             </div>
          </template>

        </v-data-table>
      </v-col>
    </v-row>
  </container>
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
      studentList: []
    }
  },
  mounted () {
    Users
      .getAllStudents()
      .then(response => { this.studentList = response })
      .catch(err => console.error(err))
  }
}
</script>

<style>

</style>
