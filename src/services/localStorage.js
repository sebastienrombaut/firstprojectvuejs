export default {
  saveProgression (nbCookies, money, factories, pricePerCookie, buyingCookieFrequency, nbOfCookiesSold, totalMoneySpent) {
    localStorage.setItem('nbCookies', nbCookies)
    localStorage.setItem('money', money)
    localStorage.setItem('factories', JSON.stringify(factories))
    localStorage.setItem('pricePerCookie', pricePerCookie.toFixed(1))
    localStorage.setItem('buyingCookieFrequency', buyingCookieFrequency)
    localStorage.setItem('nbOfCookiesSold', nbOfCookiesSold)
    localStorage.setItem('totalMoneySpent', totalMoneySpent)
  },

  loadProgression () {
    return {
      nbCookies: parseInt(localStorage.getItem('nbCookies')) || 0,
      money: parseInt(localStorage.getItem('money')) || 0,
      factories: JSON.parse(localStorage.getItem('factories')) || [],
      pricePerCookie: parseFloat(localStorage.getItem('pricePerCookie')) || 1,
      buyingCookieFrequency: parseInt(localStorage.getItem('buyingCookieFrequency')) || 1000,
      nbOfCookiesSold: parseInt(localStorage.getItem('nbOfCookiesSold')) || 0,
      totalMoneySpent: parseInt(localStorage.getItem('totalMoneySpent')) || 0,
    }
  },
}
