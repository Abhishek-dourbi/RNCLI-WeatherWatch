import { WeatherCode } from "../../../helpers/getWeatherImage";

interface DailyWeatherStateData {
    date: string,
    weatherCode: WeatherCode | null,
    maxTemp: number,
    minTemp: number,
    averageTemp: string
}

export interface WeatherForecastState {
    currentTime: string;
    currentTemp: number;
    currentWeatherCode: WeatherCode | null;
    
    dailyWeatherData: DailyWeatherStateData[];
    isWeatherForecastLoading: boolean
}

interface LocationData {
    latitude: number;
    longitude: number;
    name: string;
    id: number;
}

interface GeoCodingState {
    latitude: number;
    longitude: number;
    locationName: string;

    searchLocations: LocationData[];
    isGeocodingLoading: boolean;
}