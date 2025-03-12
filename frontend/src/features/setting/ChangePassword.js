import React from "react";
import { Row, Col } from "react-bootstrap";
import CommanButton from "../../components/common/form/commonButtton";
import PasswordInput from "../../components/common/form/password";

function ChangePassword() {
  return (
    <div className="">
      <div className="fs-5 fw-bold pb-3">Change Password</div>

      <Row className="m-0">
        <Col lg={5}>
          <div  className="pb-4">
            <PasswordInput
              label="Current Password "
              name="password"
              placeholder="Enter password"
              // value={formData.password}
              // onChange={handleChange}
              // error={errors.password}
              required
            />
          </div>

          <div className="pb-4">
            <PasswordInput
              label="New Password"
              name="password"
              placeholder="Enter password"
              // value={formData.password}
              // onChange={handleChange}
              // error={errors.password}
              required
            />
          </div>

          <div className="pb-4">
            <PasswordInput
              label="Confirm Password"
              name="password"
              placeholder="Re-enter password"
              // value={formData.password}
              // onChange={handleChange}
              // error={errors.password}
              required
            />
          </div>

          <div className="p-2 pt-3">
            <CommanButton
              label="Save Change"
              variant="#7B3F0080"
              className="mb-3 ps-4 pe-4  p-2 fw-semibold"
              style={{ borderRadius: "5px" }}
              // onClick={handleFormSubmit}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ChangePassword;
