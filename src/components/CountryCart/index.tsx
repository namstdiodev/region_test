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
      <Card sx={{ maxWidth: 294 }} className="cart-country">
        <CardActionArea>
          <CardMedia
            component="img"
            height="190"
            image={data?.flags?.png}
            alt="flag"
          />
          <CardContent>
            <Typography gutterBottom component="div">
              <span className="name-country">{data?.name?.common || ""}</span>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <div>
                <div>
                  <span className="title-info">Population:</span>
                  <span>{formatNumber(data?.population)}</span>
                </div>
                <div>
                  <span className="title-info">Region:</span>
                  <span>{data?.region}</span>
                </div>
                <div>
                  <span className="title-info">Capital:</span>
                  <span>{data?.capital?.[0]}</span>
                </div>
              </div>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
