import React from "react";
import SpotifyLogo from "../assets/Spotify_logo_without_text.svg.png";

interface AlbumProps {
  album: AlbumType;
}

export interface AlbumType {
  id: number;
  name: string;
  release_date: string;
  total_tracks: number;
  images: { url: string }[];
  artists: { id: string; name: string }[];
  external_urls: { spotify: string };
}

const Album: React.FC<AlbumProps> = ({ album }) => {
  return (
    <div className="flex relative border-2 border-gray-600 rounded-lg flex-col items-center justify-start bg-green-500 shadow-md hover:shadow-lg cursor-pointer transition duration-300">
      {" "}
      <div className="bg-gray-200 w-full p-4">
        <img
          src={album.images[0]?.url || SpotifyLogo}
          alt={album.name}
          className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 mt-0 rounded-lg"
        />
      </div>
      <div className="py-4">
        <h2 className="text-md font-semibold text-center">{album.name}</h2>
        <p className="text-sm text-gray-600 text-center mb-2">
          Release Year: {album.release_date}
        </p>
        <p className="text-sm text-gray-600 text-center mb-2">
          Total Tracks: {album.total_tracks}
        </p>
        <div className="flex flex-col">
          <p className="text-xs text-gray-500 text-center mb-2">Artists:</p>
          {album.artists.map((artist) => (
            <div key={artist.id} className="text-sm text-center mb-1">
              {artist.name}
            </div>
          ))}
        </div>
      </div>
      <div className="border bg-gray-100 w-full absolute bottom-0 text-center text-xs md:text-sm text-gray-500">
        <a
          href={album.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
        >
          Preview on Spotify
        </a>
      </div>
    </div>
  );
};

export default Album;
