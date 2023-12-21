import axios from "axios";


export default async function httpReqs(method: string = "GET", body: string[] = [""], path: string = ""){
  let res = JSON; 
  let pathNEW = path;

  if (method.toUpperCase() === "GET"){
    if (body.length === 1){ pathNEW = pathNEW + "/" + body[0];  }
    else if (body.length === 2){  pathNEW = pathNEW + "/" + body[0] + "/" + body[1];  }  }
  /*  else {  pathNEW = path  } }
  else {  pathNEW = path  }*/
  
  let config = {
    method: method,
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8080/api/" + pathNEW,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : body
  };
  console.log(config);

  res = (await axios.request(config)).data
  /*axios.request(config)
  .then((response) =>
    response.data
  ).then((json) => {
    res = json;
  }).catch((error) => {
    console.log(error);
  });*/
  
  return res;
}