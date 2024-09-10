import React from 'react';
import {
  render,
  waitFor,
  fireEvent,
} from '@testing-library/react-native';
import App from '../App';
import {getWeatherData} from '../src/api/weatherForecast';
import {getLocation} from '../src/api/geocoding';
import {WeatherApiResponse} from '../src/api/weatherForecast/@types';
import {GeocodingResponse} from '../src/api/geocoding/@types';

jest.mock('../src/api/weatherForecast', () => ({
  getWeatherData: jest.fn(),
}));

jest.mock('../src/api/geocoding', () => ({
  getLocation: jest.fn(),
}));

jest.mock('../src/helpers/getWeatherImage', () =>
  jest.fn(() => ({
    image: 'https://openweathermap.org/img/wn/03d@2x.png',
    description: 'Cloudy',
  })),
);

const mockGetWeatherData = getWeatherData as jest.MockedFunction<
  typeof getWeatherData
>;
const mockGetLocation = getLocation as jest.MockedFunction<typeof getLocation>;

describe('App Component with WeatherForecast', () => {
  const mockWeatherData = {
    latitude: 28.6139,
    longitude: 77.209,
    current: {
      time: '2024-09-10T12:00:00Z',
      temperature_2m: 18,
      weather_code: '0',
    },
    daily: {
      time: [
        '2024-09-10',
        '2024-09-11',
        '2024-09-12',
        '2024-09-13',
        '2024-09-14',
        '2024-09-15',
        '2024-09-16',
      ],
      weather_code: ['0', '1', '2', '3', '45', '48', '51'],
      temperature_2m_max: [30, 31, 29, 32, 35, 31, 29],
      temperature_2m_min: [22, 21, 23, 24, 27, 20, 19],
    },
  };

  const mockLocationData = [
    {id: 1, name: 'New Delhi', latitude: 28.6139, longitude: 77.209},
  ];

  beforeEach(() => {
    mockGetWeatherData.mockResolvedValue(mockWeatherData as WeatherApiResponse);
    mockGetLocation.mockResolvedValue(mockLocationData as GeocodingResponse[]);
  });

  it('should render WeatherForecast and display the weather data', async () => {
    const {getByText, getByTestId} = render(<App />);

    await waitFor(() => {
      expect(getByText('New Delhi')).toBeTruthy();
      expect(getByText('18°')).toBeTruthy();
      expect(getByText('Cloudy')).toBeTruthy();
      expect(getByTestId('current-forecast-image')).toBeTruthy();
    });
  });

  it('should handle location input and display suggestions', async () => {
    const {getByPlaceholderText, getByText} = render(<App />);

    const input = getByPlaceholderText('Search...');

    fireEvent.changeText(input, 'Del');

    await waitFor(() => {
      expect(getByText('New Delhi')).toBeTruthy();
    });
  });

  it('should match the snapshot', () => {
    const {toJSON} = render(<App />);
    expect(toJSON()).toMatchSnapshot();
  });
});
