import { WeatherCode } from "../../../helpers/getWeatherImage";

export interface WeatherApiParams {
    latitude: number;
    longitude: number;
}

interface CurrentDayWeather {
    time: string;
    weather_code: WeatherCode;
    temperature_2m: number;
}

interface DailyWeather {
    time: string[],
    weather_code: WeatherCode[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
}

interface WeatherApiResponse {
    latitude: number;
    longitude: number;
    current: CurrentDayWeather;
    daily: DailyWeather;
}