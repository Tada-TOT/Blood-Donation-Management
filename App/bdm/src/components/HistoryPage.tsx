import { useState } from "react";
import httpReqs from "../httpReq";
import RowGenerateSH from "./content/RowGenerateSH";

function HistoryPage() {

  const [returnedData, setReData] = useState(JSON.parse("[]"))

  const [formData, setFormData] = useState({
    nID: ''
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const postData = new FormData();
    postData.append('nID', formData.nID);


    let data = [formData.nID]
    const response = await httpReqs("GET", data, "admin/searchsinglehistory/")
    setReData(response)


  //   fetch('http://127.0.0.1:8080/api/admin/searchsinglehistory//'.concat(formData.nID), {
  //     method: 'GET'
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setReData(data)
  //     })
  //     .catch((error: any) => {
        
  //     });
  };

  var [isActive, setActive] = useState(0);


  return (
    <div className="container-flui h-100">
      <nav
        style={{ backgroundColor: "#f2f2f2" }}
        className="navbar navbar-expand-lg"
      >
        <div className="row g-3">
          <a className="display-6" href="/">
            {
              <img
                style={{ marginRight: "20px" }}
                src="/Logo.svg"
                alt="Logo"
                width="50"
                height="50"
                className="align-text-top"
              ></img>
            }
            {"BDM"}
          </a>
        </div>
      </nav>
      <div className="container-lg justify-content-center align-items-center">
        <ul
          className="nav nav-pills nav-justified mb-3"
          id="ex1"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <a
              className={isActive === 0 ? "nav-link active" : "nav-link"}
              id="tab-login"
              data-mdb-toggle="pill"
              href="#pills-login"
              onClick={() => setActive(0)}
              role="tab"
              aria-controls="pills-login"
              aria-selected="false"
            >
              Search History
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <div
            className={
              isActive === 0 ? "tab-pane fade show active" : "tab-pane"
            }
            id="#pills-login"
            role="tabpanel"
            aria-labelledby="tab-login"
          >
            <form id="myForm" onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="loginName">
                  National_ID
                </label>
                <input type="text" name="nID" value={formData.nID} onChange={handleInputChange} className="form-control"/>
              </div>
              <button
                type="submit"
                className="btn btn-outline-success mb-7"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      <div
          className="container-fluid"
        >
          {/*
    Available colors for the full background: full-color-blue, full-color-azure, full-color-green, full-color-red, full-color-orange
    Available colors only for the toolbar: toolbar-color-blue, toolbar-color-azure, toolbar-color-green, toolbar-color-red, toolbar-color-orange
  -->*/}

          <h3> Donated</h3>

          <table className="table table-info table-striped">
            <thead>
              <th data-field="id">National ID</th>
              <th data-field="name">Blood Bag ID</th>
              <th data-field="salary">Donating Session ID</th>
            </thead>
            <tbody>
               <RowGenerateSH data={returnedData.Donating}/>
            </tbody>
          </table>
        </div>
        <div
          className="container-fluid"
        >
          {/*
    Available colors for the full background: full-color-blue, full-color-azure, full-color-green, full-color-red, full-color-orange
    Available colors only for the toolbar: toolbar-color-blue, toolbar-color-azure, toolbar-color-green, toolbar-color-red, toolbar-color-orange
  -->*/}

          <h3> Recieved </h3>

          <table className="table table-info table-striped">
            <thead>
              <th data-field="id">National ID</th>
              <th data-field="name">Blood Bag ID</th>
              <th data-field="salary">Payment Confirmed</th>
            </thead>
            <tbody>
              <RowGenerateSH data={returnedData.Receving}/>
            </tbody>
          </table>
        </div>
    </div>
  );
}

export default HistoryPage;
