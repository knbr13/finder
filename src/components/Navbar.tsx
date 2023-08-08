import { useNavigate } from "react-router-dom";
import SpotifyLogo from "../assets/Spotify_logo_without_text.svg.png";

const Navbar = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("tokenExpiresOn");
    localStorage.removeItem("token");
    localStorage.removeItem("searchValue");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-green-700 to-green-500 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <img src={SpotifyLogo} className="w-8 h-8" alt="Spotify Logo" />
        <span className="text-white text-xl font-semibold">Spotify Lite</span>
      </div>
      <button
        onClick={onLogout}
        className="px-4 py-2 rounded-lg bg-white text-green-600 font-semibold hover:bg-green-100 transition duration-300"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
