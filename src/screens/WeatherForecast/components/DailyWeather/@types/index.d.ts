import { DailyWeatherStateData } from "../../../@types";

export interface DailyWeatherProps {
    data: DailyWeatherStateData[],
    currentTime: string
}