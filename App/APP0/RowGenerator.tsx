export default function RowGenerator() {

    let data = [
        {
            National_ID: "1119488631",
            Address: "Eastern Region, Dhahran, KFUPM",
            FName: "Ahmed",
            Lname: "Shewaikan",
            BirthDate: "2003-01-21",
            Gender: "M",
            Weight: "74.00",
            E_mail: "s202026720@kfupm.edu.sa",
            Phone: "0541333870",
            Last_DDate: "2023-12-03",
            DFLag:	1,
            RFlag:	1,
            EFlag:	1,
            EID:	"A11111111",
            is_Admin:	1,
            Blood_Group:	"A",
            Rh_Factor:	"+"
        }
]

    let d
    for(d of data) {
        if (d.is_Admin === 1) {
            return(<>
            <tr>
                <td>
                    {d.National_ID}
                </td>
                <td>
                    {d.EID}
                </td>
                <td>
                     {d.FName.concat(", ", d.Lname)}
                </td>
                <td>
                    {d.Phone}
                </td>
                <td>
                    {d.Address}
                </td>
                <td>
                    <img src="/images/edit-text.png" alt="edit" style={{width: "32px", height: "32px"}}/>
                </td>

            </tr>
            </>)
        }
    }
       

}