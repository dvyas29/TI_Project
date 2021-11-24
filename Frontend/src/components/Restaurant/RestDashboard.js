import React, { useState, useEffect } from "react";
import RestNavbar from "./RestNavbar";
import axios from "axios";
import restimg from "./../../images/restaurant_home.jpg";
import { Container, Row, Col, Modal, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import DishList from "./DishList";
import BACKEND_URL from "../../config/configBackendURL";
function RestDashboard() {

  const accessToken = localStorage.getItem("accessToken");

  const [bearer, setBearer] = useState("");
  const [restData, setRestData] = useState([]);
  const [dishData, setDishData] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [profileImageUpdate, setProfileImageUpdate] = useState(false);
  const [fileUpload, setFileUpload] = useState("");
  const [dishImageUrl, setDishImageUrl] = useState("");
  const [profileImagePath, setProfileImagePath] = useState("");
  const id = localStorage.getItem("id");
  //console.log("b4useeffect");
  const openlgmodal = () => {
    setLgShow(true);
  };

  const restid = localStorage.getItem("id");

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

  function addDish(e) {
    // console.log("imagepath inside add dish", profileImagePath);
    // console.log("inside Adddish");
    // const body={restid:restid, dishName:name, dishPrice:price, mainIngredients:ingredients, description:description, dishCategory:category, type:type, dishImage:profileImagePath}
    // axios({
    //     method: "post",
    //     url: BACKEND_URL + "/addDishes",
    //     data: body,
    //     headers: { "Content-Type": "application/json","Authorization": bearer  },
    //   })
    //     .then((response) => {
    //     })
    //     .catch((error) => {
    //       console.log((error.response));
    //     });
    //  history.push('/restDashBoard');
  }
  const toggleImageUpdate = (e) => {
    setProfileImageUpdate(!profileImageUpdate);
  };
  const handleImageUpload = (e) => {
    setFileUpload(e.target.files[0]);
  };
  const uploadPicture = async (e) => {
    setProfileImageUpdate(!profileImageUpdate)
    
    const file = fileUpload;
    //console.log("file", file);

   // get secure url from our server
    const uploadUrl = await fetch(BACKEND_URL+"/uploadImageS3").then(
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
    setProfileImagePath(imageUrl);
    //console.log("After s3 dishimage", imageUrl);
    // console.log("imagepath inside add dish", profileImagePath);
    // console.log("inside Adddish");
    const body = {
      name,
      price,
      ingredients,
      description,
      category,
      type,
      dishImageUrl:imageUrl,
    };
//console.log("dish body",body)
    axios({
      method: "post",
      url: BACKEND_URL + "/dishes",
      data: body,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
       // console.log("after add dishes", response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });

  };

  const fetchRestProfileAndDishes = () => {
    //console.log("inside useeffect check check")

    var body = {
      restId: id,
    };

    axios({
      method: "get",
      url: BACKEND_URL + "/users",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
        //      console.log("axios response", response.data);
        setRestData(response.data.user);
      })
      .catch((error) => {
               console.log(error.response)
      });

    axios({
      method: "get",
      url: BACKEND_URL + `/dishes/rest/${id}`,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
        //    console.log("axios response", response.data);
        setDishData(response.data.data);
      })
      .catch((error) => {
              console.log(error.response)
      });
  }

  useEffect(() => {
    fetchRestProfileAndDishes();
  }, [profileImageUpdate, lgShow]);


  const filtDataAppetizer = dishData.filter(
    (dish) => dish.category === "Appetizer"
  );
  const filtDataBeverages = dishData.filter(
    (dish) => dish.category === "Beverages"
  );
  const filtDataMainCourse = dishData.filter(
    (dish) => dish.category === "Main Course"
  );
  const filtDataDesserts = dishData.filter(
    (dish) => dish.category === "Desserts"
  );
  const filtDataSalads = dishData.filter((dish) => dish.category === "Salads");

  return (
    <div>
      <RestNavbar />
      {restData && (
        <Container fluid>
          <Row className="p-4">
            {/* <img
              className="card-img-top mt-4"
              style={{
                width: "100%",
                height: "70vh",
                paddingRight: "20px",
                float: "left",
              }}
              src={restData[0].profileUrl}
              alt={restData[0].location}
            /> */}
            <Row>   <div className="image_over_Text">
                 <Image style={{width:'100%',height:'340px',objectFit:'cover'}}  src={restData.profileUrl} alt={restData.name} /> 
                 <div className="bottom-left">
                     <h1>{name}<span style={{fontSize:'20px', color:"black"}}>{description}</span></h1>
                
                 </div>
                 
               </div>
            </Row>

          </Row>
          <Row>
            <h1>{restData.name}</h1>
            <h4>{restData.description}</h4>
          </Row>
          <Row>
            <Col className="text-end" sm={4} md={4} lg={4}></Col>
          </Row>
          <Row>
            <Col className="mt-4" sm={9} md={9} lg={9}>
              <h3 style={{ paddingRight: "20px", float: "left" }}>
                Restaurant Menu
              </h3>
            </Col>
            <Col sm={3} md={3} lg={3}>
              <div
                className="float-end mt-2"
                style={{ paddingRight: "20px", textDecoration: "none" }}
                
              >
                 <button onClick={openlgmodal} className="btn btn-dark">Add New Dish</button>
              </div>
            </Col>
          </Row>

          <Row>
          {filtDataSalads && <Col className="mt-1 p-3">
              <h1>Salads</h1>
              <DishList dishes={filtDataSalads} onEditDone={fetchRestProfileAndDishes} />
            </Col>}
          </Row>
          <Row>
            <Col className="mt-1 p-3">
              <h1>Appetizers</h1>
              <DishList dishes={filtDataAppetizer} onEditDone={fetchRestProfileAndDishes} />
            </Col>
          </Row>
          <Row>
            <Col className="mt-1 p-3">
              <h1>Main Course</h1>
              <DishList dishes={filtDataMainCourse} onEditDone={fetchRestProfileAndDishes} />
            </Col>
          </Row>
          <Row>
            <Col className="mt-1 p-3">
              <h1>Beverages</h1>
              <DishList dishes={filtDataBeverages} onEditDone={fetchRestProfileAndDishes} />
            </Col>
          </Row>
          <Row>
            <Col className="mt-1 p-3">
              <h1>Desserts</h1>
              <DishList dishes={filtDataDesserts} onEditDone={fetchRestProfileAndDishes} />
            </Col>
          </Row>
          <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                <h1 className="text-center"> Add Dish</h1>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row>
                  <form>
                    <Row>
                      <Col xs={6} sm={6} md={6} lg={6}>
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
                      </Col>
                      <Col xs={6} sm={6} md={6} lg={6}>
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
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6} sm={6} md={6} lg={6}>
                        {" "}
                        <div className="row m-1">
                          <label>Dish Price</label>
                          <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            name="price"
                            required
                            onChange={handlePriceChange}
                          />
                        </div>
                      </Col>
                      <Col xs={6} sm={6} md={6} lg={6}>
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
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6} sm={6} md={6} lg={6}>
                        {" "}
                        <div className="row m-1">
                          <label>Dish Category</label>
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
                      </Col>
                      <Col xs={6} sm={6} md={6} lg={6}>
                        {" "}
                        <div className="row m-1">
                          <label>Dish Type</label>
                          <select
                            className="dropcustom p-2"
                            required
                            onChange={handleTypeChange}
                          >
                            <option disabled selected>
                              {" "}
                              -- select category --{" "}
                            </option>
                            <option value="veg">Veg</option>
                            <option value="non-veg">Non-Veg</option>
                            <option value="vegan">Vegan</option>
                          </select>
                          <input
                            type="file"
                            name="newdishpic"
                            onChange={handleImageUpload}
                            required
                          />
                        </div>
                      </Col>
                    </Row>

                    <div className="row mt-3 ml-1 ">
                      <div className="col-6 text-end">
                        <button onClick={uploadPicture} type="button" className="btn btn-dark ">
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
                </Row>
              </Container>
            </Modal.Body>
          </Modal>
         
        </Container>
      )}
    </div>
  );
}

export default RestDashboard;
