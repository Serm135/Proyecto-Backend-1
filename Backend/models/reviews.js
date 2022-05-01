const express = require('express');
const router = express.Router();
const Review = require('./../schemas/reviews_schema');

router.post('/',async (req,res) => {
    const data = req.body
    console.log(data)
    if (data!='') {
        const todayDate = new Date().toISOString().slice(0, 10);
        const newreview = new Review({
            user_id: req.body.user_id,
            product_id: req.body.product_id,
            rating: req.body.rating,
            description: req.body.description,
            created_date: todayDate
        })
        await newreview.save().then(result =>{
            console.log("Éxito "+result)
            res.status(201).json({
                message:"Operación realizada con éxito"
            })
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

router.get('/',async (req,res) => {
    const data = req.query
    if(data.user_id){
        await Review.find({user_id:data.user_id}).then(data=>{
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
    }else if(data.product_id){
        console.log("Data:")
        console.log(data)
        await Review.find({product_id:data.product_id}).then(data=>{
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
    }
});

module.exports = router;