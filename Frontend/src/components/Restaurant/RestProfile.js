import CustNavbar from "./../Customer/CustNavbar";
import React, { Component, useState, useEffect } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactModal from "react-modal";
import BACKEND_URL from "../../config/configBackendURL";
import { useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import RestNavbar from "./RestNavbar";
import { useHistory } from "react-router-dom";

function RestProfile({ props }) {
  //const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [location, setLocaion] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [profileImageUpdate, setProfileImageUpdate] = useState(false);
  const [profileImagePath, setProfileImagePath] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [fileUpload, setFileUpload] = useState("");
  const [bearer, setBearer] = useState("");
  const [modeOfDelivery, setModeOfDelivery] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  let uid = localStorage.getItem("id");
  let role = localStorage.getItem("role");
  const options = useMemo(() => countryList().getData(), []);
  let history = useHistory();
  const id = localStorage.getItem("id");

  useEffect(() => {
    var body = {
      restId: id,
    };
    axios({
      method: "post",
      url: BACKEND_URL + "/getRestProfile",
      data: body,
      headers: { "Content-Type": "application/json", Authorization: bearer },
    })
      .then((response) => {
       // console.log("restaurant data", response.data);
        //setRestData(response.data);
        setName(response.data[0].name);
        setLocaion(response.data[0].location);
        setPhone(response.data[0].phone);
        setDescription(response.data[0].description);
        setProfileUrl(response.data[0].profileUrl);
        setModeOfDelivery(response.data[0].modeOfDelivery)
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleLocationChange = (e) => {
    setLocaion(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };
  const handleDeliveryModeChange = (e) => {
    setModeOfDelivery(e.target.value)
  };
  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };
  const handleFromTimeChange = (e) => {
    setFromTime(e.target.value);
  };
  const handleToTimeChange = (e) => {
    setToTime(e.target.value);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const timing =
      fromDate + " to " + toDate + " " + fromTime + " to " + toTime;
    let body = {
      id: id,
      name: name,
      location: location,
      phone: phone,
      description: description,
      timing: timing,

      modeOfDelivery: modeOfDelivery,
    };
//console.log("all state values", body);
    axios({
      method: "put",
      url: BACKEND_URL + "/updateRestProfile",
      data: body,
      headers: { "Content-Type": "application/json", Authorization: bearer },
    })
      .then((response) => {
        //console.log("update profile status", response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });

    history.push("/restDashBoard");
  };
  const toggleImageUpdate = (e) => {
    setProfileImageUpdate(!profileImageUpdate);
  };
  const handleImageUpload = (e) => {
    setFileUpload(e.target.files[0]);
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
  };

  const uploadPicture = async (e) => {
    e.preventDefault();
    const file = fileUpload;
    //console.log("file", file);

    // get secure url from our server
    const uploadUrl = await fetch(BACKEND_URL+"/uploadImage")
    .then(
      (res) => res.json()
    );

    // post the image direclty to the s3 bucket
    await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });

    const imageUrl = uploadUrl.split("?")[0];
    // console.log("After", imageUrl);

    // fetch from localhos
    let userInfo = {
      id: uid,
      url: imageUrl,
      role: role,
    };

    //req for adding url to db api
    axios
      .put(BACKEND_URL+"/addImage", +userInfo)
      .then((response) => {
        const urlFromDb = response.data[0].profileUrl;
        setProfileUrl(urlFromDb);
      //  console.log("urlfromdb", urlFromDb);
      })
      .catch((error) => {
        alert("Error occured while adding image to data base");
      });
    toggleImageUpdate();
  };

  return (
    <div>
      {/* { redirectVar } */}
      <RestNavbar />
      <div className="text-center mb-5">
            <img className="card-img-top" style={{width:"50%", height:"400px", borderRadius:"70%"}}src={profileUrl} alt="img"></img>
          </div>
      <div className="container-fluid">
        <div className="row h-100 mt-2">
          <div className="col-2">
            <div className="row" style={{ height: "40%" }}></div>
            <div className="row" style={{ height: "60%" }}>
              <h3>Edit Profile</h3>
            </div>
          </div>
         
          <div className="col-10">
            <div className="row ml-3">
              <button
                className="btn dark text-center"
                style={{ width: "15%", marginLeft: "34%" }}
                onClick={toggleImageUpdate}
              >
                Change Profile Picture
              </button>
              <ReactModal isOpen={profileImageUpdate}>
                <form
                  onSubmit={handleImageSubmit}
                  encType="multipart/form-data"
                  style={{ textAlign: "Center" }}
                >
                  <input
                    type="file"
                    name="newProfileImage"
                    onChange={handleImageUpload}
                  />
                  <button
                    className="btn btn-dark"
                    type="submit"
                    onClick={(e) => {
                      uploadPicture(e);
                    }}
                  >
                    Done
                  </button>
                  <button
                    className="btn btn-dark"
                    onClick={toggleImageUpdate}
                  >
                    Cancel
                  </button>
                </form>
              </ReactModal>
            </div>
            <form onSubmit={handleOnSubmit}>
              <div className="row m-1">
                <div className="col-5">
                  <label>Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder={name}
                    onChange={handleNameChange}
                  />
                </div>
                <div className="col-5">
                  <label>Location:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    placeholder={location}
                    onChange={handleLocationChange}
                  />
                </div>
              </div>

              <div className="row m-1">
                <div className="col-5">
                  <label>Contact Number:</label>
                  <input
                    type="number"
                    className="form-control"
                    name="phone"
                    placeholder={phone}
                    onChange={handlePhoneChange}
                  />
                </div>
                <div className="col-5">
                  <label>Description: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    placeholder={description}
                    onChange={handleDescriptionChange}
                  />
                </div>
              </div>

              <div className="row m-1">
                {" "}
                <label>Mode of Delivery:</label>{" "}
                <div className="col-5">
                  {" "}
                 
                  <select
                    className="drop p-2"
                    placeholder={modeOfDelivery}
                    value={modeOfDelivery}
                    onChange={handleDeliveryModeChange}
                  >
                   
                   <option value={modeOfDelivery}>{`${modeOfDelivery}`}</option>
                    <option value="delivery">Delivery</option>{" "}
                    <option value="pick up">Pick up</option>{" "}
                    <option value="pick up and delivery">Pick up and Delivery</option>{" "}
                  </select>{" "}
                </div>{" "}
              </div>
              <div className="row m-1">
                <label>Timings:</label>
                <div className="col-5">
                  <label className="p-2">From day</label>
                  <select
                    className="drop p-2"
                    value={fromDate}
                    onChange={handleFromDateChange}
                  >
                    <option disabled selected>
                      -- select an option --
                    </option>
                    <option value={fromDate}>{fromDate}</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                  </select>
                </div>

                <div className="col-5">
                  <label className="p-2">To Day:</label>
                  <select
                    className="drop p-2"
                    value={toDate}
                    onChange={handleToDateChange}
                  >
                    <option disabled selected>
                      {" "}
                      -- select an option --{" "}
                    </option>
                    <option value={toDate}>{toDate}</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                  </select>
                </div>
              </div>

              <div className="row m-1">
                <div className="col-5">
                  <label className="p-2">From time</label>
                  <select
                    className="drop p-2"
                    value={fromTime}
                    onChange={handleFromTimeChange}
                  >
                    <option disabled selected>
                      {" "}
                      -- select an option --{" "}
                    </option>
                    <option value={fromTime}>{fromTime}</option>
                    <option value="12:00 am">12:00 am</option>
                    <option value="1:00 am">1:00 am</option>
                    <option value="2:00 am">2:00 am</option>
                    <option value="3:00 am">3:00 am</option>
                    <option value="4:00 am">4:00 am</option>
                    <option value="5:00 am">5:00 am</option>
                    <option value="6:00 am">6:00 am</option>
                    <option value="7:00 am">7:00 am</option>
                    <option value="8:00 am">8:00 am</option>
                    <option value="9:00 am">9:00 am</option>
                    <option value="10:00 am">10:00 am</option>
                    <option value="11:00 am">11:00 am</option>
                    <option value="12:00 pm">12:00 pm</option>
                    <option value="1:00 pm">1:00 pm</option>
                    <option value="2:00 pm">2:00 pm</option>
                    <option value="3:00 pm">3:00 pm</option>
                    <option value="4:00 pm">4:00 pm</option>
                    <option value="5:00 pm">5:00 pm</option>
                    <option value="6:00 pm">6:00 pm</option>
                    <option value="7:00 pm">7:00 pm</option>
                    <option value="8:00 pm">8:00 pm</option>
                    <option value="9:00 pm">9:00 pm</option>
                    <option value="10:00 pm">10:00 pm</option>
                    <option value="11:00 pm">11:00 pm</option>
                  </select>
                </div>

                <div className="col-5">
                  <label className="p-2">To time:</label>
                  <select
                    className="drop p-2"
                    value={toTime}
                    onChange={handleToTimeChange}
                  >
                    <option disabled selected>
                      {" "}
                      -- select an option --{" "}
                    </option>
                    <option value={toTime}>{toTime}</option>
                    <option value="12:00 am">12:00 am</option>
                    <option value="1:00 am">1:00 am</option>
                    <option value="2:00 am">2:00 am</option>
                    <option value="3:00 am">3:00 am</option>
                    <option value="4:00 am">4:00 am</option>
                    <option value="5:00 am">5:00 am</option>
                    <option value="6:00 am">6:00 am</option>
                    <option value="7:00 am">7:00 am</option>
                    <option value="8:00 am">8:00 am</option>
                    <option value="9:00 am">9:00 am</option>
                    <option value="10:00 am">10:00 am</option>
                    <option value="11:00 am">11:00 am</option>
                    <option value="12:00 pm">12:00 pm</option>
                    <option value="1:00 pm">1:00 pm</option>
                    <option value="2:00 pm">2:00 pm</option>
                    <option value="3:00 pm">3:00 pm</option>
                    <option value="4:00 pm">4:00 pm</option>
                    <option value="5:00 pm">5:00 pm</option>
                    <option value="6:00 pm">6:00 pm</option>
                    <option value="7:00 pm">7:00 pm</option>
                    <option value="8:00 pm">8:00 pm</option>
                    <option value="9:00 pm">9:00 pm</option>
                    <option value="10:00 pm">10:00 pm</option>
                    <option value="11:00 pm">11:00 pm</option>
                  </select>
                </div>
              </div>

              <div className="row mt-3 ml-1 ">
                <div className="col-5 text-end">
                  <button type="submit" className="btn btn-dark ">
                    Update
                  </button>
                </div>
                <div className="col-5">
                  <Link className="btn btn-danger" to="/restDashboard">
                    Cancel
                  </Link>
                </div>
              </div>
            </form>
            {/* { renderError } */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestProfile;
