const inquirer = require('inquirer');
require('colors');

const questions = [
  {
    type: 'list',
    name: 'option',
    message: 'What do you want to do?',
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Search for a city`.yellow,
      },
      {
        value: 2,
        name: `${'2.'.green} History`.yellow,
      },
      {
        value: 0,
        name: `${'0.'.green} Exit`.yellow,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log('==================='.green);
  console.log('  Select a option'.green);
  console.log('==================='.green);

  const { option } = await inquirer.prompt(questions);

  return option;
};

const pause = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Press ${'ENTER'.green} to continue`,
    },
  ];

  console.log('\n');
  await inquirer.prompt(question);
};

const readInput = async message => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Please enter a value';
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listCities = async (cities = []) => {
  const choices = cities.map((city, index) => {
    const idx = `${index + 1}.`.green;
    return {
      value: city.id,
      name: `${idx} ${city.name}, ${city.state} - ${city.country}`,
    };
  });

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancel',
  });

  const question = [
    {
      type: 'list',
      name: 'id',
      message: 'Select a city:',
      choices,
    },
  ];

  const { id } = await inquirer.prompt(question);
  return id;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listCities,
};
