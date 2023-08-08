import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Album, { AlbumType } from "../components/Album";
import { makeGetRequest } from "../api/get";

const Albums: React.FC = () => {
  const { artistId } = useParams();
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const token = window.localStorage.getItem("token") as string;

  useEffect(() => {
    if (!token) navigate("/login");

    const getAlbums = async () => {
      try {
        const data = await makeGetRequest(
          `https://api.spotify.com/v1/artists/${artistId}/albums/`,
          { Authorization: `Bearer ${token}` }
        );
        setAlbums(data.items);
      } catch (error) {}
    };

    getAlbums();
  }, []);

  return (
    <div className="grid place-content-center p-10 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {albums.map((album) => (
        <Album key={album.id} album={album} />
      ))}
    </div>
  );
};

export default Albums;
