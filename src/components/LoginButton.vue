<template>
  <div>
    <a :href="loginURL" v-if="isLoggedIn === false" class="loginButton">
      <img src="@/assets/images/eve-sso-login-black-small.png" alt="Login With Eve Online">
    </a>
    <a href="/Dashboard" v-else class="dashboard-button">
      Go To Dashboard
    </a>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginButton',
  data () {
    return {
      loginURL: '',
      isLoggedIn: false,
    }
  },
  components : {
  },
  mounted () {
    this.generateLoginURL()
  },
  methods: {
    generateLoginURL(){
      if(!sessionStorage.getItem('current_CharacterCorp') || sessionStorage.getItem('current_CharacterCorp').length <= 0 ){
        axios.get('https://eveledger.herokuapp.com/generateLoginURL').then(response => {
          this.loginURL = response.data;
        }).catch(error => {
          console.log(error)
        });
      }else{
        this.isLoggedIn = true;
      }
    }
  }
}
</script>
<style scoped lang="scss">

  .dashboard-button {
    display: block;
    width: 200px;
    padding: 5px 10px;
    border-radius: 5px;
    text-shadow: none;
    font-weight: 700;
    opacity: 1;
    background: #0e3171;
    color: #fff !important;
    text-align: center;
    transition: all 0.3s;
    &:hover {
      background: #416bb7;
      transition: all 0.3s;
    }
  }
  
</style>