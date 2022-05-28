import axiosFetch from "../../../utils/api";

const API = {
    GET_ALL: "/all",
    GET_BY_REGION: (region: any) => `/region/${region}`,
  }
  
  export default class CountriesAPI {
    static getAll = () =>
    axiosFetch.get(API.GET_ALL)

    static getByRegion = (region: any) => 
       axiosFetch.get(API.GET_BY_REGION(region))
  }
  