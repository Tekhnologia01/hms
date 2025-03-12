const {query}=require('../utils/database')

const getMsterDataofFees = async () => {
    try {
        const [response] = await query("CALL GetRoomFeesMasterData()");
        return response;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

module.exports={getMsterDataofFees}