<template>
  <div id="root">
    <h1> Welcome to e-Planner </h1>
    <p> An online task list application, to help you keep track of your tasks. </p>
    <br>
    <br>
    <div v-if="!$store.state.isUserLoggedIn">
      <h3> Register for Free </h3>
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
      <h1> Quick Menu </h1>
      <v-btn flat light class='cyan'
       @click="navigateTo({name: 'planner'})">
        Planner
      </v-btn>
      <v-btn flat light class='cyan'
       @click="navigateTo({name: 'planner-completed'})">
        View Completed
      </v-btn>
      <v-btn flat light class='cyan'
       @click="navigateTo({name: 'planner-create'})">
        Add Task 
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1, h2 {
  font-weight: normal;
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
