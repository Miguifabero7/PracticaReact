import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.css";
import ForecastItem from './ForecastItem';
import transformForecast from './../services/transformForecast';

/*
const days = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
];

const data = {
  temperature: 10,
  humidity: 10,
  weatherState: 'normal',
  wind: 'normal',
}
*/

const api_key = "eb94a0995d764dbebe574fd92d54573d";
const url = "https://api.openweathermap.org/data/2.5/forecast";

class ForecastExtended extends Component {

    constructor() {
      super();
      this.state = { forecastData: null };
    }

    componentDidMount() {
      this.updateCity(this.props.city);
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.city !== this.props.city) {
        this.setState({ forecastData: null});
        this.updateCity(nextProps.city);
      }
    }
    

    updateCity = city => {
      const url_forecast = `${url}?q=${city}&appid=${api_key}`;

      fetch(url_forecast).then(
          data => (data.json())
      ).then(
          weather_data => {
              console.log(weather_data);
              const forecastData = transformForecast(weather_data);
              console.log(forecastData);
              this.setState({ forecastData });
          }
      );
    }

    renderForecastItemDays(forecastData) {
        return forecastData.map( forecast => (
            <ForecastItem 
              key={`${forecast.weekDay}${forecast.hour}`}
              weekDay={forecast.weekDay} 
              hour={forecast.hour} 
              data={forecast.data}>
            </ForecastItem>)
        );
    }

    renderProgress() {
      return <h3>Cargando pronostico extendido</h3>;
    }

  render() {
    const { city } = this.props;
    const { forecastData } = this.state;
    return (
      <div>
        <h2 className="forecast-title">Pronóstico extendido {city}</h2>
        {forecastData ? 
          this.renderForecastItemDays(forecastData) : 
          this.renderProgress()}
      </div>
    );
  }
}

ForecastExtended.propTypes = {
  city: PropTypes.string.isRequired,
};

export default ForecastExtended;