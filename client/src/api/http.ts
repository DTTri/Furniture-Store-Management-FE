/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { Axios } from "axios";

class Http {
  instance: Axios;
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:8080",
      timeout: 10000,
      withCredentials: true,
    });
  }
  setAuthHeader(token: string) {
    console.log("SETAUTHHEADE", token);
    this.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  removeAuthHeader() {
    delete this.instance.defaults.headers.common["Authorization"];
  }
  get(url: string) {
    return this.instance.get(url);
  }
  post(url: string, data: any) {
    return this.instance.post(url, data);
  }
  put(url: string, data: any) {
    return this.instance.put(url, data);
  }
  delete(url: string) {
    return this.instance.delete(url);
  }
  patch(url: string, data: any) {
    return this.instance.patch(url, data);
  }
}

const http = new Http();
export default http;
