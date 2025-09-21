import { useSpotifyStore } from './store/spotify';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from './hooks/useCategories';
import { authSpotify } from './api/spotify/spotify';

function App() {
  const { access_token, setSpotify } = useSpotifyStore();

  useEffect(() => {
    if (access_token) {
      return;
    }

    const getToken = async () => {
      try {
        const tokenData = await authSpotify();
        setSpotify(tokenData);
      } catch (err) {
        console.error('Spotify 토큰 발급에 실패했습니다:', err);
      }
    };

    getToken();
  }, [access_token, setSpotify]);

  const { data, isLoading } = useCategories();

  return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center bg-black text-white">
      {!isLoading && (
        <div className="flex gap-4 flex-wrap items-center justify-center">
          {!isLoading &&
            data?.map((item) => (
              <div key={item.id}>
                <Link to={item.href}>
                  <img src={item.icons[0].url} />
                </Link>
                <p>{item.name}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default App;
