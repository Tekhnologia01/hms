export const validatePatientForm = (data) => {
    let errors = {};
  
    if (!data.patient_name.trim()) {
      errors.patient_name = "Patient name is required";
    }
  
    if (!data.patient_phone_no.trim()) {
      errors.patient_phone_no = "Phone number is required";
    } else if (!/^\d{10}$/.test(data.patient_phone_no)) {
      errors.patient_phone_no = "Invalid phone number (10 digits required)";
    }
  
    if (!data.patient_age.trim()) {
      errors.patient_age = "Age is required";
    } else if (!/^\d+$/.test(data.patient_age) || parseInt(data.patient_age, 10) <= 0) {
      errors.patient_age = "Enter a valid age";
    }
  
    if (!data.patient_sex.trim()) {
      errors.patient_sex = "Gender is required";
    }
  
    if (!data.patient_address.trim()) {
      errors.patient_address = "Address is required";
    }
  
    if (!data.patient_city.trim()) {
      errors.patient_city = "City is required";
    }
  
    if (!data.patient_id_proof.trim()) {
      errors.patient_id_proof = "ID proof type is required";
    }
  
    if (!data.patient_proof_image) {
      errors.patient_proof_image = "ID proof image is required";
    }
  
    // if (!data.patient_photo) {
    //   errors.patient_photo = "Patient photo is required";
    // }
  
    return errors;
  };
  