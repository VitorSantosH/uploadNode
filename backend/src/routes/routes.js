const express = require("express");
const routes = require('express').Router(); // ja cria a instancia
const multer = require("multer");
const multerConfig = require('../config/multer');
const Post = require("../models/post");
const excluir = require("../sevices/deleteFunc");
const path = require('path');

//imagens
//app.use(express.static("uploads")) // jeito certo?
routes.use(express.static('build2'))
routes.use("/static", express.static("tmp/uploads"));

// posts
routes.post("/posts", multer(multerConfig).single('file'), async (req, res) => {
    
    console.log(req.file.destination)
    const post = await Post.create({
        name: req.file.filename,
        size: req.file.size,
        key: req.file.originalname,
        url: `/static/${req.file.filename}`,
        path: path.resolve(req.file.destination, req.file.filename)
    })

   

    return res.json(post);

})


// posts get 
routes.get('/posts', async (req, res) => {
    const posts = await Post.find({});

    return res.json(posts);
})

//posts delete 
routes.delete("/posts/:id", async (req, res) => {


    const item = await Post.findOne({ key: req.params.id });

    console.log(item)    
    var erro = {}

    try {
        excluir(item.path);
    } catch (err) {
        erro = err

        console.log(err)
    }

    const deleted = await Post.deleteOne({ key: req.params.id });

    return res.json({
        deleted,
        erro
    });
})



module.exports = routes;




