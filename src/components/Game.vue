<template>
  <div class="game">
    <p>Bienvenue au jeu du cookie clicker</p>

    <button class="button_cookie" @click="addCookies">
      <img class="cookie_image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSBDKzOQPWkG8jDyo_ybq0uYzt98I7CSVR9RQrEAlqH4-qWyqy4w"/>
    </button>

    <p>Unsold inventory : {{ nbCookies }}</p>
    <p>Available funds : {{ money }} €</p>
    <p>Price per cookie : {{ price_per_cookie }} €</p>

    <div v-if="canBuyFactory">
      Je suis une factory
    </div>
  </div>
</template>

<script>

import localStorage from "@/services/localStorage.js"

export default {
  name: 'game',

  data () {
    return {
      nbCookies: 0,
      money: 0,
      price_per_cookie: 1,
      factoryPrice: 10,
      saveTimerId: null,
      buyingTimerId: null,
    }
  },

  computed: {
    canBuyFactory () {
      return this.money > this.factoryPrice
    }
  },

  methods: {
    addCookies () {
      this.nbCookies += 1
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
        localStorage.saveProgression (this.nbCookies, this.money)
      }, 1000)
    },

    initProgression () {
      const progression = localStorage.loadProgression()
      this.nbCookies = progression.nbCookies
      this.money = progression.money
    }
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
  transform: translateY( 5px);
}

.cookie_image {
  border-radius: 50%;
}

</style>