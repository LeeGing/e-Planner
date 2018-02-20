<template>
  <div class="white elevation-2">
    <v-toolbar flat dense class="light-green" dark>
      <!-- we use title prop here -->
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>
    <br>
    <div class="pl-4 pr-4 pt-2 pb-2">
      <slot>
        No slot content defined.
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  // can use title prop
  props: [
    'title'
  ]
}

</script>


<style scoped>
</style>
