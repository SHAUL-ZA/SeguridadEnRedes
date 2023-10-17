import { fetchUtils } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

const fetchJsonUtil = (url, options={})=>{
    if(!options.headers){
        options.headers=new Headers({Accept: "application/json"})
    }
    options.headers.set("Authentication", localStorage.getItem("auth"));
    // console.log(url);
    // console.log(options);
    return fetchUtils.fetchJson(url, options);
};


export const dataProvider = jsonServerProvider("https://localhost:1337", fetchJsonUtil);
