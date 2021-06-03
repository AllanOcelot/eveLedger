<template>
  <div class="home">
    <h1>
      You will be transfered shortly.
    </h1>
    <div v-if="error !== ''">
      <p>{{error}}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'Callback',
  data () {
    return {
      error: '',
    }
  },
  components: {
  },
  async mounted () {
    this.getQueryParams();
  },
  methods: {
    getQueryParams() {
      var urlParams = new URLSearchParams(window.location.search);
      if(urlParams.has('code') && urlParams.has('state')){
        this.getEveAuth(urlParams.get('code'));
      }else{
        this.error = 'It looks like there was an error during authentication. Please return home and try again.'
      }
    },

    getEveAuth(code){
      axios.get('https://eveledger.herokuapp.com/eveAuth/' + code).then(response => {
        window.sessionStorage.setItem('access_token', response.data.access_token)
        window.sessionStorage.setItem('refresh_token', response.data.refresh_token)
        window.sessionStorage.setItem('expires_token', response.data.expires_in)
        // Once authed, redirect the user to the dashboard.
        this.$router.push("dashboard")
      }).catch(error => {
        console.log(error)
      });
    },
  }
}
</script>
