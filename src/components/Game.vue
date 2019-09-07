<template>
  <div class="game">
    <p>Bienvenue au jeu du cookie clicker</p>

    <button class="button_cookie" @click="addCookies">
      <img class="cookie_image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSBDKzOQPWkG8jDyo_ybq0uYzt98I7CSVR9RQrEAlqH4-qWyqy4w"/>
    </button>

    <p>{{ nbCookies }}</p>
  </div>
</template>

<script>

export default {
  name: 'game',

  data() {
    return {
      nbCookies: 0
    }
  },

  methods: {
    addCookies() {
      this.nbCookies += 1
    }
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