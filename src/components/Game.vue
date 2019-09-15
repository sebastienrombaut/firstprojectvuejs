<template>
  <div class="game">
    <p>Bienvenue au jeu du cookie clicker</p>

    <button class="button_cookie" @click="addCookies(1)">
      <img class="cookie_image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSBDKzOQPWkG8jDyo_ybq0uYzt98I7CSVR9RQrEAlqH4-qWyqy4w"/>
    </button>

    <p>Unsold inventory : {{ nbCookies }}</p>
    <p>Cookies sold : {{ nbOfCookiesSold }}</p>
    <p>Total money spent : {{ totalMoneySpent }} €</p>
    <p>Available funds : {{ money.toFixed(1) }} €</p>
    <p>Price per cookie : {{ pricePerCookie.toFixed(1) }} € <button @click="raiseCookiePrice">Raise cookie price ?</button></p>

    <div v-if="canBuyFactory">
      <button @click="buyFactory">Acheter factory ?</button> {{ factoryPrice }} €
    </div>

    <div v-if="canBuyMarketingCampaign">
      <button @click="investInMarketing">Faire du facebook Ads ?</button> {{ marketingActionPrice }} €
    </div>

    <div>
      <button @click="resetGame">Reset</button>
    </div>

    <cookie-factory
      :money="money"
      v-for="(initDataFactory, index) in factories"
      :initDataFactory=initDataFactory
      :key="index"
      @produceCookies="addCookies"
      @spendMoney="spendMoney"
      ref="cookieFactories"/>
  </div>
</template>

<script>

import CookieFactory from "@/components/CookieFactory"
import localStorage from "@/services/localStorage.js"

export default {
  name: 'game',

  components: {
    CookieFactory
  },

  data () {
    return {
      nbCookies: 0,
      money: 0,
      pricePerCookie: 1,
      factoryPrice: 10,
      saveTimerId: null,
      buyingTimerId: null,
      factories: [],
      buyingCookieFrequency: 1000,
      marketingActionPrice : 100,
      nbOfCookiesSold: 0,
      totalMoneySpent: 0,
    }
  },

  computed: {
    canBuyFactory () {
      return this.money >= this.factoryPrice
    },

    canBuyMarketingCampaign () {
      return this.money >= this.marketingActionPrice
    }
  },

  methods: {
    addCookies (nb) {
      this.nbCookies += nb
    },

    initBuyingTimer () {
      this.buyingTimerId = setInterval(() => { //arrow_function
        if(this.nbCookies > 0) {
          this.nbCookies -= 1
          this.nbOfCookiesSold += 1
          this.money += this.pricePerCookie
        }
      }, this.buyingCookieFrequency || 1000)
    },

    initSaveTimer () {
      this.saveTimerId = setInterval(() => { //arrow_function
        const factoriesData = (this.$refs.cookieFactories === undefined || this.$refs.cookieFactories.length === 0 ? [] : this.$refs.cookieFactories.map((factory) => { return factory.dataToSave() }))

        localStorage.saveProgression (this.nbCookies, this.money, factoriesData, this.pricePerCookie, this.buyingCookieFrequency, this.nbOfCookiesSold, this.totalMoneySpent)
      }, 1000)
    },

    initProgression () {
      const progression = localStorage.loadProgression()
      console.log(progression)
      this.nbCookies = progression.nbCookies
      this.money = progression.money
      this.factories = progression.factories
      this.pricePerCookie = progression.pricePerCookie
      this.buyingCookieFrequency = progression.buyingCookieFrequency
      this.nbOfCookiesSold = progression.nbOfCookiesSold
      this.totalMoneySpent = progression.totalMoneySpent
    },

    resetGame () {
      this.nbCookies = 0
      this.money = 0
      this.factories = []
      this.pricePerCookie = 1
      this.buyingCookieFrequency = 1000
      this.nbOfCookiesSold = 0
      this.totalMoneySpent = 0
    },

    spendMoney (amount) {
      if (this.money >= amount) {
        this.money -= amount
        this.totalMoneySpent += amount
      }
    },

    buyFactory () {
      if (this.money >= this.factoryPrice) {
        this.spendMoney(this.factoryPrice)
        this.factories.push(1)
      }
    },

    raiseCookiePrice() {
      this.pricePerCookie *= 1.1
      this.buyingCookieFrequency += 1000

      clearInterval(this.buyingTimerId)
      this.initBuyingTimer()
    },

    investInMarketing () {
      alert("Wow le growth hacker ici")

      this.spendMoney(this.marketingActionPrice)
      this.buyingCookieFrequency /= 2
    },
  },

  mounted () {
    this.initProgression()
    this.initBuyingTimer()
    this.initSaveTimer()
  },

  beforeDestroy () {
    clearInterval(this.buyingTimerId)
    clearInterval(this.saveTimerId)
  }
};

</script>

<style>

.game {
  width: 100%;
}

.button_cookie {
  padding: 0;
  border: none;
  border-radius: 50%;
  outline: none;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  cursor: pointer;
  transition: transform 50ms;
}

.button_cookie:active {
  transform: translateY(5px);
}

.cookie_image {
  border-radius: 50%;
}

</style>