import { useState } from "react";
import httpReqs from "../../httpReq";

interface Status {
  userStatus: string;
}

function DonateContent({ userStatus }: Status) {
  const [returnedData, setReData] = useState(JSON.parse("[]"));

  const [formData, setFormData] = useState({
    bd: ''
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const postData = new FormData();
    postData.append("nID", formData.bd);

    let data = [formData.bd];
    const response = await httpReqs("POST", data, "admin/scheduledrive");
    setReData(response);

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

  console.log (returnedData);

  if (userStatus === "guest") {
    return (
      <>
        <div className="container-fluid">
          <div
            className="row justify-content-center"
            style={{ marginTop: "2rem" }}
          >
            <h1 className="display-5">
              {" "}
              <img
                src="/images/Blood_drop_plain.png"
                alt="Logo"
                width="50"
                height="50"
                className="align-text-top"
              ></img>{" "}
              Donate Today to help
            </h1>

            {
              <p className="lead">
                Blood donation is a selfless act that directly contributes to
                saving lives. Every drop you give can make a world of difference
                to someone in need. Whether it's a patient undergoing surgery, a
                cancer patient, or an accident victim, your donation can be a
                lifeline.
              </p>
            }
            <div className="row justify-content-end">
              <div className="col">
                <a href="/Login">
                  <button className="btn btn btn-info btn-lg">
                    {" "}
                    Sign Up and Donate Today{" "}
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (userStatus === "user") {
    return (
      <>
        <div className="container-fluid">
          <div
            className="row justify-content-center"
            style={{ marginTop: "2rem" }}
          >
            <h1 className="display-5">
              {" "}
              <img
                src="images/Blood_drop_plain.png"
                alt="Logo"
                width="50"
                height="50"
                className="align-text-top"
              ></img>{" "}
              Donate Today to help
            </h1>

            {
              <p className="lead">
                Blood donation is a selfless act that directly contributes to
                saving lives. Every drop you give can make a world of difference
                to someone in need. Whether it's a patient undergoing surgery, a
                cancer patient, or an accident victim, your donation can be a
                lifeline.
              </p>
            }
            <div className="row justify-content-end">
              <div className="col">
                <button className="btn btn btn-info btn-lg">
                  {" "}
                  Donate Today{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (userStatus === "admin") {
    return (
      <>
        <div className="container-fluid">
          <div
            className="row justify-content-center"
            style={{ marginTop: "2rem" }}
          >
            <h1 className="display-5">
              {" "}
              <img
                src="/images/Blood_drop_plain.png"
                width="50"
                height="50"
                className="align-text-top"
              ></img>{" "}
              Schedule Drive
            </h1>
            <div className="container-flui h-100">
              <div className="container-lg justify-content-center align-items-center">
                <ul
                  className="nav nav-pills nav-justified mb-3"
                  id="ex1"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <a
                      className={"nav-link active"}
                      id="tab-login"
                      data-mdb-toggle="pill"
                      href="#pills-login"
                      role="tab"
                      aria-controls="pills-login"
                      aria-selected="false"
                    >
                      Drive Date
                    </a>
                  </li>
                </ul>

                <div className="tab-content">
                  <div
                    className={"tab-pane fade show active"}
                    id="#pills-login"
                    role="tabpanel"
                    aria-labelledby="tab-login"
                  >
                    <form id="myForm" onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="bd">
                          Select Drive Date
                        </label>
                        <input
                          type="date"
                          id="bd"
                          name="bd"
                          value={formData.bd}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-outline-success mb-7"
                      >
                        Confirm
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DonateContent;
