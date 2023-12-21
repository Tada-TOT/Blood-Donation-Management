
interface Data {
    data: any
}


export default function RowGenerateSH({data}: Data) {

    var datam = []
    for(var i in data)
    datam.push([i, data[i]]);


    let d: any
    let emp
    let empList: any[] = []

    for(d of datam) {
        emp = (<>
            <tr>
                <td>
                    {d[1].PNational_ID}
                </td>
                <td>
                    {d[1].BBag_ID}
                </td>
                <td>
                     {d[1].DSession_ID}
                     {d[1].Payment_Conf}
                </td>
            </tr>
            </>)
            empList.push(emp)
    }

    if (d === undefined) {
        return (<></>)
    }
    return[empList]

}
   

