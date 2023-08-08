import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Artist = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token") || "";
    if (!hash) {
      if (!token) {
        navigate("/login");
      } else {
        setToken(token);
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
  return <div>Artist</div>;
};

export default Artist;
