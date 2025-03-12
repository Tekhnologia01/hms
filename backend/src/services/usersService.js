const { query } = require("../utils/database");
 // Assuming you're using a database connection

// Fetch user by userName
const getUserByUsername = async (userName) => {
    try {
        console.log(userName)
        const [rows] = await query("CALL GetUserName(?)", [userName]);


        console.log("fghjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",rows)
        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getUserCount = async () => {
    try {
        const response = await query("CALL GetUserCount()");

        if (!response) {
            throw new Error("Unexpected database response format");
        }

        const doctorData = response[0][0];

        return doctorData;

    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const getDepartmentUserCount = async (department_id) => {
    try {
        const response = await query("CALL GetUserCountByDepartment(?)", [department_id]);

        if (!response) {
            throw new Error("Unexpected database response format");
        }

        const userData = response[0][0];

        return userData;

    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

const getUserDetailsById = async (user_id) => {
    try {
        const response = await query("CALL GetUserDetails(?)", [user_id]);

        if (!response) {
            throw new Error("Unexpected database response format");
        }

        const userData = response[0][0];

        return userData;

    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

module.exports = { getUserByUsername, getUserCount, getDepartmentUserCount, getUserDetailsById };
