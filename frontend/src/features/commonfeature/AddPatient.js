import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import InputBox from "../../components/common/form/inputbox";
import { FaArrowLeft, FaFileUpload } from "react-icons/fa";
import CommanButton from "../../components/common/form/commonButtton/index";
import vijay from "../../assets/images/avatars/vijay1.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { validatePatientForm } from '../../validation/PatientValidation'

function AddPatient() {
  const [errors, setErrors] = useState({});


  const navigate = useNavigate();
  const { user } = useSelector(state => state?.auth)
  // State for form data
  const [formData, setFormData] = useState({
    patient_name: "",
    patient_phone_no: "",
    patient_age: "",
    patient_sex: "",
    patient_address: "",
    patient_city: "",
    patient_id_proof: "",
    patient_proof_image: null,
    patient_photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };



  const handleSubmit = async (e) => {




    const validationErrors = validatePatientForm(formData);
    setErrors(validationErrors); // Store errors in state

    // If there are errors, stop form submission
    if (Object.keys(validationErrors).length > 0) {
      return;
    }



    e.preventDefault();
    const data = new FormData();
    data.append("patient_name", formData.patient_name);
    data.append("patient_phone_no", formData.patient_phone_no);
    data.append("patient_age", formData.patient_age);
    data.append("patient_sex", formData.patient_sex);
    data.append("patient_address", formData.patient_address);
    data.append("patient_city", formData.patient_city);
    data.append("patient_id_proof", formData.patient_id_proof);

    if (formData.patient_proof_image) {
      data.append("patient_proof_image", formData.patient_proof_image);
    }

    if (formData.patient_photo) {
      data.append("patient_photo", formData.patient_photo);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/patient/addpatient/${user?.userId}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      alert(response?.data?.message);
      setFormData({
        patient_name: "",
        patient_phone_no: "",
        patient_age: "",
        patient_sex: "",
        patient_address: "",
        patient_city: "",
        patient_id_proof: "",
        patient_proof_image: null,
        patient_photo: null,
      })
    } catch (err) {
      console.log("Error adding patient => ", err);
    }
  };


  return (
    <div className="mx-lg-4 m-3 pb-3">
      <div className="d-flex align-items-end justify-content-between pt-1 flex-wrap">
        <div
          className="fw-semibold pb-3"
          style={{ color: "#1D949A", fontSize: "18px", cursor: "pointer" }}
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          <span className="pt-1 px-2">Add Patient</span>
        </div>
        <div className="d-flex m-0 gap-2 justify-content-end">
          <CommanButton
            label="Save"
            className="p-1 px-4 fw-semibold me-2"
            style={{ borderRadius: "7px", fontSize: "14px", height: "40px" }}
            onClick={handleSubmit}
          />
        </div>
      </div>

      <Row className="mt-2">
        <Col md={4}>
          <div className="d-flex flex-column align-items-center justify-content-center">
            {/* Profile Image Selection */}
            <input
              type="file"
              id="profileInput"
              name="patient_photo"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <img
              src={formData.patient_photo ? URL.createObjectURL(formData.patient_photo) : vijay}
              alt="Profile"
              className="rounded-circle"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                cursor: "pointer",
              }}
              onClick={() => document.getElementById("profileInput").click()}
            />

            <span className="fw" style={{ fontSize: "13px", color: "gray" }}>
              Click to select picture
            </span>
          </div>

          <div className="text-center mt-3 fw-semibold" style={{ fontSize: "1rem" }}>
            {formData.patient_name || ""}
          </div>
          <div className="text-center">{formData.patient_age} {formData.patient_age && formData.patient_sex && "|"} {formData.patient_sex}</div>
          <div className="d-flex justify-content-center">
            <hr className="w-75"></hr>
          </div>

        </Col>

        <Col md={8}>
          <Row className="m-0 pb-3">
            <Col md={6} className="gy-3">
              <InputBox
                label="Patient Name"
                placeholder="Patient Name here..."
                isRequired={true}
                name="patient_name"
                value={formData.patient_name}
                onChange={handleInputChange}
              />
              {errors.patient_name && <p className="text-danger">{errors.patient_name}</p>}

            </Col>


            <Col md={6} className="gy-3">
              <InputBox
                label="Phone No."
                placeholder="Phone no here..."
                isRequired={true}
                name="patient_phone_no"
                value={formData.patient_phone_no}
                onChange={handleInputChange}
              />
              {errors.patient_phone_no && <p className="text-danger">{errors.patient_phone_no}</p>}

            </Col>

            <Col md={6} className="gy-3">
              <InputBox
                label="Age"
                placeholder="Age here..."
                isRequired={true}
                name="patient_age"
                value={formData.patient_age}
                onChange={handleInputChange}
              />
              {errors.patient_age && <p className="text-danger">{errors.patient_age}</p>}
            </Col>

            <Col md={6} className="gy-3">
              <Form.Group controlId="sexSelect" >
                <Form.Label className="fw-semibold" style={{ fontSize: "1rem" }}>
                  Sex <span style={{ color: "red" }}>*</span>
                </Form.Label>

                <Form.Select
                  style={{ padding: '0.6rem' }}
                  name="patient_sex"
                  value={formData.patient_sex}
                  onChange={handleInputChange}
                  isRequired={true}
                >
                  <option value="">Select sex</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>
              {errors.patient_sex && <p className="text-danger">{errors.patient_sex}</p>}

            </Col>


            <Col md={6} className="gy-3">
              <InputBox
                label="Address"
                placeholder="Address here..."
                isRequired={true}
                name="patient_address"
                value={formData.patient_address}
                onChange={handleInputChange}
              />
              {errors.patient_address && <p className="text-danger">{errors.patient_address}</p>}

            </Col>

            <Col md={6} className="gy-3">
              <InputBox
                label="City"
                placeholder="City here..."
                isRequired={true}
                name="patient_city"
                value={formData.patient_city}
                onChange={handleInputChange}
              />
              {errors.patient_city && <p className="text-danger">{errors.patient_city}</p>}

            </Col>

            {/* <Col md={6} className="gy-3">
              <InputBox
                label="UH I'd"
                placeholder="UH I'd generated automatically..."
                isRequired={true}
                name=""
                value={""}
                onChange={() => { }}
              />
            </Col> */}

            <Col md={6} className="gy-3">
              <Form.Group controlId="idSelect">
                <Form.Label className="fw-semibold" style={{ fontSize: "1rem" }}>
                  Select I'd Proof <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Select
                  style={{ padding: '0.6rem' }}
                  value={formData.patient_id_proof}
                  name="patient_id_proof"
                  onChange={handleInputChange}
                  isRequired={true}
                >
                  <option value="">Select I'd Proof</option>
                  <option value={"aadhar"}>Aadhar card</option>
                  <option value={"pan"}>Pan card</option>
                  <option value={"licence"}>Driving license</option>
                  <option value={"other"}>Other</option>
                </Form.Select>
              </Form.Group>

              {errors.patient_id_proof && <p className="text-danger">{errors.patient_id_proof}</p>}

            </Col>
          </Row>



          {/* ID Proof Image Upload */}
          <div className="px-3 mt-1" onClick={() => document.getElementById("proofInput").click()} style={{ cursor: "pointer" }}>
            <label className="fw-semibold mb-2" style={{ fontSize: "1.1rem" }}>
              ID Proof Image <span className="text-danger fw-bold">*</span>
            </label>
            <div className="d-flex flex-column align-items-center p-3 border rounded" style={{ backgroundColor: "#f9f9f9" }}>
              <input
                type="file"
                id="proofInput"
                name="patient_proof_image"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <div className="d-flex mb-1 justify-content-center">
                <FaFileUpload size={24} />
              </div>
              <div style={{ fontSize: "1rem" }}>
                <span className="fw-bold" style={{ fontSize: "1rem", color: "#1D949A" }}>
                  Click to upload{" "}
                </span>
                or drag and drop
              </div>
              <div style={{ fontSize: "1rem" }}>SVG, PNG, JPG, or GIF (max. 800x400px)</div>
              {formData.patient_proof_image && (
                <div className="mt-2">
                  <img src={URL.createObjectURL(formData.patient_proof_image)} alt="Proof Preview" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                </div>
              )}
            </div>
          </div>

          {errors.patient_proof_image && <p className="text-danger ps-3">{errors.patient_proof_image}</p>}

        </Col>
      </Row>
    </div>
  );
}

export default AddPatient;
