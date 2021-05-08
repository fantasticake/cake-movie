import React from "react";
import Router from "./Router";
import Header from "./Header";
import GlobalStyle from "./GlobalStyles";
import SettingContextProvider from "./SettingContext";

function App() {
  return (
    <SettingContextProvider>
      <Router>
        <GlobalStyle />
        <Header />
      </Router>
    </SettingContextProvider>
  );
}

export default App;
