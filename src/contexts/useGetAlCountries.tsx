import { useEffect, useState } from "react";
import CountriesAPI from "../services/api/countries";
const useGetAllCountries = () => {
  const [countries, setCountries] = useState([]);
  const getAllCountries = async () => {
    try {
      const response = await CountriesAPI.getAll();
      setCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCountries();
  }, []);
  return {
    countries: countries,
  };
};
export default useGetAllCountries;
