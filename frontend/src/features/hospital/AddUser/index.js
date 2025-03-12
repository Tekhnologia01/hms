import { use, useEffect, useState } from "react";
import vijay from "../../../assets/images/avatars/vijay.jpg";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../components/table/CommonTable";
import NewCommonPagination from "../../../components/pagination/NewCommonPagination";
import axios from "axios";
import { formatDate } from "../../../utils/formatDate";

function AddUsers() {
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [limitPerPage, setLimitPerPage] = useState(10);

    const [doctors, setDoctors] = useState([]);
    const [userCount, setUserCount] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/doctor/get?page=${currentPage}&limit=${limitPerPage}`);
                console.log("Doctor list response => ", response.data)
                setDoctors(response?.data);
            } catch (err) {
                console.log("Error fetching doctors => ", err)
            }
        }
        fetchDoctors();
    }, [currentPage])

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/count`)
                setUserCount(response?.data?.data);
            } catch (err) {
                console.log(err)
            }
        }
        fetchCount()
    }, [])

    const cardStyle = {
        width: "225px",
        height: "120px",
        "box-shadow": "0px 4px 4px 0px #00000040",
        "border-radius": "12px",
        display: "flex",
        "flex-direction": "column",
        "align-items": "center",
        "justify-content": "center",
        cursor: "pointer"
    }

    const headingStyle = {
        color: "#101828",
        "font-size": "20px",
        "font-weight": "500",
        "line-height": "6px",
        "margin-top": "35px"
    }

    const numberStyle = {
        color: "#1E959B",
        "font-weight": "500",
        "font-size": "35px",
    }

    const columns = [
        // { name: "", accessor: "checkbox", class: "w-auto" },
        { name: "Doctor Name", accessor: "Name", class: "py-3 w-50 px-4 text-left" },
        { name: "Date of joining", accessor: "joining_date", class: "text-center px-1" },
        { name: "Education", accessor: "degree", class: "py-3 text-center px-1" },
        { name: "Consultancy fee", accessor: "consultancy_fee", class: "py-3 text-center px-1" },
        { name: "Actions", accessor: "actions", class: "py-3 text-center px-1", },
    ];

    const renderRow = (item, index) => (
        <tr key={item.id} className="border-bottom text-center">
            <td className="px-2 text-start lh-1">
                <div className="d-flex align-items-center">
                    <img
                        src={item.Photo ? `${process.env.REACT_APP_API_URL}/${item.Photo}` : vijay}
                        alt={item.Name}
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                        className="ms-3"
                    />
                    <div className="d-flex flex-column ms-2" style={{ height: "40px" }}>
                        <p className="fw-semibold">{item.Name}</p>
                        <p style={{ marginTop: "-10px", "color": "#475467", fontSize: "14px" }}>Id: {item.User_ID}</p>
                    </div>
                </div>
            </td>
            <td className="py-3 px-2">{formatDate(item?.joining_date)}</td>
            <td className="py-3 px-2">{item.degree ?? "-"}</td>
            <td className="py-3 px-2">{item.consultancy_fee ?? "-"}</td>
            <td>
                <FiEdit2 style={{ height: "23px", width: "23px" }} />
                <span className="ps-3"></span>
                <RiDeleteBinLine style={{ height: "25px", width: "25px" }} />
            </td>
        </tr>
    );

    return (
        <>
            <div className="py-4">
                <div className="fw-semibold fs-5">
                    <span className="px-3">Add Users</span>
                </div>
                <div className="cards-container d-flex align-items-center justify-content-start mt-3 ms-3 gap-4 flex-wrap">
                    <div style={cardStyle} onClick={() => navigate("add_doctor")}>
                        <p style={headingStyle}>Add Doctor</p>
                        <p style={numberStyle}>{userCount?.totalDoctors ? userCount?.totalDoctors : 0}</p>
                    </div>
                    <div style={cardStyle} onClick={() => navigate("add_nurse")} >
                        <p style={headingStyle}>Add LabAssistance</p>
                        <p style={numberStyle}>{userCount?.totalLabAssistance ? userCount?.totalLabAssistance : 0}</p>
                    </div>
                    <div style={cardStyle} onClick={() => navigate("add_receptionist")}>
                        <p style={headingStyle}>Add Receptionist</p>
                        <p style={numberStyle}>{userCount?.totalReceptionist ? userCount?.totalReceptionist : 0}</p>
                    </div>
                </div>

                <div className="px-3 py-4">
                    {
                        doctors?.data?.length > 0 && <div>
                            <CommonTable minimumWidth={"700px"} headers={columns} bodyData={doctors?.data} renderRow={renderRow} title={"Recent Doctor List"} />
                        </div>
                    }
                    {
                        doctors?.data?.length > 0 &&
                        <NewCommonPagination currentPage={currentPage} limitPerPage={limitPerPage} totalRecords={doctors?.pagination?.TotalRecords} setCurrentPage={setCurrentPage} />
                    }
                </div>

            </div>
        </>
    )
}

export default AddUsers;