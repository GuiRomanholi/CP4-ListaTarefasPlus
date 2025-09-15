import { useQuery } from '@tanstack/react-query';

const API_KEY = 'FNypkoSfByQSlgnIGvp93VkyVVudQ2y4';

export interface Holiday {
  name: string;
  description: string;
  country: {
    id: string;
    name: string;
  };
  date: {
    iso: string;
    datetime: {
      year: number;
      month: number;
      day: number;
    };
  };
  type: string[];
  primary_type: string;
  canonical_url: string;
  urlid: string;
  locations: string;
  states: string;
}

interface ApiResponse {
  response: {
    holidays: Holiday[];
  };
}

async function fetchHolidays(): Promise<Holiday[]> {
  const year = new Date().getFullYear();
  const response = await fetch(
    `https://calendarific.com/api/v2/holidays?&api_key=${API_KEY}&country=BR&year=${year}`
  );
  if (!response.ok) {
    throw new Error('A resposta da rede não foi boa');
  }
  const data: ApiResponse = await response.json();
  return data.response.holidays;
}

export function useHolidays() {
  return useQuery({
    queryKey: ['holidays'],
    queryFn: fetchHolidays,
  });
}