import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";
import CountryCart from "../../components/CountryCart";
import CountriesAPI from "../../services/api/countries";
import "./style.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { debounce } from "lodash";

import { removeMark } from "../../utils/helper";
import { Link } from "react-router-dom";

function Home() {
  const [listCountry, setListCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterParams, setFilterParams] = useState({
    name: "",
    region: "All",
  });
  const [listRegion, setListRegion] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const mapCountry = (listCountry: Array<object>) => {
    if (listCountry && listCountry?.length) {
      return (
        <Grid
          container
          spacing={{ xs: 2, md: 8 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {listCountry?.map((item: any, index) => (
            <Grid item xs={2} sm={4} md={3} key={index}>
              <Link to={`/detail?country=${item?.name?.common}`}>
                <CountryCart data={item} />
              </Link>
            </Grid>
          ))}
        </Grid>
      );
    } else {
      return "There are currently no countries! Please try again";
    }
  };

  const handleSearch = debounce(async (event: any) => {
    const { value } = event.target;
    let params = {
      name: value,
      region: filterParams?.region,
    };
    try {
      setFilterParams(params);
    } catch (error) {
      console.error({ error });
    }
  }, 500);

  const getListRegion = (data: any) => {
    let list_region: any = ["All"];
    data &&
      data?.length &&
      data?.forEach((item: any) => {
        if (!list_region.includes(item?.region)) {
          list_region.push(item?.region);
        }
      });
    setListRegion(list_region);
  };

  const handleFilterCountry = async (filterParams: any) => {
    setIsLoading(true);
    try {
      const search = removeMark(filterParams?.name?.trim());
      let list_country: any = [];
      let response: any = [];
      if (
        !filterParams?.region ||
        filterParams?.region === "" ||
        filterParams?.region === "All"
      ) {
        response = await CountriesAPI.getAll();
        response = response?.data;
        getListRegion(response);
      } else {
        response = await CountriesAPI.getByRegion(filterParams?.region);
        response = response?.data;
      }
      if (
        filterParams?.name &&
        filterParams?.name !== "" &&
        response &&
        response?.length
      ) {
        response?.forEach((item: any) => {
          if (
            search
              .split(" ")
              .every((u: any) => removeMark(item?.name?.common).includes(u))
          ) {
            list_country?.push(item);
          }
        });
      } else list_country = response;
      await setListCountry(list_country || []);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error({ error });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFilterCountry(filterParams);
  }, [filterParams]);

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
              onChange={(e) => {
                e.preventDefault();
                handleSearch(e);
              }}
            />
          </div>
          <div className="group-filter-region">
            <button onClick={handleClick} className="filter-region">
              <div className="filter-region-text">
                {filterParams?.region === "All"
                  ? "Filter by Region"
                  : filterParams?.region}
              </div>
              <KeyboardArrowDownIcon />
            </button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {listRegion?.length &&
                listRegion?.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        setFilterParams({
                          name: filterParams?.name,
                          region: item,
                        });
                        handleClose();
                      }}
                    >
                      {item}
                    </MenuItem>
                  );
                })}
            </Menu>
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
