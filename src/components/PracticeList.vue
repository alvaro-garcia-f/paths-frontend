<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1>Practice</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-divider></v-divider>
    </v-row>

    <v-row class="mt-2">
      <v-col cols="12" sm="6" lg="3">
        <v-card height="350px" class="card-outter">
          <v-img class="align-end" height="200px"
              :src="require('../assets/cards/practice1.svg')">
          </v-img>

          <v-card-title> <h4>Training</h4> </v-card-title>
          <v-card-text>
            Strengthen your knowledge.
          </v-card-text>
          <v-card-actions class="card-actions">
            <v-btn  color="amber darken-2" class="white--text" :to="{ name: 'Quiz', params: { type: 'training' } }">Start Test</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PracticeList',
  mounted () {
    sessionStorage.setItem('tab', 'practice')
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
