<template>
  <v-container fill-height fluid>
    <v-carousel hide-delimiters :continuous=false>
      <v-carousel-item v-for="(slide, idx) in content" :key="idx">
        <v-card height="100%">
          <v-card-text>
            <p>{{ slide }}</p>
          </v-card-text>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
export default {
  name: 'Lesson',
  props: {
    content: Array
  }
}
</script>

<style>

</style>
