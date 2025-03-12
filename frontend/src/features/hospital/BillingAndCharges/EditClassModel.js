import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import InputBox from "../../../components/common/form/inputbox";

import CommanButton from "../../../components/common/form/commonButtton";
import axios from "axios";

const EditClassModel = ({ show, handleClose, handleCallback, rowData }) => {
    const closeIconStyle = {
        position: "absolute",
        top: "20px",
        right: "30px",
        fontSize: "20px",
        cursor: "pointer",
        color: "#999",
        zIndex: 10, // Ensure it appears above content
    };


    const [formData, setFormData] = useState({
        billing_and_charges_no: "",
        class_name: "",
        bed: "",
        nursing: "",
        doctor: "",
        rmo: "",
        bmw: "",
        total: "",
        deposit: ""
    })

    useEffect(() => {
        setFormData({
            billing_and_charges_no: rowData?.billing_and_charges_no || "",
            class_name: rowData?.class_name || "",
            bed: rowData?.bed || "",
            nursing: rowData?.nursing || "",
            doctor: rowData?.doctor || "",
            rmo: rowData?.rmo || "",
            bmw: rowData?.bmw || "",
            total: rowData?.total || "",
            deposit: rowData?.deposit || ""
        })
    }, [handleClose]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        console.log(name, value);

        setFormData({
            ...formData,
            [name]: value,
        });

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleCallback(formData);
    }


    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            dialogClassName="custom-modal"
        >
            <div className="pe-5 ps-4 pt-3 pb-0">
                <FaTimes style={closeIconStyle} onClick={handleClose} />

                <div className="fw-semibold fs-5">Billing & Charges</div>
            </div>

            <hr></hr>

            <div className="pe-4 ps-4 pb-5 pt-3">
                {/* Close Button */}
                <InputBox
                    label={"Class Name"}
                    placeholder="Class Name here..."
                    isRequired={true}
                    className='fs-5'
                    value={formData?.class_name}
                    onChange={handleChange}
                    name="class_name"
                />
                <Row className="mt-2">
                    <Col lg={6}>
                        <InputBox
                            label={"Bed"}
                            placeholder="Bed"
                            className='fs-5'
                            value={formData?.bed}
                            onChange={handleChange}
                            name="bed"
                        />
                    </Col>
                    <Col lg={6}>
                        <InputBox
                            label={"Nursing"}
                            placeholder="Nursing"
                            className='fs-5'
                            value={formData?.nursing}
                            onChange={handleChange}
                            name="nursing"
                        />
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col lg={6}>
                        <InputBox
                            label={"Doctor"}
                            placeholder="Select patient source"
                            className='fs-5'
                            value={formData?.doctor}
                            onChange={handleChange}
                            name="doctor"
                        />
                    </Col>
                    <Col lg={6}>
                        <InputBox
                            label={"RMO"}
                            placeholder="Select patient source"
                            className='fs-5'
                            value={formData?.rmo}
                            onChange={handleChange}
                            name="rmo"
                        />
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col lg={6}>
                        <InputBox
                            label={"BMW"}
                            placeholder="Select patient source"
                            className='fs-5'
                            value={formData?.bmw}
                            onChange={handleChange}
                            name="bmw"
                        />
                    </Col>
                    <Col lg={6}>
                        <InputBox
                            label={"Total"}
                            placeholder="Select patient source"
                            className='fs-5'
                            value={formData?.total}
                            onChange={handleChange}
                            name="total"
                        />
                    </Col>
                </Row>


                <Row className="mt-2">
                    <Col lg={6}>
                        <InputBox
                            label={"Deposit"}
                            placeholder="Select patient source"
                            className='fs-5'
                            value={formData?.deposit}
                            onChange={handleChange}
                            name="deposit"
                        />
                    </Col>
                </Row>


                <div className="d-flex justify-content-end pt-4">
                    <CommanButton
                        label="Save Changes"
                        variant="#7B3F0080"
                        className="px-4 p-2 fs-6 fw-semibold"
                        style={{ borderRadius: "8px" }}
                        onClick={handleSubmit} // Close modal when clicking the button
                    />
                </div>
            </div>
        </Modal>
    );
};

export default EditClassModel;