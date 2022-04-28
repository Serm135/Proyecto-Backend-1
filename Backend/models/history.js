const express = require('express');
const router = express.Router();
const History = require('./../schemas/history_schema');

router.get('/:user_id',async (req,res) => {
    const data = req.params
    console.log(data)
    if (data.user_id!='') {
        await History.find({user_id:data.user_id}).then(data=>{
            console.log(data)
            if(data!=''){
                res.status(201).send(data)
            }else{
                res.status(201).send([])
            }
        }).catch(e=>{
            console.log(e)
            res.status(500).json({
                error:e
            })
        })
    }else{
        res.status(500).json({message:'No Content'})
    }
});

module.exports = router;