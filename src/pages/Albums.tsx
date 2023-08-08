import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Album from "../components/Album";

const Albums: React.FC = () => {
  const { artistId } = useParams();
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<any[]>([]); // Update the type here
  const token = window.localStorage.getItem("token") as string;

  useEffect(() => {
    if (!token) navigate("/login");

    const getAlbums = async () => {
      console.log("hello");
      try {
        const { data } = await axios.get(
          `https://api.spotify.com/v1/artists/${artistId}/albums/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAlbums(data.items);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
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
