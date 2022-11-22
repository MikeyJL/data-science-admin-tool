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
import { User } from "../types";

type MainContextType = {
  // Auth
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  // User
  user: User | undefined;
};

/* eslint-disable */
export const MainContext = createContext<MainContextType>({
  // Auth
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  // User
  user: undefined,
});
/* eslint-enable */

type MainProviderProps = {
  children: React.ReactNode;
};

const MainProvider = ({ children }: MainProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>();

  // Checks if the user is logged in
  useEffect(() => {
    axiosClient
      .get("auth/login")
      .then((res) => setIsLoggedIn(JSON.parse(res.data)));

    if (isLoggedIn) {
      axiosClient.get("auth/user").then((res) => setUser(JSON.parse(res.data)));
    }
  }, [isLoggedIn]);

  const value = useMemo(
    () => ({
      // Auth
      isLoggedIn,
      setIsLoggedIn,
      // User
      user,
    }),
    // eslint-disable-next-line
    [isLoggedIn, user]
  );

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export const useMainContext = () => useContext(MainContext);

export default MainProvider;
