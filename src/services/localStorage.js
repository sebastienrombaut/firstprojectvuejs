export default {
  saveProgression (nbCookies, money, factories, price_per_cookie, buying_cookie_frequency) {
    localStorage.setItem('nbCookies', nbCookies)
    localStorage.setItem('money', money)
    localStorage.setItem('factories', JSON.stringify(factories))
    localStorage.setItem('price_per_cookie', price_per_cookie)
    localStorage.setItem('buying_cookie_frequency', buying_cookie_frequency)
  },

  loadProgression () {
    return {
      nbCookies: parseInt(localStorage.getItem('nbCookies')) || 0,
      money: parseInt(localStorage.getItem('money')) || 0,
      factories: JSON.parse(localStorage.getItem('factories')) || [],
      price_per_cookie: parseInt(localStorage.getItem('price_per_cookie')) || 1,
      buying_cookie_frequency: parseInt(localStorage.getItem('buying_cookie_frequency')) || 1000,
    }
  },
}
