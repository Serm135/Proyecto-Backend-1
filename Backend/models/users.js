const express = require('express');
const router = express.Router();

router.post('/register',async (req,res) => {
    const data = req.body
    if (data) {
        console.log(data)
        res.status(200).json(data)
    }else{
        res.status(404).json({message:'No Content'})
    }
});

router.post('/login',async (req,res) => {
    const data = req.body
    if (data) {
        res.status(200).json(data)
    }else{
        res.status(404).json({message:'No Content'})
    }
});

router.post('/prev-login',async (req,res) => {
    const data = req.body
    if (data) {
        res.status(200).json(data)
    }else{
        res.status(404).json({message:'No Content'})
    }
});

router.get('/',async (req,res) => {
    res.status(200).json(req.query.user_id)
});

module.exports = router;