import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

interface Props {
  dataDetail?: any;
  isLoading?: boolean;
  bordersContries?: any;
}

interface IFCountry {
  title: string;
  text: string;
}

const InfoCountry = ({ title, text }: IFCountry) => {
  return (
    <div className="info-country-text">
      <div className="title-left">
        <span className="title-info">{title}:</span>{" "}
        <span className="text-info">{text}</span>
      </div>
    </div>
  );
};

export default function DetailPage({
  dataDetail,
  isLoading,
  bordersContries,
}: Props) {
  const parseLanguages = (object: object) => {
    const values = Object.values(object);
    return values[values.length - 1];
  };
  
  const formatNumber = (num: any) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
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
                  <InfoCountry
                    title="Native Name"
                    text={parseLanguages(dataDetail?.name?.nativeName).common}
                  />
                  <InfoCountry
                    title="Population"
                    text={formatNumber(dataDetail?.population)}
                  />
                  <InfoCountry title="Region" text={dataDetail?.region} />
                  <InfoCountry
                    title="Sub Region"
                    text={dataDetail?.subregion}
                  />
                  <InfoCountry
                    title="Capital"
                    text={dataDetail?.capital && dataDetail?.capital[0]}
                  />
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
                        <span className="text-info">{dataDetail.tld[0]}</span>
                      )}
                    </div>
                  </div>
                  <InfoCountry
                    title="Currencies"
                    text={
                      dataDetail?.currencies &&
                      parseLanguages(dataDetail?.currencies).name
                    }
                  />
                  <InfoCountry
                    title="Languages"
                    text={
                      dataDetail?.languages &&
                      parseLanguages(dataDetail?.languages)
                    }
                  />
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
  );
}
