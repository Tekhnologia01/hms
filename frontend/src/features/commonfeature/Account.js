import React, { use, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FaArrowLeft, FaFileUpload } from "react-icons/fa";

import vijay from "../../assets/images/avatars/vijay.jpg";
import CommanButton from "../../components/common/form/commonButtton";
import InputBox from "../../components/common/form/inputbox";
import axios from "axios";
import { useSelector } from "react-redux";

function Account() {

    const { user } = useSelector(state => state?.auth);

    const [profile, setProfile] = useState([]);

    async function getProfile() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/details?user_id=${user?.userId}`);
            console.log("appooijofdng => ", response?.data?.data);
            setProfile(response?.data?.data);
        } catch (err) {
            console.log("Error fetching departments:", err);
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div className="pt-4">

            <div className="fw-semibold mx-4 fs-3 ">Account</div>
            <div className="fw-semibold fs-5 mx-4 mt-3">My Profile</div>
            <div className="fs-6 mx-4 ">This information will be displayed publicaly so be careful what you share.</div>
            <Row className="m-0 mt-4">
                <Col md={12}>
                    <div className="mx-3 fw-semibold mb-2 fs-6">Profile Picture</div>
                    <div className="d-flex justify-content-between p-3 mx-3 flex-wrap gap-3 align-items-center"
                        style={{ border: "1px solid #E4E9EF", borderRadius: "10px" }}
                    >
                        <div className="d-flex align-items-center gap-3">
                            <img
                                src={profile?.photo ? `${process.env.REACT_APP_API_URL}/${profile?.photo}` : vijay}
                                alt="Profile"
                                className="rounded-circle "
                                style={{
                                    width: "70px",
                                    height: "70px",
                                    objectFit: "cover",
                                    backgroundColor: "",
                                }}
                            />
                            <div>
                                <p className="text-wrap w-75 fw-semibold" style={{ lineHeight: "20px" }}>You can upload jpg, gif or png image files, Max size of 3MB.</p>
                            </div>
                        </div>
                        <div className="d-flex gap-3">
                            <CommanButton
                                label="Remove"
                                className="p-1 px-4 fw-semibold"
                                style={{ borderRadius: "7px", height: "40px", fontSize: "14px", backgroundColor: "#fff", color: "black", border: "1px solid lightgray" }}
                            />
                            <CommanButton
                                label="Upload New Photo"
                                className="p-1 px-4 fw-semibold"
                                style={{ borderRadius: "7px", fontSize: "14px", height: "40px", }}
                            />
                        </div>
                    </div>
                </Col>

                <Col md={12}>
                    <Row className="m-0 pb-3">
                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"First Name"}
                                placeholder="Enter your first name"
                                isRequired={true}
                                value={profile?.name?.split(" ")[0]}
                                // onChange={handleChange}
                                name="cafeName"
                            />
                        </Col>
                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Last Name"}
                                placeholder="Enter your last name"
                                isRequired={true}
                                value={profile?.name?.split(" ")[1]}
                                // onChange={handleChange}
                                name="cafeName"
                            />
                        </Col>

                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Number"}
                                placeholder="Number here..."
                                isRequired={true}
                                value={profile?.mobile}
                                // onChange={handleChange}
                                name="cafeName"
                            />
                        </Col>
                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Blood Group"}
                                placeholder="Blood group here..."
                                isRequired={true}
                                // value={values.cafeName}
                                // onChange={handleChange}
                                name="cafeName"
                            />
                        </Col>

                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"Home address"}
                                placeholder="Enter house no / street name / area"
                                isRequired={true}
                                value={profile?.address}
                                // onChange={handleChange}
                                name="cafeName"
                            />
                        </Col>
                        <Col md={6} className="gy-3">
                            <InputBox
                                label={"City"}
                                placeholder="Enter city here..."
                                isRequired={true}
                                value={profile?.city}
                                // onChange={handleChange}
                                name="cafeName"
                            />
                        </Col>

                        <Col md={12} className="gy-3">
                            <InputBox
                                label={"Postal Code"}
                                placeholder="Enter your postal code"
                                isRequired={true}
                                value={profile?.postal_code}
                                // onChange={handleChange}
                                name="cafeName"
                            />
                        </Col>
                    </Row>

                </Col>
            </Row>

            <div className="ps-4 justify-content-start d-flex">
                <CommanButton
                    label="Save Changes"
                    // variant="#7B3F0080"
                    className="mb-3 ps-4 pe-4 p-2 fw-semibold fs-6 "
                    style={{ borderRadius: "7px" }}
                // onClick={handleFormSubmit}
                />
            </div>

        </div>
    );
}

export default Account;