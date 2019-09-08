<template>
  <div class="factory">
    <div>Je suis une factory et j'ai {{ nbCookies }} cookie<span v-if="nbCookies > 1">s</span></div>
    <div>Je produis {{ cookiesProducedPerSecond }} cookie par seconde</div>
    <button v-if="money >= upgradePrice" @click="upgrade">Upgrade factory</button>
  </div>
</template>

<script>
export default {
  name: 'cookie-factory',

  props: [
    'money',
    'initDataFactory'
  ],

  data () {
    return {
      nbCookies: 0,
      produceCookiesTimerId: null,
      cookiesProducedPerSecond: 1,
      upgradePrice: 100,
    }
  },

  methods: {
    produceCookies () {
      this.produceCookiesTimerId = setInterval(() => { //arrow_function
        this.nbCookies += this.cookiesProducedPerSecond
        this.$emit('produceCookies', this.cookiesProducedPerSecond)
      }, 1000)
    },

    upgrade() {
      this.cookiesProducedPerSecond += 1
      this.$emit('spendMoney', this.upgradePrice)
    },

    dataToSave() {
      return {
        nbCookies: this.nbCookies,
        cookiesProducedPerSecond: this.cookiesProducedPerSecond,
      }
    },

    initProgression() {
      this.nbCookies = this.initDataFactory.nbCookies || this.nbCookies
      this.cookiesProducedPerSecond = this.initDataFactory.cookiesProducedPerSecond || this.cookiesProducedPerSecond
    },
  },

  mounted () {
    this.initProgression()
    this.produceCookies()
  },

  beforeDestroy () {
    clearInterval(this.produceCookiesTimerId)
  }
};
</script>

<style>

.factory {
  padding: 10px;
  border: 1px solid black;
  width: fit-content;
  margin: 5px auto;
  border-radius: 5px;
}

</style>