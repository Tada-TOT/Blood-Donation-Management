interface Status {
  userStatus: string;
}

export default function ReportContent({ userStatus }: Status) {
  if (userStatus === "admin") {
    return (
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
           Generate Reports About Blood Bank
          </h1>
          <div className="container-flui h-100"> 
          <form action="http://127.0.0.1:8080/api/admin/reports/blooddonation/8" method="get">
            <button
              className="btn btn-lg btn-info m-4"
              type="submit"
            >
              {/*Request Payments*/}
              List Donations - Last Week
            </button>
          </form>
          <form action="http://127.0.0.1:8080/api/admin/reports/blooddonation/31" method="get">
            <button
              className="btn btn-lg btn-info m-4"
              type="submit"
            >
              {/*Request Payments*/}
              List Donations - Last Month
            </button>
          </form>
          <form action="http://127.0.0.1:8080/api/admin/reports/bloodstock/" method="get">
            <button
              className="btn btn-lg btn-info m-4"
              type="submit"
            >
              {/*Request Payments*/}
              List Blood Stock
            </button>
          </form>
          <form action="http://127.0.0.1:8080/api/admin/reports/collectiondrive/" method="get">
            <button
              className="btn btn-lg btn-info m-4"
              type="submit"
            >
              {/*Request Payments*/}
              List Collection Drives
            </button>
          </form>
          <form action="http://127.0.0.1:8080/api/admin/reports/payments/" method="get">
            <button
              className="btn btn-lg btn-info m-4"
              type="submit"
            >
              {/*Request Payments*/}
              List All confirmed Payments
            </button>
          </form>
          </div>
        </div>
      </div>
    );
  }
}
