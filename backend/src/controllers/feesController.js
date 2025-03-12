const feesService=require('../services/feesService')


const getMasterDataOfFees = async (req, res) => {
    try {
      const result = await feesService.getMsterDataofFees();
      
      if (!result || (Array.isArray(result) && result.length === 0)) {
        return res.status(200).json({
          status: true,
          data: []  
        });
      }
      res.status(200).json({status: true, data:result});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



module.exports ={getMasterDataOfFees}