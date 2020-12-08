const fetch = require("node-fetch");

class CurrencyRateAPI {
  constructor() {
    this.eur = null;
    this.usd = null;
    this.rub = null;
    this.usdToRub = null;
    this.eurToRub = null;
  }

  async update() {
    await this.updateUsdToRub();
    await this.updateEurToRub();
    await this.updateRub();
  }

  async updateUsdToRub() {
    const url = "https://api.exchangeratesapi.io/latest?base=USD";
    const response = await fetch(url);

    if (response.ok) {
      const json = await response.json();

      this.usd = json.rates;
      this.usdToRub = json.rates.RUB;
    } else {
      throw new Error("Ошибка HTTP: " + response.status);
    }
  }

  async updateEurToRub() {
    const url = "https://api.exchangeratesapi.io/latest?base=EUR";
    const response = await fetch(url);

    if (response.ok) {
      const json = await response.json();

      this.eur = json.rates;
      this.eurToRub = json.rates.RUB;
    } else {
      throw new Error("Ошибка HTTP: " + response.status);
    }
  }

  async updateRub() {
    const url = "https://api.exchangeratesapi.io/latest?base=RUB";
    const response = await fetch(url);

    if (response.ok) {
      const json = await response.json();

      this.rub = json.rates;
    } else {
      throw new Error("Ошибка HTTP: " + response.status);
    }
  }
}

module.exports = CurrencyRateAPI;
