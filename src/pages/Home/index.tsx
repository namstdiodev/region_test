import React, { useContext, useEffect } from "react";
import { Content } from "../../components/Content";
import { DarkThemeContext } from "../../components/ContextTheme";
import { Header } from "../../components/Header";
import CountriesAPI from "../../services/api/countries";



function Home() {
  const { isDark } = useContext(DarkThemeContext);

  const getAll = async () => {
    const response = await CountriesAPI.getAll();
    console.log(response);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div data-theme={isDark ? "dark" : "light"}>
      <Header />
      <Content />
    </div>
  );
}

export default Home;
