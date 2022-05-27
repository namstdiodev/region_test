import { useEffect, useState } from "react";
import CountryCart from "../../components/CountryCart";
import "./style.scss";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import CountriesAPI from "../../services/api/countries";
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
        <>
          {listCountry?.map((item, index) => {
            return <CountryCart index={index} data={item} />;
          })}
        </>
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

  useEffect(() => {
    getAllCountry();
  }, []);

  return (
    <div className="App">
      <header className=""></header>
      <div className="content-body">
        <div>Filter</div>
        <div className="list-country">
          <input value={filterParams?.name} onChange={(e) => handleSearch(e)} />
          {isLoading ? (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          ) : (
            mapCountry(listCountry)
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
