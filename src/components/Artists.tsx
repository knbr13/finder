import React from "react";
import Artist, { ArtistType } from "./Artist";

interface ArtistsProps {
  artists: ArtistType[];
  onArtistClick: (artist: any) => void;
}

const Artists: React.FC<ArtistsProps> = ({ artists, onArtistClick }) => {
  return (
    <div className="grid place-content-center p-10 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {artists.map((artist) => (
        <Artist
          key={artist.id}
          artist={artist}
          onClick={() => onArtistClick(artist.id)}
        />
      ))}
    </div>
  );
};

export default Artists;
