<template>
  <div class="dashboard-container">
      <div class="sidebar">
        <div class="logged-in-user">
          <Character v-if="currentChar != ''" :id="currentChar" />
        </div>

        <div class="tab-container">
          <div class="tab-item" @click="changeTab('Home')" 
               :class="{'active' : currentTab === 'Home'}">
            Home
          </div>
          <div class="tab-item" @click="changeTab('Assignments')"
               :class="{'active' : currentTab === 'Assignments'}">
            Assignments
          </div>
          <div class="tab-item" @click="changeTab('Prices')"
              :class="{'active' : currentTab === 'Prices'}">
            Buyback
          </div>
          <div class="tab-item" @click="changeTab('Settings')"
              :class="{'active' : currentTab === 'Settings'}">
            Settings
          </div>
          <div class="tab-item" @click="logOut()">
            Log Out
          </div>
        </div>


        <div class="footnotes">
          <SlideYDownTransition :duration="600">
            <div class="is-ceo-badge" v-if="isCEO === true">
              <i class="fas fa-crown"></i> CEO, can edit data.
            </div>
          </SlideYDownTransition>
          <SlideYDownTransition :duration="600" :delay="400">
            <div class="server-information" v-if="server.loaded === true">
              <div class="server-status">
                <span class="status-dot" :class="{'online': server.online === true}"></span> {{server.name}} 
                <br>
                {{server.playercount}} Online.
              </div>
            </div>
          </SlideYDownTransition>
            <p>This project is maintained by Allan Antollare. For support or suggestions please <a href="">email me.</a></p>
        </div>  
      </div>
      <!-- End of sidebar -->

      <div class="main">
        <transition name="fade"  mode="out-in">
          <div class="view" v-if="currentTab === 'Home'" key="1">
            <div class="information-section">
              <h2>Welcome:</h2>
              <p>The homepage allows you to quickly get an overview on the current state of the corporation.</p>
            </div>
          </div>

          <div class="view" v-if="currentTab === 'Assignments'" key="2">
            <div class="information-section">
              <h2>Objectives:</h2>
              <p>Our current objective is to ramp up production of thpoons to we can continue to make war with corporation x.</p>
            </div>
          </div>

          <div class="view" v-if="currentTab === 'Prices'" key="3">
            <BuyBackTable v-bind:isCEO="isCEO" />
          </div>
        </transition>
      </div>
  </div>
</template>




<script>
import {SlideYDownTransition} from 'vue2-transitions'
import axios from 'axios';
import Character from '@/components/Character.vue'
import BuyBackTable from '@/components/BuyBackTable.vue'


export default {
  name: 'Dashboard',
  components: {
    SlideYDownTransition,
    Character,
    BuyBackTable,
  },
  data () {
    return {
      server : {
        loaded: false,
        name: 'Tranquility',
        online: false,
        playercount: 0,
      },
      currentTab: 'Home',
      currentChar: '',
      marketPrices: '',
      isCEO: false,
    }
  },
  async mounted () {
    // If user has a tab in their session history, load that one. Else revert to home.
    if(window.sessionStorage.getItem('current_tab')){
      this.currentTab = window.sessionStorage.getItem('current_tab')
    }else {
      this.currentTab = 'Home'
    }

    // Get the server status for eve. 
    axios.get('http://127.0.0.1:8000/server/').then(response => {
      this.server.loaded = true;
      this.server.online = true;
      this.server.playercount = response.data.players;
    }).catch(error => {
      this.server.loaded = true;
      this.server.name = 'error'
      this.server.online = false;
      console.log('There was an error getting the EVE api server.' + error);
    })



    // Then, refresh the access token to access the eve api.
    await this.refreshToken(sessionStorage.getItem('refresh_token'))
  
    // The current character is the one who is logged into the dashboard. 
    await this.getChar(sessionStorage.getItem('access_token'))

    // Get the current corp of the user.
    await this.getCharCorp(sessionStorage.getItem('current_CharacterID'))

    // Get the corp general information 
    await this.getCorpInfo(sessionStorage.getItem('current_CharacterCorp'))

    // Check if the user is the CEO of the current corp.
    await this.checkCorpCEO(sessionStorage.getItem('current_CharacterCorp'))

  },
  methods: {
    changeTab(tab){
      this.currentTab = tab;
      window.sessionStorage.setItem('current_tab', tab)
    },

    logOut(){
      window.sessionStorage.setItem('access_token', '')
      window.sessionStorage.setItem('refresh_token', '')
      window.sessionStorage.setItem('expires_token', '')
      window.sessionStorage.setItem('current_tab', '')
      this.$router.push("/")
    },



    // Only needed to get the LOGGED IN character ID.
    async getChar(code){
      await axios.get('http://127.0.0.1:8000/getChar/' + code).then(response => {
        window.sessionStorage.setItem('current_CharacterID', response.data.CharacterID)
        window.sessionStorage.setItem('current_CharacterName', response.data.CharacterName)
        this.currentChar = response.data.CharacterID;
        return true;
      }).catch(error => {
        console.log(error)
      });
    },

    // Char basic info. 
    async getCharCorp(charID){
      await axios.get('https://esi.evetech.net/latest/characters/'+ charID +'/?datasource=tranquility').then(response => {
        window.sessionStorage.setItem('current_CharacterCorp', response.data.corporation_id) 
        return true
      }).catch(error => {
        console.log(error)
        return false
      });
    },

    // Get general information about the corp
    async getCorpInfo(corpID){
      await axios.get('https://esi.evetech.net/latest/corporations/'+ corpID +'/?datasource=tranquility').then(response => {
        let dataObject = response.data;
        axios.post('http://127.0.0.1:8000/fb/init/corp/' + corpID,{ data: dataObject });
        return true;
      }).catch(error => {
        console.log(error)
        return false;
      });
    },

    // Check if the user is the CEO of the corp he/she is currently in
    async checkCorpCEO(corpID){
      await axios.get('https://esi.evetech.net/latest/corporations/'+ corpID +'/?datasource=tranquility').then(response => {
        if(response.data.ceo_id == sessionStorage.getItem('current_CharacterID')){
          this.isCEO = true;
        } else {
          this.isCEO = false;
        }
        return true;
      }).catch(error => {
        console.log(error)
        return false;
      });
    },

    async getCorpRoles(corpID){
      await axios.get('http://127.0.0.1:8000/getCorpRoles/' + corpID).then(response => {
        console.log(response)
        return true;
      }).catch(error => {
        console.log(error)
      });
    },


    async refreshToken(code){
      console.log('testing')
      console.log(code)
      console.log(encodeURIComponent(code))

      await axios.get('http://127.0.0.1:8000/eveRefresh/' + encodeURIComponent(code)).then(response => {
        console.log('Refresh token completed, setting values')
        window.sessionStorage.setItem('access_token', response.data.access_token)
        window.sessionStorage.setItem('refresh_token', response.data.refresh_token)
        return true;
      }).catch(error => {
        console.log('Failed to get a valid refresh token.')
        console.log(error)
      });
    },
  }
}
</script>

