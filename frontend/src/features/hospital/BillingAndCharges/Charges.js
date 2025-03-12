import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import EditClassModel from "./EditClassModel";
import CommanButton from "../../../components/common/form/commonButtton";
import CommonTable from "../../../components/table/CommonTable";
import axios from "axios";

function Charges() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [chargesData, setChargesData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [isEdit,setIsEdit] = useState(false);

  const handleEditClass = async (newData) => {
    // Add your Edit Class logic here

    try {
      const config = {
        headers: { "Content-Type": "application/json" }
      }

      const response = isEdit ? 
      await axios.put(`${process.env.REACT_APP_API_URL}/bill/UpdateBillingAndCharges/${newData?.billing_and_charges_no}`, newData, config) : 
      await axios.post(`${process.env.REACT_APP_API_URL}/bill/BillingAndCharges`,newData,config);
      // setChargesData({
      //   ...chargesData      
      // })
    } catch (error) {

    }

    handleCloseModal();
    setRowData([]);
  };



  const fetchChargesData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/bill/GetAllBillingAndCharges`
      )
      setChargesData(response?.data?.data[0]);
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    fetchChargesData();
  }, [rowData])

  const columns = [
    // { name: "", accessor: "checkbox", class: "w-auto" },
    { name: "No.", accessor: "srNo", class: "text-center px-1", width: "60px" },
    { name: "Class", accessor: "class", class: "py-3 px-2 text-left", width: "230px" },
    { name: "Bed", accessor: "bed", class: "text-center px-1" },
    { name: "Nursing", accessor: "nursing", class: "py-3 text-center px-1" },
    { name: "Doctor", accessor: "doctor", class: "py-3 text-center px-1" },
    { name: "RMO", accessor: "rmo", class: "py-3 text-center px-1" },
    { name: "BMW", accessor: "bmw", class: "py-3 text-center px-1" },
    { name: "Total", accessor: "total", class: "py-3 text-center px-1" },
    { name: "Deposite", accessor: "deposite", class: "py-3 text-center px-1", },
    { name: "", accessor: "action", class: "py-3 text-center px-1", width: "50px" }
  ];

  const renderRow = (item) => (
    <tr key={item.room_id} className="border-bottom">
      <td className="py-3 px-2 text-center">{item?.billing_and_charges_no}</td>
      <td className="py-3 px-2 text-left">{item?.class_name}</td>
      <td className="py-3 px-2 text-center">{item?.bed}</td>
      <td className="py-3 px-2 text-center">{item?.nursing}</td>
      <td className="py-3 px-2 text-center">{item?.doctor}</td>
      <td className="py-3 px-2 text-center">{item?.rmo}</td>
      <td className="py-3 px-2 text-center">{item?.bmw}</td>
      <td className="py-3 px-2 text-center">{item?.total}</td>
      <td className="py-3 px-2 text-center">{item?.deposit}</td>
      <td className="py-3 px-2 text-center">{<FiEdit2
        style={{
          height: "18px",
          width: "18px",
          cursor: "pointer",
          "margin-left": "-10px",
          "margin-top": "-7px",
        }}
        onClick={() => {
          setIsEdit(true);
          handleShowModal();        
          setRowData(item);
        }}
      />}</td>
    </tr>
  );


  return (
    <>
      <div className="py-4 px-3">
        <div
          className="fw-semibold fs-6"
          style={{ color: "#1D949A" }}
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          <span className="pt-1 px-2">Billing & Charges</span>
        </div>
        <div className="fw-bold py-4 fs-4 d-flex align-items-center justify-content-between">
          <span>Billing & Charges</span>

          <div>
            <CommanButton
              label="Add"
              className="mb-3 ps-4 w-20 pe-4 p-2 fw-semibold fs-6 "
              style={{ borderRadius: "8px", width: "200px" }}
              onClick={() => {
                setIsEdit(false);
                handleShowModal();
              }}
            />

          </div>
        </div>

        <div>
          <CommonTable minimumWidth={"850px"} headers={columns} bodyData={chargesData} renderRow={renderRow} title={"Charges"} />
        </div>


        <EditClassModel
          show={showModal}
          handleClose={handleCloseModal}
          handleCallback={handleEditClass}
          rowData={isEdit && rowData}
        />
      </div>
    </>
  );
}

export default Charges;
