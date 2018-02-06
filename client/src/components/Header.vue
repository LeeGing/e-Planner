<template>
  <div>
    <div>
      <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand class="home" href="/#/">e-Planner</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <!-- <b-nav-item href="#">Link</b-nav-item> -->
            <v-toolbar-items>
            <v-btn flat class="m-auto" dark @click="navigateTo({name: 'planner'})">
              Planner
            </v-btn>
          </v-toolbar-items>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <!-- hide the log in and sign up buttons if the user is logged in. -->
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home:hover{
  color:gray;
} 
@media (max-width: 800px) {
  
}
</style>

<!-- vuex will be used for key store related objects -->
