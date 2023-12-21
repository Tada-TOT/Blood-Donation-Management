import { useState } from "react";
import httpReqs from "../../httpReq";

function RequestBlood() {

  const [returnedData1, setReData1] = useState(JSON.parse("[]"))
  const [returnedData2, setReData2] = useState(JSON.parse("[]"))

  const [formData1, setFormData1] = useState({
    bloodt: '',
    bloodrh: ''
  });
  const [formData2, setFormData2] = useState({
    nid: '',
    bbid: ''
  });

  const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData1((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData2((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit1 = async (event: React.FormEvent) => {
    event.preventDefault();

    const postData = new FormData();
    postData.append('bloodt', formData1.bloodt);
    postData.append('bloodrh', formData1.bloodrh);

    let data = [formData1.bloodt, formData1.bloodrh];
    const response = await httpReqs("get", data, 'admin/searchbloodbags/');
    setReData1(response);
    setActive2(1)

    //return
  };
  const handleSubmit2 = async (event: React.FormEvent) => {
    event.preventDefault();

    const postData = new FormData();
    postData.append('nid', formData2.nid);
    postData.append('bbid', formData2.bbid);

    let data = [formData2.nid, formData2.bbid];
    const response = await httpReqs("post", data, 'admin/assignbagtorecipient');
    setReData2(response);

    //return
  };

  console.log(returnedData1)
  console.log(returnedData2)

  var [isActive] = useState(0);
  var [isActive2, setActive2] = useState(0);


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
            <form id="myForm" onSubmit={handleSubmit1} style={{display: isActive2 === 1 ? "none": ""}}>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="loginName">
                    Blood Group
                    </label>
                    <input type="text" name="bloodt" value={formData1.bloodt} onChange={handleInputChange1} className="form-control" required placeholder="A/B/AB/O"/>
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="loginName">
                    Rh Factor
                    </label>
                    <input type="text" name="bloodrh" value={formData1.bloodrh} onChange={handleInputChange1} className="form-control" required placeholder="+/-"/>
                </div>
              <button
                type="submit"
                className="btn btn-outline-success mb-7"
              >
                Search
              </button>
            </form>
            
            <div className="tab-content">
          <div
            className={
              isActive === 0 ? "tab-pane fade show active" : "tab-pane"
            }
            id="#pills-login"
            role="tabpanel"
            aria-labelledby="tab-login"
          >
            <form id="myForm2" onSubmit={handleSubmit2} style={{display: isActive2 === 1 ? "unset": "none"}}>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="loginName">
                    National ID
                    </label>
                    <input type="text" name="nid" value={formData2.nid} onChange={handleInputChange2} className="form-control" required/>
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="loginName">
                    Blood Bag ID
                    </label>
                    <input type="text" name="bbid" value={formData2.bbid} onChange={handleInputChange2} className="form-control" required/>
                </div>
              <button
                type="submit"
                className="btn btn-outline-success mb-7"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <h3> Available Matching Blood Bags </h3>
          <p>{JSON.stringify(returnedData1)}</p>
      </div>
      </div>
    </div>
    <div className="container-fluid">
        <h3> Result </h3>
          <p>{JSON.stringify(returnedData2)}</p>
          </div>
    </div>
  );
}

export default RequestBlood;