import React from "react";
import "./style.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

interface Props {
  data?: any;
}
export default function CountryCart({ data }: Props) {
  const formatNumber = (num: any) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  return (
    <>
      <Card
        sx={{
          maxWidth: 294,
          backgroundColor: "var(--element-color)",
          color: "var(--text-color)",
        }}
        className="cart-country"
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="190"
            image={data?.flags?.png}
            alt="flag"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              className="name-country"
              sx={{ fontWeight: "800" }}
            >
              {data?.name?.common || ""}
            </Typography>
            <Typography variant="body2">
              <div>
                <div>
                  <span className="title-info text-region-info">
                    Population:
                  </span>
                  <span> {formatNumber(data?.population)}</span>
                </div>
                <div>
                  <span className="text-region-info">Region:</span>
                  <span> {data?.region}</span>
                </div>
                <div>
                  <span className="text-region-info">Capital:</span>
                  <span> {data?.capital?.[0]}</span>
                </div>
              </div>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
