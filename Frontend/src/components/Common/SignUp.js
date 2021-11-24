import { Row,  Button, ToggleButtonGroup, ToggleButton, InputGroup, Col, Form, Container, } from "react-bootstrap";
  import React, { useState , useEffect} from "react";
  import * as yup from "yup";
  import { Formik } from "formik";
  import { Link } from "react-router-dom";
  import axios from 'axios';
  import { useHistory } from "react-router-dom";
  import Backend_URL from '../../config/configBackendURL'

  import { signup, clear } from "../../action/SignupActions";
  import { useSelector, useDispatch } from "react-redux";

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Please enter the name"),
      // .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for name field "),
  
    email: yup
      .string()
      // .email("Invalid email format")
      .required("Please enter email"),
  
    location: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for location field "),
  
    password: yup
      .string()
      .required("Please Enter your password")
      // .matches(
      //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      // ),
  });
  
  function SignUp() {

    let history = useHistory();

    

    const [role, setRole] = useState("customer");
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [location, setLocation] = useState("");
    // const [password, setPassword] = useState("");
    // const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();
  const redux_data=useSelector(state => state.signup);

  const isPassSignup=redux_data.passSignup;
  
  const isError=redux_data.error;

  useEffect(()=>{
    if(isPassSignup){
      console.log("----customer---",redux_data);
       dispatch(clear());
      history.push('/login');
      
    }else if(isError){

      console.log(isError);
      // dispatch(clear());
    }
  })
  
    const radioChange = (e) => {
      setRole(e.target.value);
     // console.log(e.target.value);
    };
  
    // const nameChange =(e) =>{
    //   setName(e.target.value);
    // }
  
    // const emailChange =(e) =>{
    //   setEmail(e.target.value);
    // }
  
    // const locationChange=(e) =>{
    //   setLocation(e.target.value);
    // }
  
    // const passwordChange=(e) =>{
    //   setPassword(e.target.value);
    // }
    const sbmt = (data, { resetForm }) => {
     
   
    const creds = { name: data.name, email:data.email, password:data.password, location:data.location, role:role };
    dispatch(signup(creds));
    resetForm();
  //  console.log(creds);
    // axios.post(Backend_URL + "/creds", creds)
    //     .then(response => {
    //       console.log (response);
    //       if(response.status===200){
    //         history.push("/login");
    //       }
        
    //     } )
    //     .catch(error => {
    //       console.log(error);
    //       alert("Error occured while signing up")
    //  
    //     });

    };
  
    return (
      <Container className="p-5">
        {/* <div>
          <h1 className=" text-center mb-3 t-5" style={{ marginTop: "10%" }}>
            Uber<span style={{ color: "#3FC060" }}>Eats</span>
          </h1>
        </div> */}
        <Formik
          validationSchema={schema}
          onSubmit={sbmt}
          initialValues={{
            name: "",
            email: "",
            password: "",
            location: "",
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Row className="mb-3">
              <Col lg={7} md={8} sm={10} className="p-5 m-auto">
                <ToggleButtonGroup className="mb-4" style={{ width: '80%', marginInlineStart:"12%" }} type="radio" name="options" required>
                 
                  <ToggleButton variant="dark" id="tbg-radio-2" value={"customer"} onChange={radioChange}>
                  <span style={{padding: "10px"}}>Customer</span>
                  </ToggleButton>
                  <ToggleButton variant="dark" id="tbg-radio-3" value={"restaurant"} onChange={radioChange}>
                  <span style={{padding: "10px"}}>Restaurant</span>
                  </ToggleButton>
                </ToggleButtonGroup>

  
                {/* <ToggleButtonGroup className="mb-4" style={{ width: '80%', marginInlineStart:"12%" }}
                  type="radio" 
                  value={role}
                  onChange={radioChange}
                >
                  <ToggleButton variant="dark" id="tbg-btn-1" name="role" value="customer">
                  Customer
                  </ToggleButton>
                  <ToggleButton variant="dark" id="tbg-btn-2" name="role" value="restaurant">
                  Restaurant
                  </ToggleButton>
                  
                </ToggleButtonGroup> */}
  
               
  
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group className="mb-2" controlId="validationFormikName">
                    <Form.Label>Enter Name</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        aria-describedby="inputGroupPrepend"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group
                    className="mb-2"
                    controlId="validationFormikUsername"
                  >
                    <Form.Label>Enter email address</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        aria-describedby="inputGroupPrepend"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
  
                  {role === "restaurant" ? (
                    <Form.Group className="mb-2" controlId="validationFormikName">
                      <Form.Label>Enter Location</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="text"
                          placeholder="Location"
                          aria-describedby="inputGroupPrepend"
                          name="location"
                          value={values.location}
                          onChange={handleChange}
                          isInvalid={!!errors.location}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.location}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  ) : null}
  
                  <Form.Group className="mb-3" controlId="validationFormik04">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
  
                  <div className="d-grid gap-2">
                    <Button type="submit" variant="dark" size="md">
                      Sign Up
                    </Button>
                  </div>
                </Form>
                <div className="text-center m-2">
                  <span>Already use Uber? </span>
                  <Link class="link_login_signup" id="login" to="/login">
                    {" "}
                    Sign In
                  </Link>
                </div>
              </Col>
              
            </Row>
          )}
        </Formik>
      </Container>
    );
  }
  
  export default SignUp;
  