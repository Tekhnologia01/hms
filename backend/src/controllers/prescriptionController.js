const prescriptionService = require("../services/prescriptionService");

const addPrescription = async (req, res) => {
    try {
        const { prescriptions } = req.body;

        if (!prescriptions || !prescriptions.length) {
            return res.status(400).json({ status: false, message: "No prescription" });
        }

        // Validate prescriptions
        for (const prescription of prescriptions) {
            const { appointment_id, medicine_name, quantity, common_note, dosage, duration, food_intake, created_by } = prescription;
            if (!appointment_id || !medicine_name || !quantity || !dosage || !duration || !food_intake || !created_by) {
                return res.status(400).json({ status: false, message: "All fields are required for prescription" });
            }
        }

        // Insert prescriptions in parallel
        await Promise.all(
            prescriptions.map((prescription) =>
                prescriptionService.addPrescription(
                    prescription.appointment_id,
                    prescription.medicine_name,
                    prescription.quantity,
                    prescription.common_note,
                    prescription.dosage,
                    prescription.duration,
                    prescription.food_intake,
                    prescription.created_by
                )
            )
        );

        res.status(201).json({ status: true, message: "Prescription(s) added successfully" });

    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

module.exports = { addPrescription };
