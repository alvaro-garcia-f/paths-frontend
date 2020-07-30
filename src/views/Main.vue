<template>
  <v-container fluid>
    <v-tabs>
      <v-tabs-slider></v-tabs-slider>
      <v-tab href="#lessons">Lessons</v-tab>
      <v-tab href="#students">Students</v-tab>

      <v-tab-item value="lessons">
        <LessonsList></LessonsList>
      </v-tab-item>

      <v-tab-item value="students">
        <!-- <v-row>
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
        </v-row> -->
        <StudentsList></StudentsList>
      </v-tab-item>
    </v-tabs>

  </v-container>
</template>

<script>
import LessonsList from '@/components/LessonsList.vue'
import StudentsList from '@/components/StudentsList.vue'

export default {
  name: 'Main',
  components: {
    LessonsList,
    StudentsList
  }
}
</script>

<style>

</style>
