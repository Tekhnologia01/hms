import React, { useState } from "react";
import CommanButton from "../../components/common/form/commonButtton";
import PasswordInput from "../../components/common/form/password";
import { Row, Col } from "react-bootstrap";
import DeleteModal from "./DeleteModal";

function DeletAccount() {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDeleteAccount = () => {
    // Add your account deletion logic here
    console.log("Account deleted.");
    handleCloseModal();
  };

  return (
    <div className="">
      <div className="fs-4 fw-bold pb-1">Delete Account</div>
      <div className="pb-3" style={{fontSize:'1rem'}}>
        This Information will be displayed publicly so be careful what you share .
      </div>
      <Row className="m-0">
        <Col lg={5}>
          <div className="pb-4">
            <PasswordInput
              label="New Password"
              name="password"
              placeholder="Enter password"
              required
            />
          </div>
          <div className="pb-4">
            <PasswordInput
              label="Confirm Password"
              name="password"
              placeholder="Re-enter password"
              required
            />
          </div>
          <div className="p-2 pt-3">
            <CommanButton
              label="Delete Account"
              className="mb-3 ps-4 pe-4 p-2 fw-semibold"
              style={{ borderRadius: "5px" ,fontsize:'1rem'}}
              onClick={handleShowModal} // Show modal on button click
            />
          </div>
        </Col>
      </Row>

      {/* Delete Account Modal */}
      <DeleteModal
        show={showModal}
        handleClose={handleCloseModal}
        handleDelete={handleDeleteAccount}
      />
    </div>
  );
}

export default DeletAccount;
