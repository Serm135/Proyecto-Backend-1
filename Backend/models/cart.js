const express = require('express');
const router = express.Router();
const Cart = require('./../schemas/cart_schema');

router.get('/',async (req,res) => {
    const data = req.query
    if(data.user_id!=''){
        await Cart.find({user_id:data.user_id}).then(data=>{
            console.log(data)
            if(data!=''){
                res.status(201).send(data)
            }else{
                res.status(404).json("No se encontró el usuario")
            }
        }).catch(e=>{
            console.log(e)
            res.status(500).json({
                error:e
            })
        })
    }else{
        res.status(404).json("No se ingresó userID")
    }
});

router.post('/',async (req,res) => {
    const data = req.body
    if (data!='') {
        await Cart.find({user_id:data.user_id}).then(dato=>{
            console.log(dato)
            if(dato!=''){
                Cart.findOneAndUpdate({user_id:data.user_id},{$push:{products:data.product_id}}).then(
                    res.status(201).json("Éxito")).catch(e=>{
                        console.log(e)
                        res.status(404).json("F")
                    })
                
            }else{
                const newcart = new Cart({
                    user_id: data.user_id,
                    products: data.product_id
                })
                newcart.save().then(result =>{
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

router.delete('/',async (req,res) => {
    const data = req.query
    if(data.item_id!=''){
        await Cart.find({products:data.item_id}).then(dato=>{
            console.log(dato)
            if(dato!=''){
                Cart.findOneAndUpdate({products:data.item_id},{$pull:{products:data.item_id}}).then(
                    res.status(201).json("Éxito")).catch(e=>{
                        console.log(e)
                        res.status(404).json("F")
                    })
                res.status(201).json("Éxito")
            }else{
                res.status(404).json("No se encontró el item")
            }
        }).catch(e=>{
            console.log(e)
            res.status(500).json({
                error:e
            })
        })
    }else{
        res.status(404).json("No se ingresó itemID")
    }
});

router.post('/buy',async (req,res) => {
    const data = req.body
    if (data.user_id!='') {
        await Cart.find({user_id:data.user_id}).then(dato=>{
            console.log(dato)
            if(dato!=''){
                Cart.deleteOne({user_id:data.user_id}).then(
                    res.status(201).json("Éxito")
                ).catch(e=>{
                    res.status(404).json("Error")
                })
            }else{
                res.status(404).json("No se encontró el carro")
            }
        }).catch(e=>{
            console.log(e)
            res.status(500).json({
                error:e
            })
        })
        
    }else{
        res.status(404).json({message:'No Content'})
    }
});

module.exports = router;