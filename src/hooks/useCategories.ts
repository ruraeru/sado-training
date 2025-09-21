import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api/spotify/categories';
import { useSpotifyStore } from '../store/spotify';

export const useCategories = () => {
  const access_token = useSpotifyStore().access_token;

  return useQuery({
    queryKey: ['spotify', 'categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 1000,
    enabled: !!access_token,
  });
};
