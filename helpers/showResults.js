require('colors');

const showResults = (city, weather) => {
  console.clear();
  console.log('\nInformation about the city:'.bgBlue);
  console.log();
  console.log(`City: ${city.name.green}`);
  console.log(`Latitude: ${city.lat}`);
  console.log(`Longitude: ${city.lon}`);
  console.log(`State: ${city.state.green}`);
  console.log(`Country: ${city.country.green}`);
  console.log();
  console.log('About the weather:');
  console.log(`Temperature: ${weather.temp} °C`);
  console.log(`Description: ${weather.desc.green}`);
  console.log(`Min temperature: ${weather.min} °C`);
  console.log(`Max temperature: ${weather.max} °C`);
};

module.exports = showResults;
