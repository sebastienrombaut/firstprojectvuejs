export default {
  saveProgression (nbCookies, money, factories) {
    localStorage.setItem('nbCookies', nbCookies)
    localStorage.setItem('money', money)
    localStorage.setItem('factories', JSON.stringify(factories))
  },

  loadProgression () {
    return {
      nbCookies: parseInt(localStorage.getItem('nbCookies')) || 0,
      money: parseInt(localStorage.getItem('money')) || 0,
      factories: JSON.parse(localStorage.getItem('factories')) || [],
    }
  },
}
