import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Spotify = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

type SpotifyState = {
  access_token: string | null;
  expires_in: number | null;
  token_type: string | null;
  setSpotify: (spotify: Spotify) => void;
  clear: () => void;
};

//개발 편의성을 위해 로컬 스토리지에 저장하도록 함.
export const useSpotifyStore = create<SpotifyState>()(
  persist(
    (set) => ({
      access_token: null,
      expires_in: null,
      token_type: null,

      setSpotify: (spotify: Spotify) =>
        set({
          access_token: spotify.access_token,
          expires_in: spotify.expires_in,
          token_type: spotify.token_type,
        }),

      clear: () => {
        set({
          access_token: null,
          expires_in: null,
          token_type: null,
        });
      },
    }),
    {
      name: 'spotify-auth-storage',
    },
  ),
);

// export const useSpotifyStore = create<SpotifyState>((set) => ({
//   access_token: null,
//   expires_in: null,
//   token_type: null,

//   setSpotify: (spotify: Spotify) =>
//     set({
//       access_token: spotify.access_token,
//       expires_in: spotify.expires_in,
//       token_type: spotify.token_type,
//     }),

//   clear: () => {
//     set({
//       access_token: null,
//       expires_in: null,
//       token_type: null,
//     });
//   },
// }));
