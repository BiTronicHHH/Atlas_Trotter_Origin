import api from '@/lib/axios';
import {
  API_PATH_GET_DESTINATIONS,
  API_PATH_GET_DESTINATION_BY_TICKER,
} from '@/res/values';
import { API_PATH_GET_CATEGORIES } from '../res/values';

export const getDestinations = async () => {
  try {
    const { data } = await api.get(API_PATH_GET_DESTINATIONS);
    return data;
  } catch (e) {
    return;
  }
};

export const getDestinationByTicker = async (ticker: string) => {
  try {
    const { data } = await api.get(
      `${API_PATH_GET_DESTINATION_BY_TICKER}/${ticker}`,
    );
    return data;
  } catch (e) {
    return;
  }
};

export const getCategories = async () => {
  try {
    const { data } = await api.get(API_PATH_GET_CATEGORIES);
    return data;
  } catch (e) {
    return;
  }
};
