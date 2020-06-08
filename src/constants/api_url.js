const location = "Buenos Aires,ar"
const api_key = "eb94a0995d764dbebe574fd92d54573d";
const url_base_weather = "https://api.openweathermap.org/data/2.5/weather";

export const api_weather = `${url_base_weather}?q=${location}&appid=${api_key}`;