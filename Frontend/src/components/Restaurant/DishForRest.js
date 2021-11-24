import React, { useState, useEffect } from "react";
import { Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ReactModal from "react-modal";
import axios from "axios";
import { Link } from "react-router-dom";
import BACKEND_URL from "../../config/configBackendURL";
import { GrEdit } from "react-icons/gr";
import {
  Navbar,
  Container,
  NavDropdown,
  Form,
  FormControl,
  Row,
  ToggleButtonGroup,
  ToggleButton,
  Modal,
} from "react-bootstrap";
function DishForRest(props) {
  const accessToken = localStorage.getItem("accessToken");
  let history = useHistory();
  const [lgShow, setLgShow] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [displayRest, setDisplayRest] = useState(false);
  const [bearer, setBearer] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");
  const [dishData, setDishData] = useState([]);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [dishImageUrl, setDishImageUrl] = useState("");
  const [profileImageUpdate, setProfileImageUpdate] = useState(false);
  const [fileUpload, setFileUpload] = useState("");
  const [profileImagePath, setProfileImagePath] = useState("");

  useEffect(() => {
    axios({
      method: "get",
      url: BACKEND_URL + `/dishes/${props.id}`,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
       // console.log("axios response dish data get", response.data.data);
        setDishData(response.data);
        setName(response.data.data[0].name);
        setPrice(response.data.data[0].price);
        setIngredients(response.data.data[0].ingredients);
        setDescription(response.data.data[0].description);
        setCategory(response.data.data[0].category);
        setType(response.data.data[0].type);
        setDishImageUrl(response.data.data[0].dishImageUrl);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const openlgmodal = () => {
    setLgShow(true);
  };

  const handleImageSubmit = (e) => {};
  const editDish = (e) => {
    e.preventDefault();
    const body = {
      name,
      price,
      ingredients,
      description,
      category,
      type,
    };

    axios({
      method: "put",
      url: BACKEND_URL + `/dishes/${props.id}`,
      data: body,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
       // console.log("axios response edit dishes data", response.data);

        if (props.onEditDone) {
         // console.log("chek check edit dishes data", response.data);
          if (props.onEditDone) {
            props.onEditDone();
          }
          setLgShow(false);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });

    history.push("/restDashBoard");
    //console.log("inside edit dish submit", dishData);
  };
  const toggleImageUpdate = (e) => {
   
    setProfileImageUpdate(!profileImageUpdate);
  };
  const handleImageUpload = (e) => {
    setFileUpload(e.target.files[0]);
  };
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
  const uploadPicture = async (e) => {
    e.preventDefault();

    const file = fileUpload;
    //console.log("file", file);

    // get secure url from our server
    const uploadUrl = await fetch(BACKEND_URL+"/uploadImageS3").then(
      (res) => res.json()
    );

    // post the image direclty to the s3 bucketodal
    await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });

    const imageUrl = uploadUrl.split("?")[0];
     //console.log("After", imageUrl);

    // fetch from localhos
    let body = {
      dishId: props.id,
      imageUrl: imageUrl,
    };

    //req for adding url to db api
    axios
      .put(BACKEND_URL+"/dishes/image", body)
      .then((response) => {
        // const urlFromDb = response.data[0].profileUrl;
        // setProfileImagePath(urlFromDb);
        // console.log("urlfromdb",urlFromDb);
      })
      .catch((error) => {
        alert("Error occured while adding image to data base");
      });
    toggleImageUpdate();
    // history.push(`/dishEdit/${id}`);
  };
  const gotoeditdish = () => {
   // console.log("clicked restaurant", props.restid);
   // console.log("clicked disn number", props.id);
    history.push(`/dishEdit/${props.id}`);
  };

  return (
    <Col sm={2} md={2} lg={2}>
      <div className="card p-2 mb-4">
        <img
          className="card-img-top"
          src={props.dishImageUrl}
          alt={props.name}
        />
        <div className="card-body">
        <Row>
            <Col xs={9} sm={9} md={9} lg={9}>
              <span>
                <h5 className="card-title">{props.name} </h5>
              </span>
            </Col>
            <Col xs={3} sm={3} md={3} lg={3}>
              <div className="text-end">
                <Button
                  className="auto-ml"
                  type="submit"
                  variant="light"
                  size="md"
                  onClick={openlgmodal}
                >
                  {" "}
                  {<GrEdit />}
                </Button>
                
              </div>
            </Col>
          </Row>

          <p className="card-text">{props.description}</p>
          <p className="card-text">{`$${props.price}`}</p>

         

          <Modal
            size="lg"
            show={profileImageUpdate}
            onHide={() => setProfileImageUpdate(false)}
            aria-labelledby="example-modal-sizes-title-lg"
            style={{ zIndex: 999999999999999 }}
          >
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
              <button className="btn btn-dark" onClick={toggleImageUpdate}>
                Cancel
              </button>
            </form>
          </Modal>

          <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                <h1 className="text-center"> Edit Dish</h1>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row>
                <form onSubmit={editDish}>
                <Row>
                  <Col xs={6} sm={6} md={6} lg={6}><div className="row m-1">
                            <label>Dish Name </label>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              placeholder={name}
                              onChange={handleNameChange}
                            />
                          </div></Col>
                  <Col xs={6} sm={6} md={6} lg={6}> <div className="row m-1">
                            <label>Main Ingredients</label>
                            <input
                              type="text"
                              className="form-control"
                              name="ingredients"
                              placeholder={ingredients}
                              onChange={handleIngredientsChange}
                            />
                          </div></Col>
                  
                </Row>
                <Row>
                  <Col xs={6} sm={6} md={6} lg={6}> <div className="row m-1">
                            <label>Dish Price</label>
                            <input
                              type="number"
                              step="0.01"
                              className="form-control"
                              name="price"
                              placeholder={price}
                              onChange={handlePriceChange}
                            />
                          </div></Col>
                  <Col xs={6} sm={6} md={6} lg={6}> <Row>
                          <div className="row m-1">
                            <label>Description </label>
                            <input
                              type="text"
                              className="form-control"
                              name="description"
                              placeholder={description}
                              onChange={handleDescriptionChange}
                            />
                          </div>
                        </Row></Col>
                  
                </Row>
                <Row>
                  <Col xs={6} sm={6} md={6} lg={6}> <div className="row m-1">
                            <label>Dish Category</label>
                            <select
                              className="dropcustom p-2"
                              onChange={handleCategoryChange}
                            >
                              <option disabled selected>
                                {" "}
                                {category}
                              </option>
                              <option value="Appetizer">Appetizer</option>
                              <option value="Salads">Salads</option>
                              <option value="Main Course">Main Course</option>
                              <option value="Desserts">Desserts</option>
                              <option value="Beverages">Beverages</option>
                            </select>
                          </div></Col>
                  <Col xs={6} sm={6} md={6} lg={6}> <div className="row m-1">
                            <label>Dish Type</label>
                            <select
                              className="dropcustom p-2"
                              onChange={handleTypeChange}
                            >
                              <option disabled selected>
                                {" "}
                                {type}
                              </option>
                              <option value="Veg">Veg</option>
                              <option value="Non-Veg">Non-Veg</option>
                              <option value="Vegan">Vegan</option>
                            </select>
                          </div></Col>
                  
                </Row>
                <Row>
                  <div>
                    <Row>
                      <Col xs={2} sm={2} md={2} lg={2}></Col>
                      <Col xs={2} sm={6} md={6} lg={6}>
                        <Row></Row>
                      </Col>
                      <Col xs={4} sm={4} md={4} lg={4}></Col>
                    </Row>
                    <Row>
                      <Col xs={4} sm={4} md={4} lg={4}></Col>
                      <Col xs={4} sm={4} md={4} lg={4}>
                     
                      </Col>
                      <Col xs={4} sm={4} md={4} lg={4}></Col>
                    </Row>
                  </div>
                </Row>
              
                <Row>
                   
                     
                      <div className="row mt-3 ml-1 ">
                        <div className="col-6 text-end"  style={{padding:"none"}}>
                          <button type="submit" className="btn btn-dark " >
                            Update
                          </button>
                        </div>
                        <div className="col-6">
                          <Link style={{textDecoration:"none", color:"white"}}className="btn btn-dark" to="/restDashboard">
                            Cancel
                          </Link>
                         
                        </div>
                      </div>
                   
                  </Row>
                  </form>
                  </Row>
                </Container>
                <Container style={{ width: "50%" }}>
                <Row>
                      <Col>
                        <Row className="text-center mt-3" > <button
                              className="btn btn-dark"
                              onClick={toggleImageUpdate}
                            >
                              Change Dish Image here
                            </button></Row>
                      </Col>
                     
                    </Row>
                </Container>
               
            </Modal.Body>
          </Modal>

         


      
        </div>
      </div>
    </Col>
  );
}

export default DishForRest;

