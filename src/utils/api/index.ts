import axios from "axios"
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })
  axiosClient.interceptors.request.use(
    function(config) {
      return config
    },
    function(error) {
      return Promise.reject(error)
    }
  )
  
export class AxiosModel {
    private _object: any
    constructor(lib: any) {
      this._object = lib
    }
  
    get(uri: string, params = {}, headers = {}) {
      return this._object.get(uri, { params, headers })
    }
    post(uri: string, body = {}, headers = {}) {
      return this._object.post(uri, body, { ...headers })
    }
    put(uri: string, body = {}) {
      return this._object.put(uri, body)
    }
    delete(uri: string, body = {}) {
      return this._object.delete(uri, { data: body })
    }
    patch(uri: string, body = {}) {
      return this._object.patch(uri, body)
    }
  }
  
  const axiosFetch = new AxiosModel(axiosClient)
  export default axiosFetch