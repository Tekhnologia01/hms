const { query } = require("../utils/database");

const addReport = async (report_appo_id, report_test_id, report_photo) => {
    try {
        const response = await query("CALL AddReport(?,?,?)", [report_appo_id, report_test_id, report_photo]);
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

module.exports = { addReport };
