const express = require('express');
const router = express.Router();

router.get('/',async (req,res) => {
    res.status(200).json(req.query.user_id)
});

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
    res.status(200).json(req.query.item_id)
});

router.post('/buy',async (req,res) => {
    const data = req.body
    if (data) {
        console.log(data)
        res.status(200).json(data)
    }else{
        res.status(404).json({message:'No Content'})
    }
});

module.exports = router;