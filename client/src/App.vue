<template>
  <div id="app">
    <v-app>
      <!-- <page-header /> -->
      <!-- <main> -->
        <!-- <v-container fluid> -->
          <router-view></router-view>
        <!-- </v-container> -->
      <!-- </main>     -->
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
h1, h2 {
  font-weight: normal;
}
.mtop-3 {
  margin-top: 3em;
}
.mbot-45 {
  margin-bottom: 45px;
}
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
  height:250px;
}
.center {
    margin-left: auto;
    margin-right: auto;
    position:relative;
    width: 80%;
    padding: 10px;
}
.opt-button {
    font-size:0.875em;
    display:block;
    top:-5px;
    left:-8px;
    margin-top:0px;
    margin-bottom:3px;
    width:100%;
}
.mtop-20 {
  margin-top: 20em;
}
</style>
