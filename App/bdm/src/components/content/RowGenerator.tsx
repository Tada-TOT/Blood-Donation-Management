import axios from "axios";
import { useEffect, useState } from "react";

interface Status{
    user: string
}

export default function RowGenerator({user}: Status) {

    

    let [data, setData] = useState(JSON.parse("[]"))

    useEffect(() => {
        axios
          .get("http://127.0.0.1:8080/api/admin/info/a")
          .then((response) => response.data)
          .then((json) => {
            setData(json);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
      
    let d: any
    let emp
    let empList: any[] = []

    for(d of data) {
        if (d.EFlag === 1 && user === "employee") {
           emp = (<>
            <tr>
                <td>
                    {d.National_ID}
                </td>
                <td>
                    {d.EID}
                </td>
                <td>
                     {d.FName.concat(", ", d.LName)}
                </td>
                <td>
                    {d.Phone}
                </td>
                <td>
                    {d.Address}
                </td>
            </tr>
            </>)
            empList.push(emp)
        }

        else if (d.DFlag === 1 && user === "donor") {
            emp = (<>
             <tr>
                 <td>
                     {d.National_ID}
                 </td>
                 <td>
                     {d.Last_DDate}
                 </td>
                 <td>
                      {d.FName.concat(", ", d.LName)}
                 </td>
                 <td>
                    {d.Phone}
                 </td>
                 <td>
                     {d.Blood_Group.concat(d.Rh_Factor)}
                 </td>
                 <td>
                     {d.Gender}
                 </td>
             </tr>
             </>)
             empList.push(emp)
         }
        
         else if (d.RFlag === 1 && user === "recipent") {
            emp = (<>
             <tr id={d.National_ID}>
                 <td>
                     {d.National_ID}
                 </td>
                 <td>
                     {d.E_mail}
                 </td>
                 <td>
                      {d.FName.concat(", ", d.LName)}
                 </td>
                 <td>
                    {d.Phone}
                 </td>
                 <td>
                     {d.Blood_Group.concat(d.Rh_Factor)}
                 </td>
                 <td>
                     {d.Gender}
                 </td>
             </tr>
             </>)
             empList.push(emp)
         }

    }
    return [empList]
       

}