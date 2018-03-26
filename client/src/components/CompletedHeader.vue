<template>
  <div>
    <div>
      <b-navbar toggleable="md" class="light-green mbot-45" type="dark" variant="info">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand class="home" href="/#/">e-Planner</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <v-toolbar-items>
            <v-btn flat class="m-auto" dark @click="navigateTo({name: 'planner'})">
              Tasks
            </v-btn>
            <v-btn flat class="m-auto" dark @click="navigateTo({name: 'weekly'})">
              Weekly
            </v-btn>
          </v-toolbar-items>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <div v-if="!$store.state.isUserLoggedIn">
              <v-btn flat dark
               @click="navigateTo({name: 'register'})">
                Sign Up 
              </v-btn>
              <v-btn flat dark
               @click="navigateTo({name: 'login'})">
                Login 
              </v-btn>
            </div>
            <div v-if="$store.state.isUserLoggedIn">
              <v-btn flat dark
               @click="logout">
                Log Out 
              </v-btn>
            </div>

          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
    }
  }

}
</script>

<style scoped>
.home{
  font-size:25px;
}
.home:hover{
  color:gray;
} 
@media (max-width: 800px) {
  
}
</style>
