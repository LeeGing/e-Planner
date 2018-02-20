<template>
  <div>
    <page-header/>
    <v-layout class='center'>
      <v-flex xs6 offset-xs3>
        <panel title="Login">
          <div class="pl-4 pr-4 pt-2 pb-2">
            <v-text-field class="border-b1"
              label="Enter Email"
              v-model="email"
            ></v-text-field>
            <br>
            <v-text-field
              label="Enter Password"
              type="password"
              v-model="password"
            ></v-text-field>
            <br>
            <v-btn class="cyan" @click="login" dark>Login</v-btn>
            <br>
            <br>
            <div class="error" v-html="error"/>
            <div v-show="success"> Login Successful</div>
          </div>
      </panel>
      </v-flex>
    </v-layout>
  </div>
</div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Panel from '@/components/Panel'
import PageHeader from '@/components/Header.vue'

export default {
  name: 'Registration',
  data () {
    return {
      email: '',
      password: '',
      // we need to define error in ordter to use it on line 36
      error: null,
      success: false
    }
  },
  methods: {
    async login () {
      // try catch to catch possible errors
      // if AuthenticationService endpoint returns something other than 200, we will catch that error
      try {
        // we track the response that is returned from the server
        const response = await AuthenticationService.login({
          email: this.email.toLowerCase(),
          password: this.password
        })
        // this is going to call the stores setToken method in actions, which will call mutations setToken, which will update our state to token
        // we set user and set token based on the response we receive from the server
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'planner'
        })
      } catch (error) {
        // error.repsonse.data is what is returned by axios, .error is what we defined
        this.error = error.response.data.error
      }
      // if at this point, this.error is still null, meaning there was no error, this.sucess will become true, allowing for line 10 to show.
      if (this.error === null) { this.success = true }
    }
  },
  components: {
    Panel,
    PageHeader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 30em;
    width: 80%;
    padding: 10px;
}
.error {
    color:red;
    background-color:white !important;
}
  .border-1{
    border:1px solid grey;
    border-radius:3px;
  }</style>

<!-- vuex will be used for key store related objects -->
