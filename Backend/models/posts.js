const express = require('express');
const router = express.Router();

router.get('/recent',async (req,res) => {
    //console.log("entra")
    res.status(200)
});

router.get('/',async (req,res) => {
    if(req.query.user_id){
        res.status(200)
    }else if(req.query.post_id){
        res.status(200)
    }
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

module.exports = router;