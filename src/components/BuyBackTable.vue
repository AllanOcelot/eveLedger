<template>
  <div class="buyback-table-container">
    <div class="information-section">
      <div v-if="loadingTitle === false">
        <h2>Information:</h2>
        {{Title}}
      </div>
      <div class="pre-loader" v-else>
        <i class="fas fa-circle-notch fa-spin"></i>
      </div>
    </div>

    <div class="item-table-wrapper">
      <div class="item-table">
        <div class="head">
          <div class="item icon-cont">
            Image:
          </div>
          <div class="item">
            Name:
          </div>
          <div class="item">
            Quantity:
          </div>
          <div class="item">
            Notes:
          </div>
          <div class="item">
            Market Price:
          </div>
          <div class="item">
            Corp Price:
          </div>
        </div>
        <div class="data" v-if="loadBuyBackItemsComplete === true && buyBackData">
          <div v-if="buyBackData.length === 0">
            <p class="no-items">There are currently no buyback items configured for this corp.</p>
          </div>
          <div class="row" v-else v-for="item in buyBackData" :key="item.name">
            <div class="item icon-cont">
              <div class="icon">
                <img :src="item.icon" alt="">
              </div>
            </div>
            <div class="item">
              {{item.name}}
            </div>
            <div class="item">
              {{item.quantity}}
            </div>
            <div class="item">
              {{item.notes}}
            </div>
            <div class="item">
              {{item.marketPrice}}
            </div>
            <div class="item">
              {{item.corpPrice}}
            </div>
          </div>
        </div>
        <div class="pre-loader" v-if="loadBuyBackItemsComplete === false">
          <i class="fas fa-circle-notch fa-spin"></i>
        </div>
      </div>
    </div>

    <div class="add-new-item-action" v-if="isCEO === true && loadBuyBackItemsComplete === true">
      <div class="action" @click="displayModal = true">
        Add New Item
      </div>
    </div>

    <!-- Tools to allow the CEO to add new buyback items --->
    <ZoomYTransition :duration="550">
      <div class="modal" v-if="isCEO === true && displayModal === true">

        <div class="close-icon" @click="closeAndClear()">
          <i class="fas fa-times"></i>
        </div>

        <div class="modal-main-content">

          <span class="error-message" v-if="error.length > 1">
            <i class="fas fa-exclamation-triangle"></i>
             {{error}}
            <i class="fas fa-exclamation-triangle"></i>
          </span>

          <div class="input-container">
            <div class="loading" v-if="loading === true">
              <i class="fas fa-circle-notch fa-spin"></i>
            </div>

            <div class="stage one" v-if="loading == false && stage === 1">
              <label for="">Item Name:</label>
              <input type="text" v-model="itemSearchString" placeholder="Search For Item">
              <div class="action" @click="search()">
                <i class="fas fa-search"></i>
              </div>
            </div>

            <div class="stage two" v-if="loading == false && stage === 2 && searchResultItems.length > 0">
              <label for="">Select Item ({{searchResultItems.length}}):</label>
              <div class="item-selection-container">
                <div class="item" v-for="(item, index) in searchResultItems" :key="item.type_id">
                  <div class="icon">
                    <img v-if="item.icon" :src="item.icon" :alt="item.name">
                  </div>
                  <div class="name">
                    {{item.name}}
                  </div>
                  <div class="description">
                    {{item.description}}
                  </div>
                  <div class="action-container">
                    <div class="action" @click="selectItem(index)">
                      Select
                    </div>
                  </div>
                </div>
              </div>
              <div class="action-bar-container">
                <div class="action left" @click="stage = 1">
                  Go Back
                </div>
              </div>
            </div>

            <div class="stage three" v-if="loading == false && stage === 3 && selectedItem">
              <label for="">Market Details:
                <small>Market data provided by <a href="http://www.evemarketer.com" target="_blank">Eve Marketer</a>.</small>
              </label>
              <div class="item-selection-container">
                <div class="item header">
                  <div class="icon">&nbsp;</div>
                  <div class="name">&nbsp;</div>
                  <div class="price">Sell Price: (min)</div>
                  <div class="price">Sell Price: (avg)</div>
                  <div class="price">Sell Price: (max)</div>
                  <div class="price">Volume</div>
                </div>
                <div class="item">
                  <div class="icon">
                    <img v-if="selectedItem.icon" :src="selectedItem.icon" :alt="selectedItem.name">
                  </div>
                  <div class="name">
                    {{selectedItem.name}}
                  </div>
                  <div class="price">
                    {{selectedItem.marketData.min}}
                  </div>
                  <div class="price">
                    {{selectedItem.marketData.avg}}
                  </div>
                  <div class="price">
                    {{selectedItem.marketData.max}}
                  </div>
                  <div class="price">
                    {{selectedItem.marketData.vol}}
                  </div>
                </div>
              </div>

              <div class="buyback-controls">
                <label for="" class="main-sub">Configure BuyBack:</label>
                <div class="input-container">
                  <label for="">Quantity:</label>
                  <input type="number" v-model="buyOrderDetails.quantity">
                </div>
                <div class="input-container">
                  <label for="">Price Paid:</label>
                  <input type="text" v-model="buyOrderDetails.corpPrice">
                </div>
                <div class="input-container">
                  <label for="">Urgency:</label>
                  <select v-model="buyOrderDetails.urgency">
                    <option default>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div class="input-container notes">
                  <label for="">Notes:</label>
                  <input type="text" v-model="buyOrderDetails.notes" placeholder="e.g Drop off at Jita">
                </div>
              </div>

              <div class="market-order-settings">
                <p>I would like to create a new buy back listing for {{buyOrderDetails.quantity}} of {{buyOrderDetails.name}}(s),
                   I will pay {{buyOrderDetails.corpPrice}} per item, it is {{buyOrderDetails.urgency}} urgency.</p>
              </div>

              <div class="action-bar-container">
                <div class="action left" @click="stage = 2">
                  Go Back
                </div>
                <div class="action" @click="addBuyBackItem()">
                  Create New Listing
                </div>
              </div>
            </div>
            <div class="stage four" v-if="loading == false && stage === 4">
              <p>Connecting to the datavault</p>
              <i class="fas fa-circle-notch fa-spin"></i>
            </div>
          </div>
        </div>
      </div>
    </ZoomYTransition>
  </div>
