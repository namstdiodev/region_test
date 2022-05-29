import axiosFetch from "../../../utils/api";

const API = {
    GET_ALL: "/all",
    GET_BY_REGION: (region: any) => `/region/${region}`,
    GET_BY_NAME: (name: any) => `/name/${name}`,
    GET_LIST_CODE: (codes: string) =>  `alpha/?codes=${codes}`
  }
  
  export default class CountriesAPI {
    static getAll = () =>
    axiosFetch.get(API.GET_ALL)

    static getListCodes = (codes: string) =>
    axiosFetch.get(API.GET_LIST_CODE(codes))
    
    static getByRegion = (region: any) => 
       axiosFetch.get(API.GET_BY_REGION(region))

    static getByName = (name: any) => 
       axiosFetch.get(API.GET_BY_NAME(name))
  }
  