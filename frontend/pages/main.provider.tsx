import React, { createContext, useContext, useMemo, useState } from "react";

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
  const [isLoggedIn] = useState<boolean>(false);

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
