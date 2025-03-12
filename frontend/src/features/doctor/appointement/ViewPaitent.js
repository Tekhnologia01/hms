import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import InputBox from "../../../components/common/form/inputbox";
import Note from "../../../components/common/form/textarea";
import { FaArrowLeft, FaFileUpload } from "react-icons/fa";
import CommanButton from "../../../components/common/form/commonButtton";
import vijay from "../../../assets/images/avatars/vijay.jpg";
import AddTest from "./AddTest";
import Bill from "./Billl";
import { useNavigate, useParams } from "react-router-dom";
import AddPrescription from "./AddPresciption";
import axios from "axios";
import CommonTable from "../../../components/table/CommonTable";
import { RiCloseLargeFill, RiDeleteBinLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { epochTimeToDate } from "../../../utils/epochToDate";

function ViewPatient() {
  const boxStyle = {
    border: "1px  solid #CFD4DC",
    borderRadius: "8px",
    padding: "16px",
    textAlign: "center",
    fontSize: "14px",
    backgroundColor: "#f9f9f9",
  };

  const inputstyle = {
    fontSize: "1rem",
  };

  const navigate = useNavigate();

  const { role } = useSelector(state => state?.auth?.user);

  const [showModalbill, setShowModalbill] = useState(false);

  const handleShowModalbill = () => setShowModalbill(true);
  const handleCloseModalbill = () => setShowModalbill(false);


  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [showModalPrescription, setShowModalPrescription] = useState(false);

  const handleShowModalPrescription = () => setShowModalPrescription(true);
  const handleCloseModalPrescription = () => setShowModalPrescription(false);

  const [prescriptionData, setPrescriptionData] = useState([]);
  const [testData, setTestData] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);

  const params = useParams();

  console.log(params);


  const initialState = {
    report_photo: "",
    report_test_id: +params.labId,
    report_appo_id: +params.appointmentId,
  }
  const [formData, setFormData] = useState(initialState);


  const handleSubmit = async (newData) => {

    try {

      const payload = {
        prescriptions: [newData]
      }

      await axios.post(`${process.env.REACT_APP_API_URL}/prescription/add`, payload);
      getPrescriptionTest();
      alert("Prescription added successfully");
    } catch (error) {
      console.log("Prescription Error : ", error);
    }
  }

  const handleTestSubmit = async (newData) => {

    try {

      newData.labAppoiId = +appointmentData?.Appointment_Id;
      newData.labTestIds = newData.labTestIds.map((test) => {
        return test.value;
      });

      await axios.post(`${process.env.REACT_APP_API_URL}/lab/addlabtest`, newData, {
        headers: { "Content-Type": "application/json" }
      });

      getPrescriptionTest();
      alert("Test Added Successfully")
    } catch (error) {

    }
  }


  const handleSave = async () => {
    try {

      console.log("FormData", formData);


      if (formData?.report_photo !== "") {

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/report/add`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        console.log(response);

        if (response?.data?.status) {
          alert(response?.data?.message)

          const payload = {
            labAppoiId: +params?.appointmentId,
            labTestId: +params?.labId,
            testStatus: "Completed"
          }

          await axios.post(`${process.env.REACT_APP_API_URL}/lab/updatelabtest`, payload);
          navigate(-1);
        }
        else {
          alert("Failed to upload report");
        }

      } else {
        alert("Please Upload Report");
      }

    } catch (error) {

    }
  }

  const handleDelete = (item, value) => {

    let filteredData = [];

    // if (value === 'Test') {
    //   filteredData = tests.filter((test) => {
    //     return test.lab_id !== item;
    //   });

    //   setTests(filteredData);
    // } else {
    //   filteredData = prescriptionData.filter((presc, index) => {
    //     return index !== item;
    //   });

    //   setPrescriptionData(filteredData);
    // }

  }


  async function getAppointementDetail() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/appointment/getAppointmentWiseDoctorpatientDetails?appo_id=${params.appointmentId}`);
      setAppointmentData(response?.data?.data);

    } catch (error) {

    }
  }

  async function getPrescriptionTest() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/appointment/getprescriptiontest?appo_id=${params?.appointmentId}`);
      setPrescriptionData(response?.data?.data?.prescription);
      setTestData(response?.data?.data?.Test);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAppointementDetail();
    getPrescriptionTest();
  }, []);


  const handleInputChange = (e) => {
    const { name, type } = e.target;

    if (type === "file") {
      // Handle file inputs
      const file = e.target.files[0];
      setFormData({
        ...formData,
        [name]: file, // Store the file object
      });
    }
  };


  console.log(formData);

  const handleBoxClick = () => {
    document.getElementById("report_photo").click();
  };

  const handleBill = async (formData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/bill/createbill`, { ...formData, bill_appointment_id: params.appointmentId });
      console.log(response);
    } catch (err) {
      console.log(err?.message);
    }
  }


  return (
    <div className="mx-lg-4 m-3 pb-3">
      <div className="d-flex align-items-end justify-content-between pt-1 flex-wrap">
        <div
          className="fw-semibold pb-lg-3"
          style={{ color: "#1D949A", fontSize: "18px" }}
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          <span className="pt-1 px-2">Doctor Appointment / Patients Details / Patient Name </span>
        </div>
        <div className="d-flex mt-4 m-lg-0 gap-2 justify-content-end">
          <CommanButton
            label="Admit Patient"
            className="p-1 px-4 fw-semibold"
            style={{ borderRadius: "7px", fontSize: "14px", height: "40px", }}
          />
        </div>
      </div>

      <Row className="mt-2 m-0">
        <Col md={5} className="m-0 p-0">
          <div className="d-flex justify-content-center">
            <img
              src={`${process.env.REACT_APP_API_URL}/${appointmentData?.Patient_Photo}`}
              alt="Doctor"
              className="rounded-circle"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                backgroundColor: "red",
              }}
            />
          </div>

          {/* Doctor Details */}
          <div className="text-center mt-3 fw-bold ">{appointmentData?.Patient_Name}</div>
          <div className="text-center">{appointmentData?.Patient_Age} | {appointmentData?.Patient_Sex}</div>
          <hr></hr>
          <div>
            <Row className="m-0">
              <Col>
                <div style={inputstyle}>UH I’d</div>
                <div className=" fw-semibold " style={inputstyle}>
                  UH{appointmentData?.Patient_Id}
                </div>
              </Col>
              <Col className="">
                <div className=" d-flex justify-content-center ">
                  <div style={inputstyle}>Phone No.</div>
                </div>

                <div
                  className="d-flex justify-content-center fw-semibold "
                  style={inputstyle}
                >
                  {appointmentData?.patient_phone}
                </div>
              </Col>
            </Row>

            <Row className="m-0">
              <Col className="gy-2">
                <div style={inputstyle}>Date of Register</div>
                <div className="fw-semibold " style={inputstyle}>
                  {appointmentData?.RegisterDate?.split("T")[0]}
                </div>
              </Col>
              <Col className="gy-2">
                <div className=" d-flex justify-content-center ">Diseases</div>
                <div className=" d-flex justify-content-center fw-semibold fs-6 ">
                  {appointmentData?.disease}
                </div>
              </Col>
            </Row>
          </div>

          <hr></hr>

          <div className="mt-3">
            <div className="px-3">
              {
                role === "Doctor" &&
                <span
                  className="fw-semibold fs-6 pl-2 cursor-pointer"
                  style={{ color: "#1d949a", cursor: 'pointer' }}
                  onClick={handleShowModal}
                >+ Add Test</span>
              }

            </div>

            <div className="py-3 d-flex flex-wrap">
              {testData?.length > 0 &&
                testData?.map((test) => {
                  return <span className="p-2 rounded m-2" key={test?.lab_id} style={{ border: '2px solid #1d949a' }}>
                    {test?.TestName}
                    {
                      role === 'Doctor' &&
                      <span onClick={() => handleDelete(test?.TestId, 'Test')} style={{ cursor: "pointer" }}><RxCross2 className="" /></span>
                    }
                  </span>
                })
              }
            </div>

            {role === "Lab" &&
              <div className="py-3" onClick={handleBoxClick}>
                <label className="fw-semibold" style={{ fontSize: "1.1rem" }}>
                  Reports <span className="text-danger fw-bold">*</span>
                </label>
                <div style={boxStyle} className="mt-2">
                  <div className="d-flex justify-content-center">
                    <FaFileUpload size={24} />
                  </div>
                  <div style={{ fontSize: "1.1rem" }}>
                    <span
                      className="fw-bold"
                      style={{ fontSize: "1.1rem", color: "#1D949A" }}
                    >
                      Click to upload{" "}
                    </span>
                    or drag and drop
                  </div>
                  <div style={{ fontSize: "1.1rem" }}>
                    PDF (max. 5Mb)
                  </div>

                  {formData.report_photo && (
                    <div className="mt-2 text-success fw-semibold">{formData.report_photo?.name}</div>
                  )}
                </div>
                <Form.Control
                  type="file"
                  id="report_photo"
                  name="report_photo"
                  accept="image/png, image/jpeg, image/gif, image/svg+xml"
                  style={{ display: "none" }}
                  onChange={handleInputChange}
                />
              </div>
            }

          </div>

          {/* <div>
            <Note
              placeholder="Monitoring plan here...."
              className="custom-class"
              label="Add Monitoring Plan"
              isRequired={true}
            />
          </div> */}
        </Col>

        <Col md={7} className="m-0 ">
          <Row className="m-0 p-0">
            <Col md={6} className="gy-3">
              <InputBox
                label={"Healthcare Provider"}
                placeholder="Doctor name"
                value={appointmentData?.Doctor_Name}
                disabled
                isRequired={true}
              />
            </Col>
            <Col md={6} className="gy-3">
              <InputBox
                label={"Consultation Type"}
                placeholder="Clinic Consulting"
                // value={values.cafeName}
                disabled
                isRequired={true}
              />
            </Col>

            <Col md={6} className="gy-3">
              <InputBox
                label={"Patient Name "}
                placeholder="Name"
                value={appointmentData?.Patient_Name}
                disabled
                // onChange={handleChange}
                isRequired={true}
              />
            </Col>
            <Col md={6} className="gy-3">
              <InputBox
                label={"Location"}
                placeholder="City"
                value={appointmentData?.Patient_city}
                disabled
                isRequired={true}
              />
            </Col>

            <Col md={6} className="gy-3">
              <InputBox
                label={"Slot Time"}
                placeholder="Timing"
                value={appointmentData?.slot_time}
                disabled
                isRequired={true}
              />
            </Col>
            <Col md={6} className="gy-3">
              <InputBox
                label={"Date of Consultation"}
                placeholder="Date"
                value={epochTimeToDate(appointmentData?.Appointment_Date)}
                disabled
                isRequired={true}
                name="cafeName"
              />
            </Col>
          </Row>

          <div className="mt-3 px-3">
            <Note
              rows={1}
              value={appointmentData?.Consultant_Reason}
              disabled
              placeholder="Reason for consultation here..."
              className=""
              label="Reason For Consultation"
              isRequired={true}
            />
          </div>

          {
            role === 'Doctor' &&
            <div className="px-3">
              <span
                className="fw-semibold fs-6 pl-2 cursor-pointer"
                style={{ color: "#1d949a", cursor: 'pointer' }}
                onClick={handleShowModalPrescription}
              >+ Add Prescription</span>
            </div>
          }

          {/* <div className="px-3 mt-3">
            {prescriptionData.length > 0 &&
              <CommonTable headers={columns} bodyData={prescriptionData} renderRow={renderRow} title={"Prescription"} />}
          </div> */}

          <div className="py-2 border p-3 mx-3 mt-2" style={{ borderRadius: "5px", color: "#46494C" }}>
            <div className="border-bottom pb-2 mb-2" >
              <div className="d-flex gap-2 justify-content-between">
                <div className="d-flex fw-semibold fs-5 flex-column align-items-center ms-2" style={{ height: "40px" }}>
                  <p className="text-black p-auto m-auto">Test & Prescription Detail</p>
                </div>
              </div>
            </div>
            <div className="d-flex" style={{ lineHeight: "17px" }}>
              <div style={{ width: "25%" }}>
                <div className="mt-2">
                  <p className="fw-semibold text-gray">Test:</p>

                  <div className="py-3 d-flex flex-column">
                    {testData?.length > 0 &&
                      testData?.map((test) => {
                        return <span className="p-2 rounded m-2 text-center" key={test?.lab_id} style={{ border: '2px solid #1d949a' }}>
                          {test?.TestName}
                          {
                            role === 'Doctor' &&
                            <span onClick={() => handleDelete(test?.TestId, 'Test')} style={{ cursor: "pointer" }}><RxCross2 className="" /></span>
                          }
                        </span>
                      })
                    }
                  </div>
                </div>
              </div>
              <div className="border-start ps-3 w-100">
                <div className="mt-2 w-full">
                  <p className="fw-semibold text-gray">
                    Prescription:
                  </p>
                  {
                    prescriptionData?.length > 0 && prescriptionData?.map((presc) => {
                      return <p className="d-flex m-0 p-0">
                        <p style={{ width: "35%" }}>{presc?.Medicine_Name}</p>
                        <p style={{ width: "15%" }}>{presc?.Dosage}</p>
                        <p style={{ width: "25%" }}>{presc?.Food_Intake}</p>
                        <p style={{ width: "25%" }}>{presc?.Duration}</p>
                      </p>
                    })
                  }

                </div>
              </div>
            </div>
          </div>


          {/* <div className="px-3">
            <Note
              // value={noteValue}
              // onChange={(e) => setNoteValue(e.target.value)}
              placeholder="prescription details here...."
              className="custom-class"
              label="Precription"
              isRequired={true}
            />
          </div> */}
        </Col>
      </Row>

      <div className="">
        <hr />

        <div className="">
          <Row className="m-0 flex align-items-center justify-content-between">
            <Col lg={6}>
              <input
                type="checkbox"
                id="notifyPatientCheckbox"
                style={{ marginRight: "10px" }}
              />
              <label htmlFor="notifyPatientCheckbox" className="mb-0">
                Notify Patient about Availability of Consultation Note
              </label>
            </Col>

            <Col lg={6} className="d-flex justify-content-end">
              <div className="d-flex gap-2">
                {
                  (role === "Doctor" || role === "Lab") &&
                  <>
                    <CommanButton
                      label="Save"
                      variant="#7B3F0080"
                      className="mb-3 ps-4 pe-4  p-2"
                      style={{ borderRadius: "5px" }}
                      onClick={handleSave}
                    />
                    {/* <CommanButton
                      label="Add Test"
                      variant="#7B3F0080"
                      className="mb-3 ps-4 pe-4  p-2"
                      style={{
                        borderRadius: "5px",
                        backgroundColor: "white",
                        color: "black",
                        borderColor: "#CFD4DC",
                      }}
                      onClick={handleShowModal}
                    /> */}
                  </>
                }
                <CommanButton
                  label="End Appointment"
                  variant="#7B3F0080"
                  className="mb-3 ps-4 pe-4  p-2 "
                  style={{
                    borderRadius: "5px",
                    backgroundColor: "white",
                    color: "black",
                    borderColor: "#CFD4DC",
                  }}
                  onClick={handleShowModalbill}

                />
              </div>
            </Col>
          </Row>
        </div>

        <hr />
      </div>


      <AddTest
        show={showModal}
        handleClose={handleCloseModal}
        handleTestSave={handleTestSubmit}
      />

      <AddPrescription
        show={showModalPrescription}
        handleClose={handleCloseModalPrescription}
        handlePrescriptionSubmit={handleSubmit}
      />

      <Bill
        show={showModalbill}
        patientName={appointmentData?.Patient_Name}
        handleClose={handleCloseModalbill}
        callbackFun={handleBill}
      />
    </div >
  );
}

export default ViewPatient;
