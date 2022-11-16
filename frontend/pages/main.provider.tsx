import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { axiosClient } from "../helpers";

type MainContextType = {
  // Auth
  isLoggedIn: boolean;
};

/* eslint-disable */
export const MainContext = createContext<MainContextType>({
  isLoggedIn: false,
});
/* eslint-enable */

type MainProviderProps = {
  children: React.ReactNode;
};

const MainProvider = ({ children }: MainProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Checks if the user is logged in
  useEffect(() => {
    axiosClient
      .get("auth/login")
      .then((res) => setIsLoggedIn(JSON.parse(res.data)));
  }, []);

  const value = useMemo(
    () => ({
      isLoggedIn,
    }),
    // eslint-disable-next-line
    [isLoggedIn]
  );

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export const useMainContext = () => useContext(MainContext);

export default MainProvider;
