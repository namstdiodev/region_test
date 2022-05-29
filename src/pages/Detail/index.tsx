import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DarkThemeContext } from "../../components/ContextTheme";
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

  const parseLanguages = (object: object) => {
    const values = Object.values(object);
    return values[values.length - 1];
  };

  useEffect(() => {
    fetchDetailCountry(countryName);
  }, [countryName]);

  useEffect(() => {});

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

              <Grid container className="group-info-country">
                <Grid item xs={12} md={5} lg={6}>
                  <div className="expect-16-9">
                    <img src={dataDetail?.flags?.png} alt="flag-country" />
                  </div>
                </Grid>
                <Grid
                  item
                  xs={13}
                  md={7}
                  lg={6}
                  sx={{
                    paddingLeft: {
                      xs: "0px",
                      md: "100px",
                    },
                  }}
                  className="info-country"
                >
                  <Typography
                    sx={{
                      marginTop: {
                        xs: "2rem",
                        md: "0px",
                      },
                    }}
                    className="name-country"
                  >
                    {dataDetail?.name?.common}
                  </Typography>
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <div className="info-country-text">
                        <div className="title-left">
                          <span className="title-info">Native Name:</span>{" "}
                          <span className="text-info">
                            {
                              parseLanguages(dataDetail?.name?.nativeName)
                                .common
                            }
                          </span>
                        </div>
                      </div>
                      <div className="info-country-text">
                        <div className="title-left">
                          <span className="title-info">Population:</span>{" "}
                          <span className="text-info">
                            {dataDetail.population}
                          </span>
                        </div>
                      </div>
                      <div className="info-country-text">
                        <div className="title-left">
                          <span className="title-info">Region:</span>{" "}
                          <span className="text-info">
                            {dataDetail?.region}
                          </span>
                        </div>
                      </div>
                      <div className="info-country-text">
                        <div className="title-left">
                          <span className="title-info">Sub Region:</span>{" "}
                          <span className="text-info">
                            {dataDetail?.subregion}
                          </span>
                        </div>
                      </div>
                      <div className="info-country-text">
                        <div className="title-left">
                          <span className="title-info">Capital:</span>{" "}
                          <span className="text-info">
                            {dataDetail?.capital && dataDetail?.capital[0]}
                          </span>
                        </div>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={6}
                      sx={{
                        mt: {
                          xs: "2rem",
                          md: "0px",
                        },
                        pl: {
                          xs: "0px",
                          md: "3rem",
                        },
                      }}
                    >
                      <div className="info-country-text">
                        <div>
                          <span className="title-info">Top Level Domain:</span>{" "}
                          {dataDetail?.tld.length > 1 ? (
                            dataDetail?.tld.map((item: string) => (
                              <span className="text-info">{item}</span>
                            ))
                          ) : (
                            <span className="text-info">
                              {dataDetail.tld[0]}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="info-country-text">
                        <div>
                          <span className="title-info">Currencies:</span>{" "}
                          <span className="text-info">
                            {dataDetail?.currencies &&
                              parseLanguages(dataDetail?.currencies).name}
                          </span>
                        </div>
                      </div>
                      <div className="info-country-text">
                        <div>
                          <span className="title-info">Languages:</span>{" "}
                          <span className="text-info">
                            {dataDetail?.languages &&
                              parseLanguages(dataDetail?.languages)}
                          </span>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  {bordersContries.length > 0 && (
                    <Box
                      sx={{
                        mt: "2rem",
                      }}
                    >
                      <div className="info-country-text">
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          <span
                            style={{
                              marginRight: "1rem",
                              marginTop: "0.75rem",
                            }}
                            className="title-info"
                          >
                            Border Countries:
                          </span>{" "}
                          {bordersContries.map((countries: any) => (
                            <Link to={`/detail?${countries?.name?.common}`}>
                              <button className="btn-border-country">
                                <span>{countries?.name?.common}</span>
                              </button>
                            </Link>
                          ))}
                        </Box>
                      </div>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