</template>

<script>
import axios from 'axios';
import {ZoomYTransition} from 'vue2-transitions'
import { exampleMixin } from '../mixins.js'

export default {
  name: 'BuyBackTable',
  data () {
    return {
      loadingTitle: true,
      Title: '',
      loadBuyBackItemsComplete: false,
      itemSearchString: '',
      displayModal: false,
      error: '',
      loading: false,
      stage: 1,
      buyBackData: [],
      searchResultIDs: [],
      searchResultItems: [],
      selectedItem: {},
      buyOrderDetails: {
        type_id: '',
        name: '',
        icon: '',
        quantity: 0,
        corpPrice: 0,
        urgency: ['low', 'Medium','High'],
        notes: '',
      },
    }
  },
  components : {
    ZoomYTransition,
  },
  props: ['isCEO'],
  mounted () {
    // When mounted, fetch the buyback details for the corp.
    this.getCorpBuyBackDetails(sessionStorage.getItem('current_CharacterCorp'),sessionStorage.getItem('current_CharacterID'));
  },
  mixins: [exampleMixin],
  methods : {
    clearData(){
      this.itemSearchString = ''
      this.error = ''
      this.loading = false
      this.stage = 1
      this.searchResultIDs = []
      this.searchResultItems = []
      this.selectedItem = {}
      this.buyOrderDetails = {}
    },

    closeAndClear(){
      this.clearData()
      this.displayModal = false
    },

    async getCorpBuyBackDetails(corpID, charID){
      this.loadBuyBackItemsComplete = false;
      return await axios.get('https://eveledger.herokuapp.com/getBuyBack/' + corpID + '/' + charID).then(response => {
        this.closeAndClear()
        this.buyBackData = response.data;
        this.loadBuyBackItemsComplete = true;
      }).catch(error => {
        this.loadBuyBackItemsComplete = true;
        console.log(error);
        return false;
      })
    },

    addBuyBackItem(){
      this.stage = 4;
        axios.post('https://eveledger.herokuapp.com/addBuyBack/'+ sessionStorage.getItem('current_CharacterCorp') +'/' + sessionStorage.getItem('current_CharacterID'),
        { data: this.buyOrderDetails }).then(response => {
          setTimeout(_ => {
            console.log(_)
            this.getCorpBuyBackDetails(sessionStorage.getItem('current_CharacterCorp'),sessionStorage.getItem('current_CharacterID'))
          }, 1000)
        }).catch(error => {
          console.log(error)
        });
    },

    async search(){
      // We require the string to be over 6.
      if(this.itemSearchString.length < 4){
        this.clearData();
        this.error = 'Search cannot be less than 3 chars. Please aim for longer searches.'
        return;
      }

      // Clear the error and set loading to true.
      this.error = '';
      this.loading = true;

      // make a request to the search api for the search term.
      await axios.get('https://eveledger.herokuapp.com/search/' + encodeURI(this.itemSearchString)).then(response => {
        let results = response.data.inventory_type;
        // Loop over each item ID and look up the item.
        results.forEach((element, index) => {
          let isLastItem = false;
          if(index === results.length - 1){
            isLastItem = true;
          }
          this.getItemDetails(element, isLastItem);
        });
        this.stage = 2;
        this.loading = false;
        return true;
      }).catch(error => {
        console.log(error)
        this.clearData();
        this.error = 'There was an error with the Search API. Please try agian later.'
      });
    },

    async getItemDetails(itemID, isLastItem){
      await axios.get('https://eveledger.herokuapp.com/searchItem/' + itemID).then(response => {
        // only return items that have a description, or if their name contains 'SKIN'
        if(response.data.description != '' && response.data.description != null && !response.data.name.includes('SKIN')){
          let data = response.data;
              data.icon = 'https://images.evetech.net/types/' + itemID + '/icon'
          this.$set(this.searchResultItems, this.searchResultItems.length, response.data)

          // on the last item, sort the array. 
          if(isLastItem === true){
            let resultsArrayCopy = this.searchResultItems;
            resultsArrayCopy.sort((a, b) => a.name.localeCompare(b.name))
            this.searchResultItems = resultsArrayCopy;
          }
        }
        return response.data;
      }).catch(error => {
        console.log(error)
        return error;
      })
    },



    async selectItem(index) {
      var convert = require('xml-js');
      this.loading = true;
      this.selectedItem = this.searchResultItems[index];

      await axios.get('https://api.evemarketer.com/ec/marketstat?typeid=' + this.selectedItem.type_id).then(response => {
        let convertedResult     = convert.xml2js(response.data)
        let marketData          = convertedResult.elements[0].elements[0].elements[0].elements[1].elements

        let formattedData = {
          'vol' : marketData[0].elements[0].text,
          'avg'    : this.formatISK(marketData[1].elements[0].text),
          'med'    : this.formatISK(marketData[3].elements[0].text),
          'max'    : this.formatISK(marketData[5].elements[0].text),
          'min'    : this.formatISK(marketData[6].elements[0].text),
        }

        this.selectedItem.marketData = formattedData;
        
        // Configure the buyorder object
        this.buyOrderDetails.type_id     = this.selectedItem.type_id;
        this.buyOrderDetails.icon        = this.selectedItem.icon;
        this.buyOrderDetails.name        = this.selectedItem.name;
        this.buyOrderDetails.quantity    = 1;
        this.buyOrderDetails.urgency     = 'Low'
        this.buyOrderDetails.marketPrice = formattedData.avg;
        this.buyOrderDetails.corpPrice   = formattedData.avg;
        this.loading = false
        this.stage = 3
      }).catch(error => {
        console.log(error)
      })      
    },

    formatISK(input){
      let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      let result = formatter.format(input)
          result = result.substring(1) + 'ISK'
      return result
    }
  }
}
</script>


