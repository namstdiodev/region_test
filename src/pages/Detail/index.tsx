import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DarkThemeContext } from "../../components/ContextTheme";
import DetailPage from "../../components/Detail";
import { Header } from "../../components/Header";
import CountriesAPI from "../../services/api/countries";
import "./style.scss";

export default function Detail() {
  const { isDark } = useContext(DarkThemeContext);
  let location = useLocation();
  let countryName = location?.search ? location?.search?.replace("?", "") : "";
  const [dataDetail, setDataDetail] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bordersContries, setBordersContries] = useState([]);

  const getListCode = async (codes: string) => {
    try {
      const response = await CountriesAPI.getListCodes(codes);
      setBordersContries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDetailCountry = async (countryName: any) => {
    try {
      setIsLoading(true);
      let response = await CountriesAPI.getByName(countryName);
      setDataDetail(response?.data?.[0] || {});
      let codes = "";
      if (response.data[0].borders) {
        response.data[0].borders.map((item: string) => {
          codes += `${item},`;
        });
      }
      getListCode(codes);
      setIsLoading(false);
    } catch (error) {
      console.error({ error });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailCountry(countryName);
  }, [countryName]);

  return (
    <div data-theme={isDark ? "dark" : "light"}>
      <div className="background-container">
        <Header />
        <DetailPage
          bordersContries={bordersContries}
          isLoading={isLoading}
          dataDetail={dataDetail}
        />
      </div>
    </div>
  );
}
