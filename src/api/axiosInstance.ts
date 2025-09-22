import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import { useSpotifyStore } from '../store/spotify';
import { authSpotify } from './spotify/spotify';

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

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

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log('액세스 토큰 만료. 토큰을 갱신합니다...');
        const tokenData = await authSpotify();
        const { setSpotify } = useSpotifyStore.getState();
        setSpotify(tokenData);

        originalRequest.headers.Authorization = `${tokenData.token_type} ${tokenData.access_token}`;

        console.log('새 토큰으로 원래 요청을 재시도합니다.');
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('토큰 갱신에 실패했습니다:', refreshError);
        const { clear } = useSpotifyStore.getState();
        clear();

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
