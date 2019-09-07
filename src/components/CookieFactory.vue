<template>
  <div>
    Je suis une factory et j'ai {{ nbCookies }} cookie<span v-if="nbCookies > 1">s</span>
  </div>
</template>

<script>
export default {
  name: 'cookie-factory',

  data () {
    return {
      nbCookies: 0,
      produceCookiesTimerId: null,
    }
  },

  methods: {
    produceCookies () {
      this.produceCookiesTimerId = setInterval(() => { //arrow_function
        this.nbCookies += 2
        this.$emit('produceCookies', 2)
      }, 1000)
    }
  },

  mounted () {
    this.produceCookies()
  },

  beforeDestroy () {
    clearInterval(this.produceCookiesTimerId)
  }
};
</script>

<style>

</style>