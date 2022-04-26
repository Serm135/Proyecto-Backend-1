const express = require('express');
const router = express.Router();
const Review = require('./../schemas/reviews_schema');

router.post('/',async (req,res) => {
    const data = req.body
    console.log(data)
    if (data!='') {
        const newreview = new Review({
            user_id: req.body.user_id,
            product_id: req.body.product_id,
            rating: req.body.rating,
            description: req.body.description
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
    if(data.user_id!='' && data.product_id!=''){
        await Review.find({product_id:data.product_id,user_id:data.user_id}).then(data=>{
            console.log(data)
            if(data!=''){
                res.status(201).send(data)
            }else{
                res.status(404).json("No se encontró el usuario o el producto")
            }
        }).catch(e=>{
            console.log(e)
            res.status(500).json({
                error:e
            })
        })
    }else{
        res.status(404).json("No se ingresó userID o productID")
    }
});

module.exports = router;