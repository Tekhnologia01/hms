const { query } = require("../utils/database");

const billinAndCharges = async (class_name, bed, nursing, doctor, rmo, bmw, total, deposit, 
created_by) => {
    try {
        const result = await query('CALL AddBillingAndCharges(?, ?, ?, ?, ?, ?, ?, ?, ?)',[
            class_name,
            bed, 
            nursing, 
            doctor, 
            rmo, 
            bmw, 
            total, 
            deposit, 
            created_by
        ]);
        return result;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Database error: ' + error.message);
    }
};


const GetAllBillingAndCharges = async () => {
    try {
        const BillingAndCharges = await query('CALL GetAllBillingAndCharges()');
        return BillingAndCharges;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Database error: ' + error.message);
    }
};


const updateBillingAndCharges = async (id, class_name, bed, nursing, doctor, rmo, bmw, total, deposit) => {
    try {
        console.log('Service received:', id, class_name, bed, nursing, doctor, rmo, bmw, total, deposit);

        // Call the stored procedure
        const result = await query(`CALL UpdateBillingAndCharges(?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            id,
            class_name, 
            bed, 
            nursing, 
            doctor, 
            rmo, 
            bmw, 
            total, 
            deposit
        ]);

        return result;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Database error: ' + error.message);
    }
};






const addDoctorBill = async (bill_appointment_id,bill_total_amount,payment_status,payment_method  ) => {
        try {
            const result = await query('CALL AddDoctorBill(?, ?, ?, ?)',[bill_appointment_id,bill_total_amount,payment_status,payment_method ]);
            return result;
        } catch (error) {
            console.error('Database error:', error);
            throw new Error('Database error: ' + error.message);
        }
    };



module.exports ={billinAndCharges, GetAllBillingAndCharges, updateBillingAndCharges,addDoctorBill}