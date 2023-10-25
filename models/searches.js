import * as fs from "fs";
import axios from "axios";
import "dotenv/config";
class Searches {
  history = [];
  dbPath = "./db/database.json";
  constructor() {
    this.readDB();
  }

  async city(place = "") {
    try {
      // http request

      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramMapbox,
      });

      const resp = await instance.get();
      return resp.data?.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));
    } catch (error) {
      return [];
    }
    console.log(place);

    //return matches cities
    return [];
  }

  get paramMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "en",
    };
  }
  get paramOpenWeatherMap() {
    return {
      appid: process.env.OPEN_WEATHER_KEY,
      lang: "en",
      units: "metric",
    };
  }
  async weatherPlace(lat, lon) {
    try {
      //create intance axios
      const instance = axios.create({
        baseURL: "https://api.openweathermap.org/data/2.5/weather",
        params: { ...this.paramOpenWeatherMap, ...{ lat: lat, lon: lon } },
      });

      // extract  data
      const weather = (await instance.get()).data;

      return {
        desc: weather?.weather[0]?.description,
        min: weather.main.temp_min,
        max: weather.main.temp_max,
        temp: weather.main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }

  addHistory(place = "") {
    // prevent duplicates
    if (this.history.includes(place)) {
      return;
    }
    //save place
    this.history.unshift(place);

    //save db
    this.saveDB();
  }

  saveDB() {
    const playload = {
      history: this.history,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(playload));
  }

  readDB() {
    //create if the file .json doesn't exists
    if (!fs.existsSync(this.dbPath)) {
      fs.appendFileSync(this.dbPath, "");
    } else {
      const places = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
      const data = JSON.parse(places);
      this.history = [...data.history];
    }
  }
}

export { Searches };
