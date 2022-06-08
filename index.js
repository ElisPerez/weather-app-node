require('dotenv').config();

const { inquirerMenu, pause, readInput, listCities, listHCities } = require('./helpers/inquirer');
const showResults = require('./helpers/showResults');

const Searches = require('./models/search');

const main = async () => {
  const searches = new Searches();

  let opt;
  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        // Enter term to search for found cities:
        const term = await readInput('Enter a city:');

        // Get cities from API:
        const cities = await searches.cities(term);

        // id: id of the city selected.
        const id = await listCities(cities);
        if (id === '0') continue;

        const citySelected = cities.find(city => city.id === id);

        // Save in DB:
        searches.addHistory(citySelected);

        // Get weather from API:
        const weather = await searches.weatherCity(citySelected.lat, citySelected.lon);

        showResults(citySelected, weather);

        break;
      case 2:
        const citiesH = searches.getHistory();

        // id: id of the city selected.
        const idH = await listCities(citiesH);
        if (idH === '0') continue;

        const cityHSelected = citiesH.find(city => city.id === idH);

        // Get weather from API:
        const weatherHistory = await searches.weatherCity(cityHSelected.lat, cityHSelected.lon);

        showResults(cityHSelected, weatherHistory);

        break;
    }
    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
