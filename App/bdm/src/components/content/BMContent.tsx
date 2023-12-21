import { useState } from "react";

function BMContent() {
  const [isActive, setIsActive] = useState(-1);

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
          Match Blood Types
        </h1>
        <p>
          In the heart of our blood bank, we prioritize the life-saving
          connection between donors and recipients. Just as every individual is
          unique, so too is their blood type, a crucial factor in ensuring
          successful transfusions. With an unwavering commitment to health and
          well-being, our dedicated team works tirelessly to match compatible
          blood types, uniting the generosity of donors with the urgent needs of
          those requiring transfusions.
        </p>

        <p>
          Whether you possess the universal O-negative blood type or one of the
          diverse A, B, or AB types, your contribution plays a vital role in our
          mission to safeguard lives. In our pursuit of excellence, we employ
          cutting-edge technology and rigorous testing protocols to ensure the
          utmost accuracy in matching blood types, fostering a culture of trust
          and reliability. Together, through the gift of blood, we form a
          lifeline that transcends individual differences and transforms
          altruism into a powerful force for good. Join us in this
          life-affirming journey as we make a difference, one compatible match
          at a time.
        </p>

        <h1 className="display-6">
          <img
            src="/images/Blood_drop_plain.png"
            alt="Logo"
            width="50"
            height="50"
            className="align-text-top"
          ></img>
          To match a blood type, click on a blood bag.
          
        </h1>
        <h3 className="lead ms-5"> Note: Each blood bag can recieve/donate to itself </h3>

        <div className="container justify-content-center text-center">
          <div className="row row-cols-1 row-cols-lg-4 g-lg-5">
            <div className="col align-items-center">
              <div className="p-3 align-items-center">
                <img
                  id="bb_0"
                  onClickCapture={() =>
                    isActive === 0 ? setIsActive(-1) : setIsActive(0)
                  }
                  style={{
                    scale: isActive === 0 ? "1.2" : "1",
                    transition: "0.25s all ease-in",
                  }}
                  src="/images/A-plus-blood-bag.svg"
                  alt=""
                />
                <div>
                  <div className="w-100"></div>
                  <span
                    className="text-success-emphasis bg-success-subtle border border-success-subtle rounded-3"
                    style={{
                      visibility: isActive === 2 ? "visible" : "hidden",
                    }}
                  >
                    {" "}
                    Can donate{" "}
                  </span>
                  <div className="w-100"></div>
                  <span
                    className="text-success-emphasis bg-success-subtle border border-success-subtle rounded-3"
                    style={{
                      visibility: isActive === 3 || isActive === 4 || isActive === 7  ? "visible" : "hidden",
                    }}
                  > Can Recieve </span>
                </div>
              </div>
            </div>
            <div className="col align-items-center">
              <div className="p-3 align-items-center">
                <img
                  id="bb_1"
                  onClickCapture={() =>
                    isActive === 1 ? setIsActive(-1) : setIsActive(1)
                  }
                  style={{
                    scale: isActive === 1 ? "1.2" : "1",
                    transition: "0.25s all ease-in",
                  }}
                  src="/images/B-plus-blood-bag.svg"
                  alt=""
                />
                <div>
                  <div className="w-100"></div>
                  <span
                    className="text-success-emphasis bg-success-subtle border border-success-subtle rounded-3"
                    style={{
                      visibility: isActive === 2 ? "visible" : "hidden",
                    }}
                  >
                    {" "}
                    Can donate{" "}
                  </span>
                  <div className="w-100"></div>
                  <span
                    className="text-success-emphasis bg-success-subtle border border-success-subtle rounded-3"
                    style={{
                      visibility: isActive === 3 || isActive === 5 || isActive === 7  ? "visible" : "hidden",
                    }}
                  > Can Recieve </span>
                </div>
              </div>
            </div>
            <div className="col align-items-center">
              <div className="p-3 align-items-center">
                <img
                  id="bb_2"
                  onClickCapture={() =>
                    isActive === 2 ? setIsActive(-1) : setIsActive(2)
                  }
                  style={{
                    scale: isActive === 2 ? "1.2" : "1",
                    transition: "0.25s all ease-in",
                  }}
                  src="/images/AB-plus-blood-bag.svg"
                  alt=""
                />
                <div>
                  <div className="w-100"></div>
                  <span
                    className="text-success-emphasis bg-success-subtle border border-success-subtle rounded-3"
                    style={{
                      visibility: "hidden",
                    }}
                  >
                    {" "}
                    Can donate{" "}
                  </span>
                  <div className="w-100"></div>
                  <span
                    className="text-success-emphasis bg-success-subtle border border-success-subtle rounded-3"
                    style={{
                      visibility: isActive !== 2 && isActive !== -1  ? "visible" : "hidden",
                    }}
                  > Can Recieve </span>
                </div>
              </div>
            </div>
            <div className="col align-items-center">
              <div className="p-3 align-items-center">
                <img
                  id="bb_3"
                  onClickCapture={() =>
                    isActive === 3 ? setIsActive(-1) : setIsActive(3)
                  }
                  style={{
                    scale: isActive === 3 ? "1.2" : "1",
                    transition: "0.25s all ease-in",
                  }}
                  src="/images/O-plus-blood-bag.svg"
                  alt=""
                />
                <div>
                  <div className="w-100"></div>
                  <span
                    className="text-success-emphasis bg-success-subtle border border-success-subtle rounded-3"
                    style={{
                      visibility: isActive === 0 || isActive === 1 || isActive === 2 ? "visible" : "hidden",
                    }}
                  >
                    {" "}
                    Can donate{" "}
                  </span>
                  <div className="w-100"></div>
                  <span
                    className="text-success-emphasis bg-success-subtle border border-success-subtle rounded-3"
                    style={{
                      visibility: isActive === 7 ? "visible" : "hidden",
                    }}
                  > Can Recieve </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-lg-4 g-lg-5 text-center">
            <div className="col align-items-center">
              <div className="p-3 align-items-center">
                <img
                  id="bb_4"
                  onClickCapture={() =>
                    isActive === 4 ? setIsActive(-1) : setIsActive(4)
                  }
                  style={{
                    scale: isActive === 4 ? "1.2" : "1",
                    transition: "0.25s all ease-in",
                  }}
                  src="/images/A-neg-blood-bag.svg"
                  alt=""
                />
                <div>
                  <div className="w-100"></div>
                  <span
                    className="text-success-emphasis bg-success-subtle border border-success-subtle rounded-3"
                    style={{
                      visibility: isActive === 0 || isActive === 2 || isActive === 6 ? "visible" : "hidden",
                    }}
                  >
                    {" "}
                    Can donate{" "}
                  </span>
                  <div className="w-100"></div>
                  <span
                    className="text-success-emphasis bg-success-subtle border border-success-subtle rounded-3"
                    style={{
                      visibility: isActive === 7  ? "visible" : "hidden",
                    }}
                  > Can Recieve </span>
                </div>
              </div>
            </div>
            <div className="col align-items-center">
              <div className="p-3 align-items-center">
                <img
                  id="bb_5"
                  onClickCapture={() =>
                    isActive === 5 ? setIsActive(-1) : setIsActive(5)
                  }
                  style={{
                    scale: isActive === 5 ? "1.2" : "1",
                    transition: "0.25s all ease-in",
                  }}
                  src="/images/B-neg-blood-bag.svg"
                  alt=""
                />
                <div>
                  <div className="w-100"></div>
                  <span
                    className="text-success-emphasis bg-success-subtle border border-success-subtle rounded-3"
                    style={{
                      visibility: isActive === 1 || isActive === 2 || isActive === 6 ? "visible" : "hidden",
                    }}
                  >
                    {" "}
                    Can donate{" "}
                  </span>
                  <div className="w-100"></div>
                  <span
                    className="text-success-emphasis bg-success-subtle border border-success-subtle rounded-3"
                    style={{
                      visibility: isActive === 7  ? "visible" : "hidden",
                    }}
                  > Can Recieve </span>
                </div>
              </div>
            </div>


            <div className="col align-items-center">
              <div className="p-3 align-items-center">
                <img
                  id="bb_6"
                  onClickCapture={() =>
                    isActive === 6 ? setIsActive(-1) : setIsActive(6)
                  }
                  style={{
                    scale: isActive === 6 ? "1.2" : "1",
                    transition: "0.25s all ease-in",
                  }}
                  src="/images/AB-neg-blood-bag.svg"
                  alt=""
                />
                <div>
                  <div className="w-100"></div>
                  <span
                    className="text-success-emphasis bg-success-subtle border border-success-subtle rounded-3"
                    style={{
                      visibility: isActive === 2  ? "visible" : "hidden",
                    }}
                  >
                    {" "}
                    Can donate{" "}
                  </span>
                  <div className="w-100"></div>
                  <span
                    className="text-success-emphasis bg-success-subtle border border-success-subtle rounded-3"
                    style={{
                      visibility: isActive === 4 || isActive === 5 || isActive === 7  ? "visible" : "hidden",
                    }}
                  > Can Recieve </span>
                </div>
              </div>
            </div>
            <div className="col align-items-center">
              <div className="p-3 align-items-center">
                <img
                  id="bb_7"
                  onClickCapture={() =>
                    isActive === 7 ? setIsActive(-1) : setIsActive(7)
                  }
                  style={{
                    scale: isActive === 7 ? "1.2" : "1",
                    transition: "0.25s all ease-in",
                  }}
                  src="/images/O-neg-blood-bag.svg"
                  alt=""
                />
                <div>
                  <div className="w-100"></div>
                  <span
                    className="text-success-emphasis bg-success-subtle border border-success-subtle rounded-3"
                    style={{
                      visibility: isActive !== 7 && isActive != -1 ? "visible" : "hidden",
                    }}
                  >
                    {" "}
                    Can donate{" "}
                  </span>
                  <div className="w-100"></div>
                  <span
                    className="text-success-emphasis bg-success-subtle border border-success-subtle rounded-3"
                    style={{
                      visibility: "hidden",
                    }}
                  > Can Recieve </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BMContent;
