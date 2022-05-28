import SearchIcon from "@mui/icons-material/Search";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";
import CountryCart from "../../components/CountryCart";
import CountriesAPI from "../../services/api/countries";
import "./style.scss";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function Home() {
  const [listCountry, setListCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterParams, setFilterParams] = useState({
    name: "",
    region: "",
  });

  const mapCountry = (listCountry: Array<object>) => {
    if (listCountry && listCountry?.length) {
      return (
        <Grid
          container
          spacing={{ xs: 2, md: 8 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {listCountry?.map((item, index) => (
            <Grid item xs={2} sm={4} md={3} key={index}>
              <CountryCart index={index} data={item} />{" "}
            </Grid>
          ))}
        </Grid>
      );
    }
  };

  const getAllCountry = async () => {
    setIsLoading(true);
    try {
      const response = await CountriesAPI.getAll();
      setListCountry(response?.data || []);
      setIsLoading(false);
    } catch (error) {
      console.error({ error });
      setIsLoading(false);
    }
  };

  const handleSearch = (e: any) => {
    console.log("e", e);
  };

  const [region, setRegion] = useState("");
  const [isShow, setIsShow] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setRegion(event.target.value as string);
  };

  useEffect(() => {
    getAllCountry();
  }, []);

  return (
    <div className="App">
      <header className=""></header>
      <div className="content-body">
        <div className="search-filter">
          <div className="group-search">
            <SearchIcon />
            <input
              className="search"
              type="text"
              placeholder="Search for a country..."
            />
          </div>
          <div className="filter-region">
            <div
              onClick={(prevState) => {
                console.log("s")
                setIsShow(!prevState)
              }}
              className="filter-region-text"
            >
              Filter by Region
            </div>
            <KeyboardArrowDownIcon />
            <div className={isShow ? "show-drop-down" : "hide-drop-down"}>
              <ul>
                <li>Africa</li>
                <li>Americas</li>
                <li>Asia</li>
                <li>Europe</li>
                <li>Oceania</li>
              </ul>
            </div>
          </div>
        </div>

        {isLoading ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : (
          mapCountry(listCountry)
        )}
      </div>
    </div>
  );
}

export default Home;
