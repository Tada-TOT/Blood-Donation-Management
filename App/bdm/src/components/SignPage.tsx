import { useState } from "react";
import httpReqs from "../httpReq";

function SignPage() {

  const [signInR, setSignInR] = useState(JSON.parse("[]"))
  const [signUpR, setSignUpR] = useState(JSON.parse("[]"))

  const [signInFormData, setSignInFormData] = useState({
    username: '',
    password: ''
  });
  const [signUpFormData, setSignUpFormData] = useState({
    fname: '',
    mname: '',
    lname: '',
    username: '',
    weight: '',
    email: '',
    password: '',
    gender: '',
    bloodt: '',
    bloodrh: '',
    nid: '',
    bd: '',
    md: '',
    phone: '',
    address: ''
  });

  const handleSignInInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setSignInFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSignUpInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setSignUpFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSignInSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const postData = new FormData();
    postData.append('username', signInFormData.username);
    postData.append('password', signInFormData.password);

   
    let data = [signInFormData.username, signInFormData.password];
    const response = await httpReqs("post", data, 'login');
    setSignInR(response);
  };
  const handleSignUpSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const postData = new FormData();
    postData.append('fname', signUpFormData.fname);
    postData.append('mname', signUpFormData.mname);
    postData.append('lname', signUpFormData.lname);
    postData.append('username', signUpFormData.username);
    postData.append('weight', signUpFormData.weight);
    postData.append('email', signUpFormData.email);
    postData.append('password', signUpFormData.password);
    postData.append('gender', signUpFormData.gender);
    postData.append('bloodt', signUpFormData.bloodt);
    postData.append('bloodrh', signUpFormData.bloodrh);
    postData.append('nid', signUpFormData.nid);
    postData.append('bd', signUpFormData.bd);
    postData.append('phone', signUpFormData.phone);
    postData.append('address', signUpFormData.address);
    let ldd = "null";
    let df = "null";
    let rf = "null";
    let ef = "null";
    let eid = "null";
    let is_Admin = "null";

    let data = [signUpFormData.nid, signUpFormData.address, signUpFormData.weight, signUpFormData.fname, signUpFormData.mname, signUpFormData.lname,
      signUpFormData.bd, signUpFormData.gender, signUpFormData.email, signUpFormData.phone, ldd, df, rf, ef, eid, signUpFormData.username, 
      signUpFormData.password, is_Admin, signUpFormData.bloodt, signUpFormData.bloodrh];
    const response = await httpReqs("post", data, 'signup');
    setSignUpR(response);
  };

  console.log(signInR)
  console.log(signUpR)

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
              Login
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className={isActive === 1 ? "nav-link active" : "nav-link"}
              id="tab-register"
              data-mdb-toggle="pill"
              onClick={() => setActive(1)}
              href="#pills-register"
              role="tab"
              aria-controls="#pills-register"
              aria-selected="true"
            >
              Register
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
            <form id="signInForm" onSubmit={handleSignInSubmit}>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="loginName">
                  Username
                </label>
                <input type="text" name="username" value={signInFormData.username} onChange={handleSignInInputChange} className="form-control" />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="loginPassword">
                  Password
                </label>
                <input type="password" name="password" value={signInFormData.password} onChange={handleSignInInputChange} className="form-control"
                />
              </div>

              <div className="row mb-4">
                <div className="col-md-6 d-flex justify-content-center">
                  <div className="form-check mb-3 mb-md-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="loginCheck"
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="loginCheck">
                      {" "}
                      Remember me{" "}
                    </label>
                  </div>
                </div>

                <div className="col-md-6 d-flex justify-content-center">
                  <a href="#!">Forgot password?</a>
                </div>
              </div>

              <button
                type="submit"
                value="Submit"
                className="btn btn-outline-success mb-7"
              >
                Sign in
              </button>
            </form>
          </div>
          <div
            className={
              isActive === 1 ? "tab-pane fade show active" : "tab-pane"
            }
            id="#pills-register"
            role="tabpanel"
            aria-labelledby="tab-register"
          >
            <form id="signUpForm" onSubmit={handleSignUpSubmit}>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="registerFName">
                  First Name
                </label>
                <input type="text" name="fname" value={signUpFormData.fname} onChange={handleSignUpInputChange} className="form-control" required
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="registerMName">
                  Middle Name
                </label>
                <input type="text" name="mname" value={signUpFormData.mname} onChange={handleSignUpInputChange} className="form-control"
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="registerLName">
                  Last Name
                </label>
                <input type="text" name="lname" value={signUpFormData.lname} onChange={handleSignUpInputChange} className="form-control" required
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="registerLName">
                  Address
                </label>
                <input type="text" name="address" value={signUpFormData.address} onChange={handleSignUpInputChange} className="form-control"
                />
              </div>

              {/*<!-- Username input -->*/}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="registerUsername">
                  Username
                </label>
                <input type="text" name="username" value={signUpFormData.username} onChange={handleSignUpInputChange} className="form-control" required
                />
              </div>

              
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="registerWeight">
                  Weight
                </label>
                <input type="text" name="weight" value={signUpFormData.weight} onChange={handleSignUpInputChange} className="form-control" required
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="registerEmail">
                  Email
                </label>
                <input type="email" name="email" value={signUpFormData.email} onChange={handleSignUpInputChange} className="form-control" required
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="registerEmail">
                  Phone
                </label>
                <input type="phone" name="phone" value={signUpFormData.phone} onChange={handleSignUpInputChange} className="form-control" required
                />
              </div>

              {/*<!-- Password input -->*/}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="registerPassword">
                  Password
                </label>
                <input type="password" name="password" value={signUpFormData.password} onChange={handleSignUpInputChange} className="form-control" required
                />
              </div>

              {/* Input for Gender */}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="gender">
                  Gender
                </label>
                <input type="text" name="gender" value={signUpFormData.gender} onChange={handleSignUpInputChange} className="form-control" required placeholder="m/f"
                />
              </div>

              {/* Input for Blood Type */}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="registerBtype">
                  Blood Type
                </label>
                <input type="text"  name="bloodt" value={signUpFormData.bloodt} onChange={handleSignUpInputChange} className="form-control" required placeholder="A/B/AB/O"
                />
              </div>

              {/* Input for Rh Factor */}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="RhFactor">
                  Rh Factor
                </label>
                <input type="text"  name="bloodrh" value={signUpFormData.bloodrh} onChange={handleSignUpInputChange} className="form-control" required placeholder="+/-"
                />
              </div>

              {/* Input for National ID*/}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="NationalID">
                  National Id
                </label>
                <input type="text" name="nid" value={signUpFormData.nid} onChange={handleSignUpInputChange} className="form-control" required
                />
              </div>

              {/* Input for Birth Date */}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="Birth_Date">
                  Birth Date
                </label>
                <input type="date" name="bd" value={signUpFormData.bd} onChange={handleSignUpInputChange} className="form-control" required
                />
              </div>

              {/* Input for Diseas Check */}
              <div className="form-check mb-4">
                <label className="form-check-label" htmlFor="diseasCheck">
                  Do you suffer from any Major Diseases? (Tick if Yes)
                </label>
                <input className="form-check-input me-2" type="checkbox" name="md" value={signUpFormData.md} onChange={handleSignUpInputChange} aria-describedby="registerCheckHelpText"
                />
              </div>

              <div className="form-check d-flex justify-content-center mb-4">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  value=""
                  id="registerCheck"
                  defaultChecked
                  aria-describedby="registerCheckHelpText"
                />
                <label className="form-check-label" htmlFor="registerCheck">
                  I have read and agree to the terms
                </label>
              </div>

              <button
                type="submit"
                value="Submit"
                className="btn btn-primary btn-block mb-3"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignPage;