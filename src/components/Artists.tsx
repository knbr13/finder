interface ArtistsProps {
  artists: any[];
}

const Artists = ({ artists }: ArtistsProps) => {
  return (
    <div>
      {artists.map((artist) => (
        <div></div>
      ))}
    </div>
  );
};

export default Artists;
