import WeatherResource from '../resources/weather.resource';

export const getWeather = async (city) => {
  let summary = [];
  try {
    const response = await (new WeatherResource()).getWeather(city);
    summary = response.data;
  } catch (e) {
    console.log(e);//eslint-disable-line
  }
  return summary;
};
