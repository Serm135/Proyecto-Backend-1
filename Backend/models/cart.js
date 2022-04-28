const express = require('express');
const router = express.Router();
const Cart = require('./../schemas/cart_schema');
const History = require('./../schemas/history_schema');

router.get('/',async (req,res) => {
    const data = req.query
    if(data.user_id!=''){
        await Cart.find({user_id:data.user_id}).then(dato=>{
            console.log(dato)
            if(dato!=''){
                res.status(201).send(dato)
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
        res.status(404).json("No se ingresó userID")
    }
});

router.post('/',async (req,res) => {
    const data = req.body
    if (data!='') {
            const newcart = new Cart({
                user_id: data.user_id,
                product_id: data.product_id
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
            
    }else{
        res.status(500).json({message:'No Content'})
    }
});

router.delete('/',async (req,res) => {
    const data = req.query
    if(data.item_id!=''){
        await Cart.find({_id:data.item_id}).then(dato=>{
            console.log(dato)
            if(dato!=''){
                Cart.findByIdAndRemove({_id:data.item_id}).then(
                    res.status(201).json("Éxito")).catch(e=>{
                        console.log(e)
                        res.status(404).json("F")
                    })
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
            console.log("Data:")
            console.log(data)
            console.log("Dato:")
            console.log(dato)
            if(dato!=''){
                const todayDate = new Date().toISOString().slice(0, 10);
                dato.map(item=>addHistory(item,todayDate))
                Cart.find({user_id:dato[0].user_id}).remove().exec()
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
function addHistory(dato,todayDate){
    const newhistory = new History({
        user_id: dato.user_id,
        product_id: dato.product_id,
        created_date: todayDate
    })
    newhistory.save()
}
module.exports = router;