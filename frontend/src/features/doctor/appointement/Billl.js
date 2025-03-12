import React, { useState } from "react";
import { Col, Modal, Row, Table } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import CommanButton from "../../../components/common/form/commonButtton";
import SearchDropdown from "../../../components/common/form/searchDropdown";
import Note from "../../../components/common/form/textarea";
import InputBox from "../../../components/common/form/inputbox";

const Bill = ({ show, handleClose, patientName, callbackFun }) => {

  const [formData, setFormData] = useState({
    bill_total_amount: "",
    payment_method: "",
    payment_status: "Paid"
  })

  const closeIconStyle = {
    position: "absolute",
    top: "20px",
    right: "30px",
    fontSize: "20px",
    cursor: "pointer",
    color: "#999",
    zIndex: 10, // Ensure it appears above content
  };

  const headingstyle = {
    backgroundColor: "rgb(238, 241, 245)",
    color: "rgb(92, 95, 97)",
    textAlign: "center",
    padding: "10px",
    fontSize: "1rem",
  };

  const headingstyleAge = {
    backgroundColor: "rgb(238, 241, 245)",
    color: "rgb(92, 95, 97)",
    textAlign: "center",
    padding: "10px",
    fontSize: "1rem",
    width: "75px",
  };

  const bodystyle = {
    textAlign: "center",
    verticalAlign: "middle",
    fontSize: "1rem",
    color: "#475467",
  };
  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose()
        setFormData({
          bill_total_amount: "",
          payment_method: "",
          payment_status: "Paid"
        })
      }}
      size="lg"
      dialogClassName="custom-modal"
    >
      <div className="ps-4 pt-3">
        <FaTimes style={closeIconStyle} onClick={handleClose} />

        <div className="fw-bold fs-5">Billing</div>
      </div>

      <hr></hr>

      <div className="pe-5 ps-5 pb-5 pt-3">
        {/* Close Button */}
        <InputBox
          label={"Patient name"}
          placeholder="Patient Name here ."
          isRequired={true}
          className=""
          value={patientName}
          // onChange={handleChange}
          name="cafeName"
        />

        <div className=" fw-semibold pt-3 pb-3">Billing item</div>

        <Row className="gy-3">
          <Col lg={6}>
            <InputBox
              placeholder="Payment Method"
              isRequired={true}
              value={formData?.payment_method}
              onChange={(e) => { setFormData({ ...formData, payment_method: e.target.value }) }}
              name="cafeName"
            />
          </Col>

          <Col lg={6}>
            <InputBox
              placeholder="Amount"
              isRequired={true}
              value={formData?.bill_total_amount}
              onChange={(e) => { setFormData({ ...formData, bill_total_amount: e.target.value }) }}
              name="cafeName"
            />
          </Col>
          {/* <Col lg={4}>
            <InputBox
              placeholder="Quantity"
              isRequired={true}
              // value={values.cafeName}
              // onChange={handleChange}
              name="cafeName"
            />
          </Col> */}
        </Row>

        {/* <div className="pt-2">
          <div style={{ overflowX: "auto" }}>
            <Table
              responsive="sm"
              className="bordered"
              style={{
                tableLayout: "fixed", // Ensures fixed column width
                minWidth: "900px", // Set your desired minimum width
              }}
            >
              <thead style={{ backgroundColor: "red", color: "white" }}>
                <tr>
                  <th style={headingstyle}>UH ID</th>
                  <th style={headingstyle}>Register Date</th>
                  <th style={headingstyle}>Sex</th>

                  <th style={headingstyle}>Disease</th>
                </tr>
              </thead>
              <tbody>
                {[{}].map((patient) => (
                  <tr key={patient.id}>
                    <td style={bodystyle}>{patient.id}</td>
                    <td style={bodystyle}>{patient.date}</td>
                    <td style={bodystyle}>{patient.sex}</td>
                    <td style={bodystyle}>{patient.age}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div> */}

        <div className="d-flex justify-content-end pt-4">
          <CommanButton
            label="Submit"
            variant="#7B3F0080"
            className=" ps-3 pe-3 p-2 fw-semibold"
            style={{ borderRadius: "5px" }}
            onClick={() => {
              handleClose();
              callbackFun(formData);
              setFormData({
                bill_total_amount: "",
                payment_method: "",
                payment_status: "Paid"
              })
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default Bill;
