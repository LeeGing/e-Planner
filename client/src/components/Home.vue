<template>
  <div id="root">
    <page-header/>
    <div class="transbox min-wid">
      <b-jumbotron class="jumbotron">
      <h1 class="strokeme title"> e-Planner </h1>
      <p class="strokeme title-text">
        <br>
        A task tracking application helping you stay organized.
      </p>
    </b-jumbotron>
    </div>
    <div class="top margin-t3 min-wid" v-if="!$store.state.isUserLoggedIn">
      <h1> Get Started </h1>
      <p> e-Planner is free to use!</p>
      <v-btn flat light class='cyan'
       @click="navigateTo({name: 'register'})">
        Sign Up 
      </v-btn>
      <v-btn flat light class='cyan'
       @click="navigateTo({name: 'login'})">
        Login 
      </v-btn>
    </div>
    <div v-else> 
      <div class='min-wid margin-t3'>
        <h1> Quick Menu </h1>
        <v-btn flat light class='cyan'
         @click="navigateTo({name: 'planner'})">
          TASKS
        </v-btn>
        <v-btn flat light class='cyan'
         @click="navigateTo({name: 'planner-completed'})">
          COMPLETED
        </v-btn>
        <v-btn flat light class='cyan'
         @click="navigateTo({name: 'planner-create'})">
          Add Task 
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'
export default {
  components: {
    PageHeader
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.margin-t3 {
  margin-top:6em;
}
.min-wid {
  min-width:600px;
}
.bg-white {
  background-color: white;
}
.title {
  font-size:120px !important;
}
.title-text {
  font-size:30px !important;
  font-color: white !important;
  font-weight: bolder;
}
.transbox {
  margin: 30px;
  background-color: #ffffff;
  border: 1px;
  opacity: 0.9;
  filter: alpha(opacity=60); /* For IE8 and earlier */
}
.strokeme
{
    color: black;
    text-shadow:
    -1px -1px 0 white,
    1px -1px 0 white,
    -1px 1px 0 white,
    1px 1px  white;  
}
.jumbotron {
  background-image: url("https://i.imgur.com/RV4jHFM.jpg");
  background-size: cover;
  height: 350px;
}
h1, h2 {
  font-weight: normal;
  color:black;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
