import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { DarkThemeContext } from "../../components/ContextTheme";
import { Header } from "../../components/Header";
import CountriesAPI from "../../services/api/countries";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import "./style.scss";
import { Link } from "react-router-dom";

export default function Detail() {
  const { isDark } = useContext(DarkThemeContext);
  let location = useLocation();
  let countryName = location?.search ? location?.search?.replace("?", "") : "";
  const [dataDetail, setDataDetail] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDetailCountry = async (countryName: any) => {
    try {
      setIsLoading(true);
      let response = await CountriesAPI.getByName(countryName);
      setDataDetail(response?.data?.[0] || {});
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

        <div className="content-body-detail">
          {isLoading ? (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          ) : (
            <>
              <Link to="/">
                <button className="btn-back">
                  <ArrowBackIcon />
                  <span>Back</span>
                </button>
              </Link>

              <div className="group-info-country">
                <img
                  className="img-country"
                  src={dataDetail?.flags?.png}
                  alt="flag-country"
                />
                <div className="info-country">
                  <span className="name-country">
                    {dataDetail?.name?.common}
                  </span>
                  <div className="info-country-text">
                    <div className="title-left">
                      <span className="title-info">Native Name:</span>{" "}
                      <span className="text-info">Test textttttt</span>
                    </div>
                    <div>
                      <span className="title-info">Native Name:</span>{" "}
                      <span className="text-info">Test textttttt</span>
                    </div>
                  </div>
                  <div className="info-country-text">
                    <div className="title-left">
                      <span className="title-info">Native Name:</span>{" "}
                      <span className="text-info">Test textttttt</span>
                    </div>
                    <div>
                      <span className="title-info">Native Name:</span>{" "}
                      <span className="text-info">Test textttttt</span>
                    </div>
                  </div>
                  <div className="info-country-text">
                    <div className="title-left">
                      <span className="title-info">Native Name:</span>{" "}
                      <span className="text-info">Test textttttt</span>
                    </div>
                    <div>
                      <span className="title-info">Native Name:</span>{" "}
                      <span className="text-info">Test textttttt</span>
                    </div>
                  </div>
                  <div className="info-country-text">
                    <div className="title-left">
                      <span className="title-info">Native Name:</span>{" "}
                      <span className="text-info">Test textttttt</span>
                    </div>
                    <div>
                      <span className="title-info">Native Name:</span>{" "}
                      <span className="text-info">Test textttttt</span>
                    </div>
                  </div>
                  <div className="info-country-text">
                    <div className="title-left">
                      <span className="title-info">Native Name:</span>{" "}
                      <span className="text-info">Test textttttt</span>
                    </div>
                    <div>
                      <span className="title-info">Native Name:</span>{" "}
                      <span className="text-info">Test textttttt</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
