import RowGenerator from "./RowGenerator";

import { MouseEvent, useState } from "react";

interface Status {
  userStatus: string;
}

function SearchContent({ userStatus }: Status) {
  const reportHandler = (event: MouseEvent) => {
    console.log(event);
  };

  var [active_r, setActive_r] = useState(true);
  var [active_d, setActive_d] = useState(true);
  var [active_e, setActive_e] = useState(true);

  const handelCheck_r = (event: MouseEvent) => {
    console.log(event);
    setActive_r((active_r) => !active_r);
  };
  const handelCheck_d = (event: MouseEvent) => {
    console.log(event);
    setActive_d((active_d) => !active_d);
  };
  const handelCheck_e = (event: MouseEvent) => {
    console.log(event);
    setActive_e((active_e) => !active_e);
  };

  const handelClick = (event: MouseEvent) => {
    console.log(event);
    searchTable();
  };

  function searchTable() {
    // Declare variables
    var input: any, filter, table: any, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementsByClassName("table");
    console.log(table);
    tr = document.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  if (userStatus === "admin") {
    return (
      <>
        <div className="clearfix">
          <h1 className="display-5">
            <img
              src="/images/Blood_drop_plain.png"
              alt="Logo"
              width="50"
              height="50"
              className="align-text-top"
            ></img>
            Search for blood bank information
          </h1>
        </div>
        <div className="container-fluid d-flex align-items-center">
          <div className="d-flex col-4 me-4">
            <input
              id="searchInput"
              className="form-control me-3"
              type="text"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success"
              onClick={(MouseEvent) => handelClick(MouseEvent)}
            >
              Search
            </button>
          </div>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              value="receivers"
              id="receivers_table"
              role="switch"
              defaultChecked
              onClick={(MouseEvent) => handelCheck_r(MouseEvent)}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Receivers
            </label>
          </div>
          <div className="form-check form-switch m-4">
            <input
              className="form-check-input"
              type="checkbox"
              value="donors"
              id="donors_table"
              defaultChecked
              onClick={(MouseEvent) => handelCheck_d(MouseEvent)}
            />
            <label className="form-check-label" htmlFor="flexCheckChecked">
              Donors
            </label>
          </div>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              value="employees"
              id="emp_table"
              defaultChecked
              onClick={(MouseEvent) => handelCheck_e(MouseEvent)}
            />
            <label className="form-check-label" htmlFor="flexCheckChecked">
              Employees
            </label>
          </div>
          <a href="/SearchHistory">
            <button
              className="btn btn-sm btn-info m-4"
              onClick={(MouseEvent) => {
                reportHandler(MouseEvent);
              }}
            >
              Show History
            </button>
          </a>

          <button className="btn btn-sm btn-warning m-2">
            {
              <img
                src="/images/edit-text.png"
                style={{ width: "16px", height: "16px" }}
              />
            }
          </button>
          <a href="/DeleteRecord">
            <button className="btn btn-sm btn-danger m-2">
              <img
                src="/images/x-mark.png"
                style={{ width: "16px", height: "16px" }}
              />
            </button>
          </a>

          <button className="btn btn-sm btn-success m-2">
            <img
              src="/images/arrow.png"
              style={{ width: "16px", height: "16px" }}
            />
          </button>
          <a href="/RequestBlood">
            <button
              className="btn btn-sm btn-secondary m-4"
              onClick={(MouseEvent) => {
                reportHandler(MouseEvent);
              }}
            >
              {" "}
              {/*Request Blood*/}
              Request Blood
            </button>
          </a>
        </div>
        <div
          className="container-fluid"
          style={{ display: active_e ? "" : "none" }}
        >
          {/*
    Available colors for the full background: full-color-blue, full-color-azure, full-color-green, full-color-red, full-color-orange
    Available colors only for the toolbar: toolbar-color-blue, toolbar-color-azure, toolbar-color-green, toolbar-color-red, toolbar-color-orange
  -->*/}

          <h3> Employee Table</h3>

          <table className="table table-info table-striped">
            <thead>
              <th data-field="id">National ID</th>
              <th data-field="name">Employee ID</th>
              <th data-field="salary">Name</th>
              <th data-field="country">Phone Number</th>
              <th className="col-3" data-field="city">
                Address
              </th>
            </thead>
            <tbody>
              <RowGenerator user={"employee"} />
            </tbody>
          </table>
        </div>
        <div
          className="container-fluid"
          style={{ display: active_d ? "" : "none" }}
        >
          {/*
    Available colors for the full background: full-color-blue, full-color-azure, full-color-green, full-color-red, full-color-orange
    Available colors only for the toolbar: toolbar-color-blue, toolbar-color-azure, toolbar-color-green, toolbar-color-red, toolbar-color-orange
  -->*/}

          <h3> Donor Table</h3>

          <table className="table table-success table-striped">
            <thead>
              <th data-field="id">National ID</th>
              <th data-field="LD_Date">Last Donation Date</th>
              <th data-field="name">Name</th>
              <th data-field="phone">Phone Number</th>
              <th data-field="bType">Blood type</th>
              <th data-field="Gender">Gender</th>
            </thead>
            <tbody>
              <RowGenerator user={"donor"} />
            </tbody>
          </table>
        </div>
        <div
          className="container-fluid"
          style={{ display: active_r ? "" : "none" }}
        >
          {/*
    Available colors for the full background: full-color-blue, full-color-azure, full-color-green, full-color-red, full-color-orange
    Available colors only for the toolbar: toolbar-color-blue, toolbar-color-azure, toolbar-color-green, toolbar-color-red, toolbar-color-orange
  -->*/}

          <h3> Recipent Table</h3>

          <table className="table table-warning table-striped">
            <thead>
              <th data-field="id">National ID</th>
              <th data-field="email">Email</th>
              <th data-field="name">Name</th>
              <th data-field="phone">Phone Number</th>
              <th data-field="bType">Blood type</th>
              <th data-field="Gender">Gender</th>
            </thead>
            <tbody>
              <RowGenerator user={"recipent"} />
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default SearchContent;
