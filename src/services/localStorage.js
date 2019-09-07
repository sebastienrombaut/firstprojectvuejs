export default {
  saveProgression (nbCookies, money) {
    localStorage.setItem('nbCookies', nbCookies)
    localStorage.setItem('money', money)
  },

  loadProgression () {
    return {
      nbCookies: parseInt(localStorage.getItem('nbCookies')),
      money: parseInt(localStorage.getItem('money'))
    }
  },
}
