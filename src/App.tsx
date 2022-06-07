import { useMemo } from 'react';
import { useLanyardWs } from 'use-lanyard';
import './index.css';

const DiscordStatus = {
  online: 'Online',
  idle: 'Idle',
  dnd: 'Does not disturb',
  offline: 'Offline',
};

const StatusColor = {
  online: 'bg-online',
  idle: 'bg-idle',
  dnd: 'bg-dnd',
  offline: 'bg-offline',
};

const getAssetUrl = (appId: string, asset: string) =>
  asset.startsWith('mp:external')
    ? `https://media.discordapp.net/${asset.replace('mp:', '')}`
    : `https://cdn.discordapp.com/${appId}/${asset}.png`;

function App() {
  const presence = useLanyardWs('YOUR_ID');

  const user = useMemo(() => {
    return presence?.discord_user;
  }, [presence]);

  const status = useMemo(() => {
    return presence && DiscordStatus[presence.discord_status as keyof typeof DiscordStatus];
  }, [presence]);

  const activity = useMemo(() => {
    return presence?.activities?.find((x) => x.type === 0);
  }, [presence]);

  return (
    <div className="flex flex-col items-center w-full pt-16 pb-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl text-white font-bold font-['Poppins'] mb-2">Lanyard Card</h1>
        <p className="text-gray-500">This is a lanyard card example</p>
      </header>
      {presence ? (
        <div className="rounded-lg p-4 w-full max-w-xl sm:border sm:border-gray-800">
          <div className="flex flex-col items-center sm:flex-row">
            <img
              className="w-28 h-28 rounded-full mb-4 sm:mb-0 sm:mr-4"
              src={
                user!.avatar
                  ? `https://cdn.discordapp.com/avatars/${user!.id}/${user!.avatar}.png?size=128`
                  : `https://cdn.discordapp.com/embed/avatars/${
                      parseInt(user!.discriminator.slice(-1), 10) % 5
                    }.png`
              }
              alt="User Avatar"
            />
            <div>
              <h4 className="text-xl font-bold leading-6">
                {user!.username}
                <span className="font-normal text-gray-400 ml-1 text-lg">
                  #{user!.discriminator}
                </span>
              </h4>
              <div className="flex flex-row items-center justify-center text-gray-400 sm:justify-start">
                <div
                  className={`w-4 h-4 rounded-full ${
                    StatusColor[presence.discord_status as keyof typeof StatusColor]
                  } mr-2`}
                />
                <span>{status}</span>
              </div>
            </div>
          </div>
          {presence.listening_to_spotify && (
            <div className="mt-6">
              <h5 className="ml-1 mb-1 text-sm font-bold text-gray-200">Listening</h5>
              <div className="flex flex-row items-center rounded-lg overflow-hidden p-4 bg-[rgba(0,0,0,.2)]">
                <div className="w-20 h-20 min-w-[5rem] flex items-center justify-center relative mr-4">
                  <img
                    className="rounded-xl"
                    src={`${presence.spotify!.album_art_url}`}
                    alt={`${presence.spotify!.song} art`}
                  />
                  <img
                    className="w-8 h-8 border-2 rounded-full bg-black border-black absolute bottom-[-8px] right-[-8px]"
                    src="/static/images/spotify.svg"
                    alt="Spotify Icon"
                  />
                </div>
                <div>
                  <h5 className="font-bold leading-4">{presence.spotify!.song}</h5>
                  <span className="text-sm text-gray-300">by {presence.spotify!.artist}</span>
                </div>
              </div>
            </div>
          )}
          {activity && (
            <div className="mt-4">
              <h5 className="ml-1 mb-1 text-sm font-bold text-gray-200">Doing something</h5>
              <div className="flex flex-row items-center rounded-lg overflow-hidden p-4 bg-[rgba(0,0,0,.2)]">
                <div className="w-20 h-20 min-w-[5rem] flex items-center justify-center bg-black rounded-xl relative mr-4">
                  <img
                    className="rounded-xl"
                    src={
                      activity.assets?.large_image
                        ? getAssetUrl(activity.application_id!, activity.assets.large_image)
                        : `https://dcdn.dstn.to/app-icons/${activity.application_id}`
                    }
                    alt="App Large Image"
                  />
                  {activity.assets?.small_image && (
                    <img
                      className="w-8 h-8 border-2 rounded-full bg-black border-black absolute bottom-[-8px] right-[-8px]"
                      src={getAssetUrl(activity.application_id!, activity.assets.small_image!)}
                      alt="App Small Image"
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <h5 className="font-bold leading-4 mb-1">{activity.name}</h5>
                  <span className="text-sm text-gray-300">{activity.state}</span>
                  {activity.details && (
                    <span className="text-sm text-gray-300">{activity.details}</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <svg
          className="animate-spin"
          width="38"
          height="38"
          viewBox="0 0 38 38"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#fff"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)" strokeWidth="2">
              <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
              <path d="M36 18c0-9.94-8.06-18-18-18" />
            </g>
          </g>
        </svg>
      )}
    </div>
  );
}

export default App;
