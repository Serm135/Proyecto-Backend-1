const express = require('express');
const router = express.Router();

router.post('/',async (req,res) => {
    const data = req.body
    if (data) {
        console.log(data)
        res.status(200).json(data)
    }else{
        res.status(404).json({message:'No Content'})
    }
});

router.delete('/',async (req,res) => {
    res.status(200).json(req.query.product_id)
});

module.exports = router;