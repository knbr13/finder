import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import Login from "./pages/Login";
import Album from "./pages/Albums";
import ArtistPage from "./pages/ArtistPage";

function App() {
  const navigate = useNavigate();
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

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/artist" element={<ArtistPage />} />
          <Route path="/album/:artistId" element={<Album />} />
          <Route path="*" element={<Redirector />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Redirector() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/artist"); // Redirect to /artist
  }, []);
  return null; // Return null since no rendering is needed
}

export default App;
