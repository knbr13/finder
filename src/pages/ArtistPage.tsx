import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Searcher from "../components/Searcher";
import axios from "axios";
import Artists from "../components/Artists";
import SpotifyLogo from "../assets/Spotify_logo_without_text.svg.png";

const Artist = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener("click", () => {
      const tokenExpiresOn = window.localStorage.getItem(
        "tokenExpiresOn"
      ) as string;
      if (!tokenExpiresOn) return;
      if (new Date(tokenExpiresOn) < new Date()) {
        localStorage.removeItem("tokenExpiresOn");
        localStorage.removeItem("token");
        alert("Session expired, please login again");
        navigate("/login");
      }
    });
  }, []);
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
      const now = new Date();
      const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
      window.localStorage.setItem("tokenExpiresOn", oneHourFromNow.toString());
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
    <div className="flex flex-col items-center h-screen">
      <Searcher onChange={handleChange} />
      {artists.length ? (
        <Artists
          onArtistClick={(artistId) => navigate(`/album/${artistId}`)}
          artists={artists}
        />
      ) : (
        <div className="bg-gradient-to-r from-green-200 to-green-400 relative p-4 sm:p-8 md:p-16 top-1/4 rounded-lg text-center">
          <img
            src={SpotifyLogo}
            className="w-12 h-12 mb-2"
            alt="Spotify Lite"
          />
          <p className="text-gray-700">Welcome to Spotify Lite</p>
        </div>
      )}
    </div>
  );
};

export default Artist;
