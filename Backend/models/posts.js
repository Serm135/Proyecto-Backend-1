const express = require('express');
const router = express.Router();
const Post = require('./../schemas/posts_schema');

router.get('/recent',async (req,res) => {
    Post.find().sort({date: -1}).limit(10).exec(function(err, post) { 
        console.log(post)
        res.send(post)
     });
    
});

router.get('/',async (req,res) => {
    const data = req.query
    console.log(data)
    if(data.user_id){
        console.log("Get UserID")
        const pipeline=[
            {$match:{owner_id:data.user_id}},
            {$lookup:{
                from:"users",
                localField:"owner_id",
                foreignField:"_id",
                as:"Userposts"
            }}
        ];
        await Post.aggregate(pipeline).then(data=>{
            console.log(data)
            if(data!=''){
                res.status(200).send(data)
            }else{
                res.status(201).send([])
            }
        })
    }else if(data.post_id){
        if (data.post_id!='') {
            await Post.find({_id:data.post_id}).then(data=>{
                console.log(data)
                if(data!=''){
                    res.status(201).send(data[0])
                }else{
                    res.status(404).send([])
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
    }else{
        res.status(500).json({message:'No Content'})
    }
});

router.post('/',async (req,res) => {
    const data = req.body
    const todayDate = new Date().toISOString().slice(0, 10);
    if (data!='') {
        const newpost = new Post({
            owner_id: req.body.owner_id,
            img_url: req.body.img_url,
            display_name: req.body.display_name,
            description: req.body.description,
            price: req.body.price,
            created_date: todayDate
        })
        await newpost.save().then(result =>{
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

module.exports = router;