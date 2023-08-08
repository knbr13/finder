import React from "react";
import Artist from "./Artist";

interface ArtistsProps {
  artists: any[];
  onArtistClick: (artist: any) => void;
}

const Artists: React.FC<ArtistsProps> = ({ artists, onArtistClick }) => {
  return (
    <div className="grid bg-red-300 p-10 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {artists.map((artist) => (
        <Artist
          key={artist.id}
          artist={artist}
          onClick={() => onArtistClick(artist)}
        />
      ))}
    </div>
  );
};

export default Artists;
