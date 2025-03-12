const BillingAndCharges = require("../services/billingAndChargesServices");

const billingAndCharges = async (req, res) => {
    try {
        const {
            class_name,
            bed, 
            nursing, 
            doctor, 
            rmo, 
            bmw, 
            total, 
            deposit, 
            created_by 
        } = req.body;

        // Validate input
        if ( !class_name || !bed || !nursing || !doctor || !rmo || !bmw || !total || !deposit) {
            return res.status(400).json({
                success: false,
                message: 'All Fields are required',
            });
        }

        // Call service to insert subcategory
        const result = await BillingAndCharges.billinAndCharges(class_name, bed, nursing, doctor, rmo, bmw, total, deposit, created_by );
        return res.status(201).json({
            success: true,
            message: 'Add Billing and Charges successfully',
            data: result,
        });

    } catch (error) {
        console.error('Error adding billing and charges:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

const GetAllBillingAndCharges = async (req, res) => {
    try {
        const categories = await BillingAndCharges.GetAllBillingAndCharges();
        return res.status(200).json({
            success: true,
            message: 'Billing and Charges data retrieved successfully',
            data: categories,
        });
    } catch (error) {
        console.error('Error fetching Billing and charges:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

const UpdateBillingAndCharges = async (req, res) => {
    try {
        const { id } = req.params; // Extract id from URL parameters
        const { class_name, bed, nursing, doctor, rmo, bmw, total, deposit } = req.body;
        
        console.log(req.body)
        console.log(id)
        console.log(class_name)

        // Validate inputs
        if (!id || !class_name || class_name.trim() === '') {
            return res.status(400).json({
                success: false,
                message: "Billing ID and name are required.",
            });
        }

        // Call service function
        const result = await BillingAndCharges.updateBillingAndCharges(id, class_name, bed, nursing, doctor, rmo, bmw, total, deposit);
        return res.status(200).json({
            success: true,
            message: "Billing and charges updated successfully.",
            data: result,
        });
    } catch (error) {
        console.error("Error updating Billing and charges:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};




const addDoctorBill = async (req, res) => {
    const { bill_appointment_id, bill_total_amount, payment_status, payment_method } = req.body;

    try {
        // Validate required fields
        if (!bill_appointment_id || !bill_total_amount || !payment_status) {
            return res.status(400).json({
                status: false,
                message: "Appointment ID, Total Amount, and Payment Status are required",
            });
        }

        // Call service to insert data
        const newBill = await BillingAndCharges.addDoctorBill(
            bill_appointment_id,
            bill_total_amount,
            payment_status,
            payment_method 
        );

        return res.status(201).json({
            status: true,
            message: "Billing and Charges added successfully",
            data: newBill, // Return inserted row
        });
    } catch (error) {
        console.error("Error adding doctor bill:", error);
        res.status(500).json({
            status: false,
            message: "Database error",
            error: error.message,
        });
    }
};


module.exports={billingAndCharges, GetAllBillingAndCharges, UpdateBillingAndCharges,addDoctorBill}