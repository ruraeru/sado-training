import axios from 'axios';

export const authSpotify = async () => {
  const res = await axios.post(
    'https://accounts.spotify.com/api/token',
    {
      grant_type: 'client_credentials',
      client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      client_secret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
  return res.data;
};
