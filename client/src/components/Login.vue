<template>
  <div>
  <div>
    <v-layout column>
      <v-flex xs6 offset-xs3>
        <div class="white elevation-2">
          <!-- vuetify allows us to use dark, giving us white text -->
          <v-toolbar flat dense class="cyan" dark>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <br>
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
            <div class="error" v-html="error"/>
            <div v-show="success"> User has been successfully registered.<br> Redirecting to Home Page </div>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
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
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        // this is going to call the stores setToken method in actions, which will call mutations setToken, which will update our state to token
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
        // error.repsonse.data is what is returned by axios, .error is what we defined
        this.error = error.response.data.error
      }
      // if at this point, this.error is still null, meaning there was no error, this.sucess will become true, allowing for line 10 to show.
      if (this.error === null) { this.success = true }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error {
    color:red;
  }
  .border-1{
    border:1px solid grey;
    border-radius:3px;
  }</style>

<!-- vuex will be used for key store related objects -->
