import { useState } from "react";
import httpReqs from "../../httpReq";

function DeleteRecord() {

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

    let data = [formData.nID];
    const response = await httpReqs("delete", data, 'admin/info/');
    setReData(response);
  };

  console.log(returnedData)

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
              Delete Record
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
                Delete
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <h3> Status </h3>
          <p>{JSON.stringify(returnedData)}</p>
      </div>
    </div>
  );
}

export default DeleteRecord;