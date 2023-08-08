import React from "react";

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
      className="flex flex-col items-center justify-center bg-white shadow-md hover:shadow-lg cursor-pointer transition duration-300"
      onClick={onClick}
    >
      <div className="bg-gray-200 w-full p-4">
        <img
          src={artist.images[0]?.url || ""}
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
            <svg
              key={index}
              className={`w-4 h-4 fill-current ${
                index < popularityStars ? "text-yellow-500" : "text-gray-400"
              }`}
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 2a.945.945 0 0 0-.733.348l-3.512 4.646L2 7.328a1 1 0 0 0-.487 1.825l3.041 2.964-1.472 5.363a1 1 0 0 0 1.525 1.05L12 15.972l4.894 2.558a1 1 0 0 0 1.525-1.05l-1.472-5.363L21.487 9.153a1 1 0 0 0-.487-1.825l-5.755-.682-3.512-4.646A.945.945 0 0 0 12 2zm0 2.913a.95.95 0 0 0-.75.358l-3.53 4.65-.008.011a1 1 0 0 0-.425.795l.68 5.268-3.54-2.747a1 1 0 0 0-1.286.127l-2.03 2.193 5.265.61a1 1 0 0 0 .786-.42l2.717-3.935 2.34 1.823a1 1 0 0 0 1.286-.128l2.74-2.953-.62-4.8a1 1 0 0 0-.856-.854l-4.82-.582L12.75 4.27a.95.95 0 0 0-.75-.357zm-.74 5.78l-.88 6.846-3.565-2.776a.998.998 0 0 0-1.268.128l-2.034 2.2 4.71.546a.991.991 0 0 0 .759-.416l2.697-3.907z"
              />
            </svg>
          ))}
        </div>
      </div>
      <div className="border bg-gray-100 w-full text-center text-xs md:text-sm text-gray-500">
        <a href={artist.external_urls.spotify}>Preview on Spotify</a>
      </div>
    </div>
  );
};

export default Artist;
