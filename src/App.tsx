import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<div>login</div>} />
          <Route path="/artist" element={<div>artist</div>} />
          <Route path="/albums" element={<div>albums</div>} />
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
