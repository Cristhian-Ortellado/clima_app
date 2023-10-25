import {
  inquirerMenu,
  listPlaces,
  pause,
  readInput,
} from "./helpers/inquirer.js";
import { Searches } from "./models/searches.js";

const main = async () => {
  let option;

  const searches = new Searches();
  do {
    option = await inquirerMenu();

    switch (option) {
      case 1:
        //show message
        const searchTerm = await readInput("City: ");

        //search place
        const places = await searches.city(searchTerm);

        //select place
        const selectedId = await listPlaces(places);

        if (selectedId === "0") {
          continue;
        }

        const placeSelected = places.find((place) => place.id === selectedId);

        //save history
        searches.addHistory(placeSelected.name);

        //get infor wheater
        const weather = await searches.weatherPlace(
          placeSelected.lat,
          placeSelected.lng
        );

        //show weather
        console.clear();
        console.log("\n City information\n".green);
        console.log("City:", `${placeSelected.name}`.green);
        console.log("Lat:", placeSelected.lat);
        console.log("Lng:", placeSelected.lng);
        console.log("Temperature:", weather.temp);
        console.log("Min:", weather.min);
        console.log("Max:", weather.max);
        console.log("How is the weather ?:", `${weather.desc}`.green);
        break;

      case 2:
        searches.history.forEach((place, i) => {
          const idx = `${i + 1}.`.green;

          console.log(`${idx} ${place}`);
        });
      default:
        break;
    }

    await pause();
  } while (option !== 0);
};

main();
