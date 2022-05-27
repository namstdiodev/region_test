import axiosFetch from "../../../utils/api";

const API = {
    getAll: "/all",
  }
  
  export default class CountriesAPI {
    static getAll = () =>
    axiosFetch.get(API.getAll)
  }
  