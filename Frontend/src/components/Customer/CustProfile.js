import CustNavbar from './../Customer/CustNavbar'

import React, { Component, useState, useEffect } from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
//import cookie from 'react-cookies';
import axios from 'axios';
import ReactModal from 'react-modal';
//import BACKEND_URL from '../../../config/config'
import { useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { useHistory } from "react-router-dom";
import BACKEND_URL from "../../config/configBackendURL";

function CustProfile ({props})  {
    
       // const [id, setId] = useState('');
        const [name, setName] = useState('');
        const [nickName, setNickName] = useState('');
        const [email, setEmail] = useState('');
        const [contactNumber, setContactNumber] = useState('');
        const [dateOfBirth, setDateOfBirth] = useState('');
        const [city, setCity] = useState('');
        const [state, setState] = useState('');
        const [country, setCountry] = useState('');
        const [profileImageUpdate, setProfileImageUpdate] = useState('');
        const [profileImagePath, setProfileImagePath] = useState('');
       // const [error, setError] = useState('');
        const [phone, setPhone] = useState('');
        //const [errorMessage, setErrorMessage] = useState('');
        const options = useMemo(() => countryList().getData(), [])   
        const [bearer, setBearer] = useState("");
        const [fileUpload, setFileUpload] = useState("");
        const [about, setAbout]= useState("");
        const [profileUrl, setProfileUrl] = useState("");
        let uid = localStorage.getItem("id");
  let role = localStorage.getItem("role");

  let history = useHistory();
  const id =localStorage.getItem("id");

  useEffect(() => {
    
    var body={
      id:id
    }
         axios({
            method: "post",
            url: BACKEND_URL + "/getCustProfile",
            data: body,
            headers: { "Content-Type": "application/json","Authorization": bearer  },
            
          })
            .then((response) => {
                
          //console.log("customer data", response.data);
          //setRestData(response.data);
        setName(response.data[0].name);
        setNickName(response.data[0].nickname);
        setPhone(response.data[0].phone);
        setState(response.data[0].state);
        setCity(response.data[0].city);
        setCountry(response.data[0].country);
        setProfileUrl(response.data[0].profileUrl);
        //setDateOfBirth(response.data[0].DOB)
         setAbout(response.data[0].about)   
            
            })
            .catch((error) => {
              console.log((error.response));
            });
   
  }, []);
        
    const handleNameChange = (e) =>{
        setName(e.target.value);
    }

   const handleNickNameChange = (e) =>{
    setNickName(e.target.value);
}

// const handleEmailChange = (e) =>{
//     setEmail(e.target.value);
// }
const handlePhoneChange = (e) =>{
    setPhone(e.target.value);
}
const handledateOfBirthChange = (e) =>{
    e.preventDefault();
    setDateOfBirth(e.target.value);
   
}
const handleCityChange = (e) =>{
    setCity(e.target.value);
}

const handleStateChange = (e) =>{
    setState(e.target.value);
}


const handleCountryChange = value => {
    setCountry(value)
  }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        //console.log(name);
        //console.log( "in handle submit" )
       let body =  {

            id: id,
            name: name,
            DOB: dateOfBirth,
            city: city,
            state: state,
            country:country.label,
            nickname: nickName,
            phone: phone,
            about: about
        }

      //  console.log("body", body)
        axios({
            method: "put",
            url: BACKEND_URL + "/updateCustDetail",
            data: body,
            headers: { "Content-Type": "application/json", Authorization: bearer },
          })
            .then((response) => {
             // console.log("update prifile status", response.data);
              
            })
            .catch((error) => {
             // console.log("coming in error",error.response);
            });
      
            history.push('/custDashBoard');
        };

       
    

//     //Image Upload toggle
   const toggleImageUpdate = ( e ) => {
        setProfileImageUpdate(!profileImageUpdate)
    }

//     //Image Upload
//   const handleImageUpload = ( e ) => {
//         setNewProfileImage(e.target.files[ 0 ])
//     }

//     //Image Submit
   const handleImageSubmit = ( e ) => {
        e.preventDefault();
        //console.log("in on submit for image change");
        
    }

    const uploadPicture = async (e) => {
        e.preventDefault();
    
        const file = fileUpload;
       // console.log("file", file);
    
        // get secure url from our server
        const uploadUrl = await fetch(
          BACKEND_URL +"/uploadImage"
        ).then((res) => res.json());
    
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
          .put(BACKEND_URL+"/addImage", userInfo)
          .then((response) => {
            const urlFromDb = response.data[0].profileUrl;
            setProfileImagePath(urlFromDb);
           // console.log("urlfromdb",urlFromDb);
          })
          .catch((error) => {
            alert("Error occured while adding image to data base");
          });
          toggleImageUpdate();
      };
      const handleImageUpload = (e) => {
        setFileUpload(e.target.files[0]);
      };

        // var redirectVar = null;
        // if ( !( cookie.load( "auth" ) && cookie.load( "type" ) === "users" ) ) {
        //     redirectVar = <Redirect to="/login" />
        // }
        // let renderError = null
        // if ( this.state.error ) {
        //     renderError = <div style={ { 'color': 'red' } }>{ this.state.errorMessage }</div>
        // }
        return (
            <div>
                <CustNavbar/>
                <div className="text-center mb-5">
            <img className="card-img-top" style={{width:"50%", height:"400px", borderRadius:"70%"}}src={profileUrl} alt="img"></img>
          </div>
                {/* { redirectVar } */}
                <div className="container-fluid">
                    <div className="row h-100 mt-2">
                        <div className="col-2">
                            <div className="row" style={ { height: "40%" } }></div>
                            <div className="row" style={ { height: "60%" } }>
                                <h3>Edit Profile</h3>
                            </div>
                        </div>

                        
                        <div className="col-10">

                             <div className="row ml-3">
                             <button className="btn btn-dark text-center" style={{width:"15%", marginLeft: "34%"}} onClick={toggleImageUpdate}>
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
                  <button className="btn btn-dark" type="submit"   onClick={(e) => {
                      uploadPicture(e);
                    }}>
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
                            <form onSubmit={ handleOnSubmit }>
                                <div className="row m-1">
                                    <div className="col-5">
                                        <label>Name:</label>
                                        <input type="text" className="form-control" name="name"
                                            placeholder={ name } onChange={ handleNameChange } />

                                    </div>
                                    <div className="col-5">
                                        <label>Nick Name:</label>
                                        <input type="text" className="form-control" name="nickName"
                                            placeholder={ nickName } onChange={ handleNickNameChange } />

                                    </div>
                                </div>

                                {/* <div className="row m-1">
                                    <div className="col-10">
                                        <label>Email:</label>
                                        <input type="email" className="form-control" name="email"
                                            placeholder={ email } onChange={ handleEmailChange } />
                                    </div>

                                </div> */}
                                <div className="row m-1">
                                    <div className="col-5">
                                        <label>Contact Number:</label>
                                        <input type="number" className="form-control" name="contactNumber"
                                            placeholder={ phone } onChange={ handlePhoneChange } />

                                    </div>
                                    <div className="col-5">
                                        <label>Date Of Birth: (YYYY-MM-DD)</label>
                                        <input type="date" className="form-control" name="dateOfBirth"
                                            placeholder={ dateOfBirth } onChange={ handledateOfBirthChange } />
                                    </div>
                                </div>
                                <div className="row m-1">
                                    <div className="col-3">
                                        <label>City:</label>
                                        <input type="text" className="form-control" name="city"
                                            placeholder={ city } onChange={ handleCityChange } />

                                    </div>
                                    <div className="col-3">
                                        <label>State:</label>
                                        <input type="text" className="form-control" name="state"
                                            placeholder={ state } onChange={ handleStateChange } />

                                    </div>
                                    <div className="col-3">
                                        <label>Country:</label>
                                        <Select options={options} placeholder={country} value={country} onChange={handleCountryChange} />

                                    </div>
                                </div>

                                
                                <div className="row mt-3 ml-1">
                                    <div className="col-2">
                                        <button type="submit" className="btn btn-dark">Update</button>
                                    </div>
                                    <div className="col-8">
                                        <Link className="btn btn-danger" to="/users/about">Cancel</Link>
                                    </div>

                                </div>
                            </form>
                            {/* { renderError } */}
                        </div>
                    </div>
                </div>
            </div >

        )
    
}

export default CustProfile