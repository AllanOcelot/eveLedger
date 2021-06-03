<template>
  <div>
      <Header />
      <div class="hero-container">
        <div class="content-container">
          <h1>Evetricity</h1>
          <h2>Make corp management fun again</h2>
          <LoginButton />
        </div>
      </div>
      <div class="feature-container">
        <div class="feature-list">
          <div class="feature">
            <div class="icon-block">
              <i class="fas fa-lock"></i>
            </div>
            <p class="title">Login With Eve:</p>
            <p class="main">We use the EVE Api to carry out all our actions, one less password to remember!</p>
          </div>
          <div class="feature">
            <div class="icon-block">
              <i class="fas fa-wrench"></i>
            </div>
            <p class="title">Ship Fitting:</p>
            <p class="main">Share fits, allow users to copy them directly to game. Keep them organised and easily updated.</p>
          </div>
          <div class="feature">
            <div class="icon-block">
              <i class="fas fa-globe-americas"></i>
            </div>
            <p class="title">Structures &amp; Systems :</p>
            <p class="main">List Structures and Systems easily. View their latest information and add your own notes to each item.</p>
          </div>
          <div class="feature">
            <div class="icon-block">
              <i class="fas fa-folder-open"></i>
            </div>
            <p class="title">External Informaiton Sources:</p>
            <p class="main">Sort external tools, documents and communications information. In one place.</p>
          </div>
          <div class="feature">
            <div class="icon-block">
              <i class="fas fa-medal"></i>
            </div>
            <p class="title">Ranks &amp; Awards</p>
            <p class="main">Show a detailed corp heiarachy of members. List all your corp's awards, with their criteria for awarding.</p>
          </div>
          <div class="feature">
            <div class="icon-block">
              <i class="fas fa-skull"></i>
            </div>
            <p class="title">ZKillBoard Listings:</p>
            <p class="main">Quickly view recent Corp &amp; Alliance killmails, powered by <a href="https://zkillboard.com/" target="_blank">ZKillBoard's</a> API!</p>
          </div>
          <div class="feature">
            <div class="icon-block">
              <i class="fas fa-shopping-basket"></i>
            </div>
            <p class="title">BuyBack Program Listings:</p>
            <p class="main">Add products to your buyback program, compare your price with the latest market data from <a href="https://evemarketer.com/">Eve Marketer</a></p>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import LoginButton from '@/components/LoginButton.vue'

export default {
  name: 'Home',
  data () {
    return {
      loginURL: '',
    }
  },
  components : {
    Header,
    LoginButton
  },
  mounted () {
  },
  methods: {

  }
}
</script>
<style scoped lang="scss">
  .hero-container {
    margin-top: 50px;
    background-image: url('../assets/images/bg1.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    box-shadow: 0 5px 10px 5px rgb(0 0 0 / 25%);

    .content-container {
      width: 100%;
      height: auto;
      text-align: center;
      background: rgba(0, 0, 0, 0.65);
      color: #fff;
      min-height: 300px;
      align-items: center;
      justify-content: center;
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid rgba(255,255,255,0.3);

      h1 {
        font-size: 50px;
        font-weight: bold;
        pointer-events: none;
        margin-bottom: 0;
      }
      h2 {
        font-size: 20px;
        pointer-events: none;
        margin-bottom: 20px;
      }
      a {
        width: 220px !important;
        height: auto;
      }
    }
  }

  .feature-container {
    width: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
    padding: 100px 0;
    background: #0a0a13;
    background-size: 20px 20px;
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);


    .feature-list {
      max-width: 80%;
      .feature {
        float: left;
        background: #0c181f;
        color: #fff;
        margin: 0 auto;
        width: 30%;
        margin: 0 1.5% 60px 1.5%;
        height: 200px;
        border: 1px solid rgb(123 207 236 / 31%);
        position: relative;
        padding-top: 60px;
        
        .icon-block {
          position: absolute;
          top: -35px;
          left: calc(50% - 35px);
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          cursor: default;
          font-size: 26px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          margin-bottom: 10px;
          background: #172e3c;
          border-radius: 50%;
        }

        p.title {
          font-size: 18px;
          color: #fff;
          margin: 0 0 10px 0;
          padding:0 20px;
          cursor: default;
        }
        p.main {
          padding: 0 20px;
          font-size: 16px;
          line-height: 26px;
          cursor: default;
        }
        p a {
          color: #fff !important;
          text-decoration: underline;
        }
      }
    }
  }

  
</style>