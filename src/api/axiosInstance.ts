import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import { useSpotifyStore } from '../store/spotify';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SPOTIFY_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers ?? {};
    try {
      const { access_token: token, token_type: type } =
        useSpotifyStore.getState();
      if (token) {
        config.headers.Authorization = `${type} ${token}`;
      }
    } catch {
      console.error('헤더에 토큰 추가 실패');
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
