<template>
  <div>
    <Header />
    <div class="faq-container">
      <div class="intro">
        <h1>FAQ:</h1>
        <p>Please find below a collection of commonly asked questions and answers about Evetricity.</p>
        <p>If there is a question you have, you can always <a href="help@evetricity.com">Reach Out To Me</a></p>
      </div>
      <div class="main">
        <div class="faq-item">
          <p class="question">What is Evetricity?</p>
          <div class="answer">
            <p>Evetricity is a Corp information board system.</p>
            <p>It's primary goal is to allow a CEO of any sized company to make a 'one stop' place for corp based information.</p>
            <p>It's secondary goal is to help make the onboarding process for new corp members extremely easy, by keeping key information / resources in one easy to use website.</p>
          </div>
        </div>
        <div class="faq-item">
          <p class="question">What Data Do you Store?</p>
          <div class="answer">
            <p> We do not store any Character information from you - other than CorpID, CharID and other related things. </p>
            <p> We do not have access to your private information or contact details. </p>
            <p> There is no storing of passwords. Authentication is done via the Eve API login process. </p>
          </div>
        </div>
        <div class="faq-item">
          <p class="question">When will I get X feature / fix?</p>
            <div class="answer">
            <p>The best place to see what I am currently working on is over at <router-link to="/roadmap">The Roadmap</router-link>.</p>
            <p>This is a solo project, done for fun and to learn some new tech for my personal career. That being said, I do try to keep my Sunday's clear to work on this project.</p>
          </div>
        </div>
        <div class="faq-item">
          <p class="question">I spotted a bug, what do I do?</p>
          <div class="answer">
            <p>The absolute best thing you can do to help me stay sane is submit a bug via <a href="https://github.com/AllanOcelot/evetricity/issues">Github.</a></p>
            <p>I understand it can be a pain to create an account etc, but it really helps to keep things organised.</p>
          </div>
        </div>
        <div class="faq-item">
          <p class="question">I can code, can I help?</p>
          <div class="answer">
            <p>The frontend of this website is open source and can be forked/cloned from <a href="https://github.com/AllanOcelot/evetricity/issues">Github</a>.</p>
            <p>The server is closed sourced, however I am fully up to work with a security focused developer to help keep security .... secure?</p>
          </div>
        </div>
        <div class="faq-item">
          <p class="question">Are you an Eve Online Partner?</p>
          <div class="answer">
            <p>No, not yet, but that's the goal!</p>
            <p>We need 1000+ active users per month to hit this amazing milestone, so please, encourage other Eve players to check us out!.</p>
          </div>
        </div>
        <div class="faq-item">
          <p class="question">I want to donate! Let me!</p>
          <div class="answer">
            <p>I really appreciate it, however, I'd love if instead you just picked a charity and sent them money.</p>
            <p>I do this because I love eve and just wanted to give a tiny thing back to the community.</p>
          </div>
        </div>
      </div>
    </div>   
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {
  name: 'FAW',
  data () {
    return {

    }
  },
  components : {
    Header,
  },
  mounted () {
  },
  methods: {

  }
}
</script>
<style scoped lang="scss">
  .faq-container {
    width: 100%;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    height:auto;
    margin-bottom: auto;
    flex: 1 auto;
    background: #0a0a13;
    background-size: 20px 20px;
    padding-top: 50px;
    overflow: hidden;
    clear: both;
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
    color: #f1f1f1;
    a {
      color: #5ac9e2 !important;
    }


    .intro {
      margin-bottom: 40px;
      background: rgba(0,0,0,0.5);
      width: 100%;
      padding: 100px 0;
      h1 {
        font-size: 50px;
      }
      p {

        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }

    .main {
      max-width: 80%;
      margin: 0 auto;
      .faq-item {
        display: block;
        margin: 0;
        cursor: default;
        text-align: left;
        margin-bottom: 40px;

        p.question {
          display: block;
          font-size: 24px;
          margin: 0;
          padding: 10px 20px;
          background: rgb(0 54 152 / 75%);
        }

        .answer {
          background: rgba(0,0,0,0.5);
          padding: 20px;
        }

        p {
          margin: 0 0 5px 0;
        }

        &:last-of-type {
          margin-bottom: 80px;
        }
      }
    }

  }
  
</style>