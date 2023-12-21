import SCRow from "./SCRow"



function HomeContent() {
   
  const sc = new SCRow()

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
              <button className="btn btn btn-info btn-lg">
                {" "}
                Donate Today{" "}
              </button>
            </div>
          </div>
        </div>

        <div
          className="row justify-content-center"
          style={{ marginTop: "2rem" }}
        >
          <h1 className="display-5">
            <img
              src="/images/Blood_drop_plain.png"
              alt="Logo"
              width="50"
              height="50"
              className="align-text-top"
            ></img>
            The Lifesaving Mission of Our Blood Bank
          </h1>

          {
            <p className="lead">
              In times of medical emergencies, the availability of donated blood
              can be the crucial difference between life and death. Our blood
              bank stands as a beacon of hope for individuals in need of this
              life-saving resource. Whether a patient is undergoing surgery,
              battling a severe illness, or recovering from a traumatic injury,
              the timely availability of compatible blood becomes paramount. Our
              dedicated team at the blood bank is committed to ensuring that
              every request for blood is met with urgency and efficiency. With a
              diverse inventory of blood types, we strive to be a reliable
              source for hospitals and medical facilities, providing the
              essential support needed for optimal patient care. If you or a
              loved one is in need of blood, please reach out to our blood bank
              at BDM. We are here to assist you in your time of need and are
              grateful to those who generously contribute to the noble cause of
              saving lives through blood donation. Together, we can make a
              significant impact on the well-being of our community.
            </p>
          }
          <div className="row justify-content-end">
            <div className="col">
              <button className="btn btn btn-danger btn-lg">
                Check Supply
              </button>
            </div>
          </div>
        </div>
      </div>
      {sc.data}
    </>
  );
}

export default HomeContent;