<style lang="scss">
  // Transitons 
  .fade-enter-active, .fade-leave-active {
      transition: opacity 1s;
      transition-delay: 2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
      opacity: 0;
      transition: 1s;
  }
  // Transition End 

  .dashboard-container {
    display: flex;
    background: #e6e6e6;
    height: 100%;
  }
  .sidebar {
    min-width: 210px;
    max-width: 210px;
    height: 100%;
    background: #05050c;
    color: #fff;
    position: relative;

    .tab-container {
      .tab-item{
        width: 100%;
        border-bottom: 1px solid rgba(255,255,255,0.5);
        padding: 10px;
        text-align: left;
        opacity: 0.6;
        cursor: pointer;
        position: relative;
        padding-left: 35px;
        transition: all 0.3s;

        &:before {
          content: '';
          width: 20px;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background: #4040446b;
          border-right: 1px solid rgba(0,0,0,0.5);
        }
        &:after {
          content: '';
          width: 8px;
          height: 8px;
          position: absolute;
          top: calc(50% - 4px);
          border: 1px solid rgba(255,255,255,0.5);
          left: 5px;
          border-radius: 50%;
          background: #27276deb;
          transition-delay: 0.2s;
          transition: all 0.2s;
        }
        &.active,
        &:hover {
          opacity: 1;
          transition: all 0.3s;
          border-color: rgba(255,255,255,0.3);

          &:after {
            background: #4dd8b1;
            box-shadow: 0 0 2px 2px #4d4dd4;
            transition: all 0.3s;
          }
        }
      }
    }

    .footnotes {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 10px 0 10px 0;
      font-size: 14px;
      color: #797979;
      border-top: 1px solid rgba(255,255,255,0.2);
      a {
        color: #797979;
        font-weight: 600;
        text-decoration: underline;
        &:hover {
          color: #f1f1f1;
        }
      }
      p {
        padding: 10px;
      }

      .is-ceo-badge,
      .server-information {
        display: block;
        width: 100%;
        border-bottom: 1px solid rgba(255,255,255,0.2);
        padding-bottom: 10px;
        margin-bottom: 10px;
        cursor: default;

        .status-dot {
          display:inline-block;
          border-radius: 50%;
          background: #a71e1e;
          box-shadow: 0 0 2px 2px #7e1414;
          width: 7px;
          height: 7px;
          margin-right: 5px;
          top: -1px;
          position: relative;
          transition: all 0.2s;
          &.online {
            background: #26e236;
            box-shadow: 0 0 2px 2px #147e34;            
          }
        }

        i {
          font-size: 12px;
          top: -1px;
          position: relative;
          margin-right: 5px;
        }
      }
    }
  }
  .dashboard-container .main {
    height: 100%;
    width: 100%;
    background: #0a0a13;
    color: #f1f1f1;
    background-size: 20px 20px;
    border-left: 1px solid #ffffff3d;
    box-sizing: border-box;
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);


    // Info block at the top of each view.
    .information-section {
      background: #050810c4;
      color: #dcdcdc;
      text-align: left;
      padding: 10px 20px;
      cursor: default;
      margin-bottom: 20px;
      height: 120px;
      overflow: auto;
      border-bottom: 1px solid rgba(255,255,255,0.3);
      h2 {
        font-size: 1.5em;
      }
      .pre-loader {
        display: flex;
        height: 100%;
        width: 100%;
        font-size: 30px;
        opacity: 0.8;
        justify-content: center;
        align-items: center;
      }
    }

    .view {
      display: block;
      height: 100%;
      position: relative;

      .add-new-item {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #f1f1f1;
        padding: 20px;
        box-shadow: 0 5px 30px 12px rgb(0 0 0 / 90%);
      }
    }

    .add-new-item-action {
      width: 100%;
      padding: 5px 0px;
      text-align: right;
    }

    // Action is a button essentially 
    .action {
      display: inline-block;
      margin: 0;
      padding: 10px 20px;
      background: #052233;
      width: auto;
      border: 1px solid rgba(255,255,255,0.5);
      opacity: 0.85;
      cursor: pointer;
      transition: all 0.2s;
      transition-delay: 0.05s;
      &:hover {
        opacity: 1;
        background: #0d3e5a;
        box-shadow: 0 0px 10px 3px rgb(255 255 255 / 40%);
        border: 1px solid rgba(255,255,255,0.8);
        transition: all 0.2s;
      }
    }


  }
</style>
