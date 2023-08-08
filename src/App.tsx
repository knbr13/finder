import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import Login from "./pages/Login";
import Artist from "./pages/ArtistPage";
import Album from "./pages/Albums";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/artist" element={<Artist />} />
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
