const userService = require("../services/usersService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body; 

        if (!userName || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }
        // Fetch user by userName instead of phone_no
        const user = await userService.getUserByUsername(userName);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
 
        if (password !== user[0]?.user_password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        

        const token = jwt.sign(
            { userId: user[0]?.user_id, userName: user[0]?.user_username ,RoleId: user[0]?.user_role_id, EmailId: user[0]?.user_email},
            process.env.JWT_SECRET || "your_secret_key",
            { expiresIn: "24h" }
        );

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
        console.log(decoded);

        res.status(200).json({ message: "Login successfully", token });
    } catch (error) {
        res.status(500).json({ status:false , message: error.message });
    }
};

const getUserCount = async (req, res) => {
    try {
        const result = await userService.getUserCount();
        
        res.status(200).json({status:true, data:result,message:"user count retrieved successfully"});
    } catch (error) {
        res.status(500).json({status:false, message: error.message });
    }
};

const getUserCountByDepartment = async (req, res) => {
    const { department_id } = req.query;

    try {
        const result = await userService.getDepartmentUserCount(department_id);
        
        res.status(200).json({status:true, data:result,message:"user count retrieved successfully"});
    } catch (error) {
        res.status(500).json({status:false, message: error.message });
    }
};

const getUserDetails = async (req, res) => {
    const { user_id } = req.query;

    try {
        const result = await userService.getUserDetailsById(user_id);
        
        res.status(200).json({status:true, data:result,message:"user details retrieved successfully"});
    } catch (error) {
        res.status(500).json({status:false, message: error.message });
    }
};

module.exports = { loginUser, getUserCount, getUserCountByDepartment, getUserDetails};
