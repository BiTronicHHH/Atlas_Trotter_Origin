import {
  ImgAfrica,
  ImgAntarctica,
  ImgAsia,
  ImgCentralAmerica,
  ImgEurope,
  ImgNorthAmerica,
  ImgOceania,
  ImgSouthAmerica,
} from '@/res/images';

const continentImage = (continent: string): string => {
  switch (continent) {
    case 'Africa':
      return ImgAfrica.src;
      break;
    case 'Antarctica':
      return ImgAntarctica.src;
      break;
    case 'Asia':
      return ImgAsia.src;
      break;
    case 'Central America':
      return ImgCentralAmerica.src;
      break;
    case 'Europe':
      return ImgEurope.src;
      break;
    case 'North America':
      return ImgNorthAmerica.src;
      break;
    case 'Oceania':
      return ImgOceania.src;
      break;
    case 'South America':
      return ImgSouthAmerica.src;
      break;
    default:
      return '';
      break;
  }
};
export default continentImage;
