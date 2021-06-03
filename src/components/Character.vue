<template>
  <div class="character-box">
      <div class="pre-loader" v-if="loading === true">
        <i class="fas fa-circle-notch fa-spin"></i>
      </div>
      <div v-if="character.portrait != ''" class="portrait">
        <img class="corp" v-if="character.corp_logo != ''" :src="character.corp_logo" alt="Your Corporation Logo">
        <img class="alliance" v-if="character.alliance_logo != ''" :src="character.alliance_logo" alt="Your Alliance Logo">
        <img :src="character.portrait" :alt="'The portrait of ' + character.name">
      </div>
      <p class="name" v-if="character.name && character.name > 1">
        {{character.name}}
        <small>
          {{character.security}}  
        </small>  
      </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Character',
  data () {
    return {
      loading: true,
      character: {
        name: '',
        portrait: '',
        alliance_id: '',
        alliance_logo: '',
        corp_id: '',
        corp_logo: '',
        security: '',
      }
    }
  },
  props: ['id'],
  async mounted () {
    if(this.character.name === ''){
      await this.getCharDetails(this.id)
    }

    if(this.character.portrait === ''){
      await this.getCharPortrait(this.id)
    }

    // If user belongs to a corp.
    if(this.character.corp_id !== ''){
      await this.getCorpImage(this.character.corp_id)
    }

    // If user belongs to an alliance.
    if(this.character.alliance_id !== ''){
      await this.getAllianceImage(this.character.corp_id)
    }


  },
  methods : {

    // Char basic info. 
    async getCharDetails(charID){
      await axios.get('https://esi.evetech.net/latest/characters/'+ charID +'/?datasource=tranquility').then(response => {
        this.loading = false;
        this.character.name = response.data.name;
        this.character.alliance_id = response.data.alliance_id;
        this.character.corp_id = response.data.corporation_id;
        let security = response.data.security_status.toFixed(1)
        this.character.security = security;
        return true;
      }).catch(error => {
        console.log(error)
        return false;
      });
    },

    async getCorpImage(corpID){
      await axios.get('https://esi.evetech.net/latest/corporations/'+ corpID +'/icons/?datasource=tranquility').then(response => {
        this.character.corp_logo = response.data.px256x256;
        return true;
      }).catch(error => {
        console.log(error)
        return false;
      });
    },

    async getAllianceImage(allianceID){
      await axios.get('https://esi.evetech.net/latest/alliances/'+ allianceID +'/icons/?datasource=tranquility').then(response => {
        this.character.alliance_logo = response.data.px128x128;
        return true;
      }).catch(error => {
        console.log(error)
        return false;
      });
    },

    async getCharPortrait(charID){
      await axios.get('https://esi.evetech.net/latest/characters/'+ charID +'/portrait/?datasource=tranquility').then(response => {
        this.character.portrait = response.data.px256x256;
        return true;
      }).catch(error => {
        console.log(error)
        return false;
      });
    }
  }
}
</script>


<style lang="scss" scoped>
  .character-box {
    width: 100%;
    height: auto;
    position: relative;
    height: 210px;

    .pre-loader {
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      width: 100%;
      align-items: center;
      display: flex;
      flex: 1 auto;
      align-items: center;
      justify-content: center;
      font-size: 32px;
    }

    .portrait {
      width: 100%;
      height: 100%;
      img {
        display: block;
        width: 100%;
      }

      .corp,
      .alliance {
        position: absolute;
        top: 0;
        left: 0;
        width: 50px;
        border-right: 1px solid rgba(255,255,255,0.4);
        border-bottom: 1px solid rgba(255,255,255,0.4);
        border-radius: 0 0 4px 0;
      }
      .alliance {
        right: 0;
        left: auto;
        border-right: none;
        border-left: 1px solid rgba(255,255,255,0.4);
        border-radius: 0 0 0 4px;
      }
    }
    .name {
      opacity: 0.7;
      background:rgba(0,0,0,0.5);
      width: 100%;
      position: absolute;
      bottom: 0;
      padding: 5px;
      text-align: center;
      cursor: default;
    }
  }

</style>
