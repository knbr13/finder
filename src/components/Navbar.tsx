import SpotifyLogo from "../assets/Spotify_logo_without_text.svg.png";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-green-700 to-green-500 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <img src={SpotifyLogo} className="w-8 h-8" alt="Spotify Logo" />
        <span className="text-white text-xl font-semibold">Spotify Lite</span>
      </div>
    </nav>
  );
};

export default Navbar;
