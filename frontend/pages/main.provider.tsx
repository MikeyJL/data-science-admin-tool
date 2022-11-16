import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { axiosClient } from "../helpers";

type MainContextType = {
  // Auth
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

/* eslint-disable */
export const MainContext = createContext<MainContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
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
      setIsLoggedIn,
    }),
    // eslint-disable-next-line
    [isLoggedIn]
  );

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export const useMainContext = () => useContext(MainContext);

export default MainProvider;
