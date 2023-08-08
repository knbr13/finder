import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import SpotifyLogo from "../assets/Spotify_logo_without_text.svg.png";

interface ArtistProps {
  artist: ArtistType;
  onClick: () => void;
}

export interface ArtistType {
  external_urls: { spotify: string };
  followers: { href: string | null; total: number };
  genres: string[];
  href: string;
  id: string;
  images: { url: string }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

const Artist: React.FC<ArtistProps> = ({ artist, onClick }) => {
  const popularityStars = Math.round(artist.popularity / 20);

  return (
    <div
      className="flex border-2 border-gray-600 rounded-lg flex-col items-center justify-center bg-green-500 shadow-md hover:shadow-lg cursor-pointer transition duration-300"
      onClick={onClick}
    >
      <div className="bg-gray-200 w-full p-4">
        <img
          src={artist.images[0]?.url || SpotifyLogo}
          alt={artist.name}
          className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full"
        />
      </div>
      <div className="py-4">
        <h2 className="text-md font-semibold text-center">{artist.name}</h2>
        <p className="text-sm text-gray-600 text-center mb-2">
          {artist.followers.total} followers
        </p>
        <div className="flex justify-center">
          {Array.from({ length: 5 }, (_, index) => (
            <FontAwesomeIcon
              key={index}
              icon={faStar}
              className={`w-4 h-4 ${
                index < popularityStars ? "text-yellow-500" : "text-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artist;