<style lang="scss" scoped>
  .buyback-table-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }
  .item-table-wrapper {
    display: flex;
    padding: 0 20px;
    margin: auto;
    width: 100%;
    flex: 1;
    height: auto;
    min-height: 0;
  }

  .item-table {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    overflow-y: auto;
    .head,
    .row {
      display: flex;
      width: 100%;
      justify-content: space-between;
      background: #1c243a;
      border-bottom: 1px solid #ffffff3d;
      .item {
        display: inline-block;
        display: flex;
        width: auto;
        flex: 1;
        font-weight: bold;
        margin: auto;
        padding: 10px 20px;
        text-align: left;
        border-right: 1px solid rgba(255,255,255,0.05);
        &:first-of-type {
          margin-left: 0;
        }
        &:last-of-type {
          margin-right: 0;
          border-right: none;
        }
        &.icon-cont {
          max-width: 100px;
        }
      }
    }
    .data {
      display: block;

      .no-items {
        width: 100%; 
        padding: 40px 0;
      }

      .row {
        background: rgba(30,30,30,.5);
        border-bottom: none;
        transition-delay: 0.15s;
        transition: all 0.2s;
        &:nth-child(odd){
          background: #212127;
        }
        .item {
          margin: 0;
          font-weight: normal;
          font-size: 0.8em;
          padding-top: 5px;
          padding-bottom: 5px;
          .icon {
            width: 50px;
            margin: 0 auto;
            height: 50px;
            background: #000;
            border: 1px solid rgba(255,255,255,0.5);
          }
        }
        &:hover {
          background: #0c0e1ba6;
          transition: all 0.2s;
        }
      }
    }
    .pre-loader {
      display: block;
      font-size: 30px;
      color: #fff;
      opacity: 0.8;
      text-align: center;
      width: 100%;
      padding: 40px 0;
    }
  }

  .add-new-item-action {
    margin: 20px 0;
    display: flex;
    min-height: 48px;
    justify-content: flex-end;
    padding: 0 20px !important;
  }

  .modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    empty-cells: ff;
    height: 100%;
    background: rgba(0,0,0,0.92);
    z-index: 100;

    .close-icon{
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
      opacity: 0.8;
      font-size: 26px;
      transition: all 0.2s;
      &:hover {
        opacity: 1;
      }
    }

    .modal-main-content {
      padding: 20px;
      background: #2b2b33;
      width: 90%;
      text-align: left;

      // error message display 
      .error-message {
        display: block;
        width: 100%;
        background: #6d1a1a;
        padding: 10px;
        text-align: center;
        margin-bottom: 10px;
        cursor: default;
        i {
          margin: 0 10px;
        }
      }

      .loading {
        font-size: 30px;
        padding: 20px 0;
        width: 100%;
        text-align: center;
      }

      // Stages styling 
      .stage {
        .action-bar-container {
          display: block;
          position: relative;
          width: 100%;
          height: 39px;
          margin-top: 20px;

          .left {
            right: auto !important;
            left: 0;
          }
        }

        &.one {
          margin-bottom: 20px;
        }
        &.two,
        &.three {
          .item-selection-container {
            max-height: 500px;
            overflow: auto;
            padding-bottom: 10px;
            background: #05050c;

            .item {
              display: flex;
              width: 100%;
              flex: 1;
              align-items: normal;
              padding-bottom: 5px;
              margin-bottom: 5px;
              border-bottom: 1px solid rgba(255,255,255,0.5);
              .icon {
                width: 80px;
                height: 80px;
                min-width: 80px;
                position: relative;
                img {
                  position: absolute;
                  margin: 0 auto;
                  width: 60px;
                  height: 60px;
                  top: 10px;
                  left: 10px;
                }
              }
              .name {
                display: flex;
                width: 20%;
                font-size: 1em;
                min-width: 15%;
                padding-top: 5px;
                padding-right: 10px;
                align-items: center;
                border-right: 1px solid rgba(255,255,255,0.2);
              }
              .description {
                display: flex;
                flex: 1 auto;
                max-height: 80px;
                padding: 5px 5px 5px 10px;
                overflow: auto;
                text-overflow: ellipsis;
                width: 100%;
              }
              .action-container {
                display: flex;
                position: relative;
                min-width: 120px;
                align-items: center;
                .action {
                  top: calc(50% - 16px);
                  bottom: auto;
                  right: 15px;
                }
              }

              &:last-of-type {
                margin-bottom: 0;
                padding-bottom: 0;
                border-bottom: 0;
              }
            }
          }
        }
        &.three {
          label {
            small {
              float: right;
              text-align: right;
              a{ 
                color: #fff !important;
                opacity: 0.9;
              }
            }
          }
          .item-selection-container {
            .item.header {
              .icon {
                height: 0;
              }
            }
            .item {
              .name {
                align-items: center;
              }
              .price {
                display: flex;
                padding: 10px 5px;
                width: 100%;
                text-align: left;
                align-items: center;
                justify-content: center;
                &.avg {
                  background: rgba(255,255,255,0.5);
                }
              }
            }
          }

          .buyback-controls {
            background: rgba(255,255,255,0.05);
            padding: 20px;
            margin-bottom: 20px;

            .main-sub {
              font-weight: 600;
              margin: 0 0 5px 0;
              padding: 0 20px;
            }
            .input-container {
              display: inline-block;
              width: 33.3%;
              padding: 0 20px;
              select {
                width: 100%;
                padding: 10px 20px;
                font-size: 16px;
                border: none;
                outline: none;
              }
              &.notes {
                margin-top: 10px;
                width: 100%;
              }
            }
          }

          .market-order-settings {
            width: 100%;
            padding: 10px;
            background: #fff;
            margin-bottom: 20px;
            text-align: center;
            cursor: default;
            color: #000;
          }
        }
        &.four {
          p {
            width: 100%;
            font-size: 20px;
            font-weight: 600;
            text-align: center;
            margin-bottom: 20px;
          }
          i {
            font-size: 32px;
            text-align: center;
            width: 100%;
            margin-bottom: 20px;
          }
        }
      }

      .input-container {
        display: block;
        width: 100%;
        position: relative;
        label {
          font-size: 18px;
          display: block;
          text-align: left;
          margin: 0 0 5px 0;
        }
        input {
          padding: 10px 20px;
          font-size: 16px;
          width: 100%;
          border: none;
          transition-delay: box-shadow 0.1s;
        }
        input:focus, textarea:focus, select:focus{
            outline: none;
            box-shadow: 0 0 5px 2px #4987ac; 
            transition: box-shadow 0.2s;
        }
        .action {
          position: absolute;
          bottom: 1px;
          right: 1px;
          padding: 6px 20px;
        }
      }
    }
  }
</style>
