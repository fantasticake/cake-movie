import React, { useState } from "react";

const localStorage = window.localStorage;
const INCLUDE_ADULT = "includeAdult";

export const SettingContext = React.createContext();

const SettingContextProvider = ({ children }) => {
  const [includeAdult, setIncludeAdult] = useState(
    localStorage.getItem(INCLUDE_ADULT)
      ? JSON.parse(localStorage.getItem(INCLUDE_ADULT))
      : false
  );
  const setIncludeAdultLS = (value) => {
    setIncludeAdult(value);
    localStorage.setItem(INCLUDE_ADULT, value);
  };
  return (
    <SettingContext.Provider value={{ includeAdult, setIncludeAdultLS }}>
      {children}
    </SettingContext.Provider>
  );
};

export default SettingContextProvider;
