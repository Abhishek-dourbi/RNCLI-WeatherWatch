import axios from "axios";
import { WeatherApiParams, WeatherApiResponse } from "./@types";

export const getWeatherData = async (payload: WeatherApiParams): Promise<WeatherApiResponse> => {
    try {
        const res = await axios.get(
            'https://api.open-meteo.com/v1/forecast',
            {
                params: {
                    current: 'temperature_2m,weather_code',
                    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
                    timezone: 'auto',
                    ...payload
                }
            }
        );

        return res?.data;
    } catch(err: any) {
        throw new Error(err.message || 'Something went wrong');
    }
  };
  