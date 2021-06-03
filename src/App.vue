<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  mounted () {

  }
}
</script>


<style lang="scss">
html, 
body {
  height: 100%;
  margin: 0;
}

#app {
  display: flex;
  flex: 1;
  flex-direction: column;
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  height: 100%;
}

a {
  color: #dddbe08c !important;
  cursor: pointer;
  text-decoration: none;
  text-shadow: 0px 0px 5px rgb(255 255 255 / 50%);
  transition: all 0.2s;
  transition-delay: 0.1s;
  &:hover {
    transition: all 0.2s;
    color: #ffffff !important;
    text-shadow: 0px 0px 5px rgb(255 255 255 / 100%);
  }
}

</style>
