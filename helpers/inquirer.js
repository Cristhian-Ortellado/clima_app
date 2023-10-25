import inquirer from "inquirer";
import colors from "colors";

const menuOptions = [
  {
    type: "list",
    name: "option",
    message: "What do you want to do?\n",
    choices: [
      {
        value: 1,
        name: `${"1.".blue} Search City`,
      },
      {
        value: 2,
        name: `${"2.".blue} History`,
      },
      {
        value: 0,
        name: `${"3.".blue} Quit`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("==========================================".green);
  console.log("Select an option".white);
  console.log("==========================================".green);
  console.log();
  const { option } = await inquirer.prompt(menuOptions);
  console.log();
  return option;
};

const pause = async () => {
  console.log();
  const { option } = await inquirer.prompt({
    type: "input",
    name: "option",
    message: `Press ${"enter".green} to continue...`,
  });
  return option;
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "description",
      message,
      validate(val) {
        if (val.length === 0) {
          return "Please enter the required data\n";
        }
        return true;
      },
    },
  ];
  const { description } = await inquirer.prompt(question);
  return description;
};

const listPlaces = async (places = []) => {
  const choices = places.map((place, i) => {
    const idx = `${i + 1}`.green;

    return {
      value: place.id,
      name: `${idx} ${place.name}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0.".green + "Cancel",
  });

  const questions = [
    {
      type: "list",
      name: "id",
      message: "Select place: \n",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questions);
  return id;
};

const confirm = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const showTaskCheckList = async (tasks) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}`.green;

    return {
      value: task.id,
      name: `${idx} ${task.description}`,
      checked: task.completed_at ? true : false,
    };
  });

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Select\n",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(question);
  return ids;
};
export {
  inquirerMenu,
  pause,
  readInput,
  listPlaces,
  confirm,
  showTaskCheckList,
};
