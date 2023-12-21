/* import { useState, useEffect } from "react";
import httpReqs from "./httpReq";

interface search{
    id: string
}

function GetSearch({id}: search) {
    const [data, setdata] = useState(JSON.parse("[]"));
  
  useEffect( () => {
    async function fetch () {
      let body = [id];
      const response = await httpReqs("get", body, 'user/info');
      setdata(response);
    }
    fetch();
  }, [])

  return( <>
  {JSON.stringify(data)}
  </>)
}

export default GetSearch */
