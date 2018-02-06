<template>
  <div id="app">
    <v-app>
      <page-header />
      <main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </main>
    </v-app>          
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'

export default {
  name: 'app',
  components: {
    PageHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.side-bar {
  position:fixed;
  min-width:15%;
  width:22%;
  height:242px;
}
.center {
    margin: auto;
    width: 80%;
    padding: 10px;
}
</style>
