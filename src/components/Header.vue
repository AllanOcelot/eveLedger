<template>
  <div id="nav">
      <div class="left-aligned">
        <router-link to="/">
          <span class="blue">Eve</span><span class="yellow">tricity</span>
        </router-link>
      </div>
      <!-- links -->
      <div class="right-aligned">
        <ul class="link-container">
          <li>
            <router-link to="/faq">F.A.Q</router-link>
          </li>
          
          <li>
            <router-link to="/roadmap">ROADMAP</router-link>
          </li>
        </ul>
        <LoginButton />
      </div>
  </div>
</template>

<script>
import LoginButton from '@/components/LoginButton.vue'

export default {
  name: 'Header',
  data () {
    return {

    }
  },
  components : {
    LoginButton,
  },
  mounted () {
  },
  methods : {
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
    border-bottom: 1px solid rgba(255,255,255,0.3);
    padding: 0 20px;
    background: #0a0a1375;
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
    color: #030419;
    font-weight: 900;
    text-shadow: none;

    .blue {
      color: #023592;
    }
    .yellow {
      color: #f7a025;
    }
  }

  @keyframes blinker {
    0% {opacity:0;}
    9% {opacity:0;}
    10% {opacity:.5;}
    13% {opacity:0;}
    20% {opacity:.5;}
    25% {opacity:1;}
  }


  .right-aligned {
    float: right;
    display: flex;
    align-items: center;
    height: 100%;
    ul {
      margin-top: -5px;
      margin-right: 10px;
      display: inline-block;
      li {
        display: inline-block;
        margin-right: 20px;
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
