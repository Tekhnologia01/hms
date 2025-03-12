import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Airavat from "../../../assets/images/Airavat.png";
import { jwtDecode } from "jwt-decode";
import InputBox from "../../../components/common/form/inputbox";
import { useNavigate } from "react-router-dom";
// import { validateLoginData } from "../../views/validation/Validationall";
// import { apiurl } from "../../app/apiurl";
import axios from "axios";
import CommanButton from "../../../components/common/form/commonButtton/index";
import PasswordInput from "../../../components/common/form/password";
import Google from "../../../assets/images/google.png";
import Facebook from "../../../assets/images/facebook.png";
import Apple from "../../../assets/images/apple.png";
import Login1 from "../../../assets/images/login.png";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/slices/authSlice";
function Login() {


  const {isAuthenticated} = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    varient: "success",
  });
  const API_BASE_URL = 'apiurl';
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }else {
      // Redirect based on user role
      // switch (role) {
      //   case "super-admin":
      //     navigate("/super-admin");
      //     break;
      //   case "admin":
      //     navigate("/admin");
      //     break;
      //   case "co-ordinator":
      //     navigate("/co-ordinator");
      //     break;
      //   case "teacher":
      //     navigate("/teacher");
      //     break;
      //   case "student":
      //     navigate("/student");
      //     break;
      //   default:
      //     navigate("/unauthorized");
      //     break;
      // }
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handlogin = async () => {
    // validateLoginData(formData);
    // const validationErrors = validateLoginData(formData);
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   setAlert({
    //     show: true,
    //     message: Object.values(validationErrors)[0],
    //     varient: "danger",
    //   });
    //   return;
    // }
    // setErrors({});

    try {

      const response = await dispatch(loginUser({userName: formData.email, password: formData.password }))
      console.log(response);

      // const response = await axios.post(`${API_BASE_URL}/login`, {
      //   username: formData.email,
      //   password: formData.password,
      // });
      // const token = response.data.token;
      // const decodedToken = jwtDecode(token);
      // console.log("user data ", response);
      // console.log("decoded data ", decodedToken);

      // localStorage.setItem("token", token);
      // setAlert({
      //   show: true,
      //   message: "Login Successfull!",
      //   varient: "success",
      // });
      navigate("/");
    } catch (error) {
      console.log(error);
      setAlert({
        show: true,
        message: error.response?.data.message
          ? error.response?.data.message
          : "Error in login!",
        varient: "danger",
      });
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="vh-100 vw-100">
      <Row className="m-0">
        <Col md={6} className="vh-100 ">
          <Container className="vh-100 d-flex align-items-center">
            <Row className="justify-content-center w-100">
              <Col lg={6}>
                <div className="text-center pb-lg-5 pb-3">
                  <img src={Airavat} style={{ width: "185px" }} alt="logo" />
                </div>

                <div className="fs-3 fw-bold pb-2 text-center">
                  Sign in to your account
                </div>

                <div className="pb-2 text-center">
                  <p> Welcome back! Please enter your details</p>
                </div>

                {/* <Form>
                  <Form.Group className="mb-4" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                    />
                  </Form.Group>

                  <div className="text-center pt-1 mb-5 pb-1">
                    <Button className="mb-4 w-100 gradient-custom-2">
                      Sign in
                    </Button>
                    <a className="text-muted" href="#">
                      Forgot password?
                    </a>
                  </div>

                  <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                    <p className="mb-0">Don't have an account?</p>
                    <Button variant="outline-danger" className="mx-2">
                      Register
                    </Button>
                  </div>
                </Form> */}
                <div className=" py-lg-0 py-sm-0  ">
                  <label className="fs-6 pb-2 fw-5 fw-semibold">Email <span className="text-danger fw-bold">*</span></label>

                  

                  <InputBox
                    placeholder="Enter your e-mail"
                    // value={values.cafeName}
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                  />
                  {/* <p className="text-danger">{errors.cafeName}</p> */}
                </div>

                <div className="pb-2 pt-2">
                  <div className="field_cont ">
                    {/* <div>
                      <label className="fs-6  pb-2">Password</label>
                    </div> */}
                    {/* <div style={{ position: "relative" }}>
                      <input
                        type={passwordVisible ? "text" : "password"}
                        name="password"
                        placeholder="Enter password"
                        className="form-control "
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="off" 
                        style={{ padding: "12px" }}
                        required
                      />
                      <span
                        onClick={togglePasswordVisibility}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                        }}
                      >
                        {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                      </span>
      
                    </div> */}

                    <PasswordInput
                      label="Password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      error={errors.password}
                      required
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <CommanButton
                    label="Login"
                    variant="#7B3F0080"
                    className="mb-3 ps-4 pe-4 w-100 p-2"
                    style={{ borderRadius: "5px" }}
                    onClick={handlogin}
                  />
                </div>

                <div className="d-flex justify-content-center">
                  <hr
                    style={{
                      width: "45%",
                      border: "1px solid black",
                    }}
                  />{" "}
                  <span className="pt-1 ps-1 pe-1"> OR</span>{" "}
                  <hr
                    style={{
                      width: "45%",
                      border: "1px solid black",
                    }}
                  />
                </div>
                <div className="pt-3 pb-3">
                  <Row className="m-0 justify-content-between">
                    <Col
                      className="d-flex justify-content-center  m-2"
                      style={{
                        border: "1px solid #CFD4DC",
                        borderRadius: "10px",
                      }}
                    >
                      <div className="p-2">
                        <img
                          src={Facebook}
                          alt="Apple"
                          style={{
                            width: "100%",
                            height: "auto",
                            maxHeight: "30px",
                          }}
                        ></img>
                      </div>
                    </Col>
                    <Col
                      className="d-flex justify-content-center  m-2"
                      style={{
                        border: "1px solid #CFD4DC",
                        borderRadius: "10px",
                      }}
                    >
                      <div className="p-2">
                        <img
                          src={Google}
                          alt="Apple"
                          style={{
                            width: "100%",
                            height: "auto",
                            maxHeight: "30px",
                          }}
                        ></img>
                      </div>
                    </Col>
                    <Col
                      className="d-flex justify-content-center border m-2"
                      style={{
                        border: "1px solid #CFD4DC",
                        borderRadius: "10px",
                      }}
                    >
                      <div className="p-2">
                        <img
                          src={Apple}
                          alt="Apple"
                          style={{
                            width: "100%",
                            height: "auto",
                            maxHeight: "30px",
                          }}
                        ></img>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="text-center">
                  <span style={{ fontWeight: "500" }}>I don’t have an account? </span><span style={{ fontWeight: "500", color: " #0D157F" }}>  Create account</span>
                </div>



              </Col>
            </Row>
          </Container>
          {/* </div> */}
        </Col>
        <Col md={6} className=" vh-100 d-none d-md-block ">
          <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100">
            <img
              src={Login1}
              alt="Login"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Login;