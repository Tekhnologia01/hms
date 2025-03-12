import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FaArrowLeft, FaFileUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CommanButton from "../../components/common/form/commonButtton";
import InputBox from "../../components/common/form/inputbox";
import MultiSelectWithCheckbox from "../../components/common/form/multiselect";
import axios from "axios";
import { useSelector } from "react-redux";

function AddUserForm({ user }) {
    const navigate = useNavigate();


    const [departments, setDepartments] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [days, setDays] = useState([]);

    const userId = useSelector(state => state?.auth?.user?.userId);

    // const role_id = useSelector((state) => state?.auth?.user?.RoleId)

    let role_id;

    if (user === "Doctor") {
        role_id = 2
    } else if (user === "Receptionist") {
        role_id = 4
    } else if (user === "Lab") {
        role_id = 3
    }

    async function getDepartments() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/department/get`);
            // console.log("Response => ", response.data.data);
            setDepartments(response?.data?.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function getShifts() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/department/getshift`);

            setShifts(response?.data?.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function getDays() {
        try {

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/department/getday`);
            console.log(response);
            setDays(response?.data?.data)
        } catch (err) {

        }
    }

    useEffect(() => {
        getDepartments();
        getShifts();
        getDays();
    }, [])

    console.log("Shifts", shifts);



    const handleBoxClick = () => {
        document.getElementById("id_proof_image").click();
    };

    const initialState = {
        name: "",
        phoneno: "",
        email_id: "",
        sex: "",
        age: "",
        department_id: "",
        address: "",
        city: "",
        id_proof: "",
        computer_skills: "",
        highest_qualification: "",
        degree: "",
        field_of_study: "",
        specialization: "",
        year_of_graduation: "",
        additional_certificate: "",
        post_degree: "",
        post_specialization: "",
        post_year_of_graduation: "",
        licene_number: "",
        institute_name: "",
        language_known: "",
        issue_body: "",
        license_expiry_date: "",
        board_certificate: "",
        day_ids: "",
        shift_id: "",
        joining_date: "",
        consultancy_fee: "",
        username: "",
        password: "",
        confirmPassword: "",
        id_proof_image: "",
        user_photo: "",
        created_by: userId,
    };

    const [showPostGraduation, setShowPostGraduation] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;

        if (type === "file") {
            // Handle file inputs
            const file = e.target.files[0];
            setFormData({
                ...formData,
                [name]: file, // Store the file object
            });
        } else {
            // Handle other inputs
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    console.log(formData);
    

    const handleAddPostGraduation = () => {
        setShowPostGraduation(!showPostGraduation);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Validate form data if needed
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const formDataObj = new FormData();

        Object.keys(formData).forEach((key) => {
            if (formData[key] !== "" && formData[key] !== undefined) {
                if (key === "day_ids" && Array.isArray(formData[key])) {
                    // Extract only the `value` field from each object and join with commas
                    const workingDaysFormatted = formData[key].map(day => day.value).join(",");
                    formDataObj.append(key, workingDaysFormatted);
                } else {
                    formDataObj.append(key, formData[key]);
                }
            }
        });

        formDataObj.append("role_id", role_id);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/${user?.toLowerCase()}/add`, formDataObj, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log(`${user} added successfully:`, response.data?.message);
            alert(response?.data?.message);
            setFormData(initialState);
        } catch (error) {
            console.error(`Error adding ${user}:`, error);
            alert(`Failed to add ${user}.`);
        }

        // console.log("payload => ", formData);
    };

    const boxStyle = {
        fontSize: "1em",
        border: "1px solid #CFD4DC",
        borderRadius: "8px",
        padding: "16px",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 20 }, (_, i) => currentYear - i);

    const handleDayChange = (selectedOptions) => {
        setFormData({
            ...formData,
            day_ids: [...selectedOptions],
        });
    };

    return (
        <div className="pt-4">
            <Row className="m-0">
                <Row md={12}>
                    <div
                        className="fw-semibold fs-5 pb-4"
                        style={{ color: "#1D949A" }}
                        onClick={() => navigate(-1)}
                    >
                        <FaArrowLeft />
                        <span className="pt-1 px-2">Add User/Add {user} {user === "Lab" && "Assistant"}</span>
                    </div>
                    <div className="fw-bold fs-5">
                        <span className="pt-1 px-2">Add Users</span>
                    </div>
                </Row>

                <Col md={12}>
                    <form onSubmit={handleFormSubmit}>
                        <div className="fw-semibold fs-6 mt-3">
                            <span className="pt-1 px-2">Basic Information</span>
                        </div>
                        <Row className="m-0 pb-3">
                            <Col md={6} className="gy-3">
                                <InputBox
                                    label={`${user} ${user === "Lab" ? "Assistant" : ""} Name`}
                                    placeholder={`${user} ${user === "Lab" ? "Assistant" : ""} Name here...`}
                                    isRequired={true}
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    name="name"
                                />
                            </Col>
                            <Col md={6} className="gy-3">
                                <InputBox
                                    label={"Phone No."}
                                    placeholder="Phone no here..."
                                    isRequired={true}
                                    type="number"
                                    value={formData.phoneno}
                                    onChange={handleInputChange}
                                    name="phoneno"
                                />
                            </Col>

                            <Col md={6} className="gy-3">
                                <InputBox
                                    label={"Email I'd"}
                                    placeholder="Email I'd here..."
                                    isRequired={true}
                                    type="email"
                                    value={formData.email_id}
                                    onChange={handleInputChange}
                                    name="email_id"
                                />
                            </Col>
                            <Col md={6} className="gy-3">
                                <Form.Group controlId="sexSelect">
                                    <Form.Label className="fw-semibold" style={{ fontSize: "1rem" }}>Sex</Form.Label>
                                    <Form.Select
                                        value={formData.sex}
                                        name="sex"
                                        onChange={handleInputChange}
                                        isRequired={true}
                                    >
                                        <option value="">Select sex</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={6} className="gy-3">
                                <InputBox
                                    label={"Age"}
                                    placeholder="Age here..."
                                    isRequired={true}
                                    type="number"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                    name="age"
                                />
                            </Col>

                            <Col md={6} className="gy-3">
                                <InputBox
                                    label={"Address"}
                                    placeholder="Address here..."
                                    isRequired={true}
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    name="address"
                                />
                            </Col>

                            <Col md={6} className="gy-3">
                                <InputBox
                                    label={"City"}
                                    placeholder="City here..."
                                    isRequired={true}
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    name="city"
                                />
                            </Col>

                            <Col md={6} className="gy-3">
                                <Form.Group controlId="idSelect">
                                    <Form.Label className="fw-semibold" style={{ fontSize: "1rem" }}>Select Department</Form.Label>
                                    <Form.Select
                                        value={formData.department_id}
                                        name="department_id"
                                        onChange={handleInputChange}
                                        isRequired={true}
                                    >
                                        <option value="">Select Department</option>
                                        {
                                            departments.map((dept) => {
                                                return <option key={dept.department_id} value={dept?.department_id}>{dept?.department_name}</option>
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={6} className="gy-3">
                                <InputBox
                                    label={"Upload Profile"}
                                    type="file"
                                    placeholder=""
                                    isRequired={true}
                                    onChange={handleInputChange}
                                    name="user_photo"
                                />
                            </Col>

                            <Col md={6} className="gy-3">
                                <Form.Group controlId="idSelect">
                                    <Form.Label className="fw-semibold" style={{ fontSize: "1rem" }}>Select I'd Proof</Form.Label>
                                    <Form.Select
                                        value={formData.id_proof}
                                        name="id_proof"
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
                            </Col>
                        </Row>

                        <div className="mx-3">
                            <Form.Label className="fw-semibold mb-2" style={{ fontSize: "1rem" }}>
                                I’d Proof Image <span className="text-danger fw-bold">*</span>
                            </Form.Label>

                            {/* Clickable Upload Box */}
                            <div style={boxStyle} onClick={handleBoxClick}>
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

                                {/* Show selected file name */}
                                {formData.id_proof_image && (
                                    <div className="mt-2 text-success fw-semibold">{formData.id_proof_image.name}</div>
                                )}
                            </div>

                            {/* Hidden File Input */}
                            <Form.Control
                                type="file"
                                id="id_proof_image"
                                name="id_proof_image"
                                accept="image/png, image/jpeg, image/gif, image/svg+xml"
                                style={{ display: "none" }}
                                onChange={handleInputChange}
                            />
                        </div>



                        <div className="fw-semibold fs-6 mt-3">
                            <span className="pt-1 px-2">Educational Information</span>
                        </div>
                        <Row className="m-0 pb-3">
                            <Col md={6} className="gy-3">
                                {
                                    user === "Receptionist" ? <InputBox
                                        label={"Highest Qualification"}
                                        placeholder="E.g., MBBS, MD, DO, MS, etc."
                                        isRequired={true}
                                        value={formData.highest_qualification}
                                        onChange={handleInputChange}
                                        name="highest_qualification"
                                    /> : <InputBox
                                        label={"Degree"}
                                        placeholder="E.g., MBBS, MD, DO, MS, etc."
                                        isRequired={true}
                                        value={formData.degree}
                                        onChange={handleInputChange}
                                        name="degree"
                                    />
                                }
                            </Col>
                            <Col md={6} className="gy-3">
                                {
                                    user === "Receptionist" ?
                                        <InputBox
                                            label={"Field of Study"}
                                            placeholder="University/College where the degree was obtained"
                                            isRequired={true}
                                            value={formData.field_of_study}
                                            onChange={handleInputChange}
                                            name="field_of_study"
                                        /> : <InputBox
                                            label={"Specialization"}
                                            placeholder="University/College where the degree was obtained"
                                            isRequired={true}
                                            value={formData.specialization}
                                            onChange={handleInputChange}
                                            name="specialization"
                                        />
                                }
                            </Col>
                            <Col md={6} className="gy-3">
                                <Form.Group controlId="yearSelect">
                                    <Form.Label>Select Year</Form.Label>
                                    <Form.Select value={formData.year_of_graduation} name="year_of_graduation" onChange={handleInputChange}>
                                        <option value="">Choose Graduation Year</option>
                                        {years.map((year) => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="gy-3">
                                {
                                    user === "Doctor" ? <InputBox
                                        label={"Additional Certificates"}
                                        placeholder="Optional - Any additional qualifications or fellowships"
                                        isRequired={true}
                                        value={formData.additional_certificate}
                                        onChange={handleInputChange}
                                        name="additional_certificate"
                                    /> : <InputBox
                                        label={"Nursing License/Registration Number"}
                                        placeholder="Optional - Any additional qualifications or fellowships"
                                        isRequired={true}
                                        value={formData.licene_number}
                                        onChange={handleInputChange}
                                        name="licene_number"
                                    />
                                }
                            </Col>
                        </Row>
                        {user === "Doctor" && (
                            <div className="fw-semibold fs-6 pl-2">
                                <span
                                    style={{ cursor: "pointer", color: "#1E959B" }}
                                    className="px-3"
                                    onClick={handleAddPostGraduation}
                                >
                                    {!showPostGraduation
                                        ? "+ Add Post-Graduation Education"
                                        : "- Remove Post-Graduation Education"}
                                </span>
                            </div>
                        )}

                        {showPostGraduation && (
                            <Row className="m-0 pb-3">
                                <Col md={6} className="gy-3">
                                    <InputBox
                                        label={"Post Graduation Degree"}
                                        placeholder="Enter post graduation degree here..."
                                        isRequired={true}
                                        value={formData.post_degree}
                                        onChange={handleInputChange}
                                        name="post_degree"
                                    />


                                </Col>
                                <Col md={6} className="gy-3">
                                    <InputBox
                                        label={"Specialization"}
                                        placeholder="Enter post graduation specialization here..."
                                        isRequired={true}
                                        value={formData.post_specialization}
                                        onChange={handleInputChange}
                                        name="post_specialization"
                                    />
                                </Col>
                                <Col md={6} className="gy-3">
                                    <Form.Group controlId="postYearSelect">
                                        <Form.Label>Select Post Graduation Year</Form.Label>
                                        <Form.Select value={formData.post_year_of_graduation} name="post_year_of_graduation" onChange={handleInputChange}>
                                            <option value="">Choose Post Graduation Year</option>
                                            {years.map((year) => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        )}
                        {user === "Doctor" && (
                            <div className="fw-semibold fs-6 mt-3">
                                <span className="pt-1 px-2">Licensure and Accreditation</span>
                            </div>
                        )}
                        <Row className="m-0 pb-3">
                            {user === "Doctor" && (
                                <Col md={6} className="gy-3">
                                    <InputBox
                                        label={"Medical License Number"}
                                        placeholder="Issued by the medical board"
                                        isRequired={true}
                                        value={formData.medical_license_number}
                                        onChange={handleInputChange}
                                        name="medical_license_number"
                                    />
                                </Col>
                            )}
                            <Col md={6} className="gy-3">
                                {
                                    user === "Receptionist" ? <InputBox
                                        label={"Languages Known"}
                                        placeholder="E.g., Marathi, Hindi, English"
                                        isRequired={true}
                                        value={formData.language_known}
                                        onChange={handleInputChange}
                                        name="language_known"
                                    /> : <InputBox
                                        label={"Issuing Body"}
                                        placeholder="E.g., State/Regional Medical Board"
                                        isRequired={true}
                                        value={formData.issue_body}
                                        onChange={handleInputChange}
                                        name="issue_body"
                                    />
                                }
                            </Col>
                            {
                                (user === "Doctor" || user === "Nurse") && <Col md={6} className="gy-3">
                                    <Form.Group controlId="datePicker">
                                        <InputBox
                                            type="date"
                                            label={"Select License Validity"}
                                            value={formData.license_expiry_date}
                                            name="license_expiry_date"
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Col>
                            }
                            <Col md={6} className="gy-3">
                                {user === "Doctor" ? <InputBox
                                    label={"Board Certifications"}
                                    placeholder="E.g., American Board or Internal Medicine, etc."
                                    isRequired={true}
                                    value={formData.board_certificate}
                                    onChange={handleInputChange}
                                    name="board_certificate"
                                /> : <InputBox
                                    label={"Institution Name"}
                                    placeholder="E.g., American Board or Internal Medicine, etc."
                                    isRequired={true}
                                    value={formData.institute_name}
                                    onChange={handleInputChange}
                                    name="institute_name"
                                />}
                            </Col>
                            {
                                user === "Receptionist" && <Col md={6} className="gy-3">
                                    <InputBox
                                        label={"Computer skills"}
                                        placeholder="E.g., Typing, excel, word, etc."
                                        isRequired={true}
                                        value={formData.computer_skills}
                                        onChange={handleInputChange}
                                        name="computer_skills"
                                    />
                                </Col>
                            }
                        </Row>

                        <div className="fw-semibold fs-6 mt-3">
                            <span className="pt-1 px-2">Joining Date & Fee</span>
                        </div>
                        <Row className="m-0 pb-3">


                            <Col md={6} className="gy-3">
                                <Form.Label>Select Days</Form.Label>
                                <MultiSelectWithCheckbox
                                    selectedDays={formData.day_ids}
                                    options={days?.map(day => ({
                                        value: day.day_id,
                                        label: day.day_name
                                    }))}
                                    onDayChange={handleDayChange}
                                />
                            </Col>

                            <Col md={6} className="gy-3">
                                <Form.Group controlId="idSelect">
                                    <Form.Label className="fw-semibold" style={{ fontSize: "1rem" }}>Select Shift</Form.Label>
                                    <Form.Select
                                        // value={formData.shift_id}
                                        name="shift_id"
                                        onChange={handleInputChange}
                                        isRequired={true}
                                    >
                                        <option value="">Select Shift</option>
                                        {
                                            shifts.map((shift) => {
                                                return <option key={shift?.shift_id} value={shift?.shift_id}>{shift?.shift_name}</option>
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Col>


                            {/* End Time */}
                            {/* <Col md={3} className="gy-3">
                                <InputBox
                                    label={"End Time"}
                                    type="time"  // HTML time input
                                    isRequired={true}
                                    value={formData.end_time}
                                    onChange={handleInputChange}
                                    name="end_time"
                                />
                            </Col> */}

                            <Col md={6} className="gy-3">
                                <Form.Group controlId="datePicker">
                                    <InputBox
                                        type="date"
                                        label={"Select Joining Date"}
                                        value={formData.joining_date}
                                        name="joining_date"
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>

                            {
                                (user === "Doctor") && <Col md={6} className="gy-3">
                                    <InputBox
                                        label={"Consultant Fee"}
                                        placeholder="Enter Amount here..."
                                        isRequired={true}
                                        type="number"
                                        value={formData.consultancy_fee}
                                        onChange={handleInputChange}
                                        name="consultancy_fee"
                                    />
                                </Col>
                            }

                        </Row>

                        <div className="fw-semibold fs-6 mt-3">
                            <span className="pt-1 px-2">Generate User I'd & Password</span>
                        </div>
                        <Row className="m-0 pb-3">
                            <Col md={6} className="gy-3">
                                <InputBox
                                    label={"User I'd"}
                                    placeholder="Auto-generate based on the input details"
                                    isRequired={true}
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    name="username"
                                />
                            </Col>
                            <Col md={6} className="gy-3">
                                <InputBox
                                    label={"Password"}
                                    placeholder="Auto-generate a strong password"
                                    isRequired={true}
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    name="password"
                                />
                            </Col>
                            <Col md={6} className="gy-3">
                                <InputBox
                                    label={"Confirm Password"}
                                    placeholder="Auto-generate a strong password"
                                    isRequired={true}
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    name="confirmPassword"
                                />
                            </Col>
                        </Row>

                        <div className="fw-semibold fs-6 pl-2 mb-2">
                            <span
                                style={{ cursor: "pointer", color: "#1E959B" }}
                                className="px-3"
                            >
                                Send Username & Password to User Email I'd
                            </span>
                        </div>

                        <div className="px-2 justify-content-start mt-4 mb-3 gap-4 d-flex flex-wrap">
                            <CommanButton
                                label={`Add ${user} ${user === "Lab" ? "Assistant" : ""} `}
                                className="mb-3 ps-4 w-20 pe-4 p-2 fw-bold fs-6 "
                                style={{ borderRadius: "8px", width: "200px" }}
                                type="submit"
                                onClick={handleFormSubmit}
                            />
                            <CommanButton
                                label="Discard"
                                className="mb-3 ps-4 pe-4 p-2 fw-bold fs-6 "
                                style={{
                                    borderRadius: "8px",
                                    width: "200px",
                                    backgroundColor: "transparent",
                                    color: "#344054",
                                    fontWeight: 500,
                                }}
                                onClick={() => navigate(-1)}
                            />
                        </div>
                    </form>
                </Col>
            </Row>
        </div>
    );
}

export default AddUserForm;