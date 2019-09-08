<template>
  <div class="game">
    <p>Bienvenue au jeu du cookie clicker</p>

    <button class="button_cookie" @click="addCookies(1)">
      <img class="cookie_image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSBDKzOQPWkG8jDyo_ybq0uYzt98I7CSVR9RQrEAlqH4-qWyqy4w"/>
    </button>

    <p>Unsold inventory : {{ nbCookies }}</p>
    <p>Available funds : {{ money }} €</p>
    <p>Price per cookie : {{ price_per_cookie }} €</p>

    <div v-if="canBuyFactory">
      <button @click="buyFactory">Acheter factory ?</button> {{ factoryPrice }} €
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
      price_per_cookie: 1,
      factoryPrice: 10,
      saveTimerId: null,
      buyingTimerId: null,
      factories: [],
    }
  },

  computed: {
    canBuyFactory () {
      return this.money >= this.factoryPrice
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
          this.money += this.price_per_cookie
        }
      }, 1000)
    },

    initSaveTimer () {
      this.saveTimerId = setInterval(() => { //arrow_function
        const factoriesData = (this.$refs.cookieFactories === undefined || this.$refs.cookieFactories.length === 0 ? [] : this.$refs.cookieFactories.map((factory) => { return factory.dataToSave() }))

        localStorage.saveProgression (this.nbCookies, this.money, factoriesData)
      }, 1000)
    },

    initProgression () {
      const progression = localStorage.loadProgression()
      this.nbCookies = progression.nbCookies
      this.money = progression.money
      this.factories = progression.factories
    },

    resetGame () {
      this.nbCookies = 0
      this.money = 0
      this.factories = []
    },

    spendMoney (amount) {
      if (this.money >= amount) {
        this.money -= amount
      }
    },

    buyFactory () {
      if (this.money >= this.factoryPrice) {
        this.spendMoney(this.factoryPrice)
        this.factories.push(1)
      }
    },
  },

  mounted () {
    this.initBuyingTimer()
    this.initProgression()
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