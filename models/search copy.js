const fs = require('fs');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

class Searches {
  history = [];
  dbPath = './db/database.json';

  constructor() {
    this.readDB();
  }

  // get capitalizeHistory() {
  //   return this.history.map(city => {
  //     let words = city.split(' ');
  //     words = words.map(w => w[0].toUpperCase() + w.substring(1));
  //     return words.join(' ');
  //   });
  // }

  get paramsGeocoding() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      lang: 'es',
      limit: 5,
    };
  }

  get paramsWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
      lang: 'es',
    };
  }

  // term: term of search. It can be a city or a place.
  async cities(term = '') {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/geo/1.0/direct?q=${term}`,
        params: this.paramsGeocoding,
      });

      const resp = await instance.get();

      return resp.data.map(({ name, lat, lon, state, country }) => ({
        id: uuidv4(),
        name,
        lat,
        lon,
        state: state || 'state not found',
        country,
      }));
    } catch (error) {
      return [];
    }
  }

  async weatherCity(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsWeather, lat, lon },
      });

      const resp = await instance.get();
      const { main, weather } = resp.data;

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(`An error here! => ${error}`);
    }
  }

  addHistory(city = '') {
    this.history.unshift(city);
  }

  saveDB() {
    const payload = this.history;

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }
  // saveDB() {
  //   const payload = {
  //     history: this.history,
  //   };

  //   fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  // }

  readDB() {
    if (!fs.existsSync(this.dbPath)) return;

    const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
    // const data = JSON.parse(info);
    // this.history = data;
    this.history = info;
  }
  // readDB() {
  //   if (!fs.existsSync(this.dbPath)) return;

  //   const info = fs.readFileSync(this.dbPath, { encoding: 'utf8' });
  //   const data = JSON.parse(info);
  //   this.history = data.history;
  // }
}

module.exports = Searches;
