const storeModel = require("../models/store.model")
const fun = require("../function_package")
const res = require("express/lib/response")

class storeController{
    addStore = function(req,res){
        const body = req.body
        const data = {
            name: body.name,
            openTime: body.openTime,
            closeTime: body.closeTime,
            img: body.img,
        }

        storeModel
            .addStore(data)
            .then((result)=>{
                res.status(201).json(fun.res_type(201,"OK",null))
            })
            .catch((err)=>{
                if(err === "此商家已經存在!"){
                    res.status(400).json(fun.res_type(400,err,null))
                }else{
                    res.status(500).json(fun.res_type(500,"ServerError",err))
                }
            })
    }
    deleteOneByID = function(req,res){
        const storeID = req.params.storeID

        storeModel
            .deleteOneByID(storeID)
            .then((result)=>{
                res.status(200).json(fun.res_type(200,"OK",null))
            })
            .catch((err)=>{
                if(err === "NoData"){
                    res.status(404).json(fun.res_type(404,err,null))
                }else{
                    res.status(500).json(fun.res_type(500,"ServerError",err))
                }
            })
    }
    fetchAllStore = function(req,res){
        storeModel
            .fetchAllStore()
            .then((result)=>{
                res.status(200).json(fun.res_type(200,"OK",result))
            })
            .catch((err)=>{
                if (err === "NoData") {
                    res.status(404).json(fun.res_type(404, err, null))
                  } else {
                    res.status(500).json(fun.res_type(500, "ServerError", err))
                  }
            })
    }
    fetchOneByID = function(req,res){
        const storeID = req.params.storeID

        storeModel
            .fetchOneByID(storeID)
            .then((result)=>{
                res.status(200).json(fun.res_type(200,"OK",result))
            })
            .catch((err)=>{
                if (err === "NoData") {
                    res.status(404).json(fun.res_type(404, err, null))
                  } else {
                    res.status(500).json(fun.res_type(500, "ServerError", err))
                  }
            })
    }
    updateOneByID = function(req,res){
        const storeID = req.params.storeID
        const body = req.body

        storeModel
            .updateOneByID(storeID,body)
            .then((result)=>{
                res.status(200).json(fun.res_type(200,"OK",null))
            })
            .catch((err)=>{
                if (err === "NoData") {
                    res.status(404).json(fun.res_type(404, err, null))
                  } else {
                    res.status(500).json(fun.res_type(500, "ServerError", err))
                  }
            })
    }
}

module.exports = new storeController()