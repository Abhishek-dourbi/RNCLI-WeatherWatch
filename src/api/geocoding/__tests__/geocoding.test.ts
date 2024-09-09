import axios from 'axios';
import { getLocation } from '..';
import { GeocodingResponse } from '../@types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getLocation', () => {
  const mockQuery = 'New Delhi';
  const mockGeocodingResponse: GeocodingResponse[] = [
    {
      id: 1,
      name: 'New Delhi',
      latitude: 28.6139,
      longitude: 77.209,
    },
  ];

  it('should return geocoding data on successful API call', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        results: mockGeocodingResponse,
      },
    });

    const result = await getLocation(mockQuery);

    expect(result).toEqual(mockGeocodingResponse);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://geocoding-api.open-meteo.com/v1/search',
      {
        params: {
          name: mockQuery,
        },
      }
    );
  });

  it('should throw an error when the API call fails', async () => {
    const mockError = new Error('API error');

    mockedAxios.get.mockRejectedValue(mockError);

    await expect(getLocation(mockQuery)).rejects.toThrow('API error');

    expect(mockedAxios.get).toHaveBeenCalled();
  });
});
