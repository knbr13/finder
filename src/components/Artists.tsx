import React from "react";
import Artist, { ArtistType } from "./Artist";

interface ArtistsProps {
  artists: ArtistType[];
  onArtistClick: (artist: any) => void;
}

const Artists: React.FC<ArtistsProps> = ({ artists, onArtistClick }) => {
  return (
    <div className="w-11/12 m-auto relative top-4">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {artists.map((artist) => (
          <Artist
            key={artist.id}
            artist={artist}
            onClick={() => onArtistClick(artist)}
          />
        ))}
      </div>
    </div>
  );
};

export default Artists;
