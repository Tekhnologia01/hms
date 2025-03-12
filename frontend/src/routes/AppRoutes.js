import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DefaultLayout from "../components/layout/defaultLayout/DefaultLayout";

// Common pages
import Login from "../features/authentication/login/Login";
import Register from "../features/authentication/register/Register";
import CheckEmail from "../features/authentication/forgotPassword/CheckEmail";
import EnterEmail from "../features/authentication/forgotPassword/EnterEmail";
import PasswordReset from "../features/authentication/forgotPassword/PasswordReset";
import SetnewPassowrd from "../features/authentication/forgotPassword/SetnewPassword";
import AddUsers from "../features/hospital/AddUser/index";
import HospitalDoctorList from "../features/DoctorList";


import Departments from "../features/hospital/Departments";
import Department from "../features/hospital/Departments/Department";
import Charges from "../features/hospital/BillingAndCharges/Charges";
import Setting from "../features/setting";
import DoctorAppointment from "../features/doctor/appointement";
import PatientDetails from "../features/doctor/PatientList/PatientDetails";
import ViewPatient from "../features/doctor/appointement/ViewPaitent";
import PatientList from "../features/doctor/PatientList";
import AddPatient from "../features/commonfeature/AddPatient";
import PaymentHistory from "../features/doctor/paymentHistory";
import Account from "../features/commonfeature/Account";
import AppointmentDoctor from "../features/reception/receptionAppointment";
import PatientAppointmentList from "../features/reception/patientList";
import Nurse from '../features/nurse/index'
import LabAppointments from "../features/nurse/LabAppointments";
import LabAppointmentDetail from '../features/nurse/LabAppointments/labAppointment'
import SelectedPatientDetails from '../features/nurse/PatientList/patientDetails'
import NursePatientList from '../features/nurse/PatientList/index'
import LabPatientDetails from '../features/nurse/LabAppointments/patientDetails'
import ReceptionDashboard from "../features/reception";
import DoctorsAppointment from "../features/reception/receptionAppointment/DoctorsAppointment";
import HospitalDashboard from "../features/hospital";
import AddUserForm from "../features/addUser";
import DoctorDashboard from "../features/doctor/dashboard";
import Emergency from "../features/hospital/Emergency";
import AddEmergencyPatient from "../features/hospital/Emergency/AddEmergencyPatient";
import DoctorDetails from "../features/doctor/DoctorDetails";


function AppRoutes({ getDefaultRoute }) {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/checkemail" element={<CheckEmail />} />
      <Route path="/enteremail" element={<EnterEmail />} />
      <Route path="/passwordreset" element={<PasswordReset />} />
      <Route path="/setpassword" element={<SetnewPassowrd />} />

      <Route element={<DefaultLayout />}>


        {/* Hospital routes */}

        <Route path="/hospital" element={<HospitalDashboard />} />
        <Route path="/hospital/add_users" element={<AddUsers />} />
        <Route path="/hospital/add_users/add_doctor" element={<AddUserForm user={"Doctor"} />} />
        <Route path="/hospital/add_users/add_receptionist" element={<AddUserForm user={"Receptionist"} />} />
        <Route path="/hospital/add_users/add_nurse" element={<AddUserForm user={"Lab"} />} />
        <Route path="/hospital/doctor_list" element={<HospitalDoctorList />} />
        <Route path="/hospital/patient_list" element={<PatientAppointmentList />} />
        <Route path="/hospital/patient_list/:patientId" element={<ViewPatient />} />

        <Route path="/hospital/departments" element={<Departments />} />

        <Route path="/hospital/departments/:deptId" element={<Department />} />

        <Route path="/hospital/emergency" element={<Emergency />} />
        <Route path="/hospital/emergency/add_patient" element={<AddEmergencyPatient />} />

        <Route path="/hospital/billing_charges" element={<Charges />} />
        <Route path="/hospital/account" element={<Account />} />
        <Route path="/hospital/settings" element={<Setting />} />


        {/* Lab routes */}

        <Route path="/lab" element={<Nurse />} />
        <Route path="/lab/lab_appointments" element={<LabAppointments />} />
        <Route path="/lab/lab_appointments/:labId" element={<LabAppointmentDetail />} />
        <Route path="/lab/lab_appointments/:labId/:appointmentId" element={<ViewPatient />} />
        <Route path="/lab/doctor_list" element={<HospitalDoctorList />} />
        <Route path="/lab/patient_list" element={<NursePatientList />} />
        <Route path="/lab/patient_list/:patientId" element={<LabPatientDetails />} />
        <Route path="/lab/account" element={<Account />} />
        <Route path="/lab/settings" element={<Setting />} />
        

        {/* Reception routes 1 */}

        <Route path="/reception" element={<ReceptionDashboard />} />
        <Route path="/reception/doctors_appointments" element={<AppointmentDoctor />} />
        <Route path="/reception/doctors_appointments/doctor/:doctorId" element={<DoctorDetails />} />
        <Route path="/reception/doctors_appointments/:doctorId" element={<DoctorsAppointment />} />
        <Route path="/reception/doctors_appointments/:doctorId/:appointmentId" element={<ViewPatient />} />
        <Route path="/reception/doctor_list" element={<HospitalDoctorList />} />
        <Route path="/reception/patient_list" element={<PatientAppointmentList />} />
        <Route path="/reception/add_patient" element={<AddPatient />} />
        <Route path="/reception/account" element={<Account />} />
        <Route path="/reception/settings" element={<Setting />} />
        {/* Doctor routes */}
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/doctor/appointments" element={<DoctorAppointment />} />
        <Route path="/doctor/appointments/:appointmentId" element={<ViewPatient />} />
        <Route path="/doctor/patient_list" element={<PatientList />} />
        <Route path="/doctor/patient_list/:patientId" element={<PatientDetails />} />

        <Route path="/doctor/add_patient" element={<AddPatient />} />
        <Route path="/doctor/payment_history" element={<PaymentHistory />} />

        <Route path="/doctor/account" element={<Account />} />
        <Route path="/doctor/settings" element={<Setting />} />






      </Route>

      {/* Redirect to default route only for authenticated users */}
      <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
    </Routes>
  );
}

export default AppRoutes;
