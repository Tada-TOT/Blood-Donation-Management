import axios from "axios";
import { useState } from "react";


export default function httpReqs( method, body, path){
  var res = ""
  let data = JSON.stringify([
      "1111111111"
    ]);
    
  let config = {
    method: 'GET',
    maxBodyLength: Infinity,
    url: "http://192.168.43.97:8080/api/admin/info/d",
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios.request(config)
  .then((response) => {
    res = JSON.stringify(response.data)
  })
  .catch((error) => {
    console.log(error);
  });

  return(res)
}