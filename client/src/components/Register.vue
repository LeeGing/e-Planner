<template>
  <div>
  <div>
    <navibar></navibar>
    <div class="register-form">
      <h1>Register</h1>
      <!-- v-model : when vue runs, take the input and find data/property called email and bind it -->
      <br>
      <input type="email" name="email" placeholder="E-Mail" v-model="email"/>
      <br>
      <br>
      <input type="password" name="password" placeholder="Password" v-model="password"/>
      <br>
      <br>
      <button @click="register">Register</button>
      <br>
      <br>
      <div class="error" v-html="error"/>
      <div v-show="success"> User has been successfully registered.<br> Redirecting to Home Page </div>
    </div>
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
    async register () {
      // try catch to catch possible errors
      // if AuthenticationService endpoint returns something other than 200, we will catch that error
      try {
        await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
      } catch (error) {
        // error.repsonse.data is what is returned by axios, .error is what we defined
        this.error = error.response.data.error
      }
      // if at this point, this.error is still null, meaning there was no error, this.sucess will become true, allowing for line 10 to show.
      if (this.error === null) { this.success = true }
      if (this.success === true) {
        window.setTimeout(function () {
          window.location.href = '/#/'
        }, 5000)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .register-form {
    margin-top:100px;
  }
  .error {
    color:red;
  }
</style>

<!-- vuex will be used for key store related objects -->
