<template>
  <div id="nav">
      <div class="left-aligned">
        [APPNAME]
      </div>
      <!-- links -->
      <div class="right-aligned">
        <ul class="link-container">
          <li>
            <router-link to="/">F.A.Q</router-link>
          </li>
          <li>
            <router-link to="/about">Documentation</router-link>
          </li>
        </ul>
        <a :href="loginURL" v-if="isLoggedIn === false" class="loginButton">
          <img src="@/assets/images/eve-sso-login-black-small.png" alt="Login With Eve Online">
        </a>
      </div>
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
      axios.get('http://127.0.0.1:8000/generateLoginURL').then(response => {
        this.loginURL = response.data;
      }).catch(error => {
        console.log(error)
      });
    }
  }
}
</script>


<style lang="scss" scoped>
  #nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: #1d1d1d;
    border-bottom: 1px solid rgba(255,255,255,0.3);
    padding: 0 20px;
    z-index: 100;
  }

  #nav a {
    font-weight: bold;
    color: #fff !important;
    text-shadow: none;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  .left-aligned {
    float: left;
    display: flex;
    align-items: center;
    height: 100%;
    color: #fff;
    font-weight: 900;
  }

  .right-aligned {
    float: right;
    display: flex;
    align-items: center;
    height: 100%;
    ul {
      margin-right: 10px;
      display: inline-block;
      li {
        display: inline-block;
        margin-right: 10px;
        font-size: 14px;
        line-height: 17px;
      }
    }
  }

  .loginButton {
    height: 30px;
    display: inline-block;
    margin-right: 0;
    img {
      display: block;
    }
  }


</style>
