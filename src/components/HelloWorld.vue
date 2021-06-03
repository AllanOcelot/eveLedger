<template>
  <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <a :href="loginURL" v-if="isLoggedIn === false">
        <img src="@/assets/images/eve-sso-login-black-small.png" alt="Login With Eve Online">
      </a>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Header',
  data () {
    return {
      loginURL: '',
      isLoggedIn: false,
    }
  },
  mounted () {
    this.generateLoginURL()
  },
  methods : {
    generateLoginURL(){
      axios.get('https://eveledger.herokuapp.com/generateLoginURL').then(response => {
        this.loginURL = response.data;
      }).catch(error => {
        console.log(error)
      });
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
