// import React, { useState, useEffect } from "react";
// import { Col, Button, Row, Container} from "react-bootstrap";
// import Modal from 'react-modal'
// import { useHistory } from "react-router-dom";
// import { GrEdit } from "react-icons/gr";
// import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import axios from 'axios';
// import BACKEND_URL from '../../config/configBackendURL';
// function Tryy() {
//     const [displayRest, setDisplayRest] = useState(false);
//     const [lgShow, setLgShow] = useState(false);
//     const [smShow, setSmShow] = useState(false);
//     return (
//         <div>
//              <Modal
//           size="lg"
//           show={lgShow}
//           onHide={() => setLgShow(false)}
//           aria-labelledby="example-modal-sizes-title-lg"
//         >
//           <Modal.Header closeButton>
//             <Modal.Title id="example-modal-sizes-title-lg">
            
//             </Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//           <div>
// <Container style={{ width: "50%" }}>
//       <h1 className="text-center"> Edit Dish</h1>
//       <div className="row ml-3">
//               <button className="btn btn-primary text-center" style={{width:"35%", marginLeft: "34%"}} onClick={toggleImageUpdate}>
//                 Change Dish Image
//               </button>
//               <Modal isOpen={profileImageUpdate}>
//                 <form
//                   onSubmit={handleImageSubmit}
//                   encType="multipart/form-data"
//                   style={{ textAlign: "Center" }}
//                 >
//                   <input
//                     type="file"
//                     name="newProfileImage"
//                     onChange={handleImageUpload}
//                   />
//                   <button className="btn btn-primary" type="submit"   onClick={(e) => {
//                       uploadPicture(e);
//                     }}>
//                     Done
//                   </button>
//                   <button
//                     className="btn btn-primary"
//                     onClick={toggleImageUpdate}
//                   >
//                     Cancel
//                   </button>
//                 </form>
//               </Modal>
//             </div>
//       <form onSubmit={editDish}>
//         <div className="row m-1">
//           <label>Dish Name </label>
//           <input
//             type="text"
//             className="form-control"
//             name="name"
//             placeholder={name}
//             onChange={handleNameChange}
//           />
//         </div>
//         <div className="row m-1">
//           <label>Main Ingredients</label>
//           <input
//             type="text"
//             className="form-control"
//             name="ingredients"
//             placeholder={ingredients}
//             onChange={handleIngredientsChange}
//           />
//         </div>

//         <div className="row m-1">
//           <label>Dish Price</label>
//           <input
//             type="number"
//             step="0.01"
//             className="form-control"
//             name="price"
//             placeholder={price}
//             onChange={handlePriceChange}
//           />
//         </div>

//         <div className="row m-1">
//           <label>Description </label>
//           <input
//             type="text"
//             className="form-control"
//             name="description"
//             placeholder={description}
//             onChange={handleDescriptionChange}
//           />
//         </div>

//         <div className="row m-1">
//           <label>Dish Category</label>
//           <select className="dropcustom p-2" onChange={handleCategoryChange}>
//             <option disabled selected>
//               {" "}
//               {category}
//             </option>
//             <option value="Appetizer">Appetizer</option>
//             <option value="Salads">Salads</option>
//             <option value="Main Course">Main Course</option>
//             <option value="Desserts">Desserts</option>
//             <option value="Beverages">Beverages</option>
//           </select>
//         </div>
//         <div className="row m-1">
//           <label>Dish Type</label>
//           <select className="dropcustom p-2" onChange={handleTypeChange}>
//             <option disabled selected>
//               {" "}
//               {type}
//             </option>
//             <option value="Veg">Veg</option>
//             <option value="Non-Veg">Non-Veg</option>
//             <option value="Vegan">Vegan</option>
//           </select>
//         </div>

//         <div className="row mt-3 ml-1 ">
//           <div className="col-6 text-end">
//             <button type="submit" className="btn btn-primary ">
//               Update
//             </button>
//           </div>
//           <div className="col-6">
//             <Link className="btn btn-danger" to="/restDashboard">
//               Cancel
//             </Link>
//           </div>
//         </div>
//       </form>
//     </Container>
//     </div>
//           </Modal.Body>
//         </Modal>
         
//         </div>
//     )
// }

// export default Tryy
