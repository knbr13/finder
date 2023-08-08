import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Searcher from "../components/Searcher";
import axios from "axios";
import Artists from "../components/Artists";

const Artist = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [artistObject, setArtistObject] = useState(null);
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token") || "";
    if (!hash) {
      if (!token) {
        navigate("/login");
      } else {
        setToken(token);
        const searchValue = window.localStorage.getItem("searchValue");
        if (searchValue) {
          const getArtists = async () => {
            const { data } = await axios.get(
              "https://api.spotify.com/v1/search",
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                params: {
                  q: searchValue,
                  type: "artist",
                },
              }
            );
            setArtistObject(data);
            setArtists(data.artists.items);
          };
          getArtists();
        }
      }
    } else {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        ?.split("=")[1] as string;
      window.location.hash = "";
      window.localStorage.setItem("token", token);
      setToken(token);
    }
  }, []);

  useEffect(() => {
    const getArtists = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchValue,
          type: "artist",
        },
      });
      setArtistObject(data);
      setArtists(data.artists.items);
    };
    if (searchValue) getArtists();
  }, [searchValue]);

  const handleChange = (value: string) => {
    setSearchValue(value);
    localStorage.setItem("searchValue", value);
  };

  return (
    <div>
      <Searcher onChange={handleChange} />
      <Artists
        onArtistClick={(artistId) => navigate(`/album/${artistId}`)}
        artists={artists}
      />
    </div>
  );
};

export default Artist;
