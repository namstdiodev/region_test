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
  return (
    <>
      <Card sx={{ maxWidth: 294 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="190"
            image={data?.flags?.png}
            alt="flag"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {data?.name?.common || ""}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <div>
                <div>
                  <span>Population:</span>
                  <span>{data?.population}</span>
                </div>
                <div>
                  <span>Region:</span>
                  <span>{data?.region}</span>
                </div>
                <div>
                  <span>Capital:</span>
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
