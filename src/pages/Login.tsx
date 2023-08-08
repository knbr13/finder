import { Link } from "react-router-dom";
import SpotifyLogo from "../assets/Spotify_logo_without_text.svg.png";

const Login = () => {
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  console.log("REDIRECT_URI:", REDIRECT_URI);
  const AUTH_ENDPOINT = import.meta.env.VITE_SPOTIFY_AUTH_ENDPOINT;
  const RESPONSE_TYPE = import.meta.env.VITE_SPOTIFY_RESPONSE_TYPE;

  return (
    <div className="flex h-screen justify-center items-center bg-white">
      <Link
        to={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        className="border border-gray-400 hover:bg-gray-100 rounded-lg p-1"
      >
        <div className="flex relative items-center justify-center py-1 px-12 sm:py-1 sm:px-20 md:py-2 md:px-32 lg:py-3 lg:px-40">
          <span className="text-black font-semibold text-sm sm:text-md md:text-lg lg:text-xl">
            Login
          </span>
          <img
            src={SpotifyLogo}
            alt="Spotify Logo"
            className="w-6 h-6 sm:w-8 absolute right-2 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 ml-2"
          />
        </div>
      </Link>
    </div>
  );
};

export default Login;
