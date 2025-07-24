import { createContext, useContext, useEffect, useState } from "react";

const IsAuthenticated = createContext();

export function IsAuthenticatedProvider({ children }) {
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem("accessToken"));
  const [loading, setLoading] = useState(true);
  const [route , setRoute] = useState()
  
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setLoggedIn(!!token);
    setLoading(false); //  Done checking
  }, []);
  
  useEffect(() => {
    const handleStorageChange = () => {
      setLoggedIn(!!localStorage.getItem("accessToken"));
      // setTokenRoute( !!localStorage.getItem("tokenRoute"))
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <IsAuthenticated.Provider value={{ isLoggedIn, setLoggedIn ,route ,setRoute ,loading}}>
      {children}
    </IsAuthenticated.Provider>
  );
}

export default function useIsAuthenticated() {
  return useContext(IsAuthenticated);
}
