import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import vijay from "../../../assets/images/avatars/vijay.jpg";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import CommanButton from "../../../components/common/form/commonButtton";
import BookAppointment from "../../commonfeature/BookAppointment";
import CommonTable from "../../../components/table/CommonTable";
import NewCommonPagination from "../../../components/pagination/NewCommonPagination";
import axios from "axios";
import { useSelector } from "react-redux";

function PatientAppointmentList() {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const { user } = useSelector(state => state?.auth)

  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;

  const [patients, setPatients] = useState([]);

  async function getPatients() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/patient/getAll?page=${currentPage}&limit=${limitPerPage}`);
      console.log("appooijofdng => ", response?.data?.data);
      setPatients(response?.data?.data);
    } catch (err) {
      console.log("Error fetching departments:", err);
    }
  }

  useEffect(() => {
    getPatients();
  }, [currentPage]);

  const columns = [
    // { name: "", accessor: "checkbox", class: "w-auto" },
    { name: "Patient Name", accessor: "patientName", class: "py-3 px-5 text-left", width: "250px" },
    { name: "UH ID", accessor: "uhId", class: "text-center px-1" },
    { name: "Date", accessor: "date", class: "text-center px-1" },
    { name: "Sex", accessor: "sex", class: "py-3 text-center px-1" },
    { name: "Age", accessor: "age", class: "py-3 text-center px-1", width: "30px" },
    { name: "Disease", accessor: "diseases", class: "py-3 text-center px-1", },
    { name: "Status", accessor: "status", class: "py-3 text-center px-1", },
    { name: "Doctor name", accessor: "doctorName", class: "py-3 text-center px-1", },
    { name: "Action", accessor: "action", class: "py-3 text-center px-1", }
  ];

  const renderRow = (item, index) => (
    <tr key={item.id} className="border-bottom text-center">
      <td className="px-2 text-start lh-1">
        <div className="d-flex align-items-center">
          <div className="ps-2">
            <input
              type="checkbox"
              style={{ transform: "scale(1.5)", cursor: "pointer" }}
            />
          </div>
          <img
            src={item?.Photo ? `${process.env.REACT_APP_API_URL}/${item?.Photo}` : vijay}
            alt={item?.Name}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            className="ms-3"
          />
          <div className="ms-2">
            <p className="fw-semibold m-auto">{item?.Name}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-2">UH{item?.Patient_ID}</td>
      <td className="py-3 px-2">{item?.created_at?.split("T")[0]}</td>
      <td className="py-3 px-2">{item?.patient_sex}</td>
      <td className="py-3 px-2">{item?.patient_age}</td>
      <td className="py-3 px-2">{item?.diseases}</td>

      <td className="py-3 px-2">{item?.status}</td>
      <td className="py-3 px-2">{item?.doctorName}</td>
      <td>
        <FiEdit2 style={{ height: "23px", width: "23px" }} />
        <span className="ps-3"></span>
        <RiDeleteBinLine style={{ height: "25px", width: "25px" }} />
      </td>
    </tr>
  );

  return (

    <div className="py-4 px-3">
      <div>
        <Row className="align-items-center">
          <Col md={6}>
            <div className="fw-bold fs-3">Patient List</div>
            <div className="pb-3">
              <span className="fw-semibold" style={{ fontSize: "1rem" }}>
                Showing:
              </span>
              <span style={{ fontSize: "1rem" }}>
                {" "}
                All Consultations of All Healthcare Providers
              </span>
            </div>
          </Col>
          <Col md={6}>
            <div
              className="d-flex justify-content-end align-items-center"
              style={{ verticalAlign: "middle" }}
            >
              {
                user.role === "Reception" && <CommanButton
                  label="+ Book Appointment"
                  className="mb-3 ps-4 pe-4 p-2 fw-bold fs-6"
                  style={{ borderRadius: "5px" }}
                  onClick={handleShowModal}
                />
              }
            </div>
          </Col>
        </Row>
      </div>

      <div className="mt-2">
        <div>
          <CommonTable minimumWidth={"1000px"} headers={columns} bodyData={patients?.data} renderRow={renderRow} title={"Patients List"} />
        </div>
        {
          patients?.data?.length > 0 &&
          <NewCommonPagination currentPage={currentPage} limitPerPage={limitPerPage} totalRecords={patients?.pagination?.TotalRecords} setCurrentPage={setCurrentPage} />
        }
      </div>

      <BookAppointment
        show={showModal}
        handleClose={handleCloseModal}
      // handleDelete={handleDeleteAccount}
      />
    </div>
  );
}

export default PatientAppointmentList;