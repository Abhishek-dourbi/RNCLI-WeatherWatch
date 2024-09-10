import axios from "axios";
import { GeocodingResponse } from "./@types";

export const getLocation = async (query: string): Promise<GeocodingResponse[]> => {
    try {
        const res = await axios.get(
            'https://geocoding-api.open-meteo.com/v1/search',
            {
                params: {
                    name: query
                }
            }
        );

        return res?.data?.results || [];
    } catch(err: any) {
        throw new Error(err.message || 'Something went wrong');
    }
  };
  