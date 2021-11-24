import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';
import axios from 'axios';
import BACKEND_URL from '../../config/configBackendURL';
import { useHistory } from "react-router-dom";
import ReactModal from "react-modal";


function AddDishForm() {

  let history = useHistory();

  const [restId, setRestId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [dishImageUrl, setDishImageUrl] = useState("");
  const [bearer, setBearer] = useState("");
  const [profileImageUpdate, setProfileImageUpdate] = useState(false);
  const [fileUpload, setFileUpload] = useState("");
  const [profileImagePath, setProfileImagePath] = useState("");



  const restid=localStorage.getItem("id");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleIngredientsChange = (e) => {
    setIngredients(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };
  const handleDishImageUrlChange = (e) => {
    setDishImageUrl(e.target.value);
  };
 const handleImageSubmit = (e) => {
    e.preventDefault();


  };

  const addDish=(e)=>{
    e.preventDefault();
    //console.log("inside Adddish");
    const body={restid:restid, dishName:name, dishPrice:price, mainIngredients:ingredients, description:description, dishCategory:category, type:type}
   
    
    axios({
        method: "post",
        url: BACKEND_URL + "/addDishes",
        data: body,
        headers: { "Content-Type": "application/json","Authorization": bearer  },
      })
        .then((response) => {
                    
        })
        .catch((error) => {
         console.log((error.response));
        });
      
     history.push('/restDashBoard');
  }
  const toggleImageUpdate = (e) => {
    setProfileImageUpdate(!profileImageUpdate);
  };
  const handleImageUpload = (e) => {
    setFileUpload(e.target.files[0]);
  };
  const uploadPicture = async (e) => {
    e.preventDefault();

    const file = fileUpload;
    //console.log("file", file);

    // get secure url from our server
    const uploadUrl = await fetch(
      BACKEND_URL+"/uploadImage"
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
      id: restid,
      url: imageUrl,
      
    };

    //req for adding url to db api
    axios
      .put(BACKEND_URL+"/addImage", userInfo)
      .then((response) => {
        const urlFromDb = response.data[0].profileUrl;
        setProfileImagePath(urlFromDb);
        //console.log("urlfromdb",urlFromDb);
      })
      .catch((error) => {
        alert("Error occured while adding image to data base");
      });
      toggleImageUpdate();
  };

  return (
        <Container style={{width:"50%"}}>
            <h1 className="text-center"> Add New Dish</h1>
      <form onSubmit={addDish}>
        <div className="row m-1">
          <label>Dish Name </label>
          <input
            type="text"
            className="form-control"
            name="name"
            required
            onChange={handleNameChange}
          />
        </div>
        <div className="row m-1">
          <label>Main Ingredients</label>
          <input
            type="text"
            className="form-control"
            name="ingredients"
            required
            onChange={handleIngredientsChange}
          />
        </div>

        <div className="row m-1">
          <label>Dish Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            required
            onChange={handlePriceChange}
          />
        </div>

        <div className="row m-1">
          <label>Description </label>
          <input
            type="text"
            className="form-control"
            name="description"
            required
            onChange={handleDescriptionChange}
          />
        </div>

        <div className="row m-1">
            <label >Dish Category</label>
            <select
              className="dropcustom p-2"
              required
              onChange={handleCategoryChange}
            >
              <option disabled selected>
                {" "}
                -- select category --{" "}
              </option>
              <option value="Appetizer">Appetizer</option>
              <option value="Salads">Salads</option>
              <option value="Main Course">Main Course</option>
              <option value="Desserts">Desserts</option>
              <option value="Beverages">Beverages</option>
             
            </select>
          </div>

          <div className="row m-1">
            <label >Dish Type</label>
            <select
              className="dropcustom p-2"
              required
              onChange={handleTypeChange}
            >
              <option disabled selected>
                {" "}
                -- select category --{" "}
              </option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
              <option value="Vegan">Vegan</option>
                         
            </select>
          </div>

          <div className="row ml-3">
              <button className="btn btn-dark text-center mt-2" style={{width:"35%", marginLeft: "32%"}} onClick={toggleImageUpdate}>
                Add Dish Image
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

        <div className="row mt-3 ml-1 ">
          <div className="col-6 text-end">
            <button type="submit" className="btn btn-dark">
              Add
            </button>
          </div>
          <div className="col-6">
            <Link className="btn btn-danger" to="/restDashboard">
              Cancel
            </Link>
          </div>
        </div>
      </form>
      </Container>
    
  );
}

export default AddDishForm;
